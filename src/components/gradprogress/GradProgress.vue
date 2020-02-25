<template src="./GradProgress.html"></template>

<style src = "../sepmapping/SEPMapping.css"></style>

<script>
export default {
  name:"App",
  display:"Graduation Requirement",
  props: ['allmajors', 'acadplan'],

  data() {
    return {
      ULRRrecords: [  

      { requirement: "Human Cultures", moduleTaken: "GEH1045 World Religions", 
        status: "✓"}, 

      { requirement: "Thinking and Expression", moduleTaken: "GET1029 Life, The Universe, And Everything", 
        status: "✓"}, 

      { requirement: "Singapore Studies", moduleTaken: "", 
        status: "✘"}, 

      { requirement: "Asking Questions", moduleTaken: "", 
        status: "✘"}, 
      
      { requirement: "Quantitative Reasoning", moduleTaken: "GER1000 Quantitative Reasoning", 
        status: "✓"}, 
    ],

    UERecords: [  

      { requirement: "", moduleTaken: "PL1101E Introduction to Psychology", 
        status: "✓"}, 

      { requirement: "", moduleTaken: "GEM2025/PH2201 Introduction to Philosophy of Science", 
        status: "✓"}, 
      
      { requirement: "", moduleTaken: "SE2218 Changing Economic Landscape of SE Asia", 
        status: "✓"}, 

      { requirement: "", moduleTaken: "ACC1701X Accounting for Decision Makers", 
        status: "✓"}, 
      
      { requirement: "", moduleTaken: "SC1101E Making Sense of society", 
        status: "✓"}, 

      { requirement: "", moduleTaken: "", 
        status: "✘"}, 
      
      { requirement: "", moduleTaken: "", 
        status: "✘"}, 

      { requirement: "", moduleTaken: "", 
        status: "✘"}, 
    ]
      
    }
  },

  methods: {
    check_status: function(modCode) {
      
      for (var sem in this.acadplan) {
        for (var mod in sem) {
          if (mod == modCode) {
            return true;
          }
        }
      }
      return false;
    }
  }

}
</script>
