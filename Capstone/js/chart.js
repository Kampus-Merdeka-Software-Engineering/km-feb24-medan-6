function loadJson(){
    fetch("ineuropa.json")
                .then((res) => {
                   return res.json();
                })
                .then((data) => 
                      console.log(data))
                .catch((error) => 
                       console.error("Unable to fetch data:", error));
}
loadJson()

function handleOnChangeMonth(element){
    let month = element.value

}

function loadJson(){
    fetch("infrance.json")
                .then((res) => {
                   return res.json();
                })
                .then((data) => 
                      console.log(data))
                .catch((error) => 
                       console.error("Unable to fetch data:", error));
}
loadJson()





const ctx1 = document.getElementById('myChart');
      
        new Chart(ctx1, {
          type: 'bar',
          data: {
            labels: ['United States', 'Australia', 'United Kingdom', 'Canada', 'germany', 'France'],
            datasets: [{
              label: '# Profit',
              data: [6187169, 3991425, 2402989, 2167470, 2058238, 2045254],
              
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

const ctx2 = document.getElementById('age');
      
        new Chart(ctx2, {
          type: 'bar',
          data: {
            labels: ['United States', 'Australia', 'United Kingdom', 'Canada', 'germany', 'France'],
            datasets: [{
              label: '# Profit',
              data: [6187169, 3991425, 2402989, 2167470, 2058238, 2045254],
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

const ctx3 = document.getElementById('customer_gender');
      
        new Chart(ctx3, {
          type: 'doughnut',
          data: {
            labels: ['Female', 'male'],
            datasets: [{
              label: '# Profit',
              data: [8953561, 9898984],
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

const ctx4 = document.getElementById('product_category');

  new Chart(ctx4, {
    type: 'bar',
    data: {
      labels: ['Accessories', 'Bikes', 'Clothing'],
      datasets: [{
        label: 'Profit',
        data: [10091084, 5898052, 2863409],
        backgroundColor: [
        'rgba(255,99,132)',
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

  const ctx5 = document.getElementById('total_profit');

  new Chart(ctx5, {
    type: 'line',
    data: {
      labels: ['December', 'September', 'August', 'November', 'July', 'October'],
      datasets: [{
        label: '# of Votes',
        data: [2153, 1393, 1322, 1264, 1209, 1079],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
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

  const ctx6 = document.getElementById('sub_category');

  new Chart(ctx6, {
    type: 'bar',
    data: {
      labels: ['Helmets', 'Tired', 'Road Bikes', 'jerseys', 'Bottles', 'Hydration'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
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

  const ctx7 = document.getElementById('agegrup_infrance');

  new Chart(ctx7, {
    type: 'bar',
    data: {
      labels: ['Adults(35-64)', 'Young Adults(25-34)', 'Youth(<25)', 'senior(64++)'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5],
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

  const ctx8 = document.getElementById('productcategory_infrance');

  new Chart(ctx8, {
    type: 'bar',
    data: {
        labels: ['Accessories', 'Bikes', 'Clothing'],
      datasets: [{
        label: '# of Votes',
        data: [455706, 262860, 123426],
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

  const ctx9 = document.getElementById('customergender_infrance');

  new Chart(ctx9, {
    type: 'bar',
    data: {
        labels: ['Accessories', 'Bikes', 'Clothing'],
      datasets: [{
        label: '# of Votes',
        data: [455706, 262860, 123426],
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
      
      
