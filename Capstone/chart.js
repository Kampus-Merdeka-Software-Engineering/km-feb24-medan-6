function loadJson(){
    fetch("data_france.json")
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

const ages = [32, 33, 16, 40];
const result = ages.filter(checkAdult);

function checkAdult(age) {
  return age >= 18;
}


const ttpch = document.getElementById('TotalProfitChart');
const tpsC = document.getElementById('TotalProfitAgeChart');
const tppcc = document.getElementById('TotalProfitPCategoryChart');
const tpgc = document.getElementById('TotalProfitGenderChart');

      
new Chart(ttpch, {
  type: 'bar',
  data: {
    labels: ['United States', 'Australia', 'United Kingdom', 'Canada', 'germany', 'France'],
    datasets: [{
      label: '# Profit',
      data: [6187169, 3991425, 2402989, 2167470, 2058238, 2045254],
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


new Chart(tpgc, {
  type: 'doughnut',
  data: {
    labels: ['M', 'F'],
    datasets: [{
      data: [52.5, 47.5],
      borderWidth: 1
    }]
  }
});

