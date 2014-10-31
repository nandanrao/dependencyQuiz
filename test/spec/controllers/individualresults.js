'use strict';

describe('Controller: IndividualresultsCtrl', function () {

  // load the controller's module
  beforeEach(module('dependencyQuizApp'));

  var IndividualresultsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IndividualresultsCtrl = $controller('IndividualresultsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
