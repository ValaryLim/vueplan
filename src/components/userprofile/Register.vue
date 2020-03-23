<template src='./Register.html'> </template>

<script>
import Multiselect from 'vue-multiselect';
import firebase from 'firebase';
import database from '../firebase.js';

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        year: 2020,
        major: "Business Analytics",
        exemptions: ["ES1000"],
      },
      error: null,
    };
  },
  
  props: ['allmodules', 'allmajors'],

  components: {
    Multiselect
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
            year: this.form.year,
            major: this.form.major,
            total_mc: 0,
            acadplan_exemptions: this.form.exemptions,
            module_semester_mapping: {},
            module_location: {0: [{mod: "", mc: 0, move: false, index: 0}],
                              1: [{mod: "", mc: 0, move: false, index: 1}],
                              2: [{mod: "", mc: 0, move: false, index: 2}],
                              3: [{mod: "", mc: 0, move: false, index: 3}],
                              4: [{mod: "", mc: 0, move: false, index: 4}],
                              5: [{mod: "", mc: 0, move: false, index: 5}],
                              6: [{mod: "", mc: 0, move: false, index: 6}],
                              7: [{mod: "", mc: 0, move: false, index: 7}]},
            
            num_semester_mapping: ["Y1S1",  "Y1S2", "Y2S1", "Y2S2",  "Y3S1",  "Y3S2", "Y4S1",  "Y4S2"],
            index: 8,
          })
          .then(data.user
            .updateProfile({
              displayName: this.form.name,
            })
            .then(() =>{
              this.$bvModal.msgBoxOk("Successfully Registered")
              .then(() => {
                  this.$router.replace({ name: 'Home' })
              });
            }
          ))
        })
        .catch(err => {
          // will disallow users from registering with the same email
          this.error = err.message;
        });
    }
  }
};
</script>

<style scoped>
/* error message */
.modal {
    position: fixed;
    top: 20%;
}
</style>