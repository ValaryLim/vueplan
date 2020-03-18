<template src = "./UpdateProfile.html"> </template>

<script>
import Multiselect from 'vue-multiselect';

import { mapGetters } from 'vuex';

import firebase from 'firebase';
import database from '../firebase.js'

export default {
    data() {
        return {
            /* form */
            form: {
                name: "",
                email: "",
                year: "",
                major: "",
                exemptions: "",
            },
            /* store past data to check for change */
            store: {
                year: "",
                major: "",
                module_semester_mapping: {}
            },
            /* error message */
            error: null,
            /* dashboard data */
            statistics: {}
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
                    // populate form
                    this.form.name = user.displayName;
                    this.form.year = doc.data()['year'];
                    this.form.exemptions = doc.data()['acadplan_exemptions'];
                    this.form.major = doc.data()['major'];

                    // populate store
                    this.store.year = doc.data()['year'];
                    this.store.major = doc.data()['major'];
                    this.store.module_semester_mapping = doc.data()['module_semester_mapping'];
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

                if (this.form.year !== this.store.year || this.form.major !== this.store.major) {
                    // update dashboard
                    this.update_dashboard(this.store.year, this.form.year, this.store.major, this.form.major);
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

                alert("Update successful");
                this.$router.replace({ name: 'Profile' })
            }
        },

        fetch_dashboard: function(module_code) {
            /** 
             * Accepts a module code and retrieves its dashboard data
             */
            let moduleRef = database.collection('dashboard').doc(module_code);

            // need to check if module_Code in dashboard, else create the doc.
            return moduleRef.get().then(doc => {
                if (doc.exists) {
                    return doc.data()['statistics'];
                } else {
                    var default_settings = {
                        statistics: {}
                    }
                    database.collection('dashboard').doc(module_code).set(default_settings);
                    return default_settings;
                }
            })
        },
        calculateYear: function(semester_taking) {
            /**
             * Calculates what year the student will be in in that academic year
             */
            return Math.floor(semester_taking / 2);
        },
        calculateAcademicYear: function(matriculation_year, semester_taking) {
            /**
             * Calculates the academic year 
             */
            var academic_year = (matriculation_year + Math.floor(semester_taking / 2)) % 2000;
            var academic_sem = Math.abs(semester_taking % 2 - 1);
            return String(academic_year) + String(academic_year + 1) + "-S" + String(academic_sem);
        },

        update_dashboard: function(previous_year, new_year, previous_major, new_major) {
            /**
             * Updates dashboard data when there are changes to user profile for major or year.
             */
            // for each module
            for (var mod in this.store.module_semester_mapping) {
                // fetch module data into statistics
                this.fetch_dashboard(mod).then(doc => {
                    this.statistics = doc;
                });

                // get information required
                var semester_taking = this.store.module_semester_mapping[mod];

                // update data
                setTimeout(() => this.update_dashboard_module(mod, semester_taking, previous_year, new_year, previous_major, new_major), 1000);
            }
        },

        update_dashboard_module: function(module, semester_taking, previous_year, new_year, previous_major, new_major) {
            /** 
             * Updates the dashboard details of a specific module
             */
            // calculate the previous and new academic years
            var previous_ay = this.calculateAcademicYear(previous_year, semester_taking);
            var new_ay = this.calculateAcademicYear(new_year, semester_taking);

            // calculate year module is read in
            var year = this.calculateYear(semester_taking);

            // update statistics
            // 1. update total in previous_ay and new_ay
            this.statistics[previous_ay]["total"] -= 1;
            this.statistics[new_ay]["total"] += 1;

            // 2. update previous_ay year and new_ay year
            this.statistics[previous_ay]["year"][year] -= 1;
            this.statistics[new_ay]["year"][year] += 1;

            // 3. update previous_major and new_major
            this.statistics[previous_ay]["major"][previous_major] -= 1;
            this.statistics[new_ay]["major"][new_major] += 1;

            // update firebase
            database.collection('dashboard').doc(module).update({
                "statistics": this.statistics,
            })
        }
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