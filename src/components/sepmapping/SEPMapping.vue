<template src="./SEPMapping.html"></template>

<style src = "./SEPMapping.css"></style>

<!-- add style for multiselect -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script>
import Multiselect from 'vue-multiselect'

export default {
    name: "App",
    display: "SEP Mappings",
    /* set properties from parent */
    props: ['allmajors', 'sepMappings'],

    /* testing multiselect */
    components: { 
        Multiselect 
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
            /* testing new dropdown */
            pus: [],
            allPus: ['Technical University of Denmark', 'Technical University of Munich', 'Georgia Institute of Technology'],

            courses: [],
            allCourses: ['Business Analytics', 'Economics'],
        }
    }
}
</script>
