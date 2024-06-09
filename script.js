let monthFilters = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let yearFilters = ["-1", "2013", "2014", "2015", "2016"];

const valueProfitDisplay = document.getElementById("displayTprofit");
const valueOrderQuantityDisplay = document.getElementById("displayOquantity");
const lowestCountryDisplay = document.getElementById("displayLcountry");

let MAX_PROFIT_BY_COUNTRY = 0

async function handleOnMonthFilter(element) {
  const allData = await loadAllJSON();
  const franceData = await loadFranceJSON();

  // update current filters
  monthFilters = updateFilter(element, monthFilters);

  // filter
  let filtered = filterDataBySelectedFilters(allData);
  let filteredFrance = filterDataBySelectedFilters(franceData);
  // group by
  let genderByDistribution = getGenderDistribution(filtered);
  let totalProfitbyCountry = getProfitByCountry(filtered);
  let displayProfit = getValueDisplayTprofit(filtered);
  let valueQuantityOrderc = getValueDisplayOrder(filtered);
  let valueProfitLowestCountry = getValueProfitLowestCountry(filtered);
  let profitbyAgeGroup = getProfitbyAgeGroup(filtered);
  let profitbyProductCategory = getProfitProductCategory(filtered);

  // data 2
  let profitByFrance = getProfitByFrance(filtered);
  let profitBySubCategoryFrance = getProfitBySubCategoryFrance(filtered);
  let profitbyProductCategoryinFrance = getProfitProductCategoryInFrance(filtered);
  let profitAgeGroupByProductCategory = getProfitAgeGroupByProductCategory(filtered);
  let ProfitCustomerGenderByProductCategory = getProfitCustomerGenderByProductCategory(filtered);

  // update charts
  updateTotalProfitGenderChart(genderByDistribution);
  updateTotalProfitChart(totalProfitbyCountry);
  updateValueDisplayTprofit(valueProfitDisplay, displayProfit);
  updateValueDisplayQorder(valueOrderQuantityDisplay, valueQuantityOrderc);
  updateValueProfitLowestCountry(lowestCountryDisplay, valueProfitLowestCountry);
  updateTotalProfitProductCategory(profitbyProductCategory);
  updateTotalProfitAgeChart(profitbyAgeGroup);

  // update chart data 2
  updateProfitByFrance(profitByFrance);
  updateProfitBySubCategoryFrance(profitBySubCategoryFrance);
  updateProfitByProductCategoryinFrance(profitbyProductCategoryinFrance);
  updateProfitAgeGroupByProductCategory(profitAgeGroupByProductCategory);
  updateProfitCustomerGenderByProductCategory(ProfitCustomerGenderByProductCategory);
}

async function handleOnYearFilter(element) {
  const allData = await loadAllJSON();
  const franceData = await loadFranceJSON();

  // update current filters
  yearFilters = updateFilter(element, yearFilters);

  // filter
  let filtered = filterDataBySelectedFilters(allData);
  let filteredFrance = filterDataBySelectedFilters(franceData);
  // group by
  let genderByDistribution = getGenderDistribution(filtered);
  let totalProfitbyCountry = getProfitByCountry(filtered);
  let valueQuantityOrderc = getValueDisplayOrder(filtered);
  let valueProfitLowestCountry = getValueProfitLowestCountry(filtered);
  let displayProfit = getValueDisplayTprofit(filtered);
  let profitbyAgeGroup = getProfitbyAgeGroup(filtered);
  let profitbyProductCategory = getProfitProductCategory(filtered);

  // data 2
  let profitByFrance = getProfitByFrance(filtered);
  let profitBySubCategoryFrance = getProfitBySubCategoryFrance(filtered);
  let profitbyProductCategoryinFrance = getProfitProductCategoryInFrance(filtered);
  let profitAgeGroupByProductCategory = getProfitAgeGroupByProductCategory(filtered);
  let ProfitCustomerGenderByProductCategory = getProfitCustomerGenderByProductCategory(filtered);
  // update charts
  updateTotalProfitChart(totalProfitbyCountry);
  updateTotalProfitGenderChart(genderByDistribution);
  updateValueDisplayTprofit(valueProfitDisplay, displayProfit);
  updateValueDisplayQorder(valueOrderQuantityDisplay, valueQuantityOrderc);
  updateValueProfitLowestCountry(lowestCountryDisplay, valueProfitLowestCountry);
  updateTotalProfitProductCategory(profitbyProductCategory);
  updateTotalProfitAgeChart(profitbyAgeGroup);
  

  // data 2
  updateProfitByFrance(profitByFrance);
  updateProfitBySubCategoryFrance(profitBySubCategoryFrance);
  updateProfitByProductCategoryinFrance(profitbyProductCategoryinFrance);
  updateProfitAgeGroupByProductCategory(profitAgeGroupByProductCategory);
  updateProfitCustomerGenderByProductCategory(ProfitCustomerGenderByProductCategory);
}

