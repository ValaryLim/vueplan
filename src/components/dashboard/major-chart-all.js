import { Bar } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default{
    extends: Bar,
    components: {
        ChartDataLabels
    },
    props: ['preprocessed_data', 'major'],
    data: () => ({
        /* colours to generate */
        major_same: "#F76C6C",
        major_different: ["#d8d8d8", "#778899", "#24305E"],

        chartdata: {
            labels: ['1819-S1', '1819-S2', '1920-S1', '1920-S2', '2021-S1', '2021-S2'],
            datasets: [
                {
                    label: 'Business Analytics',
                    data: [102, 101, 97, 98, 50, 37], 
                    backgroundColor: '#F76C6C',
                },
                {
                    label: 'Information Systems',
                    data: [102, 100, 100, 106, 95, 50], 
                    backgroundColor:'#d8d8d8'
                }
            ]  
        },
        chart_data: {},

        options: {
            title:{
                display: true,
                text: 'Module Popularity Across Semesters by Major',
                fontColor:'black',
                fontSize: 16,
            },
            legend:{
                display: true,
                position:'top',
            },
            layout:{
                padding: 5
            },
            tooltips: {
                enabled: false
            },
            scales:{
                yAxes:[{
                    ticks:{
                        min: 0
                    },
                }],
            },
            plugins: {
                datalabels: {
                    color: 'black',
                    anchor: 'end',
                    align: 'end'
                }
            }
        }
    }),
    mounted() {
        this.renderChart(this.chart_data,this.options);
    },
    methods: {
        processChartData: function() {
            /**
            * Process the preprocessed_data obtained from Dashboard to a suitable format to render piechart
            */
            // initialise variables for chart_data
            var labels = [];
            var datasets = [];
            var rolling_max = 0;
            var index = 0;

            // retrieve unique majors
            var unique_majors = [];
            for (var ay in this.preprocessed_data) {
                for (var m in this.preprocessed_data[ay]["major"]) {
                    if (!(unique_majors.includes(m))) {
                        unique_majors.push(m);
                    }
                }
            }

            // fill dataset template first
            for (var um_index in unique_majors) {
                var bc;
                if (unique_majors[um_index] === this.major) {
                    bc = this.major_same;
                } else {
                    bc = this.major_different[index];
                    index++;
                }
                datasets.push(
                    {
                        label: unique_majors[um_index],
                        data: [],
                        backgroundColor: bc
                    }
                )
            }

            // fill in variables
            // for each academic year
            for (var ay2 in this.preprocessed_data) {
                // push academic year into labels
                labels.push(ay2);

                // for each major in unique_majors
                for (var um_index2 in unique_majors) {
                    var um2 = unique_majors[um_index2];
                    if (um2 in this.preprocessed_data[ay2]["major"]) {
                        datasets[um_index2]['data'].push(this.preprocessed_data[ay2]["major"][um2]);
                        if (this.preprocessed_data[ay2]["major"][um2] > rolling_max) {
                            rolling_max = this.preprocessed_data[ay2]["major"][um2];
                        }
                    } else {
                        datasets[um_index2]['data'].push(0);
                    }
                }
            }

            this.chart_data = {
                labels: labels,
                datasets: datasets
            };

            this.options['scales']['yAxes'] = [{
                ticks: {
                    min: 0,
                    max: Math.ceil((rolling_max + 20) / 20) * 20
                }
            }];
        }
    },
    created() {
        this.processChartData();
    }
}