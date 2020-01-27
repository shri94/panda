let request = require("request-promise");

const BIG_PANDA_APP_KEY = "c4dd158bafc95a4c2c3a22065a888eac";
const BIG_PANDA_AUTH_TOKEN = "504c92e6d59f9deda21869cb4ca1cd72";
const BIG_PANDA_BASE_URL = "https://api.bigpanda.io/data/v2/alerts";

function CityAlert(city) {
  this.status = city["Temperature"]["Metric"]["Value"];
  this.host = city["EnglishName"];
  this.timestamp = city["EpochTime"];
  this.description = city["WeatherText"];
  this.locationId = city["Key"];
}

CityAlert.prototype = {
  appKey: BIG_PANDA_APP_KEY,
  set status(temperature) {
    if (temperature <= -10 || temperature >= 45) {
      this._status = "critical";
    } else {
      this._status = "warning";
    }
  },

  get status() {
    return this._status;
  },

  set timestamp(value) {
    this._timestamp = value
  },

  get timestamp() {
    return this._timestamp;
  },

  set description(weatherText) {
    this._description = weatherText;
  },

  get description() {
    return this._description;
  },

  set locationId(key) {
    this._locationId = key;
  },

  get locationId() {
    return this._locationId;
  },

  get host() {
    return this._host;
  },

  set host(host) {
    this._host = host;
  },

  toJSON: function() {
    return {
      "status": this._status,
      "host": this._host,
      "description": this._description,
      "timestamp": this._timestamp,
      "locationId": this._locationId
    }
  },

  toString: function() {
    return JSON.stringify(this.toJSON());
  },

  pushAlertToBigPanda: function() {
    let options = {
      method: 'POST',
      uri: BIG_PANDA_BASE_URL,
      headers: {
        "Authorization": `Bearer ${BIG_PANDA_AUTH_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.toJSON()),
    }
    return request(options);
  }

}

module.exports = CityAlert;
