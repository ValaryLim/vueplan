import { Pie } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default{
    extends: Pie,
    components: {
        ChartDataLabels
    },
    props: ['module'],
    data: () => ({
        chartdata: {
            labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4'],
            datasets: [
                {
                    data: [1, 102, 34, 2], 
                    backgroundColor:['#778899', '#F76C6C', '#a9a9a9', '#d8d8d8'],
                }
            ]  
        },
        
        options: {
            title:{
                display: true,
                text: 'Breakdown of Current Module Popularity By Year',
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
        this.renderChart(this.chartdata,this.options)
    }
}