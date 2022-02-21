const ctx = document.getElementById('myChart').getContext('2d');
const url = "http://api.coindesk.com/v1/bpi/historical/close.json";

 

  

  

axios.get(url)
.then(responseFromApi => {
    const dataFromApi = responseFromApi.data.bpi;

    const labels = Object.keys(dataFromApi);

    const data = {
        labels: labels,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: Object.values(dataFromApi),
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {}
    };

    const myChart = new Chart(ctx, config);
})
.catch(error => console.log(error));
