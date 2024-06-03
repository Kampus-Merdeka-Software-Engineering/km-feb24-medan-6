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
    const productCategory = getProductCategory(data1);
    const ageGroup = getAgeGroup(data1);

    // Update the charts with the transformed data
    updateTotalProfitChart(profitByCountry);
    updateTotalProfitGenderChart(genderDistribution);
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

  return Object.values(Product_Category);
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


const tppcc = document.getElementById('TotalProfitPCategoryChart');
const tpgc = document.getElementById('TotalProfitGenderChart');





// grafik no 1 Mengambil data dari ineuropa.json
// Mengambil data dari ineuropa.json
fetch("data_blmcleaning.json")
  .then((response) => response.json())
  .then((data) => {
    // Mengelompokkan data berdasarkan negara dan menjumlahkan profit
    var profitByCountry = {};
    data.forEach((entry) => {
      var country = entry.Country;
      var profit = entry.Profit;
      if (profitByCountry[country]) {
        profitByCountry[country] += profit;
      } else {
        profitByCountry[country] = profit;
      }
    });

    // Mengambil label (nama negara) dan nilai profit
    var labels = Object.keys(profitByCountry);
    var values = Object.values(profitByCountry);

    // Mengambil referensi ke elemen canvas
    var ctx = document.getElementById("myChart").getContext("2d");

    // Data untuk grafik
    var chartData = {
      labels: labels,
      datasets: [
        {
          label: "Total Profit by Country",
          data: values,
          backgroundColor: "rgb(75, 192, 192)", // Warna hijau
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 1,
        },
      ],
    };

    // Konfigurasi grafik
    var options = {
      indexAxis: "y", // Mengatur grafik menjadi horizontal
      scales: {
        x: {
          beginAtZero: true,
        },
      },
    };

    // Membuat grafik
    var chart = new Chart(ctx, {
      type: "bar", // Jenis grafik
      data: chartData, // Data
      options: options, // Konfigurasi
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

// and grafik no 1

// Mengambil data dari data_france.json
fetch("data_france.json")
  .then((response) => response.json())
  .then((data) => {
    // Mengelompokkan data berdasarkan age group
    var profitByAgeGroup = {};
    data.forEach((entry) => {
      var ageGroup = entry.Age_Group;
      var profit = entry.Profit;
      if (profitByAgeGroup[ageGroup]) {
        profitByAgeGroup[ageGroup] += profit;
      } else {
        profitByAgeGroup[ageGroup] = profit;
      }
    });

    // Mengambil label (age group) dan nilai profit
    var labels = Object.keys(profitByAgeGroup);
    var values = Object.values(profitByAgeGroup);

    // Mengambil referensi ke elemen canvas
    var ctx = document.getElementById("age").getContext("2d");

    // Data untuk grafik
    var chartData = {
      labels: labels,
      datasets: [
        {
          label: "Total Profit by Age Group",
          data: values,
          backgroundColor: [
            "rgb(75, 192, 192)", // Warna hijau
            "rgb(54, 162, 235)", // Warna biru
            "rgb(255, 206, 86)", // Warna kuning
            "rgb(255, 99, 132)", // Warna merah
            "rgb(153, 102, 255)", // Warna ungu
            "rgb(255, 159, 64)", // Warna oranye
          ],
          borderColor: ["rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(255, 206, 86)", "rgb(255, 99, 132)", "rgb(153, 102, 255)", "rgb(255, 159, 64)"],
          borderWidth: 1,
        },
      ],
    };

    // Konfigurasi grafik
    var options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    // Membuat grafik
    var chart = new Chart(ctx, {
      type: "bar", // Jenis grafik
      data: chartData, // Data
      options: options, // Konfigurasi
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
// and grafik no 2

// grafik no 3 Mengambil data dari data_france.json
fetch("data_france.json")
  .then((response) => response.json())
  .then((data) => {
    // Mengelompokkan data berdasarkan gender pelanggan
    var profitByGender = {};
    data.forEach((entry) => {
      var gender = entry.Customer_Gender;
      var profit = entry.Profit;
      if (profitByGender[gender]) {
        profitByGender[gender] += profit;
      } else {
        profitByGender[gender] = profit;
      }
    });

    // Mengambil label (gender pelanggan) dan nilai profit
    var labels = Object.keys(profitByGender);
    var values = Object.values(profitByGender);

    // Mengambil referensi ke elemen canvas
    var ctxDoughnut = document.getElementById("customer_gender").getContext("2d");

    // Data untuk Doughnut Chart
    var doughnutData = {
      labels: labels,
      datasets: [
        {
          label: "Total Profit by Customer Gender",
          data: values,
          backgroundColor: [
            "rgb(255, 99, 132)", // Warna merah
            "rgb(54, 162, 235)", // Warna biru
          ],
          borderColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          borderWidth: 1,
        },
      ],
    };

    // Membuat Doughnut Chart
    var doughnutChart = new Chart(ctxDoughnut, {
      type: "doughnut", // Jenis grafik
      data: doughnutData, // Data
      options: {}, // Konfigurasi (opsional)
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

// and grafik no 3

// grafik no 4 Mengambil data dari data_france.json
fetch("data_france.json")
  .then((response) => response.json())
  .then((data) => {
    // Mengelompokkan data berdasarkan kategori produk
    var profitByCategory = {};
    data.forEach((entry) => {
      var category = entry.Product_Category;
      var profit = entry.Profit;
      if (profitByCategory[category]) {
        profitByCategory[category] += profit;
      } else {
        profitByCategory[category] = profit;
      }
    });

    // Mengambil label (kategori produk) dan nilai profit
    var labels = Object.keys(profitByCategory);
    var values = Object.values(profitByCategory);

    // Mengambil referensi ke elemen canvas
    var ctx = document.getElementById("product_category").getContext("2d");

    // Data untuk grafik
    var chartData = {
      labels: labels,
      datasets: [
        {
          label: "Total Profit by Product Category",
          data: values,
          backgroundColor: "rgba(54, 162, 235, 0.2)", // Warna biru
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };

    // Konfigurasi grafik
    var options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    // Membuat grafik
    var chart = new Chart(ctx, {
      type: "bar", // Jenis grafik
      data: chartData, // Data
      options: options, // Konfigurasi
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

// and grafik no 4

// grafik no 5 Mengambil data dari data_france.json
fetch("data_france.json")
  .then((response) => response.json())
  .then((data) => {
    // Filter data untuk kuartal ketiga (Q3) dan kuartal keempat (Q4) di Prancis
    var filteredData = data.filter((entry) => {
      return entry.Country === "France" && (entry.Month === "July" || entry.Month === "August" || entry.Month === "September" || entry.Month === "October" || entry.Month === "November" || entry.Month === "December");
    });

    // Mengelompokkan data berdasarkan bulan dan menghitung total profit
    var profitByMonth = {};
    filteredData.forEach((entry) => {
      var month = entry.Month;
      var profit = entry.Profit;
      if (profitByMonth[month]) {
        profitByMonth[month] += profit;
      } else {
        profitByMonth[month] = profit;
      }
    });

    // Mengambil nama bulan dalam urutan yang benar
    var months = ["July", "August", "September", "October", "November", "December"];
    var labels = months.filter((month) => profitByMonth.hasOwnProperty(month));
    var values = labels.map((month) => profitByMonth[month]);

    // Mengambil referensi ke elemen canvas
    var ctx = document.getElementById("total_profit").getContext("2d");

    // Data untuk grafik
    var chartData = {
      labels: labels,
      datasets: [
        {
          label: "Total Profit Q3 & Q4 in France",
          data: values,
          backgroundColor: "rgba(75, 192, 192, 0.2)", // Warna biru-hijau
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          fill: false,
          lineTension: 0.1,
        },
      ],
    };

    // Konfigurasi grafik
    var options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    // Membuat grafik
    var chart = new Chart(ctx, {
      type: "line", // Jenis grafik
      data: chartData, // Data
      options: options, // Konfigurasi
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
// and grafik no 5

// grafik no 6 Mengambil data dari data_france.json
fetch("data_france.json")
  .then((response) => response.json())
  .then((data) => {
    // Filter data untuk kuartal ketiga (Q3) dan kuartal keempat (Q4) di Prancis
    var filteredData = data.filter((entry) => {
      return entry.Country === "France" && (entry.Month === "July" || entry.Month === "August" || entry.Month === "September" || entry.Month === "October" || entry.Month === "November" || entry.Month === "December");
    });

    // Mengelompokkan data berdasarkan sub kategori produk
    var profitBySubCategory = {};
    filteredData.forEach((entry) => {
      var subCategory = entry.Sub_Category;
      var profit = entry.Profit;
      if (profitBySubCategory[subCategory]) {
        profitBySubCategory[subCategory] += profit;
      } else {
        profitBySubCategory[subCategory] = profit;
      }
    });

    // Mengambil label (sub kategori produk) dan nilai profit
    var labels = Object.keys(profitBySubCategory);
    var values = Object.values(profitBySubCategory);

    // Mengambil referensi ke elemen canvas
    var ctx = document.getElementById("sub_category").getContext("2d");

    // Data untuk grafik
    var chartData = {
      labels: labels,
      datasets: [
        {
          label: "Total Profit Q3 & Q4 in France by Sub Category",
          data: values,
          backgroundColor: "rgba(153, 102, 255, 0.2)", // Warna ungu
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    };

    // Konfigurasi grafik
    var options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    // Membuat grafik
    var chart = new Chart(ctx, {
      type: "bar", // Jenis grafik
      data: chartData, // Data
      options: options, // Konfigurasi
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
// and grafik no 6

// grafik no 7 Mengambil data dari data_france.json
fetch("data_france.json")
  .then((response) => response.json())
  .then((data) => {
    // Mengelompokkan data berdasarkan kelompok usia dan kategori produk
    var profitByAgeGroupAndCategory = {};
    data.forEach((entry) => {
      var ageGroup = entry.Customer_Age;
      var category = entry.Product_Category;
      var profit = entry.Profit;
      var key = ageGroup + "-" + category;
      if (profitByAgeGroupAndCategory[key]) {
        profitByAgeGroupAndCategory[key] += profit;
      } else {
        profitByAgeGroupAndCategory[key] = profit;
      }
    });

    // Mengambil label (kelompok usia dan kategori produk) dan nilai profit
    var labels = Object.keys(profitByAgeGroupAndCategory);
    var values = Object.values(profitByAgeGroupAndCategory);

    // Mengambil referensi ke elemen canvas
    var ctx = document.getElementById("agegrup_infrance").getContext("2d");

    // Data untuk grafik
    var chartData = {
      labels: labels,
      datasets: [
        {
          label: "Profit by Age Group and Product Category in France",
          data: values,
          backgroundColor: "rgba(75, 192, 192, 0.2)", // Warna biru-hijau
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    // Konfigurasi grafik
    var options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    // Membuat grafik
    var chart = new Chart(ctx, {
      type: "bar", // Jenis grafik
      data: chartData, // Data
      options: options, // Konfigurasi
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
// and grafik no 7

// grafik no 8 Mengambil data dari data_france.json
fetch("data_france.json")
  .then((response) => response.json())
  .then((data) => {
    // Mengelompokkan data berdasarkan kategori produk
    var profitByCategory = {};
    data.forEach((entry) => {
      var category = entry.Product_Category;
      var profit = entry.Profit;
      if (profitByCategory[category]) {
        profitByCategory[category] += profit;
      } else {
        profitByCategory[category] = profit;
      }
    });

    // Mengambil label (kategori produk) dan nilai profit
    var labels = Object.keys(profitByCategory);
    var values = Object.values(profitByCategory);

    // Mengambil referensi ke elemen canvas
    var ctx = document.getElementById("productcategory_infrance").getContext("2d");

    // Data untuk grafik
    var chartData = {
      labels: labels,
      datasets: [
        {
          label: "Total Profit by Product Category in France",
          data: values,
          backgroundColor: "rgba(255, 99, 132, 0.2)", // Warna merah
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };

    // Konfigurasi grafik
    var options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    // Membuat grafik
    var chart = new Chart(ctx, {
      type: "bar", // Jenis grafik
      data: chartData, // Data
      options: options, // Konfigurasi
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
// and grafik no 8

// grafik no 9 Mengambil data dari data_france.json
fetch("data_france.json")
  .then((response) => response.json())
  .then((data) => {
    // Mengelompokkan data berdasarkan gender pelanggan dan kategori produk
    var profitByGenderAndCategory = {};
    data.forEach((entry) => {
      var gender = entry.Customer_Gender;
      var category = entry.Product_Category;
      var profit = entry.Profit;
      var key = gender + "-" + category;
      if (profitByGenderAndCategory[key]) {
        profitByGenderAndCategory[key] += profit;
      } else {
        profitByGenderAndCategory[key] = profit;
      }
    });

    // Mengambil label (gender dan kategori produk) dan nilai profit
    var labels = Object.keys(profitByGenderAndCategory);
    var values = Object.values(profitByGenderAndCategory);

    // Mengambil referensi ke elemen canvas
    var ctx = document.getElementById("customergender_infrance").getContext("2d");

    // Data untuk grafik
    var chartData = {
      labels: labels,
      datasets: [
        {
          label: "Profit by Customer Gender and Product Category",
          data: values,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };

    // Konfigurasi grafik
    var options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    // Membuat grafik
    var chart = new Chart(ctx, {
      type: "bar", // Jenis grafik
      data: chartData, // Data
      options: options, // Konfigurasi
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
