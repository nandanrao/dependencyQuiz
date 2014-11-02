'use strict';

describe('Service: leave', function () {

  // load the service's module
  beforeEach(module('dependencyQuizApp'));

  // instantiate service
  var leave;
  beforeEach(inject(function (_leave_) {
    leave = _leave_;
  }));

  it('should do something', function () {
    expect(!!leave).toBe(true);
  });

});
