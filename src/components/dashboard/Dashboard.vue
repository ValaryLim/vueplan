<template>
    <div class="row">
        <h2>Module Popularity Dashboard</h2>
        <div>
            <popularity-chart class="chart" :preprocessed_data="preprocessed_data" :current_ay="current_ay"></popularity-chart>
            <major-chart class="chart" :preprocessed_data="preprocessed_data" :current_ay="current_ay" :major="major"></major-chart>
            <major-chart-all class="chart" :preprocessed_data="preprocessed_data" :major="major"></major-chart-all>
            <year-chart class="chart" :preprocessed_data="preprocessed_data" :current_ay="current_ay" :year="year"></year-chart>
            <year-chart-all class="chart" :preprocessed_data="preprocessed_data" :year="year"></year-chart-all>
        </div>
    </div>
</template>

<script>
import popularityChart from './popularity-chart.js';
import majorChart from './major-chart.js';
import majorChartAll from './major-chart-all.js';
import yearChart from './year-chart.js';
import yearChartAll from './year-chart-all.js';

export default {
    components: {
        popularityChart,
        majorChart,
        majorChartAll,
        yearChart,
        yearChartAll
    },
    data() {
        return {
            /* user data */
            major: "Business Analytics",
            year: 2,

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