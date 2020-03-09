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
    }
  },

  methods: {
    
    get_ulr_table: function() {
      var ulr_progress = [];
      var ulr_types = ['Human Cultures', 'Thinking and Expression', 'Singapore Studies', 'Asking Questions', 'Quantitative Reasoning'];
      for (var type in ulr_types) {
        var info = this.check_fufill(ulr_types[type]);
        if (info.added) {
          if (info.completed) {
            ulr_progress.push({"ulr": ulr_types[type], "code": info.mod, "selected": this.get_mod_title(info.mod), "added": '✓', "completed": '✓'});
          } else {
            ulr_progress.push({"ulr": ulr_types[type], "code": info.mod, "selected": this.get_mod_title(info.mod), "added": '✓', "completed": '✘'});
          }
        } else {
          ulr_progress.push({"ulr": ulr_types[type], "code": info.mod, "selected": ' ', "added": '✘', "completed": '✘'});
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
      var pr_mods = this.filter_core(this.allmajors['Business Analytics']);
      for (var key in pr_mods){
        // Error occurs if we want to return false
        var core = pr_mods[key];
        var status = this.check_status(core.modCode);
        if (status.added) {
          if (status.completed) {
            pr_progress.push({"requirement": core.modTitle, "code": core.modCode, "selected": this.get_mod_title(core.modCode), "added": '✓', "completed": '✓'});
          } else {
            pr_progress.push({"requirement": core.modTitle, "code": core.modCode, "taken": this.get_mod_title(core.modCode), "added": '✓', "completed": '✘'});
          }
        } else {
          pr_progress.push({"requirement": core.modTitle, "selected": ' ', "added": '✘', "completed": '✘'});
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
              ue_progress.push({"requirement": ' ', "selected": this.get_mod_title(taken.mod), "added": '✓', "completed": '✘'});
            }
            completed += 1;
          } 
        } 
      }

      // make up for 8 mods in total
      for (var i = 0; i < 8 - completed; i++) {
        ue_progress.push({"requirement": ' ',  "selected": ' ', "added": '✘', "completed": '✘'});
      }

      return ue_progress;


    }
    
  }

}
</script>