function filterDataBySelectedFilters(data) {
  return data.filter((salesData) => {
    let selectedMonth = monthFilters.length == 0 ? true : monthFilters.includes(salesData["Month"]);
    let selectedYear = yearFilters.length == 0 ? true : yearFilters.includes(salesData["Year"].toString());

    return selectedMonth && selectedYear;
  });
}

function updateFilter(element, currentFilters) {
  let filterValue = element.value;
  if (!element.checked) {
    return currentFilters.filter((item) => item !== filterValue);
  } else {
    currentFilters.push(filterValue);
    return currentFilters;
  }
}

async function loadFranceJSON() {
  const response = await fetch("data_france.json");
  const data = await response.json();

  return data;
}

async function loadAllJSON() {
  const response = await fetch("data_blmcleaning.json");
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
    const valueQuantityOrderc = getValueDisplayOrder(data1);
    const valueProfitLowestCountry = getValueProfitLowestCountry(data1);
    const profitbyAgeGroup = getProfitbyAgeGroup(data1);
    const profitbyProductCategory = getProfitProductCategory(data1);

    const max_temp = Math.max(...profitByCountry.values)
    if (max_temp > MAX_PROFIT_BY_COUNTRY) {
      MAX_PROFIT_BY_COUNTRY = Math.ceil(max_temp/100000)*100000
    }

    // Update the charts with the transformed data
    updateTotalProfitChart(profitByCountry);
    updateTotalProfitGenderChart(genderDistribution);
    updateValueDisplayTprofit(valueProfitDisplay, valueElementProfitc);
    updateValueDisplayQorder(valueOrderQuantityDisplay, valueQuantityOrderc);
    updateValueProfitLowestCountry(lowestCountryDisplay, valueProfitLowestCountry);
    updateTotalProfitProductCategory(profitbyProductCategory);
    updateTotalProfitAgeChart(profitbyAgeGroup);
  }

  if (data2) {
    // Transform data for the charts
    const profitByFrance = getProfitByFrance(data2);
    const profitBySubCategoryFrance = getProfitBySubCategoryFrance(data2);
    const profitbyProductCategoryinFrance = getProfitProductCategoryInFrance(data2);
    const ProfitAgeGroupByProductCategory = getProfitAgeGroupByProductCategory(data2);
    const ProfitCustomerGenderByProductCategory = getProfitCustomerGenderByProductCategory(data2);

    // Update the France-specific chart
    updateProfitByFrance(profitByFrance);
    updateProfitBySubCategoryFrance(profitBySubCategoryFrance);
    updateProfitByProductCategoryinFrance(profitbyProductCategoryinFrance);
    updateProfitAgeGroupByProductCategory(ProfitAgeGroupByProductCategory);
    updateProfitCustomerGenderByProductCategory(ProfitCustomerGenderByProductCategory);
  }
}

