let monthFilters = [];
let yearFilters = [];

// Start of handleOnMonthFilter
async function handleOnMonthFilter(element) {
  const allData = await loadAllJSON();

  // update current filters
  monthFilters = updateFilter(element, monthFilters);

  // filter
  let filtered = filterDataBySelectedFilters(allData);

  // group by
  let totalProfitbyProductCategory = getProfitbyProductCategory(filtered);
  let totalProfitbyAgeGroup = getProfitbyAgeGroup(filtered);
  let genderByDistribution = getGenderDistribution(filtered);
  let totalProfitbyCountry = getProfitByCountry(filtered);

  // update charts
  updateTotalProfitProductCategory(totalProfitbyProductCategory);
  updateTotalProfitAgeChart(totalProfitbyAgeGroup);
  updateTotalProfitGenderChart(genderByDistribution);
  updateTotalProfitChart(totalProfitbyCountry);
}
// End of handleOnMonthFilter

// Start of handleOnYearFilter
async function handleOnYearFilter(element) {
  const allData = await loadAllJSON();

  // update current filters
  yearFilters = updateFilter(element, yearFilters);

  // filter
  let filtered = filterDataBySelectedFilters(allData);

  // group by
  let totalProfitbyProductCategory = getProfitbyProductCategory(filtered);
  let totalProfitbyAgeGroup = getProfitbyAgeGroup(filtered);
  let genderByDistribution = getGenderDistribution(filtered);
  let totalProfitbyCountry = getProfitByCountry(filtered);

  // update charts
  updateTotalProfitProductCategory(totalProfitbyProductCategory);
  updateTotalProfitAgeChart(totalProfitbyAgeGroup);
  updateTotalProfitChart(totalProfitbyCountry);
  updateTotalProfitGenderChart(genderByDistribution);
}
// End of handleOnYearFilter

// Start of filterDataBySelectedFilters
function filterDataBySelectedFilters(data) {
  return data.filter(salesData => {
    let selectedMonth = monthFilters.length === 0 ? true : monthFilters.includes(salesData['Month']);
    let selectedYear = yearFilters.length === 0 ? true : yearFilters.includes(salesData['Year'].toString());
    return selectedMonth && selectedYear;
  });
}
// End of filterDataBySelectedFilters

// Start of updateFilter
function updateFilter(element, currentFilters) {
  let filterValue = element.value;
  if (element.checked) {
    currentFilters.push(filterValue);
    return currentFilters;
  }
  return currentFilters.filter(item => item !== filterValue);
}
// End of updateFilter

// Start of loadFranceJSON
async function loadFranceJSON() {
  const response = await fetch('data_france.json');
  const data = await response.json();
  return data;
}
// End of loadFranceJSON

// Start of loadAllJSON
async function loadAllJSON() {
  const response = await fetch('data_blmcleaning.json');
  const data = await response.json();
  return data;
}
// End of loadAllJSON

// Start of main
async function main() {
  const data1 = await loadAllJSON();
  const data2 = await loadFranceJSON();

  if (data1) {
    // Transform data for the charts
    const profitByCountry = getProfitByCountry(data1);
    const genderDistribution = getGenderDistribution(data1);
    const profitbyAgeGroup = getProfitbyAgeGroup(data1);
    const profitbyProductCategory = getProfitbyProductCategory(data1);

    // Update the charts with the transformed data
    updateTotalProfitProductCategory(profitbyProductCategory);
    updateTotalProfitAgeChart(profitbyAgeGroup);
    updateTotalProfitChart(profitByCountry);
    updateTotalProfitGenderChart(genderDistribution);
  }

  // Start of chart no 1 - Total Profit by Country
  fetch("ineuropa.json")
    .then(response => response.json())
    .then(data => {
      let profitByCountry = {};
      data.forEach(entry => {
        profitByCountry[entry.Country] = (profitByCountry[entry.Country] || 0) + entry.Profit;
      });

      const ctx = document.getElementById("myChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(profitByCountry),
          datasets: [{
            label: "Total Profit by Country",
            data: Object.values(profitByCountry),
            backgroundColor: "rgb(75, 192, 192)",
            borderColor: "rgb(75, 192, 192)",
            borderWidth: 1,
          }],
        },
        options: {
          indexAxis: "y",
          scales: {
            x: { beginAtZero: true },
          },
        },
      });
    })
    .catch(error => console.error("Error fetching data:", error));
  // End of chart no 1

  // Start of chart no 2 - Total Profit by Age Group
  fetch("infrance.json")
    .then(response => response.json())
    .then(data => {
      let profitByAgeGroup = {};
      data.forEach(entry => {
        profitByAgeGroup[entry.Age_Group] = (profitByAgeGroup[entry.Age_Group] || 0) + entry.Profit;
      });

      const ctx = document.getElementById("age").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(profitByAgeGroup),
          datasets: [{
            label: "Total Profit by Age Group",
            data: Object.values(profitByAgeGroup),
            backgroundColor: [
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(255, 206, 86)",
              "rgb(255, 99, 132)",
              "rgb(153, 102, 255)",
              "rgb(255, 159, 64)"
            ],
            borderColor: [
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(255, 206, 86)",
              "rgb(255, 99, 132)",
              "rgb(153, 102, 255)",
              "rgb(255, 159, 64)"
            ],
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    })
    .catch(error => console.error("Error fetching data:", error));
  // End of chart no 2

  // Start of chart no 3 - Total Profit by Customer Gender
  fetch("infrance.json")
    .then(response => response.json())
    .then(data => {
      let profitByGender = {};
      data.forEach(entry => {
        profitByGender[entry.Customer_Gender] = (profitByGender[entry.Customer_Gender] || 0) + entry.Profit;
      });

      const ctxDoughnut = document.getElementById("customer_gender").getContext("2d");
      new Chart(ctxDoughnut, {
        type: "doughnut",
        data: {
          labels: Object.keys(profitByGender),
          datasets: [{
            label: "Total Profit by Customer Gender",
            data: Object.values(profitByGender),
            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
            borderColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
            borderWidth: 1,
          }],
        },
      });
    })
    .catch(error => console.error("Error fetching data:", error));
  // End of chart no 3

  // Start of chart no 4 - Total Profit by Product Category
  fetch("infrance.json")
    .then(response => response.json())
    .then(data => {
      let profitByCategory = {};
      data.forEach(entry => {
        profitByCategory[entry.Product_Category] = (profitByCategory[entry.Product_Category] || 0) + entry.Profit;
      });

      const ctx = document.getElementById("product_category").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(profitByCategory),
          datasets: [{
            label: "Total Profit by Product Category",
            data: Object.values(profitByCategory),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    })
    .catch(error => console.error("Error fetching data:", error));
  // End of chart no 4

  // Start of chart no 5 - Total Profit Q3 & Q4 in France by Month
  fetch("infrance.json")
    .then(response => response.json())
    .then(data => {
      let filteredData = data.filter(entry => entry.Country === "France" && ["July", "August", "September", "October", "November", "December"].includes(entry.Month));

      let profitByMonth = {};
      filteredData.forEach(entry => {
        profitByMonth[entry.Month] = (profitByMonth[entry.Month] || 0) + entry.Profit;
      });

      const ctx = document.getElementById("profit_q3_q4_france").getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: Object.keys(profitByMonth),
          datasets: [{
            label: "Total Profit Q3 & Q4 in France by Month",
            data: Object.values(profitByMonth),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            fill: false,
            tension: 0.1,
          }],
        },
        options: {
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    })
    .catch(error => console.error("Error fetching data:", error));
  // End of chart no 5
}

main();
// End of main
