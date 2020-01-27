const request = require('request-promise');
let CityAlert = require("./city-alerts");

//const ACCUWEATHER_API_KEY = "VXKNIrJxoGufQcmyeZm3lk3gm7FZAG5i";
const ACCUWEATHER_API_KEY = "6ac6lHqSLbmW7RePsn7KC456OWzQEM9R";
const accuweather_base_url = "http://dataservice.accuweather.com/";

const BIG_PANDA_APP_KEY = "c4dd158bafc95a4c2c3a22065a888eac";
const BIG_PANDA_AUTH_TOKEN = "504c92e6d59f9deda21869cb4ca1cd72";
const BIG_PANDA_BASE_URL = "https://api.bigpanda.io/data/v2/alerts";

function fetchData(url) {
  // return new Promise(resolve, reject) {
    let requestUrl = url + "currentconditions/v1/topcities/100?" + `apikey=${ACCUWEATHER_API_KEY}`;
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
        // let bigPandaPushPromises = cities.map(function(city) {
        //   return city.pushAlertToBigPanda();
        // });
        // return Promise.all(bigPandaPushPromises);
        // return Promise.resolve(cities[0].toString())
        // return cities[0].pushAlertToBigPanda();


        let cityJSONS = cities.map(function(city) {
          return city.toJSON();
        });
        let pandasRequestBody = {
          "app_key": BIG_PANDA_APP_KEY,
          "alerts": cityJSONS
        };
        console.log(pandasRequestBody)
        return pandasRequest(pandasRequestBody);

      })
      .then(function(res) {
        console.log(res);
      });

}

function pandasRequest(pandasRequestBody) {
  let options = {
    method: 'POST',
    uri: BIG_PANDA_BASE_URL,
    headers: {
      "Authorization": `Bearer ${BIG_PANDA_AUTH_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pandasRequestBody),
  }
  return request(options);
}

fetchData(accuweather_base_url);
