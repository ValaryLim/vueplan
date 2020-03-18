<template>
    <div class="row">
        <h2>Module Popularity Dashboard</h2>
        <popularity-chart class="chart" :key="key1" :preprocessed_data="preprocessed_data" :current_ay="current_ay"></popularity-chart>
        <div>
            <major-chart class="chart" :key="key2" :preprocessed_data="preprocessed_data" :current_ay="current_ay" :major="major"></major-chart>
            <major-chart-all class="chart" :key="key3" :preprocessed_data="preprocessed_data" :major="major"></major-chart-all>
        </div>
        <div>
            <year-chart class="chart" :key="key4" :preprocessed_data="preprocessed_data" :current_ay="current_ay" :year="year"></year-chart>
            <year-chart-all class="chart" :key="key5" :preprocessed_data="preprocessed_data" :year="year"></year-chart-all>
        </div>
    </div>
</template>

<script>
import popularityChart from './popularity-chart.js';
import majorChart from './major-chart.js';
import majorChartAll from './major-chart-all.js';
import yearChart from './year-chart.js';
import yearChartAll from './year-chart-all.js';

import { mapGetters } from "vuex";
import firebase from "firebase";
import database from "../firebase.js";

export default {
    components: {
        popularityChart,
        majorChart,
        majorChartAll,
        yearChart,
        yearChartAll
    },
    computed: {
        // map `this.user` to `this.$store.getters.user`
        ...mapGetters({
            user: "user"
        }),
    },
    data() {
        return {
            /* user data */
            year: 1,
            major: "Computer Science",

            /* rerendering keys */
            key1: 1,
            key2: 2,
            key3: 3,
            key4: 4,
            key5: 5,

            /* general data */
            module: "MA1521",
            current_ay: "1920-S2",
            preprocessed_data: {
                '1819-S1': {
                    total: 204,
                    major: {
                        'Business Analytics': 101,
                        'Computer Science': 103,
                    },
                    year: [0, 198, 5, 1]
                },
                '1819-S2': {
                    total: 201,
                    major: {
                        'Business Analytics': 98,
                        'Computer Science': 87,
                        'Information Systems': 16
                    },
                    year: [2, 197, 3, 0]
                },
                '1920-S1': {
                    total: 197,
                    major: {
                        'Business Analytics': 99,
                        'Computer Science': 88,
                        'Information Systems': 10
                    },
                    year: [0, 195, 3, 0]
                },
                '1920-S2': {
                    total: 204,
                    major: {
                        'Business Analytics': 91,
                        'Computer Science': 87,
                        'Information Systems': 21,
                        'Information Security': 5
                    },
                    year: [0, 198, 5, 1]
                },
                '2021-S1': {
                    total: 180,
                    major: {
                        'Business Analytics': 93,
                        'Computer Science': 82,
                        'Information Systems': 5
                    },
                    year: [1, 177, 2, 0]
                },
                '2021-S2': {
                    total: 151,
                    major: {
                        'Business Analytics': 68,
                        'Computer Science': 77,
                        'Information Systems': 6
                    },
                    year: [0, 150, 1, 0]
                },
            },
        }
    },
    methods: {
        fetch_userdata: function() {
            var user = firebase.auth().currentUser;
            let userRef = database.collection('acadplan').doc(user.uid);
            userRef.get().then(doc => {
                this.major = doc.data()['major'];

                // calculate and update the current year students are in
                var matriculated_year = doc.data()['year'];
                this.year = this.calculate_year(matriculated_year);

                this.force_rerender();
            });
        },
        calculate_year: function(matriculated_year) {
            /**
             * Takes in matriculated_year as parameter and computes the current year of student (as of date)
             * Semester 1 - 2 cutoff is taken as month 06 (June)
             */
            var today = new Date();
            var today_rep = today.getFullYear() + (today.getMonth() + 1) / 12 - 0.5;
            
            // calculate year
            return Math.ceil(today_rep - matriculated_year);
        },
        force_rerender: function() {
            this.key1 += 1;
            this.key2 += 2;
            this.key3 += 3;
            this.key4 += 4;
            this.key5 += 5;
        }
    },
    created() {
        this.fetch_userdata();
    }
}
</script>

<style scoped>
.chart {
    width: 50%;
    padding: 30px;
    float: left;
}
</style>