const ctx = document.getElementById('myChart').getContext('2d');
const baseUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";

let myChart;

const updateChart = (url) => {
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

            if(myChart !== undefined){
                myChart.destroy();
            }
            myChart = new Chart(ctx, config);
        })
        .catch(error => console.log(error));
};

updateChart(baseUrl);

const fromDateInput = document.getElementById("fromDate");
const toDateInput = document.getElementById("toDate");
const currencyInput = document.getElementById("currency");
let fromDate;
let toDate;

fromDateInput.addEventListener("change", (event) => {
    fromDate = String(event.target.value);
    if(toDate !== undefined && ( toDate.localeCompare(fromDate) > 0 )){
        updateChart(`${baseUrl}?start=${fromDate}&end=${toDate}&currency=${currencyInput.value}`);
    }
});

toDateInput.addEventListener("change", (event) => {
    toDate = String(event.target.value);
    if(fromDate !== undefined && ( toDate.localeCompare(fromDate) > 0 )){
        updateChart(`${baseUrl}?start=${fromDate}&end=${toDate}&currency=${currencyInput.value}`);
    }
});

currencyInput.addEventListener("change", () => {
    if(fromDate === undefined || toDate === undefined || ( toDate.localeCompare(fromDate) < 0 )){
        updateChart(`${baseUrl}?currency=${currencyInput.value}`);
    } else {
        updateChart(`${baseUrl}?start=${fromDate}&end=${toDate}&currency=${currencyInput.value}`);
    }
});