<template>
    <div>
        <ul>
            <li v-for="element in allmodules" v-bind:key=element.code>
                {{ element.code }}
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

