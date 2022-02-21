const url = "http://api.coindesk.com/v1/bpi/historical/close.json";

axios.get(url)
.then(responseFromApi => console.log(responseFromApi))
.catch(error => console.log(error));
