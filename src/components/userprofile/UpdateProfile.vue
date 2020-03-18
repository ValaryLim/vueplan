<template src = "./UpdateProfile.html"> </template>

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
        load_details() {
            var user = firebase.auth().currentUser;
            let userRef = database.collection('acadplan').doc(user.uid);
            userRef.get()
                .then(doc => {
                    this.form.name = user.displayName;
                    this.form.year = doc.data()['year'];
                    this.form.exemptions = doc.data()['acadplan_exemptions'];
                    this.form.major = doc.data()['major'];
                })
        },

        save() {
            var user = firebase.auth().currentUser;

            if (this.form.name == "") {
                alert("Username cannot be empty")
                
            } else {
                user.updateProfile({
                    displayName: this.form.name,
                })
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
            }
        },
    },

    created() {
        // load current values into input boxes
        this.load_details()
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