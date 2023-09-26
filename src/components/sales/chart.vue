<template>
    <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
    />
</template>
<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


const props = defineProps(['labels','data'])

const randomColor = () => Math.ceil(Math.random() * 255)

const chartData = computed(() => {
    return {
        labels: props.labels,
        datasets: [ 
            { 
                label: 'Mahsulotlar bo`yicha sotuv dinamikasi',
                data: props.data,
                backgroundColor: props.data.map((el:number) => `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 0.5)`),
            }]
        }
    })
    
    // 'rgba(201, 203, 207, 0.2)'
// const chartData = ref({
//         labels: props.labels || [],
//         datasets: [ { data: [40, 20, 12] } ]
//     })

  
const chartOptions =  ref({
  responsive: true
});

</script>
<style lang="">
    
</style>