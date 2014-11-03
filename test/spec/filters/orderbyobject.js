'use strict';

describe('Filter: orderByObject', function () {

  // load the filter's module
  beforeEach(module('dependencyQuizApp'));

  // initialize a new instance of the filter before each test
  var orderByObject;
  beforeEach(inject(function ($filter) {
    orderByObject = $filter('orderByObject');
  }));

  it('should return the input prefixed with "orderByObject filter:"', function () {
    var text = 'angularjs';
    expect(orderByObject(text)).toBe('orderByObject filter: ' + text);
  });

});
