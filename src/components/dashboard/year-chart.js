import { Pie } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default{
    extends: Pie,
    components: {
        ChartDataLabels
    },
    props: ['preprocessed_data', 'current_ay', 'year'],
    data: () => ({
        /* colours to generate */
        year_same: "#F76C6C",
        year_different: ["#d8d8d8", "#778899", "#24305E"],

        chart_data: {

        },
        
        options: {
            title:{
                display: true,
                text: 'Current Semester Module Popularity By Year',
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
            plugins: {
                datalabels: {
                    display: false,
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
            var data = [];
            var backgroundColor = [];
            var index = 0;
            
            // fill in chart_data based on current_ay
            for (var y in this.preprocessed_data[this.current_ay]['year']) {
                labels.push("Year " + String(parseInt(y) + 1));
                data.push(this.preprocessed_data[this.current_ay]['year'][y]);
                if (parseInt(y) + 1 === this.year) {
                    backgroundColor.push(this.year_same);
                } else {
                    backgroundColor.push(this.year_different[index]);
                    index++;
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
        }
    },
    created() {
        this.processChartData();
    }
}