<template>
    <div id = "profile">
        <h2> Update Profile </h2>

        <form action="#" @submit.prevent="save">
            <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                <div class="col-md-6">
                    <input
                        id="name"
                        type="name"
                        class="form-control"
                        name="name"
                        placeholder= "Enter your username"
                        value
                        autofocus
                        v-model="form.name"
                    />
                </div>
            </div>

            <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>
                <div class = "col-md-6 text-md-left">{{ user.data.email }}</div>

                <!-- <div class="col-md-6">
                    <input
                        id="email"
                        type="email"
                        class="form-control"
                        name="email"
                        value
                        required
                        autofocus
                        v-model="form.email"
                    />
                </div> -->
            </div>

            <div class="form-group row">
                <label for="year" class="col-md-4 col-form-label text-md-right">Year of Study</label>

                <div class="col-md-6">
                    <input
                        id="year"
                        type="year"
                        class="form-control"
                        name="year"
                        placeholder="Y1S1/Y1S2/Y2S1 etc."
                        value
                        autofocus
                        v-model="form.year"
                    />
                </div>
            </div>

            <div class="form-group row">
                <label for="year" class="col-md-4 col-form-label text-md-right">Module Exemptions</label>

                <div class="col-md-6">
                    <input
                        id="exemptions"
                        type="exemptions"
                        class="form-control"
                        name="exemptions"
                        placeholder="e.g. CS1101"
                        value
                        autofocus
                        v-model="form.exemptions"
                    />
                </div>
            </div>
            
            <div class="form-group row mb-0">
                    <button type="save" class="btn btn-primary">Save</button>
            </div>
        </form>
    </div>
    
</template>

<script>
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
                exemptions: "",

            },
            error: null
        };
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
        }
    },

    computed: {
        // map `this.user` to `this.$store.getters.user`
        ...mapGetters({
            user: "user"
        })
    }
};
</script>