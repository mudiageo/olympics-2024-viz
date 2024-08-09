<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  //import { Card } from '$lib/components/card';
  //import { Switch } from '$lib/components/switch';
//  import { olympicData } from '$lib';

  let medalChart, sportChart, historicalChart;
  export let data = [];
  let loading = false;
  let error = null;
  let selectedYear = '2020';
  let selectedCountry = '';
  let searchTerm = '';
  let darkMode = false;

  $: filteredData = data.countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  $: medalChartData = {
    labels: filteredData.map(country => country.name),
    datasets: [
      {
        label: 'Gold Medals',
        data: filteredData.map(country => country.medals.gold),
        backgroundColor: darkMode ? 'rgba(255, 206, 86, 0.8)' : 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      },
      {
        label: 'Total Medals',
        data: filteredData.map(country => country.medals.total),
        backgroundColor: darkMode ? 'rgba(75, 192, 192, 0.8)' : 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  $: sportChartData = selectedCountry ? {
    labels: Object.keys(data.countries.find(country => country.name === selectedCountry).sports),
    datasets: [{
      data: Object.values(data.countries.find(country => country.name === selectedCountry).sports),
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
      ],
    }]
  } : null;

  $: historicalData = {
    labels: ['2012', '2016', '2020'],
    datasets: Object.entries(data.historical).map(([country, yearData]) => ({
      label: country,
      data: Object.values(yearData),
      borderColor: getCountryColor(country),
      fill: false,
    }))
  };

  function getCountryColor(country) {
    const colors = {
      'USA': 'rgba(255, 99, 132, 1)',
      'CHN': 'rgba(54, 162, 235, 1)',
      'JPN': 'rgba(255, 206, 86, 1)',
      // Add more countries and colors as needed
    };
    return colors[country] || 'rgba(75, 192, 192, 1)';
  }

  
//  $: if (selectedYear) fetchData();

  onMount(() => {
    const chartConfig = {
      responsive: true,
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      },
      plugins: {
        tooltip: { 
          mode: 'index', 
          intersect: false,
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y;
              }
              return label;
            },
            afterLabel: function(context) {
              if (context.dataset.label === 'Total Medals') {
                const country = data.countries[context.dataIndex];
                return `Gold: ${country.medals.gold}, Silver: ${country.medals.silver}, Bronze: ${country.medals.bronze}`;
              }
            }
          }
        },
        legend: { 
          labels: { 
            color: darkMode ? '#fff' : '#666' 
          } 
        },
      },
      scales: { 
        y: { 
          beginAtZero: true,
          ticks: { color: darkMode ? '#fff' : '#666' }
        },
        x: { 
          ticks: { color: darkMode ? '#fff' : '#666' }
        }
      }
    };

    medalChart = new Chart(document.getElementById('medalChart'), {
      type: 'bar',
      data: medalChartData,
      options: {
        ...chartConfig,
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            selectedCountry = filteredData[index].name;
          }
        }
      }
    });

    sportChart = new Chart(document.getElementById('sportChart'), {
      type: 'doughnut',
      data: sportChartData || { labels: [], datasets: [{ data: [] }] },
      options: {
        ...chartConfig,
        plugins: {
          ...chartConfig.plugins,
          legend: { position: 'bottom', labels: { color: darkMode ? '#fff' : '#666' } },
        }
      }
    });

    historicalChart = new Chart(document.getElementById('historicalChart'), {
      type: 'line',
      data: historicalData,
      options: chartConfig
    });
  });

  $: if (medalChart && medalChart.data) {
    medalChart.data = medalChartData;
    medalChart.options.plugins.legend.labels.color = darkMode ? '#fff' : '#666';
    medalChart.options.scales.y.ticks.color = darkMode ? '#fff' : '#666';
    medalChart.options.scales.x.ticks.color = darkMode ? '#fff' : '#666';
    medalChart.update();
  }

  $: if (sportChart && sportChart.data && sportChartData) {
    sportChart.data = sportChartData;
    sportChart.options.plugins.legend.labels.color = darkMode ? '#fff' : '#666';
    sportChart.update();
  }

  $: if (historicalChart && historicalChart.data) {
    historicalChart.options.plugins.legend.labels.color = darkMode ? '#fff' : '#666';
    historicalChart.options.scales.y.ticks.color = darkMode ? '#fff' : '#666';
    historicalChart.options.scales.x.ticks.color = darkMode ? '#fff' : '#666';
    historicalChart.update();
  }

  function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode');
  }
</script>

<div class="container mx-auto p-4" class:dark-mode={darkMode}>
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-3xl font-bold">Olympics {selectedYear} Dashboard</h1>
    <div class="flex items-center">
      <span class="mr-2">Dark Mode</span>

<label class="inline-flex items-center cursor-pointer">
  <input type="checkbox" class="sr-only peer" on:change={toggleDarkMode} />
  <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
</label>

    
    </div>
  </div>
  
  <div class="mb-4 flex space-x-4">
    <select class="select input" bind:value={selectedYear} label="Year">
      <option value="2020">2020 (Tokyo)</option>
      <option value="2016">2016 (Rio)</option>
      <option value="2012">2012 (London)</option>
    </select>
    <select bind:value={selectedCountry} label="Country">
      <option value="">All Countries</option>
      {#each filteredData as country}
        <option value={country.name}>
          <img src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`} alt={`${country.name} flag`} class="inline-block mr-2" />
          {country.name}
        </option>
      {/each}
    </select>
    <input type="text" placeholder="Search countries..." bind:value={searchTerm} />
  </div>

  {#if loading}
    <p>Loading data.countries...</p>
  {:else if error}
    <p class="text-red-500">Error: {error}</p>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="card">
        <h2 class="text-xl font-semibold mb-2">Medal Count by Country</h2>
        <canvas id="medalChart"></canvas>
      </div>
      
      {#if selectedCountry}
        <div class="card">
          <h2 class="text-xl font-semibold mb-2">Medals by Sport for {selectedCountry}</h2>
          <canvas id="sportChart"></canvas>
        </div>
      {/if}
      
      <div class="card md:col-span-2">
        <h2 class="text-xl font-semibold mb-2">Historical Performance</h2>
        <canvas id="historicalChart"></canvas>
      </div>
    </div>  
  {/if}
</div>

<style>
  :global(body) {
    background-color: #f0f0f0;
    color: #333;
    transition: background-color 0.3s, color 0.3s;
  }
  :global(body.dark-mode) {
    background-color: #333;
    color: #f0f0f0;
  }
  .container {
    max-width: 1200px;
  }
  .dark-mode {
    background-color: #1a1a1a;
    color: #fff;
  }
</style>