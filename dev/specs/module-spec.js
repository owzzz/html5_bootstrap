var module = require('../js/modules/module');

describe("Example Module Suite", function() {
  it("it should add two numbers", function() {
    expect(module.addTwoNumbers(1,2)).toEqual(3);
  });
});