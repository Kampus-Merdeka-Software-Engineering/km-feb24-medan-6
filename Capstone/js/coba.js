async function loadJson() {
  try {
    const response = await fetch("data_france.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Unable to fetch data:", error);
  }
}

async function main() {
  const data = await loadJson();
  if (data) {
    // Transform data for the charts
    const profitByCountry = getProfitByCountry(data);
    const genderDistribution = getGenderDistribution(data);

    // Update the charts with the transformed data
    updateTotalProfitChart(profitByCountry);
    updateTotalProfitGenderChart(genderDistribution);
  }
}

function getProfitByCountry(data) {
  const profitByCountry = {};
  data.forEach(item => {
    if (!profitByCountry[item.Country]) {
      profitByCountry[item.Country] = 0;
    }
    profitByCountry[item.Country] += item.Profit;
  });

  return {
    countries: Object.keys(profitByCountry),
    values: Object.values(profitByCountry)
  };
}

function getGenderDistribution(data) {
  const genderDistribution = { M: 0, F: 0 };
  data.forEach(item => {
    if (item.Customer_Gender in genderDistribution) {
      genderDistribution[item.Customer_Gender] += 1;
    }
  });

  return Object.values(genderDistribution);
}

function updateTotalProfitChart(profitData) {
  const ctx = document.getElementById('TotalProfitChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: profitData.countries,
      datasets: [{
        label: '# Profit',
        data: profitData.values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function updateTotalProfitGenderChart(genderData) {
  const ctx = document.getElementById('TotalProfitGenderChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['M', 'F'],
      datasets: [{
        data: genderData,
        borderWidth: 1
      }]
    }
  });
}

window.onload = main;

function handleOnChangeMonth(element) {
  let month = element.value;
  // Handle month change logic here
}

const ages = [32, 33, 16, 40];
const result = ages.filter(checkAdult);

function checkAdult(age) {
  return age >= 18;
}