import Chart from 'chart.js/auto';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize chart
  const ctx = (document.getElementById('improvementChart') as HTMLCanvasElement).getContext('2d');
  
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'MRs Improved',
          data: [3, 4, 3, 5, 4, 6, 7],
          borderColor: '#1f1f1f',
          tension: 0.4,
          fill: true,
          backgroundColor: 'rgba(31, 31, 31, 0.1)',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  // Handle settings button click
  const settingsButton = document.getElementById('settingsButton');
  settingsButton?.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });

  // Handle improve button click
  const improveButton = document.getElementById('improveButton');
  improveButton?.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.id) {
      chrome.tabs.sendMessage(tab.id, { action: 'improveMR' });
    }
  });
}); 