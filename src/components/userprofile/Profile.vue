<template>
    <div id = "profile">
        <h2> Profile Page </h2>

        <div id = "details">
            <label v-if="user.loggedIn" class="is-size-3 has-background-dark welcome">
                <br>
                <b>Username:</b> {{ user.data.displayName }}
                <br>
                <b>Email:</b> {{ user.data.email }}
                <br>
                <b>Year of Study:</b> {{ user.data.year }}
                <br>
                <b>Module Exemptions:</b> {{ user.data.exemptions }}
            </label>
        </div>

        <div id = "updateProfile">
            <button onclick="window.location.href = './updateprofile';" type="update" class="btn btn-primary">Update Profile</button>
        </div>
    </div>
</template>

<style src = "./Profile.css"></style>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        // map `this.user` to `this.$store.getters.user`
        ...mapGetters({
            user: "user"
        })
    }
};
</script>

