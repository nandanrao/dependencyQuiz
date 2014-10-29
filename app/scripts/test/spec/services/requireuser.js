'use strict';

describe('Service: requireUser', function () {

  // load the service's module
  beforeEach(module('scriptsApp'));

  // instantiate service
  var requireUser;
  beforeEach(inject(function (_requireUser_) {
    requireUser = _requireUser_;
  }));

  it('should do something', function () {
    expect(!!requireUser).toBe(true);
  });

});
