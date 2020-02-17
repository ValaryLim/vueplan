/* eslint-disable vue/no-side-effects-in-computed-properties */
<template src="./acadplan.html"></template>

<style src="./acadplan.css"></style>

<script>
import draggable from "vuedraggable";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faAlignJustify } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTimes, faAlignJustify)

var index = 23;

export default {
    name: "App",
    display: "Academic Planner",
    order: 14,
    components: {
        draggable,
        FontAwesomeIcon
    },
    data() {
        return {
            add_module_code: "",
            y1s1: [
                { mod: "", move: false, index: 0 },
                { mod: "BT1101", move: true, index: 1 },
                { mod: "CS1010S", move: true, index: 2 },
                { mod: "MA1521", move: true, index: 3 },
                { mod: "IS1103", move: true, index: 4 }
            ], 
            y1s2: [
                { mod: "", move: false, index: 5 },
                { mod: "BT2101", move: true, index: 6 },
                { mod: "CS2030", move: true, index: 7 },
                { mod: "MA1101R", move: true, index: 8 },
                { mod: "EC1301", move: true, index: 9 }
            ],
            y2s1: [
                { mod: "", move: false, index: 10 }, 
                { mod: "BT2102", move: true, index: 11 }, 
                { mod: "CS2040", move: true, index: 12 },
                { mod: "ST2334", move: true, index: 13 }
            ], 
            y2s2: [
                { mod: "", move: false, index: 14 }, 
                { mod: "BT3102", move: true, index: 15 }, 
                { mod: "BT3103", move: true, index: 16 },
            ],
            y3s1: [
                { mod: "", move: false, index: 17 },
                { mod: "IS3103", move: true, index: 18 }
            ],
            y3s2: [
                { mod: "", move: false, index: 19 },
                { mod: "MKT1705X", move: true, index: 20 }
            ],
            y4s1: [{ mod: "", move: false, index: 21 },],
            y4s2: [{ mod: "", move: false, index: 22 },],
        };
    },
    computed: {
        sorted_y1s1: function() {
            this.sort_modules(this.y1s1);
            return this.y1s1;
        },
        sorted_y1s2: function() {
            this.sort_modules(this.y1s2);
            return this.y1s2;
        },
        sorted_y2s1: function() {
            this.sort_modules(this.y2s1);
            return this.y2s1;
        },
        sorted_y2s2: function() {
            this.sort_modules(this.y2s2);
            return this.y2s2;
        },
        sorted_y3s1: function() {
            this.sort_modules(this.y3s1);
            return this.y3s1;
        },
        sorted_y3s2: function() {
            this.sort_modules(this.y3s2);
            return this.y3s2;
        },
        sorted_y4s1: function() {
            this.sort_modules(this.y4s1);
            return this.y4s1;
        },
        sorted_y4s2: function() {
            this.sort_modules(this.y4s2);
            return this.y4s2;
        },
    },
    methods: {
        add_module: function() {
            // remove whitespace in module name
            var module_name = this.add_module_code.trim();
            if (module_name != "") {
                this.y1s1.push({ mod: module_name, move: true, index: index });
                index++;
            }
        },
        delete_module: function(data_name, index) {
            if (data_name === "y1s1") {
                this.y1s1 = this.y1s1.filter((event) => event.index !== index);
            } else if (data_name === "y1s2") {
                this.y1s2 = this.y1s2.filter((event) => event.index !== index);
            } else if (data_name === "y2s1") {
                this.y2s1 = this.y2s1.filter((event) => event.index !== index);
            } else if (data_name === "y2s2") {
                this.y2s2 = this.y2s2.filter((event) => event.index !== index);
            } else if (data_name === "y3s1") {
                this.y3s1 = this.y3s1.filter((event) => event.index !== index);
            } else if (data_name === "y3s2") {
                this.y3s2 = this.y3s2.filter((event) => event.index !== index);
            } else if (data_name === "y4s1") {
                this.y4s1 = this.y4s1.filter((event) => event.index !== index);
            } else if (data_name === "y4s2") {
                this.y4s2 = this.y4s2.filter((event) => event.index !== index);
            } 
        }, 
        sort_modules: function(data) {
            data.sort(this.compare_module);
        },
        compare_module: function(a, b) {
            if (a.move === false) { 
                return 1;
            } else if (b.move === false) {
                return -1;
            } else if (a.mod < b.mod) {
                return -1;
            } else if (a.mod > b.mod) {
                return 1;
            }
            return 0;
        }
    },
}
</script>