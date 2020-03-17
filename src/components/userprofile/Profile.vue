<template>
    <div id = "profile">
        <h2> Profile </h2>

        <!-- Show basic user details -->
        <div id = "details">
            <label v-if="user.loggedIn" class="is-size-3 has-background-dark welcome" >
                <br>
                <!-- Username & Email retrieved from authorized user data -->
                <b>Username:</b> {{ user.data.displayName }}
                <br>
                <b>Email:</b> {{ user.data.email }}
                <br>
                <!-- Year of Study & Module Exemptions retrieved from acadplan collection db -->
                <b>Year of Matriculation:</b> August {{ showYear() }}
                <br>
                <b>Major:</b> {{ showMajor() }}
                <br>
                <b>Module Exemptions:</b> {{ showExemptions() }}
            </label>
        </div>

        <!-- Button for user to update profile -->
        <div id = "updateProfile">
            <button onclick="window.location.href = './updateprofile';" type="update" class="btn btn-primary">Update Profile</button>
        </div>
    </div>
</template>

<style src = "./Profile.css" scoped></style>

<script>
import { mapGetters } from "vuex";
import firebase from 'firebase';
import database from '../firebase.js';


export default {
    data() {
        return {
            year: "",
            major: "",
            exemptions: "",
        }
    },

    methods: {
        showYear: function() {
            var user = firebase.auth().currentUser;
            let userRef = database.collection('acadplan').doc(user.uid);
            userRef.get()
                .then(doc => {
                    this.year = doc.data()['year']
                })
            return this.year
        },

        showExemptions: function() {
            var user = firebase.auth().currentUser;
            let userRef = database.collection('acadplan').doc(user.uid);
            userRef.get()
                .then(doc => {
                    this.exemptions = doc.data()['acadplan_exemptions']
                })
            return this.exemptions
        },

        showMajor: function() {
            var user = firebase.auth().currentUser;
            let userRef = database.collection('acadplan').doc(user.uid);
            userRef.get()
                .then(doc => {
                    this.major = doc.data()['major']
                })
            return this.major
        },
    },

    computed: {
        // map `this.user` to `this.$store.getters.user`
        ...mapGetters({
            user: "user"
        }),
    },
};
</script>