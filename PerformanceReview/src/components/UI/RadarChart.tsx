import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function RadarChart({data}: RadarChartProps){
    return (
        <Radar
            data={{
                labels: ['Продуктивность', 'Инициативность', 'Профессиональные навыки', 'Коммуникативность'],
                datasets: [
                    {
                        data,
                        backgroundColor: 'rgba(8,67,221,0.42)',
                        pointRadius: 6,
                        pointBorderColor: 'lightgray',
                        pointBorderWidth: 1,
                        pointBackgroundColor: 'white',
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: 'white',
                        borderWidth: 0,
                    }
                ]
            }}
            options={{
                scales: {
                    r: {
                        suggestedMax: 100,
                        beginAtZero: true,
                        ticks: {
                            display: false
                        },
                        pointLabels: {
                            font: {
                                size: 16
                            }
                        },
                        grid: {
                            lineWidth: 2
                        }
                    },
                },
                plugins: {
                    tooltip: {
                        enabled: false
                    },
                    legend: {
                        display: false
                    },
                }
            }}
        />
    )
}

interface RadarChartProps{
    data: number[]
}