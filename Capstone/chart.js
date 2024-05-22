function loadJson(){
    fetch("csvjson.json")
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


const ctx = document.getElementById('myChart');
      
new Chart(ctx, {
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