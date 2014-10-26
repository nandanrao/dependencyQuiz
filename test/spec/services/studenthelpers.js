'use strict';

describe('Service: studentHelpers', function () {

  // load the service's module
  beforeEach(module('dependencyQuizApp'));

  // instantiate service
  var studentHelpers;
  beforeEach(inject(function (_studentHelpers_) {
    studentHelpers = _studentHelpers_;
  }));

  it('should do something', function () {
    expect(!!studentHelpers).toBe(true);
  });

});
