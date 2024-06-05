
let monthFilters = []
let yearFilters = []

const valueProfitDisplay = document.getElementById('displayTprofit');
const valueOrderQuantityDisplay = document.getElementById('displayOquantity'); 
const lowestCountryDisplay = document.getElementById('displayLcountry');



async function handleOnMonthFilter(element) {
  const allData = await loadAllJSON();
  const franceData = await loadFranceJSON();

  // update current filters
  monthFilters = updateFilter(element, monthFilters)

  // filter
  let filtered = filterDataBySelectedFilters(allData)
  let filteredFrance = filterDataBySelectedFilters(franceData)
  // group by
  let genderByDistribution = getGenderDistribution(filtered)
  let totalProfitbyCountry = getProfitByCountry(filtered)
  let displayProfit = getValueDisplayTprofit(filtered)
  // let displayQorder = getValueDisplayOrder(filtered)
  let profitbyAgeGroup = getProfitbyAgeGroup(filtered);
  let profitbyProductCategory = getProfitProductCategory(data1);
  
  // update charts
  updateTotalProfitGenderChart(genderByDistribution)
  updateTotalProfitChart(totalProfitbyCountry)
  updateValueDisplayTprofit(valueProfitDisplay,displayProfit)
  // updateValueDisplayQorder(valueOrderQuantityDisplay,displayQorder)
  updateTotalProfitProductCategory(profitbyProductCategory);
  updateTotalProfitAgeChart(profitbyAgeGroup);
}

async function handleOnYearFilter(element) {
  const allData = await loadAllJSON();
  const franceData = await loadFranceJSON();

  // update current filters
  yearFilters = updateFilter(element, yearFilters)

  // filter
  let filtered = filterDataBySelectedFilters(allData)
  let filteredFrance = filterDataBySelectedFilters(franceData)
  // group by
  let genderByDistribution = getGenderDistribution(filtered)
  let totalProfitbyCountry = getProfitByCountry(filtered)
  let displayProfit = getValueDisplayTprofit(filtered)
  // let displayQorder = getValueDisplayOrder(filtered)
  let profitbyAgeGroup = getProfitbyAgeGroup(filtered);
  let profitbyProductCategory = getProfitProductCategory(data1);
  

  // update charts
  updateTotalProfitChart(totalProfitbyCountry)
  updateTotalProfitGenderChart(genderByDistribution)
  updateValueDisplayTprofit(valueProfitDisplay,displayProfit)
  // updateValueDisplayQorder(valueOrderQuantityDisplay,displayQorder)
  updateTotalProfitProductCategory(profitbyProductCategory);
    updateTotalProfitAgeChart(profitbyAgeGroup);
}

function filterDataBySelectedFilters(data) {
  return data.filter((salesData => {
    let selectedMonth = monthFilters.length == 0 ? true : monthFilters.includes(salesData['Month'])
    let selectedYear = yearFilters.length == 0 ? true : yearFilters.includes(salesData['Year'].toString())

    return selectedMonth && selectedYear
  }))
}

function updateFilter(element, currentFilters) {
  let filterValue = element.value
  if (element.checked) {
      currentFilters.push(filterValue)
      return currentFilters
  }

  return currentFilters.filter(item => item !== filterValue)
}

async function loadFranceJSON() {
  const response = await fetch('data_france.json');
  const data = await response.json();

  return data;
}

async function loadAllJSON() {
  const response = await fetch('data_blmcleaning.json');
  const data = await response.json();
  
  return data;
}


async function main() {
  const data1 = await loadAllJSON();
  const data2 = await loadFranceJSON();

  

  if (data1) {
    // Transform data for the charts
    const profitByCountry = getProfitByCountry(data1);
    const genderDistribution = getGenderDistribution(data1);
    const valueElementProfitc = getValueDisplayTprofit(data1);
    // const valueQuantityOrderc = getValueDisplayOrder(data1);
    const profitbyAgeGroup = getProfitbyAgeGroup(data1);
    const profitbyProductCategory = getProfitProductCategory(data1);


    // Update the charts with the transformed data
    updateTotalProfitChart(profitByCountry);
    updateTotalProfitGenderChart(genderDistribution);
    updateValueDisplayTprofit(valueProfitDisplay,valueElementProfitc)
    // updateValueDisplayQorder(valueOrderQuantityDisplay,valueQuantityOrderc)
    updateTotalProfitProductCategory(profitbyProductCategory);
    updateTotalProfitAgeChart(profitbyAgeGroup);
  }

  // if (data2) {
  //   // Transform data for the charts
  //   const profitByCountry = getProfitByCountry(data2);
  //   const genderDistribution = getGenderDistribution(data2);

  //   // Update the charts with the transformed data
  //   updateTotalProfitChart(profitByCountry);
  //   updateTotalProfitGenderChart(genderDistribution);
  // }
}

