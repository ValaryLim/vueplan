import { Bar } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default {
    extends: Bar,
    components: {
        ChartDataLabels
    },
    props: ['preprocessed_data', 'current_ay'],
    data: () => ({
        /* colours by ordering of semesters */
        semester_before: "#d8d8d8",
        semester_after: "#778899",
        semester_same: "#F76C6C",

        /* data and options to render barchart */
        chart_data: { },
        options: {
            title:{
                display: true,
                text: 'Current Module Popularity Across Semesters',
                fontColor:'black',
                fontSize: 16,
            },
            legend:{
                display: false,
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
                    ticks:{
                        min: 0,
                        max: 500,
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
        this.renderChart(this.chart_data, this.options)
    },
    methods: {
        processChartData: function() {
            /**
             * Process the preprocessed_data obtained from Dashboard to a suitable format to render barchart
             */
            // initialise variables for chart_data
            var labels = [];
            var data = [];
            var backgroundColor = [];
            var rolling_max = 0;

            // go through each semester in preprocessed_data, and add them to variables
            for (var compared_ay in this.preprocessed_data) {
                labels.push(compared_ay);
                data.push(this.preprocessed_data[compared_ay]['total']);
                backgroundColor.push(this.calculateColour(compared_ay));
                if (this.preprocessed_data[compared_ay]['total'] > rolling_max) {
                    rolling_max = this.preprocessed_data[compared_ay]['total'];
                }
            }

            this.chart_data = {
                labels: labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: backgroundColor
                    }
                ]
            }

            this.options['scales']['yAxes'] = [{
                ticks: {
                    min: 0,
                    max: Math.ceil((rolling_max + 20) / 20) * 20
                }
            }];
        },
        calculateColour: function(compared_ay) {
            /**
             * Checks if academic year and semester is before current academic year and semester.
             * Returns the colour that should be rendered
             */
            // splice the current ay_sem into academic year and semester
            var current = this.current_ay.split('-');
            var current_acadyear = parseInt(current[0]);
            var current_sem = parseInt(current[1][1]);
            
            // splice the compared ay_sem into academic year and semester
            var compared = compared_ay.split('-');
            var compared_acadyear = parseInt(compared[0]);
            var compared_sem = parseInt(compared[1][1]);

            // compare the academic years and semesters
            if (compared_acadyear < current_acadyear) {
                // academic year is before current
                return this.semester_before;
            } else if (compared_acadyear > current_acadyear) {
                // academic year is after current
                return this.semester_after;
            } else if (compared_sem < current_sem) {
                // same academic year and semester is before current
                return this.semester_before;
            } else if (compared_sem > current_sem) {
                // same academic year and semester is after current
                return this.semester_after;
            } else {
                // same academic year and same semester
                return this.semester_same;
            }
        }
    },
    created() {
        this.processChartData();
    }
}