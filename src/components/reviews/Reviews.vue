<template>
    <div>
        <ul>
            <li v-for="(item, key) in allmodules" v-bind:key=item>
                {{ item }} - {{ key }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "App",
    display: "Reviews",
    props: ['allmodules']
}
</script>

