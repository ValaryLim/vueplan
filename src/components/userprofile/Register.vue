<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                <div class="col-md-6">
                  <input
                    id="name"
                    type="name"
                    class="form-control"
                    name="name"
                    value
                    required
                    autofocus
                    v-model="form.name"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                <div class="col-md-6">
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
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="form.password"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                  <button type="submit" class="btn btn-primary">Register</button>
              </div>

              <br>
              <div>
                <router-link to="/login"><a>Already have an account? Login here</a></router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import database from '../firebase.js';

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
      error: null
    };
  },

  methods: {
    submit() {
      firebase
        // give access to auth services
        .auth()
        // create new user
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          // add user to acadplan database
          // set userID as the document ID
          database.collection('acadplan').doc(data.user.uid).set({
            // default fields
            year: 0,
            major: "",
            total_mc: 0,
            acadplan_exemptions: [],
            module_semester_mapping: {},
            module_location: [{mod: "", mc: 0, move: false, index: 0},
                              {mod: "", mc: 0, move: false, index: 1},
                              {mod: "", mc: 0, move: false, index: 2},
                              {mod: "", mc: 0, move: false, index: 3},
                              {mod: "", mc: 0, move: false, index: 4},
                              {mod: "", mc: 0, move: false, index: 5},
                              {mod: "", mc: 0, move: false, index: 6},
                              {mod: "", mc: 0, move: false, index: 7}]
          })
          .then(function() {
              alert("Registered successfully");
          })
          .then(data.user
            .updateProfile({
              displayName: this.form.name,
            })
            .then(() =>{
            // bring user to profile page
            this.$router.replace({ name: "Profile" });
            }
          ))
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>