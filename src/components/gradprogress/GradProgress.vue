<template src="./GradProgress.html"></template>

<<<<<<< HEAD
<style src = "./GradProgress.css"></style>
=======
<style src = "../sepmapping/SEPMapping.css"></style>
>>>>>>> origin

<script>
export default {
  name:"App",
  display:"Graduation Requirement",

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

    CoreRecords: [  

      { requirement: "BT1101 Introduction to Business Analytics", moduleTaken: "BT1101 Introduction to Business Analytics", 
        status: "✓"}, 

      { requirement: "CS1010S Programming Methodology", moduleTaken: "CS1010S Programming Methodology", 
        status: "✓"}, 

      { requirement: "EC1301 Principles of Economics", moduleTaken: "EC1301 Principles of Economics", 
        status: "✘"}, 

      { requirement: "IS1103 Ethics in Computing", moduleTaken: "IS1103 Ethics in Computing", 
        status: "✘"}, 
      
      { requirement: "MA1521 Calculus for Computing, or MA1102R Calculus", moduleTaken: "MA1521 Calculus for Computing", 
        status: "✓"}, 

      { requirement: "MA1311 Matrix Algebra, or MA1101R Linear Algebra I", moduleTaken: "MA1101R Linear Algebra I", 
        status: "✓"}, 

      { requirement: "MKT1705X Principles of Marketing", moduleTaken: "", 
        status: "✘"}, 

      { requirement: "BT2101 Decision Making Methods and Tools", moduleTaken: "BT2101 Decision Making Methods and Tools", 
        status: "✓"}, 

      { requirement: "CS2030 Programming Methodology I", moduleTaken: "CS2030 Programming Methodology I", 
        status: "✓"}, 
      
      { requirement: "CS2040 Data Structures and Algorithms", moduleTaken: "CS2040 Data Structures and Algorithms", 
        status: "✓"}, 

      { requirement: "IS2101 Business and Technical Communication", moduleTaken: "", 
        status: "✘"}, 

      { requirement: "ST2334 Probability and Statistics", moduleTaken: "ST2334 Probability and Statistics", 
        status: "✓"}, 

      { requirement: "BT3102 Computational Methods for Business Analytics", moduleTaken: "BT3102 Computational Methods for Business Analytics", 
        status: "✓"}, 

      { requirement: "BT3103 Application Systems Development for Business Analytics", moduleTaken: "BT3103 Application Systems Development for Business Analytics", 
        status: "✓"}, 
      
      { requirement: "IS3103 Information Systems Leadership and Communication", moduleTaken: "IS3103 Information Systems Leadership and Communication", 
        status: "✓"}, 

      { requirement: "BT4103 Business Analytics Capstone Project", moduleTaken: "", 
        status: "✘"}, 

      { requirement: "6 Programme Electives", moduleTaken: "BT4221 Big Data Techniques and Technologies", 
        status: "✓"}, 

      { requirement: "", moduleTaken: "", 
        status: "✘"}, 

      { requirement: "", moduleTaken: "", 
        status: "✘"}, 
      
      { requirement: "", moduleTaken: "", 
        status: "✘"}, 
      
      { requirement: "", moduleTaken: "", 
        status: "✘"}, 
      
      { requirement: "", moduleTaken: "", 
        status: "✘"},
      
      { requirement: "IS4010 Industry Internship Programme8,or BT4101 B.Sc. Dissertation", moduleTaken: "", 
        status: "✘"},

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
  }

}
</script>
