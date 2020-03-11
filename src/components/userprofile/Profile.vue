<template>
    <div id = "profile">
        <h2> Profile Page </h2>

        <div id = "details">
            <label v-if="$auth.isAuthenticated" class="is-size-3 has-background-dark welcome">
                <br>
                <!-- PROFILE PIC -->
                <br>
                <b>Username:</b> {{ $auth.user.nickname }}
                <br>
                <b>Email:</b> {{ $auth.user.email }}
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

export default {
    data() {
        return {

        }
    }
}
</script>

