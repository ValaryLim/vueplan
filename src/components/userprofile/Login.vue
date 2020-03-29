<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <b-modal id="error-modal" :title="modal_header" hide-footer>
              <p>{{ this.modal_body }}</p>
              <b-button id="modal-ok-btn" @click="$bvModal.hide('error-modal')">OK</b-button>
            </b-modal>
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <!-- Welcome message if user is logged in -->
            <div v-if="user.loggedIn">
              Welcome! Click on any tab above to start planning.
            </div>

            <!-- Login page if user not logged in -->
            <form action="#" @submit.prevent="submit" v-if="!user.loggedIn">

              <!-- Enter email -->
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

              <!-- Enter password -->
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

              <!-- Login button -->
              <div class="form-group row mb-0">
                  <button type="submit" class="btn btn-primary">Login</button>
              </div>

              <!-- Redirect to register page -->
              <div class="form-group row justify-content-center">
                <router-link to="/register"><a>Don't have an account? Register here.</a></router-link>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import firebase from 'firebase';

export default {
  data() {
    return {
      name: "",
      form: {
        email: "",
        password: "",
      },
      error: null,
      /* error message data */
      modal_header: "Default header",
      modal_body: "Default body",
    };
  },
  created() {
    this.showName()
  },
  methods: {
    printError: function(header, message) {
        this.modal_header = header;
        this.modal_body = message;
        this.$bvModal.show('error-modal');
    },
    showName() {
      var user = firebase.auth().currentUser;
      this.name = user.displayName;
    },
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() =>{
          this.$router.replace({ name: "Home" });
          this.printError('Welcome!', "You have logged in successfully.")
        })
        .catch(err => {
          // will alert users that typed in an invalid email
          this.error = err.message;
        });
      // clear input
      this.form.email = "";
      this.form.password = "";
      this.error = null;
    }
  },
  computed: {
    ...mapGetters({
        // map `this.user` to `this.$store.getters.user`
        user: "user"
    })
  },
};
</script>

<style scoped>
/* error message */
.modal {
    position: fixed;
    top: 20%;
}
</style>