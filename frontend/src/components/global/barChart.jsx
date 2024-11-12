import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ chartData, min, max, title, yTitle, xTitle }) => {
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: min,
        max: max,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: yTitle,
        },
      },
      x: {
        title: {
          display: true,
          text: xTitle,
          padding: { top: 20 }, 
        },
        ticks: {
          callback: function(value) {
            const label = this.getLabelForValue(value);
            console.log("Label", label)
            return label.length > 30 ? label.substr(0, 30) + '...' : label;
        },
          maxRotation: 90,
          minRotation: 90,
          align: 'end', 
          padding: 10, 
        },
      },
    },
    animation: {
      duration: 300,
    },
  };
  

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}> 
      <div style={{ position: 'relative', height: '400px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
