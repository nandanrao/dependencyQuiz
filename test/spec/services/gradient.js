'use strict';

describe('Service: gradient', function () {

  // load the service's module
  beforeEach(module('dependencyQuizApp'));

  // instantiate service
  var gradient;
  beforeEach(inject(function (_gradient_) {
    gradient = _gradient_;
  }));

  it('should do something', function () {
    expect(!!gradient).toBe(true);
  });

});