// main data 1
function getValueDisplayTprofit(data) {
  let displayProfitValue = 0;
  const profitByCountry = {};
  data.forEach((item) => {
    if (!profitByCountry[item.Country]) {
      profitByCountry[item.Country] = 0;
    }
    displayProfitValue += item.Profit;
  });

  return displayProfitValue;
}
function getValueDisplayOrder(data) {
  return data.reduce((sum, item) => item["Order_Quantity"] + sum, 0);
}
function getValueProfitLowestCountry(data) {
  const profitByCountry = {};

  // Iterate through the data array and accumulate the profits by country
  data.forEach((item) => {
    const country = item.Country;
    const profit = item.Profit;

    if (!profitByCountry[country]) {
      profitByCountry[country] = 0;
    }
    profitByCountry[country] += profit;
  });

  // Find the country with the lowest total profit
  let lowestProfitCountry = null;
  let lowestProfit = Infinity;

  for (const country in profitByCountry) {
    if (profitByCountry[country] < lowestProfit) {
      lowestProfit = profitByCountry[country];
      lowestProfitCountry = country;
    }
  }

  return lowestProfit === Infinity ? 0 : lowestProfit;
}
function getProfitByCountry(data) {
  const profitByCountry = {};
  data.forEach((item) => {
    if (!profitByCountry[item.Country]) {
      profitByCountry[item.Country] = 0;
    }
    profitByCountry[item.Country] += item.Profit;
  });

  return {
    countries: Object.keys(profitByCountry),
    values: Object.values(profitByCountry),
  };
}
function getProfitbyAgeGroup(data) {
  const profitbyAgeGroup = {};
  data.forEach((item) => {
    if (!profitbyAgeGroup[item.Age_Group]) {
      profitbyAgeGroup[item.Age_Group] = 0;
    }
    profitbyAgeGroup[item.Age_Group] += item.Profit;
  });

  return {
    countries: Object.keys(profitbyAgeGroup),
    values: Object.values(profitbyAgeGroup),
  };
}
function getGenderDistribution(data) {
  const genderDistribution = { M: 0, F: 0 };
  data.forEach((item) => {
    if (item.Customer_Gender in genderDistribution) {
      genderDistribution[item.Customer_Gender] += 1;
    }
  });

  return Object.values(genderDistribution);
}
function getProfitProductCategory(data) {
  const profitbyProductCategory = {};
  data.forEach((item) => {
    if (!profitbyProductCategory[item.Product_Category]) {
      profitbyProductCategory[item.Product_Category] = 0;
    }
    profitbyProductCategory[item.Product_Category] += item.Profit;
  });

  return {
    countries: Object.keys(profitbyProductCategory),
    values: Object.values(profitbyProductCategory),
  };
}

// main data 2
function getProfitByFrance(data) {
  const profitByMonth = {};
  data.forEach((item) => {
    if (item.Country === "France" && (item.Month === "July" || item.Month === "August" || item.Month === "September" || item.Month === "October" || item.Month === "November" || item.Month === "December")) {
      if (!profitByMonth[item.Month]) {
        profitByMonth[item.Month] = 0;
      }
      profitByMonth[item.Month] += item.Profit;
    }
  });

  return {
    countries: Object.keys(profitByMonth), // Menggunakan bulan sebagai label
    values: Object.values(profitByMonth),
  };
}
// function getProfitBySubCategoryFrance(data) {
//   const profitBySubCategoryFrance = {};
//   data.forEach((item) => {
//     if (!profitBySubCategoryFrance[item.Sub_Category]) {
//       profitBySubCategoryFrance[item.Sub_Category] = 0;
//     }
//     profitBySubCategoryFrance[item.Sub_Category] += item.Profit;
//   });

