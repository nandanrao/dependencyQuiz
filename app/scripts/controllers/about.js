'use strict';

/**
 * @ngdoc function
 * @name dependencyQuizApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dependencyQuizApp
 */
angular.module('dependencyQuizApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
