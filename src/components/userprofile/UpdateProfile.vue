<template src = "./UpdateProfile.html"> </template>
<style scoped src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script>
import Multiselect from 'vue-multiselect';

import { mapGetters } from 'vuex';

import firebase from 'firebase';
import database from '../firebase.js'

export default {
    data() {
        return {
            form: {
                name: "",
                email: "",
                year: "",
                major: "",
                exemptions: "",

            },
            error: null
        };
    },
    
    props: ['allmodules', 'allmajors'],

    components: { 
        Multiselect,
    },
    
    methods: {
        save() {
            var user = firebase.auth().currentUser;

            if (!this.form.name == "") {
                user.updateProfile({
                    displayName: this.form.name,
                })
            }

            if (!this.form.year == 0) {
                database.collection('acadplan').doc(user.uid).update({
                    "year": this.form.year,
                })
            }

            if (!this.form.major == "") {
                database.collection('acadplan').doc(user.uid).update({
                    "major": this.form.major,
                })
            }

            if (!this.form.exemptions == "") {
                database.collection('acadplan').doc(user.uid).update({
                    "acadplan_exemptions": this.form.exemptions,
                })
            }

            alert("Update successful")
            this.$router.replace({ name: 'Profile' })
        },
    },

    computed: {
        // map `this.user` to `this.$store.getters.user`
        ...mapGetters({
            user: "user"
        })
    }
};
</script>

<style scoped>
h2 {
    text-align: center;
}
</style>