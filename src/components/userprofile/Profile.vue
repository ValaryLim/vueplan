<template>
    <div id = "profile">
        <h2> Profile Page </h2>

        <div id = "details">
            <label v-if="user.loggedIn" class="is-size-3 has-background-dark welcome">
                <br>
                {{ user.photoURL }}
                <br>
                <b>Username:</b> {{ user.displayName }}
                <br>
                <b>Email:</b> {{ user.data.email }}
                <br>
                <b>Year of Study:</b>
                <br>
                <b>Module Exemptions:</b>
            </label>
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

