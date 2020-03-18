import { Bar } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default{
    extends: Bar,
    components: {
        ChartDataLabels
    },
    props: ['module'],
    data: () => ({
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
        
        options: {
            title:{
                display: true,
                text: 'Current Module Popularity Across Semesters',
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
    mounted(){
        this.renderChart(this.chartdata,this.options)
    }
}