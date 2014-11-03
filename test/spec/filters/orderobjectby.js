'use strict';

describe('Filter: orderobjectby', function () {

  // load the filter's module
  beforeEach(module('dependencyQuizApp'));

  // initialize a new instance of the filter before each test
  var orderobjectby;
  beforeEach(inject(function ($filter) {
    orderobjectby = $filter('orderobjectby');
  }));

  it('should return the input prefixed with "orderobjectby filter:"', function () {
    var text = 'angularjs';
    expect(orderobjectby(text)).toBe('orderobjectby filter: ' + text);
  });

});
