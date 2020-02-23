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
        };
    },
    props: ['allmodules', 'acadplan'],
    computed: {
        sorted_y1s1: function() {
            this.sort_modules(this.acadplan['y1s1']);
            return this.acadplan['y1s1'];
        },
        sorted_y1s2: function() {
            this.sort_modules(this.acadplan['y1s2']);
            return this.acadplan['y1s2'];
        },
        sorted_y2s1: function() {
            this.sort_modules(this.acadplan['y2s1']);
            return this.acadplan['y2s1'];
        },
        sorted_y2s2: function() {
            this.sort_modules(this.acadplan['y2s2']);
            return this.acadplan['y2s2'];
        },
        sorted_y3s1: function() {
            this.sort_modules(this.acadplan['y3s1']);
            return this.acadplan['y3s1'];
        },
        sorted_y3s2: function() {
            this.sort_modules(this.acadplan['y3s2']);
            return this.acadplan['y3s2'];
        },
        sorted_y4s1: function() {
            this.sort_modules(this.acadplan['y4s1']);
            return this.acadplan['y4s1'];
        },
        sorted_y4s2: function() {
            this.sort_modules(this.acadplan['y4s2']);
            return this.acadplan['y4s2'];
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
                    // check if all prerequisites have been met
                    if (this.check_prerequisites(module.parseprereq) === true) {
                        this.acadplan['y1s1'].push({ mod: module.code, mc: module.mc, move: true, index: index }); 
                        module.inserted = true;
                        index++;
                    } else {
                        alert("Error: Have not met all of module's prerequisites");
                    }
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
                    if (this.allmodules[key] && this.allmodules[key].inserted === false) {
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
            this.acadplan[data_name] = this.acadplan[data_name].filter((event) => {
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
        check_prerequisites: function(prereq_tree) {
            // if there are no prerequisites
            if (Object.keys(prereq_tree).length === 0) {
                return true;
            }

            // if there is only one prerequisite
            if (typeof(prereq_tree) === "string") {
                return (this.allmodules[prereq_tree] && this.allmodules[prereq_tree].inserted);
            }

            // if there is more than one prerequisite
            for (var key in prereq_tree) {
                var prereq_subtree = prereq_tree[key];
                if (key === "and") {
                    // need all requirements within "and"
                    for (var req_index in prereq_subtree) {
                        var req = prereq_subtree[req_index];
                        if (typeof(req) === "string") {
                            // if requirement is a string, check if module has been added to acadplan
                            if (this.allmodules[req] && this.allmodules[req].inserted === false) {
                                return false;
                            }
                        } else {
                            // there is a nested dictionary (either "and" or "or")
                            // recursively call check_prerequisites
                            var check_subreq = this.check_prerequisites(req);
                            if (check_subreq === false) {
                                return false;
                            }
                        }
                    }
                    return true;
                } else if (key === "or") {
                    // only need to meet one of the requirements within "or"
                    for (var req2_index in prereq_subtree) {
                        var req2 = prereq_subtree[req2_index];
                        if (typeof(req2) === "string") {
                            if (this.allmodules[req2] && this.allmodules[req2].inserted === true) {
                                return true;
                            } 
                        } else {
                            // find at least one true
                            var check_subreq2 = this.check_prerequisites(req2);
                            if (check_subreq2 === true) {
                                return true;
                            }
                        }
                    }
                    return false;
                }
            }
        }
    },
}
</script>