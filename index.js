var camelcase = require("camelcase");
var mapObj = require("map-obj");

module.exports = function(obj) {
  return JSON.parse(JSON.stringify(obj, function(key, value) {
    if (typeof value === "object" && !Array.isArray(value)) {
      value = mapObj(value, function(_key, _value) {
        var newKey = camelcase(_key);
        if (newKey in value) {
          throw new Error("Camelcased key `" + newKey + "` would overwrite existing key of the given JSON object");
        }
        return [newKey, _value];
      });
    }
    return value;
  }));
}
