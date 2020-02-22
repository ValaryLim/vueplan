<template src="./acadplan.html"></template>

<style src="./acadplan.css"></style>

<script>
import draggable from "vuedraggable";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faAlignJustify } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTimes, faAlignJustify)
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
            invalid_module: 0,
            inserted_module: 1,
            acad_plan: {
                y1s1: [
                    { mod: "", mc: 0, move: false, index: 0 },
                    { mod: "BT1101", mc: 4, move: true, index: 1 },
                    { mod: "CS1010S", mc: 4, move: true, index: 2 },
                    { mod: "MA1521", mc: 4, move: true, index: 3 },
                    { mod: "IS1103", mc: 4, move: true, index: 4 }
                ], 
                y1s2: [
                    { mod: "", mc: 0, move: false, index: 5 },
                    { mod: "BT2101", mc: 4, move: true, index: 6 },
                    { mod: "CS2030", mc: 4, move: true, index: 7 },
                    { mod: "MA1101R", mc: 4, move: true, index: 8 },
                    { mod: "EC1301", mc: 4, move: true, index: 9 }
                ],
                y2s1: [
                    { mod: "", mc: 0, move: false, index: 10 }, 
                    { mod: "BT2102", mc: 4, move: true, index: 11 }, 
                    { mod: "CS2040", mc: 4, move: true, index: 12 },
                    { mod: "ST2334", mc: 4, move: true, index: 13 }
                ], 
                y2s2: [
                    { mod: "", mc: 0, move: false, index: 14 }, 
                    { mod: "BT3102", mc: 4, move: true, index: 15 }, 
                    { mod: "BT3103", mc: 4, move: true, index: 16 },
                ],
                y3s1: [
                    { mod: "", mc: 0,move: false, index: 17 },
                    { mod: "MKT1705X", mc: 4, move: true, index: 18 }
                ],
                y3s2: [
                    { mod: "", mc: 0, move: false, index: 19 },
                ],
                y4s1: [{ mod: "", mc: 0, move: false, index: 20 },],
                y4s2: [{ mod: "", mc: 0, move: false, index: 21 },],
                }
        };
    },
    props: ['allmodules'],
    computed: {
        sorted_y1s1: function() {
            this.sort_modules(this.acad_plan['y1s1']);
            return this.acad_plan['y1s1'];
        },
        sorted_y1s2: function() {
            this.sort_modules(this.acad_plan['y1s2']);
            return this.acad_plan['y1s2'];
        },
        sorted_y2s1: function() {
            this.sort_modules(this.acad_plan['y2s1']);
            return this.acad_plan['y2s1'];
        },
        sorted_y2s2: function() {
            this.sort_modules(this.acad_plan['y2s2']);
            return this.acad_plan['y2s2'];
        },
        sorted_y3s1: function() {
            this.sort_modules(this.acad_plan['y3s1']);
            return this.acad_plan['y3s1'];
        },
        sorted_y3s2: function() {
            this.sort_modules(this.acad_plan['y3s2']);
            return this.acad_plan['y3s2'];
        },
        sorted_y4s1: function() {
            this.sort_modules(this.acad_plan['y4s1']);
            return this.acad_plan['y4s1'];
        },
        sorted_y4s2: function() {
            this.sort_modules(this.acad_plan['y4s2']);
            return this.acad_plan['y4s2'];
        },
    },
    methods: {
        add_module: function() {
            // remove whitespace and convert module name to lowercase
            var module_name = this.add_module_code.trim().toLowerCase();

            // clear module slot after use
            this.add_module_code = ""; 

            if (module_name !== "") {
                // check valid module
                var module = this.check_valid_module(module_name);

                if (module === this.invalid_module) {
                    alert("Error: Module is invalid");
                } else if (module === this.inserted_module) {
                    alert("Error: Module is already in academic plan"); 
                } else {
                    this.acad_plan['y1s1'].push({ mod: module.code, mc: module.mc, move: true, index: index }); 
                    index++;
                }
            } else {
                alert("Error: Field cannot be left blank");
            }
        },
        check_valid_module: function(module_name) {
            for (var key in this.allmodules) {
                // check if module exists
                if (this.allmodules[key].fullname.toLowerCase().includes(module_name)) {
                    // check if module is already inserted
                    if (this.allmodules[key].inserted === false) {
                        this.allmodules[key].inserted = true;
                        return this.allmodules[key];
                    } else {
                        // module already inserted
                        return this.inserted_module;
                    }
                }
            }
            return this.invalid_module;
        },
        delete_module: function(data_name, module) {
            this.acad_plan[data_name] = this.acad_plan[data_name].filter((event) => {
                return event.index !== module.index   
            });            
            // update allmodules and change inserted attribute to false
            this.allmodules[module.mod].inserted = false;
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
        }, 
    },
}
</script>