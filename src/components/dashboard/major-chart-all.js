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
    mounted() {
        this.renderChart(this.chartdata,this.options);
        console.log(this.module, "print module");
    }
}