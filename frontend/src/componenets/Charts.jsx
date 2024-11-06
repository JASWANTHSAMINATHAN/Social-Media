// src/components/Charts.js
import React, { useEffect, useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, ArcElement, Title, Tooltip, Legend);

export default function Charts() {
  const [chartData, setChartData] = useState([]);

  // Fetch data from API
  useEffect(() => {
    fetch('http://localhost:5000/fetch-data') // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => setChartData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      {chartData.map((item) => {
        const data = {
          labels: ['Instagram', 'Linkedin', 'Whatsapp', 'Facebook', 'Youtube'],
          datasets: [
            {
              label: 'Values',
              data: item.values,
              backgroundColor: item.type === 'circle'
                ? ['#fc0345', '#03bafc', '#03fc6f', '#6A5ACD', '#fc0303']
                : 'rgba(75,192,192,0.4)',
              borderColor: item.type === 'line' ? 'rgba(75,192,192,1)' : '#fff',
              borderWidth: 1,
              tesnsion : 0.4,
              hoverOffset: item.type === 'circle' ? 4 : 0,
              fill: item.type === 'line',
            },
          ],
        };

        const options = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                font: {
                  size: 14,
                },
              },
            },
            title: {
              display: true,
              text: item.type === 'line' ? 'Average Screen Time' : 'Usage Analytics',
              font: {
                size: 18,
              },
              padding: {
                top: 20,
                bottom: 20,
              },
            },
          },
        };

        return (

          <div key={item._id.$oid} style={{ margin: '20px', width: '100%' }} className='analytics' >
            <div style={{width:"500px", height: '400px'}}>
            {item.type === 'line' && (
                <Line data={data} options={options} />
            )}
            </div>
            <div style={{width:"500px", height: '400px', marginTop:"-50rem"}}>
            {item.type === 'circle' && (
                <Doughnut data={data} options={options} />
            )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
