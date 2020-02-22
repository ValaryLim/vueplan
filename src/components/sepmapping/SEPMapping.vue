<template src="./SEPMapping.html"></template>

<style src = "./SEPMapping.css"></style>

<script>
import vueMultiSelect from 'vue-multi-select';
import 'vue-multi-select/dist/lib/vue-multi-select.css';

export default {
    name: "App",
    display: "SEP Mappings",
    /* set properties from parent */
    props: ['allmajors'],

    components: {
        vueMultiSelect
    },

    computed: {
        /* relevant function that computes relevant modules based on filters */
        relevant() {
            return function(arr, code) {
                var output = []
                for (var j = 0; j < this.courses.length; j++) {
                    var relevantModules = arr[this.courses[j]];
                    for (var i = 0; i < relevantModules.length; i++) {
                        output.push(relevantModules[i].modCode)
                    }
                }
                return output.includes(code);
            }
        },

        /* unique function that returns unique pus */
        unique () {
            return function (arr, key) {
                var output = []
                var usedKeys = {}
                for (var i = 0; i < arr.length; i++) {
                    if (!usedKeys[arr[i][key]]) {
                        usedKeys[arr[i][key]] = true
                        output.push(arr[i])
                    }
                }
                return output
            }
        },
    },

    data() {
        return {
            /* default values for dropdown filters */
            courses: ['Business Analytics', 'Economics'],
            pus: ['Technical University of Denmark', 'Technical University of Munich', 'Georgia Institute of Technology'],

            /* sep module mapping data */
            modules: [  

            { pu: "Technical University of Denmark",
                nusModuleCode: "BT3102", nusModuleTitle: "Computational Methods for Business Analytics", mcs: 4.0, 
                puModuleCode: 2610, puModuleTitle: "Optimisation and Data Fitting", puMcs: 5.0 }, 

            { pu: "Technical University of Denmark",
                nusModuleCode: "BT4015", nusModuleTitle: "Geospatial Analytics", mcs: 4.0, 
                puModuleCode: "MGMENGIN42184", puModuleTitle: "Data Science and GIS for Mobility", puMcs: 5.0 }, 

            { pu: "Technical University of Denmark",
                nusModuleCode: "BT4016", nusModuleTitle: "Risk Analytics for Financial Services", mcs: 4.0, 
                puModuleCode: "42123", puModuleTitle: "Optimisation in Finance", puMcs: 5.0 },

            { pu: "Technical University of Denmark",
                nusModuleCode: "EC2101", nusModuleTitle: "Microeconomic Analysis I", mcs: 4.0, 
                puModuleCode: "1451", puModuleTitle: "Basic Microeconomics", puMcs: 4.0 },
            
            { pu: "Technical University of Denmark",
                nusModuleCode: "EC3101", nusModuleTitle: "Microeconomic Analysis II", mcs: 4.0, 
                puModuleCode: "1452", puModuleTitle: "Advanced Microeconomics", puMcs: 4.0 },

            { pu: "Technical University of Munich",
                nusModuleCode: "BT4221", nusModuleTitle: "Big Data Techniques and Technologies", mcs: 4.0, 
                puModuleCode: "IN2323", puModuleTitle: "Mining Massive Datasets", puMcs: 5.0 }, 

            { pu: "Technical University of Munich",
                nusModuleCode: "IS4250", nusModuleTitle: "Healthcare IT and Analytics", mcs: 4.0, 
                puModuleCode: "IN9048", puModuleTitle: "Innovation Generation in the Healthcare Domain", puMcs: 6.0 }, 

            { pu: "Technical University of Munich",
                nusModuleCode: "MKT1705X", nusModuleTitle: "Marketing", mcs: 4.0, 
                puModuleCode: "WI000688", puModuleTitle: "Marketing", puMcs: 4.0 },

            { pu: "Technical University of Munich",
                nusModuleCode: "EC1301", nusModuleTitle: "Principles of Economics", mcs: 4.0, 
                puModuleCode: "EC2100", puModuleTitle: "Economics for Engineers", puMcs: 4.0 },

            { pu: "Georgia Institute of Technology",
            nusModuleCode: "MKT1705X", nusModuleTitle: "Principles of Marketing", mcs:4.0,
            puModuleCode: "MGT3300", puModuleTitle: "Marketing Management", puMcs: 3.0 },

            { pu: "Georgia Institute of Technology",
            nusModuleCode: "BT4016", nusModuleTitle: "Risk Analytics for Financial Services", mcs:4.0,
            puModuleCode: "MGT3079", puModuleTitle: "Management of Financial Institutions", puMcs: 3.0 },

            { pu: "Georgia Institute of Technology",
            nusModuleCode: "BT4221", nusModuleTitle: "Big Data Techniques and Technologies", mcs:4.0,
            puModuleCode: "MGT4050", puModuleTitle: "Business Analytics", puMcs: 3.0 },

            { pu: "Georgia Institute of Technology",
            nusModuleCode: "BT4222", nusModuleTitle: "Mining Web Data for Business Insights", mcs:4.0,
            puModuleCode: "MGT4803", puModuleTitle: "Social and Digital Analytics", puMcs: 3.0 },

            { pu: "Georgia Institute of Technology",
            nusModuleCode: "EC3312", nusModuleTitle: "Game Theory and Applications to Economics", mcs:4.0,
            puModuleCode: "ECON4180", puModuleTitle: "Game Theory for Economics", puMcs: 3.0 },
            ]
        }
    }
}
</script>