//   return {
//     countries: Object.keys(profitBySubCategoryFrance),
//     values: Object.values(profitBySubCategoryFrance),
//   };
// }
function  getProfitBySubCategoryFrance(data) {
  const filteredMonth = ["July", "August", "September", "October", "November", "December"]
  const groupedAndSortedData = data.reduce((acc, item) => {
    const {Product_Category, Sub_Category, Profit} = item;
    const key = Product_Category + '-' + Sub_Category;

    if (item["Country"] === "France" && filteredMonth.includes(item.Month)) {
      if (!acc[key]) {
        acc[key] = {Product_Category, Sub_Category, Profit: 0};
      }

      acc[key].Profit += Profit;
    }
    return acc;
  }, {});

  const sortedData = Object.values(groupedAndSortedData).sort((a, b) => b.Profit - a.Profit);

  const subCategories = [...new Set(sortedData.map((item) => item.Sub_Category))];
  const categories = [...new Set(sortedData.map((item) => item.Product_Category))];

  //       data: subCategories.map((subCategory) => profitBySubCategoryFrance[category][subCategory] || 0),
  const dataset = categories.map((category, index) => {
    const color = getColor(index);
    return {
      label: category,
      data: sortedData.map(item => {
        if (item["Product_Category"] === category) {
          return item["Profit"]
        }
        return 0
      }),
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1,
    };
  });

  return {
    subCategories: subCategories,
    dataset: dataset,
  };
}

function getProfitProductCategoryInFrance(data) {
  const profitbyProductCategoryinFrance = {};
  data.forEach((item) => {
    if (!profitbyProductCategoryinFrance[item.Product_Category]) {
      profitbyProductCategoryinFrance[item.Product_Category] = 0;
    }
    profitbyProductCategoryinFrance[item.Product_Category] += item.Profit;
  });

  return {
    countries: Object.keys(profitbyProductCategoryinFrance),
    values: Object.values(profitbyProductCategoryinFrance),
  };
}


function getProfitAgeGroupByProductCategory(data) {
  const profitByAgeGroupAndCategory = {};

  data.forEach((item) => {
    if (item.Country === "France" && ["July", "August", "September", "October", "November", "December"].includes(item.Month)) {
      const ageGroup = item.Customer_Age;
      const category = item.Product_Category;

      if (!profitByAgeGroupAndCategory[category]) {
        profitByAgeGroupAndCategory[category] = {};
      }
      if (!profitByAgeGroupAndCategory[category][ageGroup]) {
        profitByAgeGroupAndCategory[category][ageGroup] = 0;
      }
      profitByAgeGroupAndCategory[category][ageGroup] += item.Profit;
    }
  });

  const categories = Object.keys(profitByAgeGroupAndCategory);
  const ageGroups = [...new Set(data.map((item) => item.Customer_Age))];
  const dataset = categories.map((category, index) => {
    const color = getColor(index);
    return {
      label: category,
      data: ageGroups.map((ageGroup) => profitByAgeGroupAndCategory[category][ageGroup] || 0),
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1,
    };
  });

  return {
    ageGroups: ageGroups,
    dataset: dataset,
  };
}

function getColor(index) {
  const colors = ["rgba(75, 192, 192, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(153, 102, 255, 0.6)", "rgba(201, 203, 207, 0.6)", "rgba(255, 159, 64, 0.6)", "rgba(255, 205, 86, 0.6)"];
  return colors[index % colors.length];
}

function getProfitByCustomerGenderAndProductCategory(data) {
  const profitByGenderAndCategory = {};

  data.forEach((item) => {
    if (item.Country === "France" && ["July", "August", "September", "October", "November", "December"].includes(item.Month)) {
      const gender = item.Customer_Gender;
      const category = item.Product_Category;

      if (!profitByGenderAndCategory[gender]) {
        profitByGenderAndCategory[gender] = {};
      }
      if (!profitByGenderAndCategory[gender][category]) {
        profitByGenderAndCategory[gender][category] = 0;
      }
      profitByGenderAndCategory[gender][category] += item.Profit;
    }
  });

  const genders = Object.keys(profitByGenderAndCategory);
  const categories = [...new Set(data.map((item) => item.Product_Category))];
  const dataset = genders.map((gender, index) => {
    const color = getColor(index);
    return {
      label: gender,
      data: categories.map((category) => profitByGenderAndCategory[gender][category] || 0),
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1,
    };
  });

  return {
    categories: categories,
    dataset: dataset,
  };
}

