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
            modal_header: "Default header",
            modal_body: "Default body",
            /* dashboard data */
            statistics: {}
        };
    },
    
    props: ['allmodules', 'allmajors'],

    components: { 
        Multiselect,
    },
    
    methods: {
        printError: function(header, message) {
            this.modal_header = header;
            this.modal_body = message;
            this.$bvModal.show('error-modal');
        },

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
                this.printError("Invalid Input", "Username cannot be empty.")
                
            } else {
                user.updateProfile({
                    displayName: this.form.name,
                })

                if (this.form.major !== this.store.major) {
                    // update dashboard
                    //console.log(this, "this")
                    this.update_dashboard(this.store.major, this.form.major);
                }

                // if (!this.form.year == 0) {
                //     database.collection('acadplan').doc(user.uid).update({
                //         "year": this.form.year,
                //     })
                // }

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
                this.$bvModal.msgBoxOk("Update Successful")
                .then(() => {
                    this.$router.replace({ name: 'Profile' })
                });
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

        calculateAcademicYear: function(matriculation_year, semester_taking) {
            /**
             * Calculates the academic year 
             */
            var academic_year = (matriculation_year + Math.floor(semester_taking / 2)) % 2000;
            var academic_sem;
            if (semester_taking % 2) {
                academic_sem = 2;
            } else {
                academic_sem = 1;
            }
            return String(academic_year) + String(academic_year + 1) + "-S" + String(academic_sem);
        },

        update_dashboard: function(previous_major, new_major) {
            /**
             * Updates dashboard data when there are changes to user profile for major or year.
             */
            // for each module
            for (var mod in this.store.module_semester_mapping) {
                this.performSetTimeout(mod, previous_major, new_major);
            }
        },

        performSetTimeout: function(mod, previous_major, new_major) {
            // get information required
            var semester_taking = this.store.module_semester_mapping[mod];

            // fetch module data into statistics
            this.fetch_dashboard(mod).then(doc => {
                this.statistics = doc;
            }).then(() => { 
                this.update_dashboard_module(mod, semester_taking, previous_major, new_major)
            });
        },

        update_dashboard_module: function(module, semester_taking, previous_major, new_major) {
            /** 
             * Updates the dashboard details of a specific module
             */
            // calculate the previous and new academic years
            var ay = this.calculateAcademicYear(this.store.year, semester_taking);

            if (!(new_major in this.statistics[ay]["major"])) {
                this.statistics[ay]["major"][new_major] = 0;
            }

            // update statistics
            // 3. update previous_major and new_major
            this.statistics[ay]["major"][previous_major] -= 1;
            this.statistics[ay]["major"][new_major] += 1;

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

.save-button {
    width: 65%;
}

/* error message */
.modal {
    position: fixed;
    top: 20%;
}
</style>