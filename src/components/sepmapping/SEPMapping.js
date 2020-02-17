Vue.component('selection', {
  /* dropdown lists consists of pu.name for pu in pus */
  template: "<select v-model='pu'><option v-for='pu in pus' v-bind:value='pu'>{{pu.name}}<option></select>",
  data: function() {
    return {
      pus: [
        { name: "Technical University of Denmark", modules: [
          { nusModuleCode: "BT3102", nusModuleTitle: "Computational Methods for Business Analytics", mcs: 4.0, puModuleCode: 2610, puModuleTitle: "Optimisation and Data Fitting", puMcs: 5.0 }, 
          { nusModuleCode: "BT4015", nusModuleTitle: "Geospatial Analytics", mcs: 4.0, puModuleCode: "MGMENGIN42184", puModuleTitle: "Data Science and GIS for Mobility", puMcs: 5.0 }, 
          { nusModuleCode: "BT4016", nusModuleTitle: "Risk Analytics for Financial Services", mcs: 4.0, puModuleCode: "42123", puModuleTitle: "Optimisation in Finance", puMcs: 5.0 } ]}, 
        { name: "Technical University of Munich", modules:[
          { nusModuleCode: "BT4221", nusModuleTitle: "Big Data Techniques and Technologies", mcs: 4.0, puModuleCode: "IN2323", puModuleTitle: "Mining Massive Datasets", puMcs: 5.0 }, 
          { nusModuleCode: "IS4250", nusModuleTitle: "Healthcare IT and Analytics", mcs: 4.0, puModuleCode: "IN9048", puModuleTitle: "Innovation Generation in the Healthcare Domain", puMcs: 6.0 }, 
          { nusModuleCode: "MKT1705X", nusModuleTitle: "Marketing", mcs: 4.0, puModuleCode: "WI000688", puModuleTitle: "Marketing", puMcs: 4.0 } ]}
      ],
      /* Initialise pu to null i.e. not selected by user */
      pu: null
    }
  },
  watch: {
  	pu: function() {
      /* assign selected option to pu */
    	this.$emit('input', this.pu);
    }
  },
  props: ['value']
});

new Vue({
  el: "#app",
  data: {
  	pu: null
  }
});