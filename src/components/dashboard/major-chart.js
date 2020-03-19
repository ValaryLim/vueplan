import { Pie } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default{
    extends: Pie,
    components: {
        ChartDataLabels
    },
    props: ['preprocessed_data', 'current_ay', 'major'],
    data: () => ({
        /* colours to generate */
        major_same: "#F76C6C",
        major_different: ["#d8d8d8", "#778899", "#24305E"],
        
        /* chart data */
        chartdata: {
            labels: ['Business Analytics', 'Computer Science', 'Information Systems'],
            datasets: [
                {
                    data: [86, 104, 45], 
                    backgroundColor:['#F76C6C', '#a9a9a9', '#d8d8d8'],
                }
            ]  
        },
        chart_data: {},
        options: {
            title:{
                display: true,
                text: 'Current Semester Module Popularity By Major',
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
        this.renderChart(this.chart_data, this.options)
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
            var index = 0

            // fill in chart_data based on current_ay
            var current_majors = this.preprocessed_data[this.current_ay]['major'];
            for (var m in current_majors) {
                labels.push(m);
                data.push(current_majors[m]);
                if (m === this.major) {
                    backgroundColor.push(this.major_same);
                } else {
                    backgroundColor.push(this.major_different[index]);
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