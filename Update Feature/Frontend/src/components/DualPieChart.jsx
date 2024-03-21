import React, { useEffect } from 'react';
import Chart from 'chart.js/auto'; // Import Chart library

const DualPieChart = ({ data1, data2 }) => {
  useEffect(() => {
    const createPieChart = (canvasId, labels, data, backgroundColor, title) => {
      const ctx = document.getElementById(canvasId).getContext('2d');
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: backgroundColor
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Ensure the chart doesn't maintain aspect ratio
          plugins: {
            title: {
              display: true,
              text: title,
              padding: {
                top: 10,
                bottom: 20
              },
              font: {
                size: 16,
                weight: 'bold'
              }
            }
          }
        }
      });
    };

    createPieChart('nps-pie-chart', ['Promoters', 'Passives', 'Detractors'], [data1.totalPromoters, data1.totalPassives, data1.totalDetractors], ['rgba(76, 175, 80, 0.5)', 'rgba(139, 195, 74, 0.5)', 'rgba(205, 220, 57, 0.5)'], 'Net Promoter Score');
    createPieChart('survey-status-pie-chart', ['Sent', 'Complete', 'Resent'], [data2.surveySentCount, data2.surveyCompleteCount, data2.surveyResentCount], ['rgba(76, 175, 80, 0.5)', 'rgba(139, 195, 74, 0.5)', 'rgba(205, 220, 57, 0.5)'], 'Survey Status');
  }, [data1, data2]);

  return (
    <div className="flex justify-center w-full shadow-md rounded-lg p-4">
      <div className="flex flex-col items-center justify-center w-11/12 md:w-3/5">
        <div className="overflow-hidden" style={{ maxWidth: '300px', height: '250px' }}>
          <canvas id="nps-pie-chart"></canvas>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-11/12 md:w-3/5 ml-8">
        <div className="overflow-hidden" style={{ maxWidth: '300px', height: '250px' }}>
          <canvas id="survey-status-pie-chart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default DualPieChart;
