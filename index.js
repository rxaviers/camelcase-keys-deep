var camelCase = require("lodash.camelcase");

module.exports = function deepObjectPropertiesToCamelCase(obj) {
  // 1. Ignore falsy, which includes `null` whose typeof is `object`.
  if (!obj) {
    return obj
  }

  // 2. Ignore Date (whose typeof is `object` too)
  if (obj instanceof Date) {
    return obj
  }

  // 3. Array (whose typeof is `object` too), recursive call to each item
  if (Array.isArray(obj)) {
    return obj.map((element) => deepObjectPropertiesToCamelCase(element))
  }

  // 4. Object which need to be parsed
  if (typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [
      key,
      value,
    ]) => {
      const camelCasedKey = camelCase(key)

      // Make sure to not overwrite the camel case version of the property, if it does exist
      // e.g. { fooBar: "I want to be parsed", FooBar: "Don't overwrite me please" }
      if (key !== camelCasedKey && camelCasedKey in obj) {
        throw new Error(
          `Camelcased key \`${camelCasedKey
          }\` would overwrite existing key of the given JSON object`,
        )
      }

      const updatedAcc = {
        ...acc,
        [camelCasedKey]: deepObjectPropertiesToCamelCase(value),
      }

      return updatedAcc
    }, {})
  }

  // 5. Any other cases (e.g. String or Number)
  return obj
}
