'use strict';

describe('Service: formatDate', function () {

  // load the service's module
  beforeEach(module('dependencyQuizApp'));

  // instantiate service
  var formatDate;
  beforeEach(inject(function (_formatDate_) {
    formatDate = _formatDate_;
  }));

  it('should do something', function () {
    expect(!!formatDate).toBe(true);
  });

});
