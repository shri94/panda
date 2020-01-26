const request = require('request-promise');
let CityAlert = require("./city-alerts");

//const ACCUWEATHER_API_KEY = "VXKNIrJxoGufQcmyeZm3lk3gm7FZAG5i";
const ACCUWEATHER_API_KEY = "6ac6lHqSLbmW7RePsn7KC456OWzQEM9R";

const accuweather_base_url = "http://dataservice.accuweather.com/";

function fetchData(url) {
  // return new Promise(resolve, reject) {
    let requestUrl = url + "currentconditions/v1/topcities/50?" + `apikey=${ACCUWEATHER_API_KEY}`;
    request(requestUrl)
      .then(function(body) {
        let data = JSON.parse(body);
        // data = data.slice(0,10);
        let cities = data.map(city => {
          return new CityAlert(city);
        });
        return Promise.resolve(cities);
      })
      .then(function(cities) {
        let bigPandaPushPromises = cities.map(function(city) {
          return city.pushAlertToBigPanda();
        });
        return Promise.all(bigPandaPushPromises);
      })
      .then(function(res) {
        console.log(res);
      });
  
}

fetchData(accuweather_base_url);
