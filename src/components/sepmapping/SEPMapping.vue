<template src="./SEPMapping.html"></template>

<style scoped src="./SEPMapping.css"></style>

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
                        output.push(arr[i][key])
                    }
                }
                return output
            }
        },
    },

    data() {
        return {
            pus: [],
            courses: [],
            allCourses: ['Business Analytics', 'Computer Science', 'Information Systems', 'Information Security', 'Economics'],
        }
    }
}
</script>
