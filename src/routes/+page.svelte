<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  let chartCanvas;

  const data = {
    labels: ['USA', 'Nigeria', 'China', 'Japan', 'Great Britain', 'ROC', 'Australia', 'Netherlands', 'France', 'Germany', 'Italy'],
    datasets: [
      {
        label: 'Gold Medals',
        data: [39, 38, 27, 22, 20, 17, 10, 10, 10, 10],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      },
      {
        label: 'Total Medals',
        data: [113, 88, 58, 65, 71, 46, 36, 33, 37, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  onMount(() => {
    new Chart(chartCanvas, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Olympics 2024 Medal Count (Mock Data)'
          },
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });
</script>

<div class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-4">Olympics 2024 Medal Visualization</h1>
  <div class="w-full max-w-3xl mx-auto">
    <canvas bind:this={chartCanvas}></canvas>
  </div>
</div>