function getValueDisplayTprofit(data) {
  let displayProfitValue = 0;
  const profitByCountry = {};
  data.forEach(item => {
    if (!profitByCountry[item.Country]) {
      profitByCountry[item.Country] = 0;
    }
    displayProfitValue += item.Profit;
  });

  return displayProfitValue;
}

function getValueDisplayOrder(data) {
  let displayOrder = 0;
  const profitByCountry = {};
  data.forEach(item => {
    if (!profitByCountry[item.Country]) {
      profitByCountry[item.Country] = 0;
    }
    displayProfitValue += item.Order_Quantity;
  });

  return displayOrder;
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

function getProductCategory(data) {
  const ProductCategory = { Accessories: 0, Bikes: 0 , Clothing: 0};
  data.forEach(item => {
    if (item.Product_Category in ProductCategory) {
      ProductCategory[item.Product_Category] += 1;
    }
  });

  return Object.values(ProductCategory);
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

function getAgeGroup(data) {
  

  return Object.values(genderDistribution);
}

function getProfitbyAgeGroup(data) {
  const profitbyAgeGroup = {};
  data.forEach(item => {
    if (!profitbyAgeGroup[item.Age_Group]) {
      profitbyAgeGroup[item.Age_Group] = 0;
    }
    profitbyAgeGroup[item.Age_Group] += item.Profit;
  });

  return {
    countries: Object.keys(profitbyAgeGroup),
    values: Object.values(profitbyAgeGroup)
  };
}


function getProfitProductCategory(data) {
  const profitbyProductCategory = {};
  data.forEach(item => {
    if (!profitbyProductCategory[item.Product_Category]) {
      profitbyProductCategory[item.Product_Category] = 0;
    }
    profitbyProductCategory[item.Product_Category] += item.Profit;
  });

  return {
    countries: Object.keys(profitbyProductCategory),
    values: Object.values(profitbyProductCategory)
  };
}

window.onload = main;

function getCheckboxValuesMonth() {
  // Get all checkbox elements with the class 'myCheckbox'
  const checkboxes = document.querySelectorAll('.myCheckboxMonth');
  const checkedValues = [];
  
  // Iterate over each checkbox
  checkboxes.forEach(checkbox => {
      // Check if the checkbox is checked
      if (checkbox.checked) {
          // Add the value of the checked checkbox to the array
          checkedValues.push(checkbox.value);
      }
  });

  // Log and alert the values of the checked checkboxes
  console.log('Checked values:', checkedValues);
  alert('Checked values: ' + checkedValues.join(', '));
}

function getCheckboxValuesYear() {
  // Get all checkbox elements with the class 'myCheckbox'
  const checkboxes = document.querySelectorAll('.myCheckboxYear');
  const checkedValues = [];

  // Iterate over each checkbox
  checkboxes.forEach(checkbox => {
      // Check if the checkbox is checked
      if (checkbox.checked) {
          // Add the value of the checked checkbox to the array
          checkedValues.push(checkbox.value);
      }
  });

  // Log and alert the values of the checked checkboxes
  console.log('Checked values:', checkedValues);
  alert('Checked values: ' + checkedValues.join(', '));
}



document
  .getElementById("toggleDropdownbulan")
  .addEventListener("click", function () {
    var dropdownContent = document.getElementById("dropdownbulan");
    if (dropdownContent.style.display === "none") {
      dropdownContent.style.display = "block";
    } else {
      dropdownContent.style.display = "none";
    }
  });

// dropdown tahun
document
  .getElementById("toggleDropdowntahun")
  .addEventListener("click", function () {
    var dropdownContent = document.getElementById("dropdowntahun");
    if (dropdownContent.style.display === "none") {
      dropdownContent.style.display = "block";
    } else {
      dropdownContent.style.display = "none";
    }
  });

// chart js <!-- section profit in eropa -->




function updateValueDisplayTprofit(id,data) {
  id.textContent = 0;
  let data1 = data / 1000000;  
  const newValue = parseFloat(data1.toFixed(2)) + " M €";
    
  // Perbarui teks di elemen HTML
  id.textContent = newValue;

}

function updateValueDisplayQorder(id,data) {
  id.textContent = 0;
  let data2 = data / 1000000;  
  const newValue = parseFloat(data2.toFixed(2)) + " M";
    
  // Perbarui teks di elemen HTML
  id.textContent = newValue;

}



function updateTotalProfitChart(profitData) {
  const chartId = 'TotalProfitChart'
  const ctx = document.getElementById(chartId).getContext('2d');
  destroyChart(chartId)

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

function destroyChart(chartId) {
  let chartStatus = Chart.getChart(chartId);
    if (chartStatus !== undefined) {
        chartStatus.destroy()
    }
}

function updateTotalProfitGenderChart(genderData) {
  const chartId = 'TotalProfitGenderChart'
  destroyChart(chartId)

  const ctx = document.getElementById(chartId).getContext('2d');
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

// total profit in eropa grop by age
function updateTotalProfitAgeChart(ageGroupData) {
  const chartId = 'TotalProfitAgeChart'
  const ctx = document.getElementById(chartId).getContext('2d');
  destroyChart(chartId)

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ageGroupData.countries,
      datasets: [{
        label: '# Profit',
        data: ageGroupData.values,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}



//

// total profit in eropa grop by categry

function updateTotalProfitProductCategory(ProductCategoryData) {
  const chartId = 'TotalProfitProductCategory'
  const ctx = document.getElementById(chartId).getContext('2d');
  destroyChart(chartId)

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ProductCategoryData.countries,
      datasets: [{
        label: '# Profit',
        data: ProductCategoryData.values,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(54, 162, 235)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


// Membuat grafik menggunakan konfigurasi yang telah ditentukan
const productChart = new Chart(ctxcategory, productConfig);

// total profit data q3 q4 france
const ctxfrance = document.getElementById("salesChart").getContext("2d");
// Data penjualan bulanan
const salesData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Sales",
      data: [1000, 1500, 1200, 1800, 2000, 1700, 1900], // Data penjualan per bulan
      fill: false,
      borderColor: "rgba(75, 192, 192, 1)", // Warna garis
      borderWidth: 1,
    },
  ],
};
// Konfigurasi grafik garis
const salesConfig = {
  type: "line",
  data: salesData,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};
// Membuat grafik menggunakan konfigurasi yang telah ditentukan
const salesChart = new Chart(ctxfrance, salesConfig);

// Total Profit by Sub Category Q3 & Q4 In France
const ctxPSC = document.getElementById("productSalesChart").getContext("2d");
const sDfrance = {
  // Data penjualan produk
  labels: [
    "Tires and Tubes",
    "Road Bikes",
    "Touring Bikes",
    "Jerseys",
    "Bottles and Cages",
    "Hydration Packs",
    "Shorts",
    "Gloves",
    "Mountain Bikes",
    "Fenders",
    "Vests",
    "Bike Stands",
    "Bike Racks",
    "Caps",
    "Cleaners",
    "Socks",
  ],
  datasets: [
    {
      label: "Product Sales",
      data: [
        1500, 1200, 800, 1000, 600, 400, 1100, 900, 700, 500, 300, 200, 400,
        300, 200, 100,
      ], // Data penjualan untuk setiap produk
      backgroundColor: "rgba(75, 192, 192, 0.2)", // Warna area di dalam batang
      borderColor: "rgba(75, 192, 192, 1)", // Warna border batang
      borderWidth: 1,
    },
  ],
};

// Konfigurasi grafik batang
const sFfrance = {
  type: "bar",
  data: sDfrance,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

// Membuat grafik menggunakan konfigurasi yang telah ditentukan
const salesCt = new Chart(ctxPSC, sFfrance);

// Profit age group by product category Q3 & Q4 in France
const ctxq3q4france = document
  .getElementById("salesChartq3q4")
  .getContext("2d");
// Data penjualan berdasarkan kategori dan kelompok umur
const salesDataq3q4 = {
  labels: ["Accessories", "Bikes", "Clothing"],
  datasets: [
    {
      label: "Adults (35-64)",
      data: [500, 800, 600], // Data penjualan untuk kelompok umur Adults (35-64)
      backgroundColor: "rgba(255, 99, 132, 0.2)", // Warna area di dalam batang
      borderColor: "rgba(255, 99, 132, 1)", // Warna border batang
      borderWidth: 1,
    },
    {
      label: "Young Adults (25-34)",
      data: [300, 700, 400], // Data penjualan untuk kelompok umur Young Adults (25-34)
      backgroundColor: "rgba(54, 162, 235, 0.2)", // Warna area di dalam batang
      borderColor: "rgba(54, 162, 235, 1)", // Warna border batang
      borderWidth: 1,
    },
    {
      label: "Youth (<25)",
      data: [200, 500, 300], // Data penjualan untuk kelompok umur Youth (<25)
      backgroundColor: "rgba(255, 205, 86, 0.2)", // Warna area di dalam batang
      borderColor: "rgba(255, 205, 86, 1)", // Warna border batang
      borderWidth: 1,
    },
    {
      label: "Seniors (64+)",
      data: [100, 300, 200], // Data penjualan untuk kelompok umur Seniors (64+)
      backgroundColor: "rgba(75, 192, 192, 0.2)", // Warna area di dalam batang
      borderColor: "rgba(75, 192, 192, 1)", // Warna border batang
      borderWidth: 1,
    },
  ],
};

// Konfigurasi grafik batang
const salesConfigq3q4 = {
  type: "bar",
  data: salesDataq3q4,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};
// Membuat grafik menggunakan konfigurasi yang telah ditentukan
const salesChartq3q4 = new Chart(ctxq3q4france, salesConfigq3q4);

// Total Profit By product category Q3 & Q4 in France
const ctxProductSalesChart = document
  .getElementById("psfranceq3q4")
  .getContext("2d");
// Data penjualan untuk kategori Accessories, Bikes, dan Clothing
const productSalesData = {
  labels: ["Accessories", "Bikes", "Clothing"],
  datasets: [
    {
      label: "Product Sales",
      data: [1500, 1200, 800], // Data penjualan untuk setiap kategori
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)", // Warna area di dalam batang untuk Accessories
        "rgba(54, 162, 235, 0.2)", // Warna area di dalam batang untuk Bikes
        "rgba(255, 205, 86, 0.2)", // Warna area di dalam batang untuk Clothing
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)", // Warna border batang untuk Accessories
        "rgba(54, 162, 235, 1)", // Warna border batang untuk Bikes
        "rgba(255, 205, 86, 1)", // Warna border batang untuk Clothing
      ],
      borderWidth: 1,
    },
  ],
};

// Konfigurasi grafik batang
const productSalesConfig = {
  type: "bar",
  data: productSalesData,
  options: {
    scales: {
      y: {
        beginAtZero: true, // Mulai sumbu y dari 0
      },
    },
  },
};
// Membuat grafik menggunakan konfigurasi yang telah ditentukan
const productSalesChart = new Chart(ctxProductSalesChart, productSalesConfig);

// Total Profit customer gender By product category Q3 & Q4 in France
// Konteks dari elemen canvas
const ctxGenderSalesChart = document
  .getElementById("genderSCq3q4")
  .getContext("2d");

// Data penjualan untuk kategori Accessories, Bikes, dan Clothing berdasarkan jenis kelamin
const genderSalesData = {
  labels: ["Accessories", "Bikes", "Clothing"],
  datasets: [
    {
      label: "Male",
      data: [500, 800, 600], // Data penjualan untuk laki-laki
      backgroundColor: "rgba(54, 162, 235, 0.2)", // Warna area di dalam batang
      borderColor: "rgba(54, 162, 235, 1)", // Warna border batang
      borderWidth: 1,
    },
    {
      label: "Female",
      data: [300, 700, 400], // Data penjualan untuk perempuan
      backgroundColor: "rgba(255, 99, 132, 0.2)", // Warna area di dalam batang
      borderColor: "rgba(255, 99, 132, 1)", // Warna border batang
      borderWidth: 1,
    },
  ],
};

// Konfigurasi grafik batang
const genderSalesConfig = {
  type: "bar",
  data: genderSalesData,
  options: {
    scales: {
      y: {
        beginAtZero: true, // Mulai sumbu y dari 0
      },
    },
  },
};

// Membuat grafik menggunakan konfigurasi yang telah ditentukan
const genderSalesChart = new Chart(ctxGenderSalesChart, genderSalesConfig);


