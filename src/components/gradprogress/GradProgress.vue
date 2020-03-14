<template src="./GradProgress.html"></template>

<style src = "../sepmapping/SEPMapping.css"></style>


<script>
import { mapGetters } from "vuex";
import firebase from 'firebase';
import database from '../firebase.js';

export default {
  name: "App",
  display: "Graduation Requirement",
  props: ["allmajors", "acadplan", "allmodules"],

  data() {
    return {
      sem_completed: 0,
      majors: [
        "Business Analytics",
        "Computer Science",
        "Information Systems",
        "Information Security"
      ],
      major: "",
    };
  },

  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    }),
  },

  methods: {
    showSemesters: function() {
      var user = firebase.auth().currentUser;
      let userRef = database.collection('acadplan').doc(user.uid);
      userRef.get()
          .then(doc => {
              this.sem_completed = doc.data()['year']
          })
      return this.sem_completed
    },

    showMajor: function() {
      var user = firebase.auth().currentUser;
      let userRef = database.collection('acadplan').doc(user.uid);
      userRef.get()
          .then(doc => {
              this.major = doc.data()['major']
          })
      return this.major
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
            var sem_taken = this.get_sem_number(key1);
            if (sem_taken < this.sem_completed) {
              return { mod: taken.mod, added: true, completed: true };
            } else {
              return { mod: taken.mod, added: true, completed: false };
            }
          }
        }
      }
      return { mod: taken.mod, added: false, completed: false };
    },

    get_sem_number: function(semString) {
      return (
        (Number(semString.substring(1, 2)) - 1) * 2 +
        (Number(semString.substring(3, 4)) - 1)
      );
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

    check_status: function(modcode) {
      var mod_added = this.get_mod_added(this.acadplan);
      console.log(mod_added);
      for (var key in mod_added) {
        var module = mod_added[key];
        if (module.code == modcode) {
          if (modcode == 'IS4010'){
            console.log("*******");
          }
          var sem_taken = this.get_sem_number(module.sem);
          if (sem_taken < this.sem_completed) {
            return { added: true, completed: true };
          } else {
            return { added: true, completed: false };
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
        if(core.modCode == 'IS4010') {
          console.log({"IS4010":status});
        }
        if (status.added) {
          if (status.completed) {
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
              code: core.modCode,
              selected: this.get_mod_title(core.modCode),
              added: "✓",
              completed: "x"
            });
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
            var sem_taken = this.get_sem_number(key1);
            if (sem_taken < this.sem_completed) {
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
