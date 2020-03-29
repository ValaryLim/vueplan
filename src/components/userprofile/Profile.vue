<template>
    <div class="row justify-content-center" id="profile">
        <h2> Profile </h2>

        <!-- Show basic user details -->
        <div class = "row" v-if="user.loggedIn">
            <label for="name" class="col-md-6 text-md-right"><b>Username: </b></label>
            <div class="col-md-6 text-md-left"> {{ user.data.displayName }} </div>

            <label for="email" class="col-md-6 text-md-right"><b>Email: </b></label>
            <div class="col-md-6 text-md-left"> {{ user.data.email }} </div>

            <label for="year" class="col-md-6 text-md-right"><b>Year of Matriculation: </b></label>
            <div class="col-md-6 text-md-left"> August {{ year }} </div>

            <label for="major" class="col-md-6 text-md-right"><b>Major: </b></label>
            <div class="col-md-6 text-md-left"> {{ major }} </div>

            <label for="exemptions" class="col-md-6 text-md-right"><b>Module Exemptions: </b></label>
            <div class="col-md-6 text-md-left"> {{ exemptions }} </div>
        </div>

        <!-- Button for user to update profile -->
        <div id = "updateProfile" class="col-md-6">
            <button onclick="window.location.href = './updateprofile';" type="update" class="btn btn-primary">Update Profile</button>
        </div>
    </div>
</template>

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
        fetch_details: function() {
            var user = firebase.auth().currentUser;
            let userRef = database.collection('acadplan').doc(user.uid);
            userRef.get()
                .then(doc => {
                    this.year = doc.data()['year'];
                    this.exemptions = doc.data()['acadplan_exemptions'];
                    this.major = doc.data()['major'];
                })
        },
    },

    created() {
        this.fetch_details()
    },

    computed: {
        // map `this.user` to `this.$store.getters.user`
        ...mapGetters({
            user: "user"
        }),
    },
};
</script>