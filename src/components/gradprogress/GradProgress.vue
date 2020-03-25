<template src="./GradProgress.html"></template>

<style src = "../sepmapping/SEPMapping.css"></style>


<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
import database from "../firebase.js";

export default {
  name: "App",
  display: "Graduation Requirement",
  props: ["allmajors", "allmodules"],

  data() {
    return {
      sem_completed: 0,
      year: 2018,
      majors: [
        "Business Analytics",
        "Computer Science",
        "Information Systems",
        "Information Security"
      ],
      major: "",
      acadplan_exemptions: [],
      acadplan: {}
    };
  },

  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },

  created() {
    this.fetch_gradprogress();
  },

  methods: {
    getDateValue: function() {
      var today = new Date();
      var dateValue = today.getFullYear() + today.getMonth() / 12;
      return dateValue;
    },

    fetch_gradprogress: function() {
      var user = firebase.auth().currentUser;
      let userRef = database.collection("acadplan").doc(user.uid);
      userRef.get().then(doc => {
        this.acadplan_exemptions = doc.data()["acadplan_exemptions"];
        this.major = doc.data()["major"];
        this.year = doc.data()["year"]; //change this to the year. Sem completed is assigned in line 73
        this.acadplan = doc.data()["module_location"];
      });
    },
    get_mod_added: function() {
      var mod_added = [];
      for (var key1 in this.acadplan) {
        var sem = this.acadplan[key1];
        for (var key2 in sem) {
          var taken = sem[key2];
          mod_added.push({ code: taken.mod, sem: key1 });
        }
      }
      return mod_added;
    },

    get_ulr_table: function() {
      this.sem_completed = parseInt(
        (this.getDateValue() - this.year - 0.5) / 0.5,
        10
      );
      if (this.sem_completed < 0) {
        this.sem_completed = 0;
      }
      var ulr_progress = [];
      var ulr_types = [
        "Human Cultures",
        "Thinking and Expression",
        "Singapore Studies",
        "Asking Questions",
        "Quantitative Reasoning"
      ];
      for (var type in ulr_types) {
        var info = this.check_fufill(ulr_types[type]);
        if (info.added) {
          if (info.completed) {
            ulr_progress.push({
              ulr: ulr_types[type],
              code: info.mod,
              selected: this.get_mod_title(info.mod),
              added: "✓",
              completed: "✓"
            });
          } else {
            ulr_progress.push({
              ulr: ulr_types[type],
              code: info.mod,
              selected: this.get_mod_title(info.mod),
              added: "✓",
              completed: "x"
            });
          }
        } else {
          ulr_progress.push({
            ulr: ulr_types[type],
            code: info.mod,
            selected: " ",
            added: "x",
            completed: "x"
          });
        }
      }
      return ulr_progress;
    },

    check_fufill: function(type) {
      var type_dic = {
        "Human Cultures": "GEH",
        "Thinking and Expression": "GET",
        "Singapore Studies": "GES",
        "Asking Questions": "GEQ",
        "Quantitative Reasoning": "GER"
      };
      for (var key1 in this.acadplan) {
        var sem = this.acadplan[key1];
        for (var key2 in sem) {
          var taken = sem[key2];
          if (taken.mod.substring(0, 3) == type_dic[type]) {
            if (key1 < this.sem_completed) {
              return { mod: taken.mod, added: true, completed: true };
            } else {
              return { mod: taken.mod, added: true, completed: false };
            }
          }
        }
      }
      // Check whether in exemption
      for (var exeKey in this.acadplan_exemptions) {
        var exemption = this.acadplan_exemptions[exeKey];
        if (exemption.substring(0, 3) == type_dic[type]) {
            return { mod: exemption, added: true, completed: true };
        }
      }
      return { mod: "", added: false, completed: false };
    },

    get_mod_title: function(code) {
      for (var key in this.allmodules) {
        if (key == code) {
          var modInfo = this.allmodules[key];
          return modInfo.code + " " + modInfo.title;
        }
      }
    },

    filter_core: function(modules) {
      var cores = [];
      for (var mod in modules) {
        if (modules[mod].modType == "core") {
          cores.push(modules[mod]);
        }
      }
      return cores;
    },

    filter_elective: function(modules) {
      var electives = [];
      for (var mod in modules) {
        if (modules[mod].modType == "elective") {
          electives.push(modules[mod]);
        }
      }
      return electives;
    },

    get_all_preclu: function(preclu_tree, preclu_arr) {
      /**
       * recursively finds all preclusions of one module (ignores "and", "or") and returns an array of preclusions
       */
      // if there are no preclusions
      if (Object.keys(preclu_tree).length === 0) {
        return preclu_arr;
      }

      // if there is only one prerequisite
      if (typeof preclu_tree === "string") {
        if (this.allmodules[preclu_tree]) {
          // not null
          // check if preclu_arr already contains module
          if (preclu_arr.includes(preclu_tree)) {
            return preclu_arr;
          } else {
            // if not, push module into preclu_arr
            preclu_arr.push(preclu_tree);
            return preclu_arr;
          }
        } else {
          return preclu_arr;
        }
      }

      // else, go through each nest and get the preclusions
      for (var key in preclu_tree) {
        // access subtree
        var preclu_subtree = preclu_tree[key];

        for (var preclu_index in preclu_subtree) {
          // precluded module
          var preclu = preclu_subtree[preclu_index];

          // if precluded module is a string and not yet included in preclu_arr
          if (
            typeof preclu === "string" &&
            this.allmodules[preclu] &&
            !preclu_arr.includes(preclu)
          ) {
            // add precluded module to preclu_arr
            preclu_arr.push(preclu);

            // recursively call get_all_preclu on new modules
            preclu_arr = this.get_all_preclu(
              this.allmodules[preclu].parsepreclu,
              preclu_arr
            );
          }
        }
      }
      return preclu_arr;
    },

    check_status: function(modcode) {

      // Check whether this module is exempted
      for (var exeKey in this.acadplan_exemptions) {
        var exemption = this.acadplan_exemptions[exeKey];
        if (exemption == modcode) {
            return { mod: exemption, added: true, completed: true, self:true };
        }
      }

      // Check whether this module's preclusion is exempted
      if (this.allmodules[modcode]) {
        var preclusions1 = this.get_all_preclu(
          this.allmodules[modcode].parsepreclu,
          []
        );

        for (var preclu_index1 in preclusions1) {
          var preclu1 = preclusions1[preclu_index1];
          for (var exeKey1 in this.acadplan_exemptions) {
            var exemption1 = this.acadplan_exemptions[exeKey1];
            if (exemption1 == preclu1) {
              return { mod: exemption1, added: true, completed: true, self:false, instead: exemption1 };
            }
          }
        }
      }
      
      // Check whether acadplan has this module 
      var mod_added = this.get_mod_added(this.acadplan);
      for (var key in mod_added) {
        var module = mod_added[key];
        if (module.code == modcode) {
          if (module.sem < this.sem_completed) {
            return { added: true, completed: true, self: true };
          } else {
            return { added: true, completed: false, self: true };
          }
        }
      }

      // Check whether acadplan has this module's preclusion 
      if (this.allmodules[modcode]) {
        var preclusions = this.get_all_preclu(
          this.allmodules[modcode].parsepreclu,
          []
        );
        for (var preclu_index in preclusions) {
          var preclu = preclusions[preclu_index];
          for (var key1 in mod_added) {
            var module1 = mod_added[key1];
            if (module1.code == preclu) {
              if (module1.sem < this.sem_completed) {
                return {
                  added: true,
                  completed: true,
                  self: false,
                  instead: preclu
                };
              } else {
                return {
                  added: true,
                  completed: false,
                  self: false,
                  instead: preclu
                };
              }
            }
          }
        }
      }

      return { added: false, completed: false };
    },

    get_pr_table: function() {
      var pr_progress = [];
      var pr_mods = this.filter_core(this.allmajors[this.major]);
      for (var key in pr_mods) {
        // Error occurs if we want to return false
        var core = pr_mods[key];
        var status = this.check_status(core.modCode);
        if (status.added) {
          if (status.completed) {
            if (status.self) {
              pr_progress.push({
                requirement: core.modTitle,
                code: core.modCode,
                selected: this.get_mod_title(core.modCode),
                added: "✓",
                completed: "✓"
              });
            } else {
              pr_progress.push({
                requirement: core.modTitle,
                code: status.instead,
                selected: this.get_mod_title(status.instead),
                added: "✓",
                completed: "✓"
              });
            }
          } else {
            if (status.self) {
              pr_progress.push({
                requirement: core.modTitle,
                code: core.modCode,
                selected: this.get_mod_title(core.modCode),
                added: "✓",
                completed: "x"
              });
            } else {
              pr_progress.push({
                requirement: core.modTitle,
                code: status.instead,
                selected: this.get_mod_title(status.instead),
                added: "✓",
                completed: "x"
              });
            }
          }
        } else {
          pr_progress.push({
            requirement: core.modTitle,
            selected: " ",
            added: "x",
            completed: "x"
          });
        }
      }

      // Add programme electives

      // Business Analytics
      if (
        this.major == "Business Analytics" ||
        this.major == "Information Systems"
      ) {
        var electives = this.filter_elective(this.allmajors[this.major]);

        var i = 0;
        for (var key1 in electives) {
          var elective = electives[key1];
          var status1 = this.check_status(elective.modCode);
          if (status1.added) {
            if (status1.completed) {
              i += 1;
              pr_progress.push({
                requirement: "Programme Elective " + i,
                code: elective.modCode,
                selected: this.get_mod_title(elective.modCode),
                added: "✓",
                completed: "✓"
              });
            } else {
              i += 1;
              pr_progress.push({
                requirement: "Programme Elective " + i,
                code: elective.modCode,
                selected: this.get_mod_title(elective.modCode),
                added: "✓",
                completed: "x"
              });
            }
          }
          if(i == 6) {
            break;
          }
        }
        if (i < 6) {
          for (var j = i + 1; j <= 6; j++) {
            pr_progress.push({
              requirement: "Programme Elective " + j,
              code: "",
              selected: " ",
              added: "x",
              completed: "x"
            });
          }
        }
      }
      // Computer Science
      else if (this.major == "Computer Science") {
        var mods_added = this.get_mod_added(this.acadplan);

        // Add focus area
        var k = 0;
        for (var key2 in mods_added) {
          var mod = mods_added[key2];
          var mod_substring = mod.code.substring(0, 3);
          if (
            mod_substring == "CS3" ||
            mod_substring == "CS4" ||
            mod_substring == "CS5"
          ) {
            k += 1;
            var status2 = this.check_status(mod.code);
            if (status2.completed) {
              pr_progress.push({
                requirement: "Focus Area " + k,
                code: mod.code,
                selected: this.get_mod_title(mod.code),
                added: "✓",
                completed: "✓"
              });
            } else {
              pr_progress.push({
                requirement: "Focus Area " + k,
                code: mod.code,
                selected: this.get_mod_title(mod.code),
                added: "✓",
                completed: "x"
              });
            }
          }
        }

        if (k < 3) {
          for (var l = k + 1; l <= 3; l++) {
            pr_progress.push({
              requirement: "Focus Area " + l,
              code: "",
              selected: " ",
              added: "x",
              completed: "x"
            });
          }
        }

        // Add independent project module
        var m = 0;
        for (var key3 in mods_added) {
          var mod1 = mods_added[key3];
          if (mod1.code.substring(0, 2) == "CP") {
            m += 1;
            var status3 = this.check_status(mod1.code);
            if (status3.completed) {
              pr_progress.push({
                requirement: "Independent Project " + m,
                code: mod1.code,
                selected: this.get_mod_title(mod1.code),
                added: "✓",
                completed: "✓"
              });
            } else {
              pr_progress.push({
                requirement: "Independent Project " + m,
                code: mod1.code,
                selected: this.get_mod_title(mod1.code),
                added: "✓",
                completed: "x"
              });
            }
          }
        }

        if (m < 3) {
          for (var n = m + 1; n <= 3; n++) {
            pr_progress.push({
              requirement: "Independent Project " + n,
              code: "",
              selected: " ",
              added: "x",
              completed: "x"
            });
          }
        }

        // Add industrial experience
        var industry = 0;
        for (var key4 in mods_added) {
          var mod2 = mods_added[key4];
          if (
            mod2.code == "CP3880" ||
            mod2.code == "IS4010" ||
            mod2.code == "CP3200"
          ) {
            industry += 1;
            var status4 = this.check_status(mod2.code);
            if (status4.completed) {
              pr_progress.push({
                requirement: "Industrial Experience",
                code: mod2.code,
                selected: this.get_mod_title(mod2.code),
                added: "✓",
                completed: "✓"
              });
            } else {
              pr_progress.push({
                requirement: "Industrial Experience",
                code: mod2.code,
                selected: this.get_mod_title(mod2.code),
                added: "✓",
                completed: "x"
              });
            }
          }
        }

        if (industry == 0) {
          pr_progress.push({
            requirement: "Industrial Experience",
            code: "",
            selected: " ",
            added: "x",
            completed: "x"
          });
        }
      }

      // Information Security
      else if (this.major == "Information Security") {
        var mods_added1 = this.get_mod_added(this.acadplan);

        // Add programme electives
        var electives1 = this.filter_elective(this.allmajors[this.major]);

        var o = 0;
        for (var key5 in electives1) {
          var elective1 = electives1[key5];
          var status5 = this.check_status(elective1.modCode);
          if (status5.added) {
            if (status5.completed) {
              o += 1;
              pr_progress.push({
                requirement: "Programme Elective " + o,
                code: elective1.modCode,
                selected: this.get_mod_title(elective1.modCode),
                added: "✓",
                completed: "✓"
              });
            } else {
              o += 1;
              pr_progress.push({
                requirement: "Programme Elective " + o,
                code: elective1.modCode,
                selected: this.get_mod_title(elective1.modCode),
                added: "✓",
                completed: "x"
              });
            }
          }
        }
        if (o < 3) {
          for (var p = o + 1; p <= 3; p++) {
            pr_progress.push({
              requirement: "Programme Elective " + p,
              code: "",
              selected: " ",
              added: "x",
              completed: "x"
            });
          }
        }

        // Add independent project module
        var q = 0;
        for (var key6 in mods_added1) {
          var mod3 = mods_added1[key6];
          if (mod3.code.substring(0, 2) == "CP") {
            q += 1;
            var status6 = this.check_status(mod3.code);
            if (status6.completed) {
              pr_progress.push({
                requirement: "Independent Project " + q,
                code: mod3.code,
                selected: this.get_mod_title(mod3.code),
                added: "✓",
                completed: "✓"
              });
            } else {
              pr_progress.push({
                requirement: "Independent Project " + q,
                code: mod3.code,
                selected: this.get_mod_title(mod3.code),
                added: "✓",
                completed: "x"
              });
            }
          }
        }

        if (q < 2) {
          for (var r = q + 1; r <= 2; r++) {
            pr_progress.push({
              requirement: "Independent Project " + r,
              code: "",
              selected: " ",
              added: "x",
              completed: "x"
            });
          }
        }

        // Add industrial experience
        var industry1 = 0;
        for (var key7 in mods_added1) {
          var mod4 = mods_added1[key7];
          if (
            mod4.code == "CP3880" ||
            mod4.code == "IS4010" ||
            mod4.code == "CP3200"
          ) {
            industry1 += 1;
            var status7 = this.check_status(mod4.code);
            if (status7.completed) {
              pr_progress.push({
                requirement: "Industrial Experience",
                code: mod4.code,
                selected: this.get_mod_title(mod4.code),
                added: "✓",
                completed: "✓"
              });
            } else {
              pr_progress.push({
                requirement: "Industrial Experience",
                code: mod4.code,
                selected: this.get_mod_title(mod4.code),
                added: "✓",
                completed: "x"
              });
            }
          }
        }

        if (industry1 == 0) {
          pr_progress.push({
            requirement: "Industrial Experience",
            code: "",
            selected: " ",
            added: "x",
            completed: "x"
          });
        }
      }
      return pr_progress;
    },

    get_ue_table: function() {
      // Basically all the mods taken but have not appeared in the two tables above
      var appeared = [];
      appeared.push(""); // handle empty string with 0 mc
      var ulr_progress = this.get_ulr_table();
      for (var ulr in ulr_progress) {
        appeared.push(ulr_progress[ulr].code);
      }
      var pr_progress = this.get_pr_table();
      for (var pr in pr_progress) {
        appeared.push(pr_progress[pr].code);
      }

      var ue_progress = [];
      var completed = 0;
      for (var key1 in this.acadplan) {
        var sem = this.acadplan[key1];
        for (var key2 in sem) {
          var taken = sem[key2];
          if (!appeared.includes(taken.mod)) {
            if (key1 < this.sem_completed) {
              ue_progress.push({
                requirement: " ",
                selected: this.get_mod_title(taken.mod),
                added: "✓",
                completed: "✓"
              });
            } else {
              ue_progress.push({
                requirement: " ",
                selected: this.get_mod_title(taken.mod),
                added: "✓",
                completed: "x"
              });
            }
            completed += 1;
          }
        }
      }

      for (var exeKey in this.acadplan_exemptions) {
        var exemption = this.acadplan_exemptions[exeKey];
        if(!appeared.includes(exemption)) {
          ue_progress.push({
            requirement: " ",
            selected: this.get_mod_title(exemption),
            added: "✓",
            completed: "✓"
          });
          completed += 1;
        }
      }


      // make up for 8 mods in total (commom across all computing majors)
      for (var i = 0; i < 8 - completed; i++) {
        ue_progress.push({
          requirement: " ",
          selected: " ",
          added: "x",
          completed: "x"
        });
      }

      return ue_progress;
    }
  }
};
</script>
