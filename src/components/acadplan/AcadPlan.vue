<template src="./acadplan.html"></template>

<style src="./acadplan.css"></style>

<script>
import draggable from "vuedraggable";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faAlignJustify } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTimes, faAlignJustify)
var index = 50;
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
            // add module data
            add_module_code: "",
            invalid_module: 0,
            inserted_module: 1,
            unmet_prereq: -1,

            // user semester data
            sem_completed: 3,

            // error message data
            modal_header: "Default header",
            modal_body: "Default body",

            // edit module credits
            add_mc: 1,
            subtract_mc: -1,
            total_mc: 56,
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
            /** 
             * adds module to the earliest possible semester the student can take it 
             */

            // remove whitespace and convert module name to lowercase
            var module_name = this.add_module_code.trim().toLowerCase();
            
            // clear module slot after use
            this.add_module_code = ""; 

            if (module_name !== "") {
                // check valid module
                var module = this.check_valid_module(module_name);

                if (module === this.invalid_module) {
                    this.printError("Attempted to Add Invalid Module", 
                    module_name + " cannot be found in our database. This can happen when the module has been discontinued or if the module name is incorrect. Please try a different module instead.");
                } else if (module === this.inserted_module) {
                    this.printError("Module in Academic Plan", module_name + " is already in your academic plan. Please do not add duplicate modules.");
                } else {
                    // check if all prerequisites have been met
                    var mod_prerequisites_check = this.check_prerequisites_sem(module.parseprereq);
                    if (mod_prerequisites_check !== this.unmet_prereq) {
                        var add_in_semester = this.num_semester_mapping[mod_prerequisites_check];
                        this.acadplan[add_in_semester].push({ mod: module.code, mc: module.mc, move: true, index: index }); 
                        this.module_semester_mapping[module.code] = mod_prerequisites_check;
                        index++;
                        this.update_module_credits(this.add_mc, add_in_semester, module.mc);
                        this.total_mc += module.mc;
                    } else {
                        this.printError("Incomplete Prerequisites", "This module cannot be added to your academic plan because you have yet to add all of its' prerequisites. Please do so first.");
                    }
                }
            } else {
                this.printError("Attempted to Add Blank Module", "Please type the module you wish to add in the textbox before pressing the Add button.");
            }
        },
        update_module_credits: function(add_subtract, sem, mc) {
            for (var module_index in this.acadplan[sem]) {
                // get module
                var module = this.acadplan[sem][module_index];
                // update modular credits
                if (module.mod === "") {
                    module.mc = module.mc + mc * add_subtract;
                    return;
                }
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
        delete_module: function(sem, module) {
            var module_name = module.mod;

            if (this.check_unlocked(module_name)) {
                // update number of modular credits
                this.update_module_credits(this.subtract_mc, sem, module.mc);
                this.total_mc -= module.mc;

                // remove module using filter
                this.acadplan[sem] = this.acadplan[sem].filter((event) => {
                    return event.index !== module.index   
                });
            } else {
                this.printError("Deletion Error", "This module cannot be deleted as some modules in your academic plan depend on the module you are trying to delete.");
            }
        }, 
        sort_modules: function(data, sem_num) {
            data.sort(this.compare_module);

            var current_sem = this.num_semester_mapping[sem_num];
            var check_module = "";

            // find shifted module
            for (var module_index in this.acadplan[current_sem]) {
                var module = this.acadplan[current_sem][module_index];
                // check that module isn't fixed (buffer cell)
                if (module.move && (this.module_semester_mapping[module.mod] != sem_num)) {
                    check_module = module;
                }
            }

            // check prerequisites and locked modules for shifted module
            if (check_module !== "") {
                // get previous sem
                var previous_sem = this.module_semester_mapping[check_module.mod];

                // check that prerequisites are met before module can be taken
                var meet_prerequisites = this.sort_modules_prereq_check(check_module, previous_sem, sem_num);
                if (!meet_prerequisites) {
                    this.printError("Incomplete Prerequisites in Semester", "Module cannot be shifted to this semester as not all prerequisites for the module have been taken. Please shift this module to a semester where you have completed all the necessary prerequisites.");
                    return; // stop the function
                }
                
                // check that module is completed before its locked modules
                var meet_locked = this.sort_modules_locked_check(check_module, previous_sem, sem_num);
                if (!meet_locked) {
                    this.printError("Locked Modules in Semester", "Module cannot be shifted to this semester as other modules in your academic plan have this module as a prerequisite. You are required to read this module in an earlier semester.");
                    return;
                }
                
                // module can be shifted, update the module
                this.module_semester_mapping[check_module.mod] = sem_num;

                // update module credits in old and new semester
                this.update_module_credits(this.subtract_mc, previous_sem, check_module.mc);
                this.update_module_credits(this.add_mc, current_sem, check_module.mc);
            }
        },
        sort_modules_prereq_check: function(check_module, previous_sem, sem_num) {
            /**
             * Checks that prerequisites are met before module can be taken
             * Returns true if module can be taken in that semester, false otherwise
             */
            var current_sem_name = this.num_semester_mapping[sem_num];
            var previous_sem_name = this.num_semester_mapping[previous_sem];

            // find the earliest date module can be shifted to
            var earliest_sem = this.check_prerequisites_sem(this.allmodules[check_module.mod].parseprereq);
                        
            // if earliest sem is after current sem
            if (earliest_sem > sem_num) {
                // push module back to original position
                // delete module from current sem
                this.acadplan[current_sem_name] = this.acadplan[current_sem_name].filter((event) => {
                    return event.index !== check_module.index; 
                });
                            
                // add module back to original sem
                this.acadplan[previous_sem_name].push({ mod: check_module.mod, mc: check_module.mc, move: true, index: index }); 
                this.module_semester_mapping[check_module.mod] = previous_sem;
                index++;
                return false;
            }
            return true;
        },
        sort_modules_locked_check: function(check_module, previous_sem, sem_num) {
            /**
             * Checks that locked modules are taken after the module
             * Returns true if module can be taken in that semester, false otherwise
             */
            var current_sem_name = this.num_semester_mapping[sem_num];
            var previous_sem_name = this.num_semester_mapping[previous_sem];

            var latest_sem = this.check_locked_sem(check_module.mod);

            if (latest_sem < sem_num) {
                // push module back to original position
                // delete module from current sem
                this.acadplan[current_sem_name] = this.acadplan[current_sem_name].filter((event) => {
                    return event.index !== check_module.index;
                })

                // add module back to original sem
                this.acadplan[previous_sem_name].push({ mod: check_module.mod, mc: check_module.mc, move: true, index: index });
                this.module_semester_mapping[check_module.mod] = previous_sem;
                index++;
                return false;
            }
            return true;
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
            // if there are no prerequisites, module can be inserted immediately after the first semester
            if (Object.keys(prereq_tree).length === 0) {
                return 1; // can insert into first semester
            }

            // if there is only one prerequisite
            if (typeof(prereq_tree) === "string") {
                return this.check_prerequisites_sem_string(prereq_tree);
            }
            // tracker of earliest semester where module can be inserted
            var insert_sem = 1;

            // if there is more than one prerequisite
            for (var key in prereq_tree) {
                // get prerequisite subtree
                var prereq_subtree = prereq_tree[key];

                if (key === "and") {
                    return this.check_prerequisites_sem_and(prereq_subtree);
                } else if (key === "or") {
                    return this.check_prerequisites_sem_or(prereq_subtree);
                }

                return insert_sem
            }
        },
        check_prerequisites_sem_string: function(prereq_tree) {
            /** 
             * Returns first semester that module can be inserted, -1 otherwise.
             */
            // tracker of earliest semester where module can be inserted
            var insert_sem = 1;
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
                        if (this.allmodules[preclu] 
                        && (preclu in this.module_semester_mapping)
                        && (this.module_semester_mapping[preclu] + 1 > insert_sem)) {
                            insert_sem = this.module_semester_mapping[preclu] + 1;
                            met_preclu = true;
                        }
                    }
                    
                    // if prerequisites or its preclusions are not met, return unmet_prereq
                    if (!met_preclu) {
                        return this.unmet_prereq;
                    }
                }
            } 
            return insert_sem;          
        },
        check_prerequisites_sem_or: function(prereq_subtree) {
            // record earliest sem for "or" and if module can be taken or not
            var earliest_or_sem = 1000;
            var can_take = false;

            // only need to meet one of the requirements within "or"
            for (var req_index in prereq_subtree) {
                var req = prereq_subtree[req_index];
                if (typeof(req) === "string") {
                    // check if module is valid
                    if (this.allmodules[req]) {
                        if (req in this.module_semester_mapping) {
                            // find the earliest possible semester to take the mod
                            if (this.module_semester_mapping[req] + 1 < earliest_or_sem) {
                                earliest_or_sem = this.module_semester_mapping[req] + 1;
                                can_take = true;
                            }
                        } else {
                            // try and check if any preclusions have been added
                            var req_precludes2 = this.get_all_preclu(this.allmodules[req].parsepreclu, []);

                            for (var preclu_index2 in req_precludes2) {
                                var preclu2 = req_precludes2[preclu_index2];
                                // if preclusion exists and is in academic plan
                                if (this.allmodules[preclu2] 
                                && (preclu2 in this.module_semester_mapping)
                                && (this.module_semester_mapping[preclu2] + 1 < earliest_or_sem)) {
                                    earliest_or_sem = this.module_semester_mapping[preclu2] + 1;
                                    can_take = true;
                                }
                            }
                        }
                    }
                } else {
                    // find at least one true
                    var check_subreq = this.check_prerequisites_sem(req);
                    if ((check_subreq !== this.unmet_prereq) && (check_subreq < earliest_or_sem)) {
                        earliest_or_sem = check_subreq;
                        can_take = true;
                    }
                }
            }
            if (can_take) {
                return earliest_or_sem;
            } else {
                return this.unmet_prereq;
            }
        },
        check_prerequisites_sem_and: function(prereq_subtree) {
            // tracker of earliest semester where module can be inserted
            var insert_sem = 1;
            
            // need all requirements within "and"
            for (var req_index in prereq_subtree) {
                var req = prereq_subtree[req_index];
                if (typeof(req) === "string") {
                    var req_insert_sem = this.check_prerequisites_sem_string(req);
                    if (req_insert_sem === this.unmet_prereq) {
                        return this.unmet_prereq;
                    } else if (req_insert_sem > insert_sem) {
                        insert_sem = req_insert_sem;
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
                // check if module is in acad plan and
                // if module is in academic plan, check if prerequisites are still met
                if (locked_mod in this.module_semester_mapping && 
                (this.check_prerequisites_sem(this.allmodules[locked_mod].parseprereq) === this.unmet_prereq)) {
                    // not met, reinsert module and return false
                    this.module_semester_mapping[module_name] = sem_save;
                    return false;
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
            var locked_arr = this.allmodules[module_name].locked.slice();


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
        check_locked_sem: function(module_name) {
            /** 
             * Returns the latest sem that module can be added 
             * (any later and it will be at the same time as a locked module)
             */
            var locked_modules = this.get_locked(module_name);
            var latest_sem = 1000;
            
            for (var lmod_index in locked_modules) {
                var lmod = locked_modules[lmod_index];
                if (lmod in this.module_semester_mapping && (this.module_semester_mapping[lmod] - 1 < latest_sem)) {
                    // update latest sem
                    latest_sem = this.module_semester_mapping[lmod] - 1;
                }
            }
            
            return latest_sem;
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
                if (this.allmodules[preclu_tree]) { // not null
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
                    
                    // if precluded module is a string and not yet included in preclu_arr
                    if (typeof(preclu) === "string" && this.allmodules[preclu] && !preclu_arr.includes(preclu)) {
                        // add precluded module to preclu_arr
                        preclu_arr.push(preclu);
                        
                        // recursively call get_all_preclu on new modules
                        preclu_arr = this.get_all_preclu(this.allmodules[preclu].parsepreclu, preclu_arr);
                    }
                }
            }

            return preclu_arr;  
        },
        printError: function(header, message) {
            this.modal_header = header;
            this.modal_body = message;
            this.$bvModal.show('error-modal');
        }
    },
}
</script>