function getProfitCustomerGenderByProductCategory(data) {
  const profitByGenderAndCategory = {};

  data.forEach((item) => {
    if (item.Country === "France" && ["July", "August", "September", "October", "November", "December"].includes(item.Month)) {
      const gender = item.Customer_Gender;
      const category = item.Product_Category;

      if (!profitByGenderAndCategory[gender]) {
        profitByGenderAndCategory[gender] = {};
      }
      if (!profitByGenderAndCategory[gender][category]) {
        profitByGenderAndCategory[gender][category] = 0;
      }
      profitByGenderAndCategory[gender][category] += item.Profit;
    }
  });

  const genders = Object.keys(profitByGenderAndCategory);
  const categories = [...new Set(data.map((item) => item.Product_Category))];
  const dataset = genders.map((gender, index) => {
    const color = getColor(index);
    return {
      label: gender,
      data: categories.map((category) => profitByGenderAndCategory[gender][category] || 0),
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1,
    };
  });

  return {
    categories: categories,
    dataset: dataset,
  };
}



window.onload = main;

function getCheckboxValuesMonth() {
  // Get all checkbox elements with the class 'myCheckbox'
  const checkboxes = document.querySelectorAll(".myCheckboxMonth");
  const checkedValues = [];

  // Iterate over each checkbox
  checkboxes.forEach((checkbox) => {
    // Check if the checkbox is checked
    if (checkbox.checked) {
      // Add the value of the checked checkbox to the array
      checkedValues.push(checkbox.value);
    }
  });

  // Log and alert the values of the checked checkboxes
  console.log("Checked values:", checkedValues);
  alert("Checked values: " + checkedValues.join(", "));
}
function getCheckboxValuesYear() {
  // Get all checkbox elements with the class 'myCheckbox'
  const checkboxes = document.querySelectorAll(".myCheckboxYear");
  const checkedValues = [];

  // Iterate over each checkbox
  checkboxes.forEach((checkbox) => {
    // Check if the checkbox is checked
    if (checkbox.checked) {
      // Add the value of the checked checkbox to the array
      checkedValues.push(checkbox.value);
    }
  });

  // Log and alert the values of the checked checkboxes
  console.log("Checked values:", checkedValues);
  alert("Checked values: " + checkedValues.join(", "));
}

// dropdown month
document.getElementById("toggleDropdownbulan").addEventListener("click", function () {
  var dropdownContent = document.getElementById("dropdownbulan");
  if (dropdownContent.style.display === "none") {
    dropdownContent.style.display = "block";
  } else {
    dropdownContent.style.display = "none";
  }
});

// dropdown tahun
document.getElementById("toggleDropdowntahun").addEventListener("click", function () {
  var dropdownContent = document.getElementById("dropdowntahun");
  if (dropdownContent.style.display === "none") {
    dropdownContent.style.display = "block";
  } else {
    dropdownContent.style.display = "none";
  }
});

