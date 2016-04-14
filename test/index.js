var expect = require("chai").expect;
var camelcaseKeysDeep = require("../index");

describe("camelcaseKeysDeep", function() {
  var extract;

  it("should deeply camelcase the keys of a JSON object", function() {
    var json = {unicorn_rainbow: {foo_bar: 1}};
    expect(camelcaseKeysDeep(json)).to.be.deep.equal({unicornRainbow: {fooBar: 1}});
  });

  it("should raise if camelcased key would overwrite existing key of the JSON object", function() {
    var json = {unicorn_rainbow: {foo_bar: 1, fooBar: 2}};
    expect(function() {
      camelcaseKeysDeep(json);
    }).to.throw();

    json = {foo: 1}
    expect(function() {
      camelcaseKeysDeep(json);
    }).to.not.throw();
  });

});

