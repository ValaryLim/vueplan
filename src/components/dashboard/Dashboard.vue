<template>
    <div class="row">
        <h2>Module Popularity Dashboard</h2>
        <div>
            <popularity-chart class="chart" :preprocessed_data="preprocessed_data" :current_ay="current_ay"></popularity-chart>
            <major-chart class="chart" :preprocessed_data="preprocessed_data" :current_ay="current_ay" :major="major"></major-chart>
            <major-chart-all class="chart" :module="module"></major-chart-all>
            <year-chart class="chart" :module="module"></year-chart>
            <year-chart-all class="chart" :module="module"></year-chart-all>
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

            /* general data */
            module: "MA1521",
            current_ay: "1920-S2",
            preprocessed_data: {
                '1819-S1': {
                    total: 204,
                    major: {
                        'Business Analytics': 102,
                        'Computer Science': 102,
                    },
                    year: {
                        'Year 1': 0,
                        'Year 2': 198,
                        'Year 3': 5,
                        'Year 4': 1
                    }
                },
                '1819-S2': {
                    total: 201,
                    major: {
                        'Business Analytics': 98,
                        'Computer Science': 87,
                        'Information Systems': 16
                    },
                    year: {
                        'Year 1': 2,
                        'Year 2': 197,
                        'Year 3': 3,
                        'Year 4': 0
                    }
                },
                '1920-S1': {
                    total: 197,
                    major: {
                        'Business Analytics': 99,
                        'Computer Science': 88,
                        'Information Systems': 10
                    },
                    year: {
                        'Year 1': 0,
                        'Year 2': 195,
                        'Year 3': 3,
                        'Year 4': 0
                    }
                },
                '1920-S2': {
                    total: 204,
                    major: {
                        'Business Analytics': 91,
                        'Computer Science': 87,
                        'Information Systems': 21,
                        'Information Security': 5
                    },
                    year: {
                        'Year 1': 0,
                        'Year 2': 198,
                        'Year 3': 5,
                        'Year 4': 1
                    }
                },
                '2021-S1': {
                    total: 180,
                    major: {
                        'Business Analytics': 93,
                        'Computer Science': 82,
                        'Information Systems': 5
                    },
                    year: {
                        'Year 1': 1,
                        'Year 2': 177,
                        'Year 3': 2,
                        'Year 4': 0
                    }
                },
                '2021-S2': {
                    total: 151,
                    major: {
                        'Business Analytics': 68,
                        'Computer Science': 77,
                        'Information Systems': 6
                    },
                    year: {
                        'Year 1': 0,
                        'Year 2': 150,
                        'Year 3': 1,
                        'Year 4': 0
                    }
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