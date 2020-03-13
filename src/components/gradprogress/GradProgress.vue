<template src="./GradProgress.html"></template>

<style src = "../sepmapping/SEPMapping.css"></style>


<script>
export default {
  name:"App",
  display:"Graduation Requirement",
  props: ['allmajors', 'acadplan', 'allmodules'],

  data() {
    return {  
      sem_completed: 3,
      major:''
    }
  },

  methods: {

    get_mod_added: function() {
      var mod_added = [];
      for (var key1 in this.acadplan) {
        var sem = this.acadplan[key1];
        for (var key2 in sem) {
          var taken = sem[key2];
          mod_added.push({'code': taken.mod, 'sem': key1});
        }
      }
      return mod_added;
    },
    
    get_ulr_table: function() {
      var ulr_progress = [];
      var ulr_types = ['Human Cultures', 'Thinking and Expression', 'Singapore Studies', 'Asking Questions', 'Quantitative Reasoning'];
      for (var type in ulr_types) {
        var info = this.check_fufill(ulr_types[type]);
        if (info.added) {
          if (info.completed) {
            ulr_progress.push({"ulr": ulr_types[type], "code": info.mod, "selected": this.get_mod_title(info.mod), "added": '✓', "completed": '✓'});
          } else {
            ulr_progress.push({"ulr": ulr_types[type], "code": info.mod, "selected": this.get_mod_title(info.mod), "added": '✓', "completed": 'x'});
          }
        } else {
          ulr_progress.push({"ulr": ulr_types[type], "code": info.mod, "selected": ' ', "added": 'x', "completed": 'x'});
        }
      }  
      return ulr_progress;
    },

    check_fufill: function(type) {
      var type_dic = {'Human Cultures': 'GEH', 'Thinking and Expression': 'GET', 'Singapore Studies': 'GES',
                       'Asking Questions': 'GEQ', 'Quantitative Reasoning': 'GER'};
      for (var key1 in this.acadplan) {
        var sem = this.acadplan[key1];
        for (var key2 in sem) {
          var taken = sem[key2];
          if (taken.mod.substring(0,3) == type_dic[type]) {
            var sem_taken = this.get_sem_number(key1);
            if (sem_taken < this.sem_completed) {
              return {"mod": taken.mod, "added": true, "completed": true};
            } else {
              return {"mod": taken.mod, "added": true, "completed": false};
            }
          } 
        } 
      }
      return {"mod": taken.mod, "added": false, "completed": false};
    },

    get_sem_number: function(semString) {
      return ((Number(semString.substring(1,2)) - 1) * 2 + (Number(semString.substring(3,4)) - 1));
    },

    get_mod_title: function(code) {
      for (var key in this.allmodules){
        if (key == code) {
          var modInfo = this.allmodules[key];
          return modInfo.code + " " + modInfo.title;
        }
      }
    },

    filter_core: function(modules) {
      var cores = [];
      for (var mod in modules) {
        if (modules[mod].modType == 'core') {
          cores.push(modules[mod]);
        }
      }
      return cores;
    },

    filter_elective: function(modules) {
      var electives = [];
      for (var mod in modules) {
        if (modules[mod].modType == 'elective') {
          electives.push(modules[mod]);
        }
      }
      return electives;
    },
    
    
    check_status: function(modcode) {
      for (var key1 in this.acadplan) {
        var sem = this.acadplan[key1];
        for (var key2 in sem) {
          var module = sem[key2];
          if (module.mod == modcode) {
            var sem_taken = this.get_sem_number(key1);
            if (sem_taken < this.sem_completed) {
              return {"added": true, "completed": true};
            } else {
              return {"added": true, "completed": false};
            }
          } 
        } 
      }
      return {"added": false, "completed": false};
    },


    get_pr_table: function() {
      var pr_progress = [];
      var pr_mods = this.filter_core(this.allmajors[this.major]);
      for (var key in pr_mods){
        // Error occurs if we want to return false
        var core = pr_mods[key];
        var status = this.check_status(core.modCode);
        if (status.added) {
          if (status.completed) {
            pr_progress.push({"requirement": core.modTitle, "code": core.modCode, "selected": this.get_mod_title(core.modCode), "added": '✓', "completed": '✓'});
          } else {
            pr_progress.push({"requirement": core.modTitle, "code": core.modCode, "taken": this.get_mod_title(core.modCode), "added": '✓', "completed": 'x'});
          }
        } else {
          pr_progress.push({"requirement": core.modTitle, "selected": ' ', "added": 'x', "completed": 'x'});
        }
      }
      // add electives

      // Business Analytics
    if(this.major == 'Business Analytics') {
      var electives = this.filter_elective(this.allmajors[this.major]);
      
      var i = 0;
      for (var key1 in electives){
        // Error occurs if we want to return false
        var elective = electives[key1];
        var status1 = this.check_status(elective.modCode);
        if (status1.added) {
          if (status1.completed) {
            i += 1;
            pr_progress.push({"requirement": 'Programme Elective ' + i, "code": elective.modCode, "selected": this.get_mod_title(elective.modCode), "added": '✓', "completed": '✓'});
          } else {
            i += 1;
            pr_progress.push({"requirement": 'Programme Elective ' + i, "code": elective.modCode, "selected": this.get_mod_title(elective.modCode), "added": '✓', "completed": 'x'});
          }
        }
      }
      if(i < 6){
        for(var j = i + 1; j <= 6; j++) {

          pr_progress.push({"requirement": 'Programme Elective ' + j, "code": '', "selected": ' ', "added": 'x', "completed": 'x'});
        }
      } 
    } else if(this.major == 'Computer Science') {
      var mods_added = this.get_mod_added(this.acadplan);

      // add focus area
      var k = 0;
      for (var key2 in mods_added) {
        var mod = mods_added[key2];
        var mod_substring = mod.code.substring(0,3);
        if(mod_substring == 'CS3'|| mod_substring == 'CS4'||mod_substring == 'CS5') {
          k += 1;
          var status2 = this.check_status(mod.code);
          if(status2.completed) {
            pr_progress.push({"requirement": 'Focus Area ' + k, "code": mod.code, "selected": this.get_mod_title(mod.code), "added": '✓', "completed": '✓'});
          } else {
            pr_progress.push({"requirement": 'Focus Area ' + k, "code": mod.code, "selected": this.get_mod_title(mod.code), "added": '✓', "completed": 'x'});
          }
        }
      }

      if(k < 3){
        for(var l = k + 1; l <= 3; l++) {

          pr_progress.push({"requirement": 'Focus Area ' + l, "code": '', "selected": ' ', "added": 'x', "completed": 'x'});
        }
      } 

      // add independent project module
      var m = 0;
      for (var key3 in mods_added) {
        var mod1 = mods_added[key3];
        if(mod1.code.substring(0,2) == 'CP') {
          m += 1;
          var status3 = this.check_status(mod1.code);
          if(status3.completed) {
            pr_progress.push({"requirement": 'Independent Project ' + m, "code": mod1.code, "selected": this.get_mod_title(mod1.code), "added": '✓', "completed": '✓'});
          } else {
            pr_progress.push({"requirement": 'Independent Project ' + m, "code": mod1.code, "selected": this.get_mod_title(mod1.code), "added": '✓', "completed": 'x'});
          }
        }
      }

      if(m < 3){
        for(var n = m + 1; n <= 3; n++) {
          pr_progress.push({"requirement": 'Independent Project ' + n, "code": '', "selected": ' ', "added": 'x', "completed": 'x'});
        }
      } 
    
    // add industrial experience
      var industry = 0;
      for (var key4 in mods_added) {
        var mod2 = mods_added[key4];
        if(mod2.code == 'CP3880' || mod2.code == 'IS4010'|| mod2.code == 'CP3200') {
          industry += 1;
          var status4 = this.check_status(mod2.code);
          if(status4.completed) {
            pr_progress.push({"requirement": 'Industrial Experience' , "code": mod2.code, "selected": this.get_mod_title(mod2.code), "added": '✓', "completed": '✓'});
          } else {
            pr_progress.push({"requirement": 'Industrial Experience', "code": mod2.code, "selected": this.get_mod_title(mod2.code), "added": '✓', "completed": 'x'});
          }
        }
      }

      if(industry == 0) {
        pr_progress.push({"requirement": 'Industrial Experience', "code": '', "selected": ' ', "added": 'x', "completed": 'x'});
      }

    }
      return pr_progress;
    },
    
    get_ue_table: function() {
      // Basically all the mods taken but have not appeared in the two tables above
      var appeared = [];
      appeared.push(''); // handle empty string with 0 mc
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
              ue_progress.push({"requirement": ' ', "selected": this.get_mod_title(taken.mod), "added": '✓', "completed": '✓'});
            } else {
              ue_progress.push({"requirement": ' ', "selected": this.get_mod_title(taken.mod), "added": '✓', "completed": 'x'});
            }
            completed += 1;
          } 
        } 
      }

      // make up for 8 mods in total
      for (var i = 0; i < 8 - completed; i++) {
        ue_progress.push({"requirement": ' ',  "selected": ' ', "added": 'x', "completed": 'x'});
      }

      return ue_progress;


    }
    
  }

}
</script>