function destroyChart(chartId) {
  let chartStatus = Chart.getChart(chartId);
  if (chartStatus !== undefined) {
    chartStatus.destroy();
  }
}
// update data 1
function updateValueDisplayTprofit(id, data) {
  id.textContent = 0;
  let data1 = data / 1000000;
  const newValue = parseFloat(data1.toFixed(2)) + " M €";

  // Perbarui teks di elemen HTML
  id.textContent = newValue;
}
function updateValueDisplayQorder(id, data) {
  id.textContent = 0;
  let data2 = data / 1000000;
  const newValue = parseFloat(data2.toFixed(2)) + " M";

  // Perbarui teks di elemen HTML
  id.textContent = newValue;
}
function updateValueProfitLowestCountry(id, data) {
  const val = data / 1000000;
  id.textContent = val.toFixed(2) + " M €";
}
function updateTotalProfitChart(profitData) {
  const chartId = "TotalProfitChart";
  const ctx = document.getElementById(chartId).getContext("2d");
  destroyChart(chartId);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: profitData.countries,
      datasets: [
        {
          label: "# Profit",
          data: profitData.values,
          backgroundColor: ["rgb(21,65,122)", "rgb(21,65,122)", "rgb(21,65,122)", "rgb(21,65,122)", "rgb(21,65,122)", "rgb(21,65,122)"],
          borderColor: ["rgb(21,65,122)", "rgb(21,65,122)", "rgb(21,65,122)", "rgb(21,65,122)", "rgb(21,65,122)", "rgb(21,65,122)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: "y",
      aspectRatio: 3.2,
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          max: MAX_PROFIT_BY_COUNTRY,
        }
      },
    },
  });
}
function updateTotalProfitAgeChart(ageGroupData) {
  const chartId = "TotalProfitAgeChart";
  const ctx = document.getElementById(chartId).getContext("2d");
  destroyChart(chartId);

  new Chart(ctx, {
    type: "bar",
    aspectRatio: 0.1,
    data: {
      labels: ageGroupData.countries,
      datasets: [
        {
          label: "# Profit",
          data: ageGroupData.values,
          backgroundColor: ["rgb(21,65,122)", "rgb(21,65,122)", "rgb(21,65,122)", "rgb(21,65,122)"],
          borderColor: ["rgb(21,65,122)", "rgb(21,65,122)", "rgb(21,65,122)", "rgb(21,65,122)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      aspectRatio: 1.7,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function updateTotalProfitGenderChart(genderData) {
  const chartId = "TotalProfitGenderChart";
  destroyChart(chartId);

  const ctx = document.getElementById(chartId).getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    aspectRatio: 0.1,
    data: {
      labels: ["M", "F"],
      datasets: [
        {
          backgroundColor: ["rgb(34,73,171)", "rgb(171,27,1)"],
          data: genderData,
          borderWidth: 1,
        },
      ],
    },
    options: {
      aspectRatio: 1.5, // Anda dapat mengubah nilai ini untuk mendapatkan ukuran yang diinginkan
    },
  });
}

function updateTotalProfitProductCategory(ProductCategoryData) {
  const chartId = "TotalProfitProductCategory";
  const ctx = document.getElementById(chartId).getContext("2d");
  destroyChart(chartId);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ProductCategoryData.countries,
      datasets: [
        {
          label: "# Profit",
          data: ProductCategoryData.values,
          backgroundColor: ["rgb(21,65,122)", "rgb(21,65,122)", "rgb(21,65,122)"],
          borderColor: ["rgb(21,65,122)", "rgb(21,65,122)", "rgb(21,65,122)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      aspectRatio: 1.7,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// update data 2
function updateProfitByFrance(profitData) {
  const chartId = "ProfitByFrance";
  const ctx = document.getElementById(chartId).getContext("2d");
  destroyChart(chartId);

  new Chart(ctx, {
    type: "line",
    aspectRatio: 2.1, // Ubah tipe chart menjadi line chart
    data: {
      labels: profitData.countries, 
      datasets: [
        {
          label: "Total Profit Q3 & Q4 in France",
          data: profitData.values, // Gunakan data perubahan profit
          borderColor: "rgb(139, 5, 0)", // Warna garis
          backgroundColor: "rgba(153, 102, 255, 0.2)", // Warna area bawah garis
          borderWidth: 1,
          fill: false,
          lineTension: 0.1,
        },
      ],
    },
    options: {
      aspectRatio: 2.3,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}


function updateProfitBySubCategoryFrance(SubCategoryFranceData) {
  const chartId = "ProfitBySubCategoryFrance";
  const ctx = document.getElementById(chartId).getContext("2d");
  destroyChart(chartId);

  const datasets = SubCategoryFranceData.dataset.map((data, index) => ({
    label: data.label,
    data: data.data,
    backgroundColor: getBrightColors(index), // Menggunakan warna yang lebih terang
    borderColor: getBrightColors(index), // Menggunakan warna yang lebih terang
    borderWidth: 1,
  }));

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: SubCategoryFranceData.subCategories,
      datasets: datasets,
    },
    options: {
      aspectRatio: 2.3,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Fungsi untuk mendapatkan warna yang lebih terang
function getBrightColors(index) {
  const colors = [
    'rgb(21,101,192)', // Merah
    'rgb(158,42,43)', // Biru
    'rgb(255,179,0)', // Kuning
    
  ];

  // Jika index melebihi jumlah warna, gunakan warna default (abu-abu)
  if (index >= colors.length) {
    return 'rgba(199, 199, 199, 0.6)';
  }

  return colors[index];
}


function updateProfitByProductCategoryinFrance(ProductCategoryinFranceData) {
  const chartId = "ProfitByProductCategoryinFrance";
  const ctx = document.getElementById(chartId).getContext("2d");
  destroyChart(chartId);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ProductCategoryinFranceData.countries,
      datasets: [
        {
          label: "# Profit",
          data: ProductCategoryinFranceData.values,
          backgroundColor: ["rgb(21,65,122)", "rgb(21,65,122)", "rgb(21,65,122)"],
          borderColor: ["rgb(21,65,122)", "rgb(21,65,122)", "rgb(21,65,122)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      aspectRatio: 2.3,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function updateProfitCustomerGenderByProductCategory(profitData) {
  const chartId = "ProfitCustomerGenderByProductCategory";
  const ctx = document.getElementById(chartId).getContext("2d");
  destroyChart(chartId);

  const datasets = profitData.dataset.map((data, index) => ({
    label: data.label,
    data: data.data,
    backgroundColor: getBrightColorg(index), // Menggunakan warna yang lebih terang
    borderColor: getBrightColor(index), // Menggunakan warna yang lebih terang
    borderWidth: 1,
  }));

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: profitData.categories,
      datasets: datasets,
    },
    options: {
      aspectRatio: 2.3,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Fungsi untuk mendapatkan warna yang lebih terang
function getBrightColorg(index) {
  const colors = [
    'rgb(34,73,171)', // Merah
    'rgb(244,67,54)', // Biru
  ];

  // Jika index melebihi jumlah warna, gunakan warna default (abu-abu)
  if (index >= colors.length) {
    return 'rgba(199, 199, 199, 0.6)';
  }

  return colors[index];
}

function updateProfitAgeGroupByProductCategory(profitData) {
  const chartId = "ProfitAgeGroupByProductCategory";
  const ctx = document.getElementById(chartId).getContext("2d");
  destroyChart(chartId);

  const ageGroups = profitData.ageGroups;
  const datasets = profitData.dataset.map((data, index) => ({
    label: data.label,
    data: data.data,
    backgroundColor: getBrightColor(index), // Menggunakan warna yang lebih terang
    borderColor: getBrightColor(index), // Menggunakan warna yang lebih terang
    borderWidth: 1,
  }));

  const groupedAgeLabels = ["Seniors (64+)", "Youth (<25)", "Young Adults (25-34)", "Adults (35-64)"];
  const reversedDatasets = datasets.reverse(); // Balik urutan dataset secara keseluruhan

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: groupedAgeLabels,
      datasets: reversedDatasets,
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Fungsi untuk mendapatkan warna yang lebih terang
function getBrightColor(index) {
  const colors = [
    'rgb(244,67,54)', // Merah
    'rgb(30,136,229)', // Biru
    'rgb(255,193,7)', // Kuning// Hitam
  ];

  if (index >= colors.length) {
    return 'rgba(0, 0, 0, 0.6)';
  }

  return colors[index];
}
