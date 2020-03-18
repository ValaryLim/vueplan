import { Bar } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default{
    extends: Bar,
    components: {
        ChartDataLabels
    },
    props: ['preprocessed_data', 'year'],
    data: () => ({
        /* colours to generate */
        year_same: "#F76C6C",
        year_different: ["#d8d8d8", "#778899", "#24305E"],

        chartdata: {
            labels: ['1819-S1', '1819-S2', '1920-S1', '1920-S2', '2021-S1', '2021-S2'],
            datasets: [
                {
                    label: 'Year 1',
                    data: [102, 101, 97, 98, 50, 37], 
                    backgroundColor: '#F76C6C',
                },
                {
                    label: 'Year 2',
                    data: [102, 100, 100, 106, 95, 50], 
                    backgroundColor:'#a9a9a9'
                },
                {
                    label: 'Year 3',
                    data: [12, 15, 11, 9, 7, 19], 
                    backgroundColor:'#d8d8d8'
                },
                {
                    label: 'Year 4',
                    data: [2, 3, 0, 0, 3, 0], 
                    backgroundColor:'#778899'
                }
            ]  
        },
        chart_data: {},
        options: {
            title:{
                display: true,
                text: 'Module Popularity Across Semesters by Year',
                fontColor:'black',
                fontSize: 16,
            },
            legend:{
                display: true,
                position:'top'
            },
            layout:{
                padding: 5
            },
            tooltips: {
                enabled: false
            },
            scales:{
                yAxes:[{
                    ticks: {
                        min: 0,
                        max: 500
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
    mounted(){
        this.renderChart(this.chart_data,this.options)
    },
    methods: {
        processChartData: function() {
            /**
            * Process the preprocessed_data obtained from Dashboard to a suitable format to render piechart
            */
            // initialise variables for chart_data
            var labels = [];
            var datasets = [{}, {}, {}, {}];
            var rolling_max = 0;
            var index = 0;

            // fill in variables
            for (var ay in this.preprocessed_data) {
                labels.push(ay);
                // for each year in ay
                for (var y = 0; y < 4; y++) {
                    if (Object.keys(datasets[y]).length === 0) {
                        datasets[y]['label'] = 'Year ' + String(y + 1);
                        if (y + 1 === this.year) {
                            datasets[y]['backgroundColor'] = this.year_same;
                        } else {
                            datasets[y]['backgroundColor'] = this.year_different[index];
                            index++;
                        }
                        datasets[y]['data'] = [];
                    }
                    datasets[y]['data'].push(this.preprocessed_data[ay]['year'][y]);
                    if (this.preprocessed_data[ay]['year'][y] > rolling_max) {
                        rolling_max = this.preprocessed_data[ay]['year'][y]
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