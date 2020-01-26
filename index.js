const request = require('request-promise');

//const ACCUWEATHER_API_KEY = "VXKNIrJxoGufQcmyeZm3lk3gm7FZAG5i";
const ACCUWEATHER_API_KEY = "6ac6lHqSLbmW7RePsn7KC456OWzQEM9R";

const BIG_PANDA_API_KEY = "BPUAK6f40c1109d27631868394e381f9ea888";

const accuweather_base_url = "http://dataservice.accuweather.com/";

function fetchData(url) {
  // return new Promise(resolve, reject) {
    let requestUrl = url + "currentconditions/v1/topcities/50?" + `apikey=${ACCUWEATHER_API_KEY}`;
    request(requestUrl)
      .then(function(body) {
        let data = JSON.parse(body);
        // data = data.slice(0,10);
        let cities = data.map(item => {
          return item['Key'];
        });
        return Promise.resolve(cities);
      })
      // .then(function(cities) {
      //   let weatherAlarmCityPromises = cities.map(function(city) {
      //     let requestUrl = url + `alarms/v1/5day/${city}?` + `apikey=${ACCUWEATHER_API_KEY}`;
      //       return request(requestUrl);
      //   });
      //   return Promise.all(weatherAlarmCityPromises);
      // })
      // .then(function(weatherAlarmsData) {
      //   console.log(weatherAlarmsData);
      // });
  // }
}

fetchData(accuweather_base_url);
