<template src="./SEPMapping.html"></template>

<style scoped src="./SEPMapping.css"></style>

<script>
import { mapGetters } from 'vuex';
import Multiselect from 'vue-multiselect';
import firebase from 'firebase';
import database from '../firebase.js';

export default {
    name: "App",
    display: "SEP Mappings",
    /* set properties from parent */
    props: ['allmajors', 'sepMappings'],

    components: { 
        Multiselect,
    },

    data() {
        return {
            allPus: [],
            pus: [],
            courses: [],
        }
    },

    methods: {
        /* set the default filter for course as student's major */
        getMajor: function() {
            var user = firebase.auth().currentUser;
            let userRef = database.collection('acadplan').doc(user.uid);
            userRef.get()
                .then(doc => {
                    this.courses = [doc.data()['major']]
                })
            return this.courses
        },

        /* retrieve all unique Pus */
        getPus: function() {
            var output = []
            var usedKeys = {}
            for (var i = 0; i < this.sepMappings.length; i++) {
                var pu = this.sepMappings[i]['pu'];
                if (!usedKeys[pu]) {
                    usedKeys[pu] = true;
                    output.push(pu);
                }
            }
            //this.pus = output;
            //this.allPus = [{ selectAll: 'SELECT ALL', all: output }];
            this.allPus = output;
        },
    },

    computed: {
        ...mapGetters({
            // map `this.user` to `this.$store.getters.user`
            user: "user"
        }),

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
    },

    // lifecycle hook
    created() {
        this.getMajor();
        this.getPus();
    },
}
</script>