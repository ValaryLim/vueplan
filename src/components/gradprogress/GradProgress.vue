<template src="./GradProgress.html"></template>

<style src = "../sepmapping/SEPMapping.css"></style>

<script>
export default {
  name:"App",
  display:"Graduation Requirement",
  props: ['allmajors', 'acadplan'],

  data() {
    return {  
    }
  },

  methods: {
    
    get_ulr_table: function() {
      var ulr_progress = [];
      var ulr_types = ['Human Cultures', 'Thinking and Expression', 'Singapore Studies', 'Asking Questions', 'Quantitative Reasoning'];
      for (var type in ulr_types) {
        var info = this.check_fufill(ulr_types[type]);
        if (info.status) {
          ulr_progress.push({"ulr": ulr_types[type], "taken": info.mod, "status": '✓'})
        } else {
          ulr_progress.push({"ulr": ulr_types[type], "taken": info.mod, "status": '✘'})
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
            return {"mod": taken.mod, "status": true};
          } 
        } 
      }
      return {"mod": ' ', "status": false};
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
            return true;
          } 
        } 
      }
      return false;
    },


    get_pr_table: function() {
      var pr_progress = [];
      var pr_mods = this.filter_core(this.allmajors['Business Analytics']);
      for (var key in pr_mods){
        // Error occurs if we want to return false
        var core = pr_mods[key];
        if (this.check_status(core.modCode)) { 
          pr_progress.push({"requirement": core.modTitle, "taken": core.modCode, "status": '✓'});
        } else {
          pr_progress.push({"requirement": core.modTitle, "taken": " ", "status": '✘'});
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
        appeared.push(ulr_progress[ulr].taken);
      }
      var pr_progress = this.get_pr_table();
      for (var pr in pr_progress) {
        appeared.push(pr_progress[pr].taken);
      }

      var ue_progress = [];
      var completed = 0;
      for (var key1 in this.acadplan) {
        var sem = this.acadplan[key1];
        for (var key2 in sem) {
          var taken = sem[key2];
          if (!appeared.includes(taken.mod)) {
            console.log(taken, "taken");
            ue_progress.push({"requirement": ' ', "taken": taken.mod, "status": '✓'});
            completed += 1;
          } 
        } 
      }

      // make up for 8 mods in total
      for (var i = 0; i < 8 - completed; i++) {
        console.log("for loop entered");
        ue_progress.push({"requirement": ' ',  "taken": ' ', "status": '✘'});
      }

      return ue_progress;


    }
    
  }

}
</script>
