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
            var module_name = module.mod;

            if (this.check_unlocked(module_name)) {
                // filter all modules
                this.acadplan[data_name] = this.acadplan[data_name].filter((event) => {
                    return event.index !== module.index   
                });
            } else {
                alert("Some modules in your academic plan depend on the module you are trying to delete.");
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
        }, 
        check_prerequisites: function(prereq_tree) {
            /** Returns true if prerequisites for the module are met, false otherwise */
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
        }, 
        check_unlocked: function(module_name) {
            /** 
             * returns true if the module is not required for any other module, false otherwise. 
             * true: module can be deleted, false: module cannot be deleted
            */

            // get array of all modules that are locked by this module
            var all_locked = this.get_locked(module_name);

            // attempt to remove module from acad_plan
            this.allmodules[module_name].inserted = false;

            // check if all locked modules still have prerequisites fulfilled
            // if true, can delete (return true)
            // if false, do not delete
            for (var mod_index in all_locked) {
                var locked_mod = all_locked[mod_index];
            
                // check if module is in acad plan
                if (this.allmodules[locked_mod].inserted === true) {
                    // if module is in academic plan, check if prerequisites are still met
                    if (this.check_prerequisites(this.allmodules[locked_mod].parseprereq) === false) {
                        // not met, reinsert module and return false
                        console.log(locked_mod, "LOCKED MODULE CHECKING");
                        this.allmodules[module_name].inserted = true;
                        return false;
                    }
                }
            }
            return true;
        },
        get_locked: function(module_name) {
            /**
             * returns an array of all modules locked
             */
            var preclu_tree = this.allmodules[module_name].parsepreclu;
            var preclu_arr = this.get_all_preclu(preclu_tree, []);

            var locked_arr = this.allmodules[module_name].locked;
            console.log(locked_arr, "LOCKED 1");

            // go through each module in preclu_arr to get locked mods
            for (var mod_index in preclu_arr) {
                var preclu_mod = preclu_arr[mod_index];

                // get all locked modules of that preclu mod
                var preclu_locked = this.allmodules[preclu_mod].locked;

                for (var locked_index in preclu_locked) {
                    // get locked module
                    var locked_mod = preclu_locked[locked_index]; 

                    // check if locked module is in locked_arr, if not, add it
                    if (locked_arr.includes(locked_mod) === false) {
                        locked_arr.push(locked_mod);
                    }
                }
            }
            console.log(locked_arr, "LOCKED 2");
            return locked_arr;
        },
        get_all_preclu: function(preclu_tree, preclu_arr) {
            /**
             * recursively finds all preclusions of one module (ignores "and", "or") and returns an array of preclusions
             */
            // if there are no preclusions
            if (Object.keys(preclu_tree).length === 0) {
                return preclu_arr;
            }

            // if there is only one prerequisite
            if (typeof(preclu_tree) === "string") {
                if (this.allmodules[preclu_tree]) {
                    // check if preclu_arr already contains module
                    if (preclu_arr.includes(preclu_tree)) {
                        console.log(preclu_arr, "PRECLU ARR1");
                        return preclu_arr;
                    } else {
                        // if not, push module into preclu_arr
                        console.log(preclu_arr, "PRECLU ARR 2A");
                        preclu_arr.push(preclu_tree);
                        console.log(preclu_arr, "PRECLU ARR 2B");
                        return preclu_arr;
                    }
                } else {
                    console.log(preclu_arr, "PRECLU ARR3");
                    return preclu_arr;
                }
            }

            // else, go through each nest and get the preclusions
            console.log(preclu_tree, "TREE");
            console.log(typeof(preclu_tree) === "string", "CHECK IF STRING")
            for (var key in preclu_tree) {
                var preclu_subtree = preclu_tree[key];
                console.log(preclu_subtree, "SUBTREE");
                for (var preclu_index in preclu_subtree) {
                    var preclu = preclu_subtree[preclu_index];
                    if (typeof(preclu) === "string" && this.allmodules[preclu]) {
                        if (preclu_arr.includes(preclu) === false) {
                            preclu_arr.push(preclu);
                        }
                    } else {
                        // another sub preclusion, recursively update preclu_arr
                        console.log(preclu, "PRECLU");
                        break;
                        // preclu_arr = this.get_all_preclu(preclu, preclu_arr);
                    }
                }
            }

            return preclu_arr;  
        }
    },
}
</script>