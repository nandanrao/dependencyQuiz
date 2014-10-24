'use strict';

describe('Directive: dqNewQuestion', function () {

  // load the directive's module
  beforeEach(module('dependencyQuizApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dq-new-question></dq-new-question>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dqNewQuestion directive');
  }));
});
