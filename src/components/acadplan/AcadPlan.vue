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
            valid_modules: [
                { mod: "BT1101", name: "BT1101 Introduction to Business Analytics", mc: 4, inserted: true, 
                    prereqs: { "and": ["BT2101", {"or": [
                    "CS1020", "CS1020E", "CS2020", "CS2030", "CS2103", "CS2103T", "CS2113", "CS2113T"]}]
                }},
                { mod: "CS1010S", name: "CS1010S Programming Methodology", mc: 4, inserted: true, prereqs: [] },
                { mod: "EC1301", name: "EC1301 Principles of Economics", mc: 4, inserted: true, prereqs: [] }, 
                { mod: "IS1103", name: "IS1103 Ethics in Computing", mc: 4, inserted: true, prereqs: [] }, 
                { mod: "MA1521", name: "MA1521 Calculus for Computing", mc: 4, inserted: true, prereqs: [] }, 
                { mod: "MA1102R", name: "MA1102R Calculus", mc: 4, inserted: false, prereqs: [] },
                { mod: "MA1311", name: "MA1311 Matrix Algebra", mc: 4, inserted: false, prereqs: [] }, 
                { mod: "MA1101R", name: "MA1101R Linear Algebra I", mc: 4, inserted: true, prereqs: [] },
                { mod: "MKT1705X", name: "MKT1705X Principles of Marketing", mc: 4, inserted: true, prereqs: [] }, 
                { mod: "BT2101", name: "BT2101 Decision Making Methods and Tools", mc: 4, inserted: true, prereqs: ['CS1010S', 'BT1101', 'MA1521'] },
                { mod: "BT2102", name: "BT2102 Data Management and Visualisation", mc: 4, inserted: true, prereqs: ['CS1010S', 'BT1101'] },
                { mod: "CS2030", name: "CS2030 Programming Methodology I", mc: 4, inserted: true, prereqs: ['CS1010S'] },
                { mod: "CS2040", name: "CS2040 Data Structures and Algorithms", mc: 4, inserted: true, prereqs: ['CS1010S'] }, 
                { mod: "IS2101", name: "IS2101 Business and Technical Communication", mc: 4, inserted: false, prereqs: [] },
                { mod: "ST2334", name: "ST2334 Probability and Statistics", mc: 4, inserted: true, prereqs: ['MA1521'] },
                { mod: "BT3102", name: "BT3102 Computational Methods for Business Analytics", mc: 4, inserted: true, prereqs: ['BT2101', 'CS2030'] },
                { mod: "BT3103", name: "BT3103 Application Systems Development for Business Analytics", mc: 4, inserted: true, prereqs: ['BT2102'] },
                { mod: "IS3103", name: "IS3103 Information Systems Leadership and Communication", mc: 4, inserted: false, prereqs: ['IS1103', 'IS2101'] }, 
                { mod: "BT4103", name: "BT4103 Business Analytics Capstone Project", mc: 8, inserted: false, prereqs: ['BT3102', 'BT3103'] },
                { mod: "IS4010", name: "IS4010 Industry Internship Programme", mc: 12, inserted: false, prereqs: ['IS2101', 'IS3103', 'BT2101', 'BT2102'] },
                { mod: "BT4101", name: "BT4101 B.Sc. Dissertation", mc: 12, inserted: false, prereqs: [] },
                { mod: "BT4013", name: "BT4013 Analytics for Capital Market Trading and Investment", mc: 4, inserted: false, prereqs: ['BT3102'] },
                { mod: "BT4016", name: "BT4016 Risk Analytics for Financial Services", mc: 4, inserted: false, prereqs: ['BT2101', 'BT2102'] }, 
                { mod: "BT4211", name: "BT4211 Data-Driven Marketing", mc: 4, inserted: false, prereqs: ['MKT1705X', 'BT2101', 'BT2102'] },
                { mod: "BT4212", name: "BT4212 Search Engine Optimization and Analytics", mc: 4, inserted: false, prereqs: ['CS1010S', 'BT2101'] },
                { mod: "IS4241", name: "IS4241 Social Media Network Analysis", mc: 4, inserted: false, prereqs: ['CS1010S', 'IS1103', 'BT1101'] },
                { mod: "BT4012", name: "BT4012 Fraud Analytics", mc: 4, inserted: false, prereqs: ['BT3102'] },
                { mod: "BT4015", name: "BT4015 Geospatial Analytics", mc: 4, inserted: false, prereqs: ['ST2334', 'BT2101', 'BT2102', 'CS2040'] },
                { mod: "BT4221", name: "BT4221 Big Data Techniques and Technologies", mc: 4, inserted: false, prereqs: ['CS1010S', 'BT2101', 'BT2102'] },
                { mod: "BT4222", name: "BT4222 Mining Web Data for Business Insights", mc: 4, inserted: false, prereqs: ['CS1010S', 'BT2101', 'BT2102'] },
                { mod: "BT4240", name: "BT4240 Machine Learning for Predictive Data Analytics", mc: 4, inserted: false, prereqs: ['MA1101R', 'MA1521', 'BT2101'] },
                { mod: "ST3131", name: "ST3131 Regression Analysis", mc: 4, inserted: false, prereqs: ['ST2334'] },
                { mod: "ST4245", name: "ST4245 Statistical Methods for Finance", mc: 4, inserted: false, prereqs: ['ST3131'] },
                { mod: "IS3261", name: "IS3261 Mobile Apps Development for Enterprise", mc: 4, inserted: false, prereqs: ['CS2030', 'CS2040'] },
                { mod: "BT4014", name: "BT4014 Analytics Driven Design of Adaptive Systems", mc: 4, inserted: false, prereqs: ['BT2102'] },
                { mod: "IS4228", name: "IS4228 Information Technologies in Financial Services", mc: 4, inserted: false, prereqs: ['IS3103'] },
                { mod: "IS4302", name: "IS4302 Blockchain and Distributed Ledger Technologies ", mc: 4, inserted: false, prereqs: ['BT2102', 'CS2030'] }
            ],
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
                    this.acad_plan['y1s1'].push({ mod: module.mod, mc: module.mc, move: true, index: index }); 
                    index++;
                }
            } else {
                alert("Error: Field cannot be left blank");
            }
        },
        check_valid_module: function(module_name) {
            for (var i = 0; i < this.valid_modules.length; i++) {
                // check if module exists in the valid_modules list
                if (this.valid_modules[i].name.toLowerCase().includes(module_name)) {
                    // check if module is already inserted
                    if (this.valid_modules[i].inserted === false) {
                        this.valid_modules[i].inserted = true;
                        return this.valid_modules[i];
                    } else {
                        return this.inserted_module;
                    }
                }
            }
            return this.invalid_module;
        },
        delete_module: function(data_name, element) {
            this.acad_plan[data_name] = this.acad_plan[data_name].filter((event) => {
                return event.index !== element.index   
            });            
            // update valid_modules and change inserted attribute to false
            for (var i = 0; i < this.valid_modules.length; i++) {
                if (this.valid_modules[i].mod === element.mod) {
                    this.valid_modules[i].inserted = false; 
                }
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
    },
}
</script>