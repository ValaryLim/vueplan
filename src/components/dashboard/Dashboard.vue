<template>
    <div class="row">
        <popularity-chart class="chart" :key="key1" :preprocessed_data="preprocessed_data" :current_ay="current_ay"></popularity-chart>
        <div>
            <major-chart class="chart" v-if="current_ay in preprocessed_data" :key="key2" :preprocessed_data="preprocessed_data" :current_ay="current_ay" :major="major"></major-chart>
            <major-chart-all class="chart" :key="key3" :preprocessed_data="preprocessed_data" :major="major"></major-chart-all>
        </div>
        <div>
            <year-chart class="chart" v-if="current_ay in preprocessed_data" :key="key4" :preprocessed_data="preprocessed_data" :current_ay="current_ay" :year="year"></year-chart>
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
            render: false,
        }
    },
    props: ['preprocessed_data', 'current_ay'],
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
            this.render = true;
        },
    },
    created() {
        this.fetch_userdata();
    }
}
</script>

<style scoped>
.chart {
    width: 580px;
    padding: 50px;
    float: left;
}
</style>