let request = require("request-promise");

function CityAlert(city) {
  this.status = city["Temperature"]["Metric"]["Value"];
  this.timestamp = city["EpochTime"];
  this.description = city["WeatherText"];
  this.locationId = city["Key"];
  this.host = city["Link"]
  this.cityName = city["EnglishName"]
}

CityAlert.prototype = {
  set status(temperature) {
    if (temperature <= -10 || temperature >= 45) {
      this._status = "critical";
    } else {
      this._status = "warning";
    }
    //this._status = "ok"
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

  get cityName() {
    return this._cityName;
  },

  set cityName(name) {
    this._cityName = name;
  },


  toJSON: function() {
    return {
      "status": this._status,
      "host": this._host,
      "description": this._description,
      "timestamp": this._timestamp,
      "locationId": this._locationId,
      "cityName": this._cityName
    }
  },

  toString: function() {
    return JSON.stringify(this.toJSON());
  }

}

module.exports = CityAlert;
