<template>
  <div id="app">
    <app-navbar></app-navbar>
    <div class="row">
      <div class="col-md-12">
        <router-view></router-view>
      </div>
    </div>
    <SEPMapping :allmajors="allmajors"></SEPMapping>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    appNavbar: Navbar,
  },

  data() {
    return {
      allmajors: {"Business Analytics": [{modCode: "BT1101", modTitle: "BT1101 Introduction to Business Analytics", modType: "core"},
                                          {modCode: "CS1010S", modTitle: "CS1010S Programming Methodology", modType: "core"},
                                          {modCode: "EC1301", modTitle: "EC1301 Principles of Economics", modType: "core"},
                                          {modCode: "IS1103", modTitle: "IS1103 Innovations in Organisations and Society", modType: "core"},
                                          {modCode: "MA1101R", modTitle: "MA1101R Linear Algebra I", modType: "core"},
                                          {modCode: "MA1521", modTitle: "MA1521 Calculus for Computing", modType: "core"},
                                          {modCode: "MKT1705X", modTitle: "MKT1705X Principles of Marketing", modType: "core"},
                                          {modCode: "BT2101", modTitle: "BT2101 Decision Making Methods and Tools", modType: "core"},
                                          {modCode: "BT2102", modTitle: "BT2102 Data Management and Visualisation", modType: "core"},
                                          {modCode: "CS2030", modTitle: "CS2030 Programming Methodology I", modType: "core"},
                                          {modCode: "CS2040", modTitle: "CS2040 Data Structures and Algorithms", modType: "core"},
                                          {modCode: "IS2101", modTitle: "IS2101 Business and Technical Communication", modType: "core"},
                                          {modCode: "ST2334", modTitle: "ST2334 Probability and Statistics", modType: "core"},
                                          {modCode: "BT3102", modTitle: "BT3102 Computational Methods for Business Analytics", modType: "core"},
                                          {modCode: "BT3103", modTitle: "BT3103 Application Systems Development for Business Analytics", modType: "core"},
                                          {modCode: "IS3103", modTitle: "IS3103 IS Leadership and Communication", modType: "core"},
                                          {modCode: "BT4103", modTitle: "BT4103 Business Analytics Capstone Project", modType: "core"},
                                          {modCode: "DBA3712", modTitle: "DBA3712 Dynamic Pricing and Revenue Management", modType: "elective"},
                                          {modCode: "IE3120", modTitle: "IE3120 Manufacturing Logistics", modType: "elective"},
                                          {modCode: "IS3240", modTitle: "IS3240 Digital Platform Strategy and Architecture", modType: "elective"},
                                          {modCode: "BT4013", modTitle: "BT4013 Analytics for Capital Market Trading and Investment", modType: "elective"},
                                          {modCode: "BT4016", modTitle: "BT4016 Risk Analytics for Financial Services", modType: "elective"},
                                          {modCode: "BT4211", modTitle: "BT4211 Data-Driven Marketing", modType: "elective"},
                                          {modCode: "BT4212", modTitle: "BT4212 Search-Engine Optimization and Analytics", modType: "elective"},
                                          {modCode: "DBA4811", modTitle: "DBA4811 Analytical Tools for Consulting", modType: "elective"},
                                          {modCode: "IS4241", modTitle: "IS4241 Social Media Network Analysis", modType: "elective"},
                                          {modCode: "IS4250", modTitle: "IS4250 Healthcare IT and Analytics", modType: "elective"},
                                          {modCode: "MKT4418", modTitle: "MKT4418 Marketing Analytics", modType: "elective"},
                                          {modCode: "IE2110", modTitle: "IE2110 Operations Research I", modType: "elective"},
                                          {modCode: "CS3244", modTitle: "CS3244 Machine Learning", modType: "elective"},
                                          {modCode: "DBA3803", modTitle: "DBA3803 Predictive Analytics in Business", modType: "elective"},
                                          {modCode: "BSE4711", modTitle: "BSE4711 Econometrics for Business II", modType: "elective"},
                                          {modCode: "BT4012", modTitle: "BT4012 Fraud Analytics", modType: "elective"},
                                          {modCode: "BT4015", modTitle: "BT4015 Geospatial Analytics", modType: "elective"},
                                          {modCode: "BT4221", modTitle: "BT4221 Big Data Techniques and Technologies", modType: "elective"},
                                          {modCode: "BT4222", modTitle: "BT4222 Mining Web Data for Business Insights", modType: "elective"},
                                          {modCode: "BT4240", modTitle: "BT4240 Machine Learning for Predictive Data Analytics", modType: "elective"},
                                          {modCode: "IS4241", modTitle: "IS4241 Social Media Network Analytics", modType: "elective"},
                                          {modCode: "IE4210", modTitle: "IE4210 Operations Research II", modType: "elective"},
                                          {modCode: "ST3131", modTitle: "ST3131 Regression Analysis", modType: "elective"},
                                          {modCode: "ST4245", modTitle: "ST4245 Statistical Methods for Finance", modType: "elective"},
                                          {modCode: "IS3221", modTitle: "IS3221 ERP Systems with Analytics Solutions", modType: "elective"},
                                          {modCode: "IS3261", modTitle: "IS3261 Mobile Solutions Design and Development", modType: "elective"},
                                          {modCode: "BT4014", modTitle: "BT4014 Analytics Driven Design of Adaptive Systems", modType: "elective"},
                                          {modCode: "IS4228", modTitle: "IS4228 Information Technologies in Financial Services", modType: "elective"},
                                          {modCode: "IS4302", modTitle: "IS4302 Blockchain and Distributed Ledger Technologies", modType: "elective"},
                                          {modCode: "IS4010", modTitle: "IS4010 Industry Internship Programme", modType: "core"}
                                         ],
                  "Economics": [{modCode: "EC2101", modTitle: "Microeconomic Analysis I", modType: "core"},
                                {modCode: "EC3101", modTitle: "Microeconomic Analysis II", modType: "core"},
                                {modCode: "EC3312", modTitle: "Game Theory and Applications for Economics", modType: "elective"}]
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>