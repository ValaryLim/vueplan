<template>
    <div id = "profile">
        <h2> Update Profile </h2>

        <form action="#" @submit.prevent="save">
            <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                <div class="col-md-6">{{ user.data.displayName }}</div>
                <!--<div class="col-md-6">
                    <input
                        id="name"
                        type="name"
                        class="form-control"
                        name="name"
                        placeholder= "hi"
                        value
                        autofocus
                        v-model="form.name"
                    />
                </div> -->
            </div>

            <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>
                <div class = "col-md-6">{{ user.data.email }}</div>

                <!--<div class="col-md-6">
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
                        placeholder="Module Exemptions e.g. CS1101 from Poly"
                        value
                        autofocus
                        v-model="form.exemptions"
                    />
                </div>
            </div>
            
            <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                    <button type="save" class="btn btn-primary">Save</button>
                </div>
            </div>
        </form>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex';

import firebase from 'firebase';

export default {
    data() {
        return {
            form: {
                //uid: firebase.auth().currentUser.getToken(),
                //name: "",
                //email: "",
                //photoUrl: "",
                year: "",
                exemptions: "",

            },
            error: null
        };
    },
    
    methods: {
        save() {
            firebase
            .analytics()
            .setUserProperties({
                year: this.form.year,
                exemptions: this.form.exemptions,
            }).then(function() {
                this.$router.replace({ name: "Profile" })
                // Update successful.
            }).catch(function(error) {
                this.error = error;
                // An error happened.
            });

            //database
            //.collections('users')
            //.add(this.user);
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