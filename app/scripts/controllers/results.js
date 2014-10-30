'use strict';

/**
 * @ngdoc function
 * @name dependencyQuizApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the dependencyQuizApp
 */
angular.module('dependencyQuizApp')
  .controller('ResultsCtrl', function ($scope, db, test, testResults) {
    console.log('in controller testresults:', testResults)
    testResults.$bindTo($scope, 'testResults').then(function(){
    })
  });
