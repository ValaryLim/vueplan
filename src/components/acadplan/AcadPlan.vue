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
            unmet_prereq: -1,
        };
    },
    props: ['allmodules', 'acadplan', 'module_semester_mapping', 'num_semester_mapping'],
    computed: {
        sorted_y1s1: function() {
            this.sort_modules(this.acadplan['y1s1'], 1);
            return this.acadplan['y1s1'];
        },
        sorted_y1s2: function() {
            this.sort_modules(this.acadplan['y1s2'], 2);
            return this.acadplan['y1s2'];
        },
        sorted_y2s1: function() {
            this.sort_modules(this.acadplan['y2s1'], 3);
            return this.acadplan['y2s1'];
        },
        sorted_y2s2: function() {
            this.sort_modules(this.acadplan['y2s2'], 4);
            return this.acadplan['y2s2'];
        },
        sorted_y3s1: function() {
            this.sort_modules(this.acadplan['y3s1'], 5);
            return this.acadplan['y3s1'];
        },
        sorted_y3s2: function() {
            this.sort_modules(this.acadplan['y3s2'], 6);
            return this.acadplan['y3s2'];
        },
        sorted_y4s1: function() {
            this.sort_modules(this.acadplan['y4s1'], 7);
            return this.acadplan['y4s1'];
        },
        sorted_y4s2: function() {
            this.sort_modules(this.acadplan['y4s2'], 8);
            return this.acadplan['y4s2'];
        },
    },
    methods: {
        add_module_sem: function() {
            /** adds module to the earliest possible semester the student can take it */

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
                    var mod_prerequisites_check = this.check_prerequisites_sem(module.parseprereq);
                    if (mod_prerequisites_check !== this.unmet_prereq) {
                        var add_in_semester = this.num_semester_mapping[mod_prerequisites_check];
                        this.acadplan[add_in_semester].push({ mod: module.code, mc: module.mc, move: true, index: index }); 
                        this.module_semester_mapping[module.code] = mod_prerequisites_check;
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
                    if (this.allmodules[key] && !(key in this.module_semester_mapping)) {
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
        sort_modules: function(data, sem_num) {
            data.sort(this.compare_module);

            // update module_semester_mapping dictionary after shifting the modules
            for (var module in data) {
                if (data[module].mod !== "") {
                    this.module_semester_mapping[module.mod] = sem_num
                }
            }
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
        check_prerequisites_sem: function(prereq_tree) {
            /** 
             * returns the earliest sem that the module can be taken, -1 otherwise. 
             */
            
            // tracker of earliest semester where module can be inserted
            var insert_sem = 1;

            // if there are no prerequisites, module can be inserted immediately after the first semester
            if (Object.keys(prereq_tree).length === 0) {
                return insert_sem;
            }

            // if there is only one prerequisite
            if (typeof(prereq_tree) === "string") {
                // check if module exists
                if (this.allmodules[prereq_tree]) {
                    // check if prerequisite is taken
                    if (prereq_tree in this.module_semester_mapping) {
                        insert_sem = this.module_semester_mapping[prereq_tree] + 1;
                        return insert_sem;
                    } else {
                        // check if any of the precluded modules are taken
                        var req_precludes = this.get_all_preclu(this.allmodules[prereq_tree].parsepreclu, []);
                        
                        var met_preclu = false;
                        for (var preclu_index in req_precludes) {
                            var preclu = req_precludes[preclu_index];
                            // if preclusion exists and is in academic plan
                            if (this.allmodules[preclu] && (preclu in this.module_semester_mapping)) {
                                if (this.module_semester_mapping[preclu] + 1 > insert_sem) {
                                    insert_sem = this.module_semester_mapping[preclu] + 1;
                                    met_preclu = true;
                                }
                            }
                        }
                        
                        // if prerequisites or its preclusions are not met, return unmet_prereq
                        if (!met_preclu) {
                            return this.unmet_prereq;
                        }
                    }
                } else {
                    return insert_sem; // let module get added since prereq no longer exists
                }
            }

            // if there is more than one prerequisite
            for (var key in prereq_tree) {
                // get prerequisite subtree
                var prereq_subtree = prereq_tree[key];

                if (key === "and") {
                    // need all requirements within "and"
                    for (var req_index in prereq_subtree) {
                        var req = prereq_subtree[req_index];
                        if (typeof(req) === "string") {
                            // if requirement is a string
                            // check if module is valid
                            if (this.allmodules[req]) {
                                // if module is not met, return unmet_prereq
                                if (req in this.module_semester_mapping) {
                                    // update insert_sem if required
                                    if (this.module_semester_mapping[req] + 1 > insert_sem) {
                                        insert_sem = this.module_semester_mapping[req] + 1;
                                    }
                                } else {
                                    // try and check if any preclusions have been added
                                    var req_precludes2 = this.get_all_preclu(this.allmodules[req].parsepreclu, []);
                                    var met_preclu2 = false;
                                    for (var preclu_index2 in req_precludes2) {
                                        var preclu2 = req_precludes2[preclu_index2];
                                        // if preclusion exists and is in academic plan
                                        if (this.allmodules[preclu2] && (preclu2 in this.module_semester_mapping)) {
                                            if (this.module_semester_mapping[preclu2] + 1 > insert_sem) {
                                                insert_sem = this.module_semester_mapping[preclu2] + 1;
                                                met_preclu2 = true;
                                            }
                                        }
                                    }
                                    // if prerequisites or its preclusions are not met, return unmet_prereq
                                    if (!met_preclu2) {
                                        return this.unmet_prereq;
                                    }
                                }
                            }
                        } else {
                            // there is a nested dictionary (either "and" or "or")
                            // recursively call check_prerequisites_sem
                            var check_subreq = this.check_prerequisites_sem(req);
                            // if prereqs are not met
                            if (check_subreq === this.unmet_prereq) {
                                return this.unmet_prereq;
                            } else {
                                // update insert_sem
                                if (check_subreq > insert_sem) {
                                    insert_sem = check_subreq;
                                }
                            }
                        }
                    }
                    return insert_sem;
                } else if (key === "or") {
                    // record earliest sem for "or" and if module can be taken or not
                    var earliest_or_sem = 1000;
                    var can_take = false;

                    // only need to meet one of the requirements within "or"
                    for (var req2_index in prereq_subtree) {
                        var req2 = prereq_subtree[req2_index];
                        if (typeof(req2) === "string") {
                            // check if module is valid
                            if (this.allmodules[req2]) {
                                if (req2 in this.module_semester_mapping) {
                                    // find the earliest possible semester to take the mod
                                    if (this.module_semester_mapping[req2] + 1 < earliest_or_sem) {
                                        earliest_or_sem = this.module_semester_mapping[req2] + 1;
                                        can_take = true;
                                    }
                                } else {
                                    // try and check if any preclusions have been added
                                    var req_precludes3 = this.get_all_preclu(this.allmodules[req2].parsepreclu, []);

                                    for (var preclu_index3 in req_precludes3) {
                                        var preclu3 = req_precludes3[preclu_index3];
                                        // if preclusion exists and is in academic plan
                                        if (this.allmodules[preclu3] && (preclu3 in this.module_semester_mapping)) {
                                            if (this.module_semester_mapping[preclu3] + 1 < earliest_or_sem) {
                                                earliest_or_sem = this.module_semester_mapping[preclu3] + 1;
                                                can_take = true;
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            // find at least one true
                            var check_subreq2 = this.check_prerequisites_sem(req2);
                            if ((check_subreq2 !== this.unmet_prereq) && (check_subreq2 < earliest_or_sem)) {
                                earliest_or_sem = check_subreq2;
                                can_take = true;
                            }
                        }
                    }
                    if (can_take) {
                        return earliest_or_sem;
                    } else {
                        return this.unmet_prereq;
                    }
                }

                return insert_sem
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
            var sem_save = this.module_semester_mapping[module_name];
            delete this.module_semester_mapping[module_name];

            // check if all locked modules still have prerequisites fulfilled
            // if true, can delete (return true)
            // if false, do not delete
            for (var mod_index in all_locked) {
                var locked_mod = all_locked[mod_index];
                // check if module is in acad plan
                if (locked_mod in this.module_semester_mapping) {
                    // if module is in academic plan, check if prerequisites are still met
                    if (this.check_prerequisites_sem(this.allmodules[locked_mod].parseprereq) === this.unmet_prereq) {
                        // not met, reinsert module and return false
                        this.module_semester_mapping[module_name] = sem_save;
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
                        return preclu_arr;
                    } else {
                        // if not, push module into preclu_arr
                        preclu_arr.push(preclu_tree);
                        return preclu_arr;
                    }
                } else {
                    return preclu_arr;
                }
            }

            // else, go through each nest and get the preclusions
            for (var key in preclu_tree) {
                // access subtree
                var preclu_subtree = preclu_tree[key];

                for (var preclu_index in preclu_subtree) {
                    // precluded module
                    var preclu = preclu_subtree[preclu_index];
                    
                    // if precluded module is a string
                    if (typeof(preclu) === "string" && this.allmodules[preclu]) {
                        // and not yet included in preclu_arr
                        if (!preclu_arr.includes(preclu)) {
                            // add precluded module to preclu_arr
                            preclu_arr.push(preclu);
                            
                            // recursively call get_all_preclu on new modules
                            preclu_arr = this.get_all_preclu(this.allmodules[preclu].parsepreclu, preclu_arr);
                        }
                    }
                }
            }

            return preclu_arr;  
        }
    },
}
</script>