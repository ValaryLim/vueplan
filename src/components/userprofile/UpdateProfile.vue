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
                exemptions: [],

            },
            test: [],
            error: null
        };
    },
    
    props: ['allmodules'],

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

            if (!this.form.year == "") {
                database.collection('acadplan').doc(user.uid).update({
                    "year": this.form.year,
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