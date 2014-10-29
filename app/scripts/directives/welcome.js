'use strict';

/**
 * @ngdoc directive
 * @name dependencyQuizApp.directive:welcome
 * @description
 * # welcome
 */
angular.module('dependencyQuizApp')
  .directive('welcome', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/welcome.html',
      controller: 'WelcomeCtrl'
    };
  });
