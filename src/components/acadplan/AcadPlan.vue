/* eslint-disable vue/no-side-effects-in-computed-properties */
/* eslint-disable vue/no-side-effects-in-computed-properties */
<template>
    <div class="row">
        <div class="col-1">
            <draggable
                :list="y1s1" class="list-group" draggable=".item" group="a"
            >
                <div slot="header">
                    <h6>Y1S1</h6>
                </div>
                <div class="list-group-item item" v-for="element in sorted_y1s1" :key="element.mod">
                    <span class="text">{{ element.mod }}</span>
                    <button type="button" class="close" v-if="element.move===true" @click="delete_module(element.mod)">
                        <font-awesome-icon icon="times" />
                    </button>
                </div>
            </draggable>
        </div>
        <div class="col-1">
            <draggable
                :list="y1s2" class="list-group" draggable=".item" group="a"
            >
                <div slot="header">
                    <h6>Y1S2</h6>
                </div>
                <div class="list-group-item item" v-for="element in sorted_y1s2" :key="element.mod">
                    <span class="text">{{ element.mod }}</span>
                    <button type="button" class="close" v-if="element.move===true" @click="delete_module(element.mod)">
                        <font-awesome-icon icon="times" />
                    </button>
                </div>
            </draggable>
        </div>
        <div class="col-1">
            <draggable
                :list="y2s1" class="list-group" draggable=".item" group="a"
            >
                <div slot="header">
                    <h6>Y2S1</h6>
                </div>
                <div class="list-group-item item" v-for="element in sorted_y2s1" :key="element.mod">
                    <span class="text">{{ element.mod }}</span>
                    <button type="button" class="close" v-if="element.move===true" @click="delete_module(element.mod)">
                        <font-awesome-icon icon="times" />
                    </button>
                </div>
            </draggable>
        </div>
        <div class="col-1">
            <draggable
                :list="y2s2" class="list-group" draggable=".item" group="a"
            >
                <div slot="header">
                    <h6>Y2S2</h6>
                </div>
                <div class="list-group-item item" v-for="element in sorted_y2s2" :key="element.mod">
                    <span class="text">{{ element.mod }}</span>
                    <button type="button" class="close" v-if="element.move===true" @click="delete_module(element.mod)">
                        <font-awesome-icon icon="times" />
                    </button>
                </div>
            </draggable>
        </div>
        <div class="col-1">
            <draggable
                :list="y3s1" class="list-group" draggable=".item" group="a"
            >
                <div slot="header">
                    <h6>Y3S1</h6>
                </div>
                <div class="list-group-item item" v-for="element in sorted_y3s1" :key="element.mod">
                    <span class="text">{{ element.mod }}</span>
                    <button type="button" class="close" v-if="element.move===true" @click="delete_module(element.mod)">
                        <font-awesome-icon icon="times" />
                    </button>
                </div>
            </draggable>
        </div>
        <div class="col-1">
            <draggable
                :list="y3s2" class="list-group" draggable=".item" group="a"
            >
                <div slot="header">
                    <h6>Y3S2</h6>
                </div>
                <div class="list-group-item item" v-for="element in sorted_y3s2" :key="element.mod">
                    <span class="text">{{ element.mod }}</span>
                    <button type="button" class="close" v-if="element.move===true" @click="delete_module(element.mod)">
                        <font-awesome-icon icon="times" />
                    </button>
                </div>
            </draggable>
        </div>
        <div class="col-1">
            <draggable
                :list="y4s1" class="list-group" draggable=".item" group="a"
            >
                <div slot="header">
                    <h6>Y4S1</h6>
                </div>
                <div class="list-group-item item" v-for="element in sorted_y4s1" :key="element.mod">
                    <span class="text">{{ element.mod }}</span>
                    <button type="button" class="close" v-if="element.move===true" @click="delete_module(element.mod)">
                        <font-awesome-icon icon="times" />
                    </button>
                </div>
            </draggable>
        </div>
        <div class="col-1">
            <draggable
                :list="y4s2" class="list-group" draggable=".item" group="a"
            >
                <div slot="header">
                    <h6>Y4S2</h6>
                </div>
                <div class="list-group-item item" v-for="element in sorted_y4s2" :key="element.mod">
                    <span class="text">{{ element.mod }}</span>
                    <button type="button" class="close" v-if="element.move===true" @click="delete_module(element.mod)">
                        <font-awesome-icon icon="times" />
                    </button>
                </div>
            </draggable>
        </div>

        <div class="col-2">
            <p>Module Code: <input type="text" v-model="add_module_code"/></p>
            <button class="bth btn-secondary" @click = "add_module">
                Add
            </button>
        </div>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faAlignJustify, faCouch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTimes, faAlignJustify, faCouch)

var index = 22;

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
                { mod: "", move: false, index: 19 },
                { mod: "IS3103", move: true, index: 20 }
            ],
            y3s2: [
                { mod: "", move: false, index: 21 },
                { mod: "MKT1705X", move: true, index: 18 }
            ],
            y4s1: [{ mod: "", move: false, index: 22 },],
            y4s2: [{ mod: "", move: false, index: 23 },],
        };
    },
    computed: {
        sorted_y1s1: function() {
            return this.y1s1.sort(this.compare_module);
        },
        sorted_y1s2: function() {
            return this.y1s2.sort(this.compare_module);
        },
        sorted_y2s1: function() {
            return this.y2s1.sort(this.compare_module);
        },
        sorted_y2s2: function() {
            return this.y2s2.sort(this.compare_module);
        },
        sorted_y3s1: function() {
            return this.y3s1.sort(this.compare_module);
        },
        sorted_y3s2: function() {
            return this.y3s2.sort(this.compare_module);
        },
        sorted_y4s1: function() {
            return this.y4s1.sort(this.compare_module);
        },
        sorted_y4s2: function() {
            return this.y4s2.sort(this.compare_module);
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
        delete_module: function(module_name) {
            this.y1s1.splice(module_name, 1);
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

<style scoped>
    .row {
        margin-top: 30px;
        margin-bottom: 30px;
        margin-left: 5px;
    }

    .col-1 {
        margin: 0px;
        padding: 2px;
    }

    .list-group-item.item {
        font-size: 10px;
        text-align: center;
    }

    .close {
        font-size: 12px;
    }
    
    .list-group {
        background-color: grey;
    }
</style>