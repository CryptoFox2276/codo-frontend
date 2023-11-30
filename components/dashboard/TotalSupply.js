import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function TotalSupply() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    useEffect(() => {
        const data = {
            labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'NOV', 'DEC'],
            datasets: [
                {
                    label: 'Total Supply',
                    data: [15, 119, 280, 381, 356, 555, 520, 640,800,802,1020,1460],
                    fill: false,
                    borderColor: '#F5A11E',
                    tension: 0.4
                }
                
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            innerWidth: '100%',
            outerWidth: '100%',
            plugins: {
                legend: {
                    labels: {
                        color: '#F5A11E'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#8492A6'
                    },
                    grid: {
                        color: '#161A22'
                    }
                },
                y: {
                    ticks: {
                        color: '#F5A11E'
                    },
                    grid: {
                        color: '#161A22'
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="total-supply">
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    )
}