'use strict';

/**
 * @ngdoc function
 * @name dependencyQuizApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the dependencyQuizApp
 */
angular.module('dependencyQuizApp')
  .controller('HomeCtrl', function ($state, $firebase, fb, $scope, auth, $location, db, helpers, myResults, myTests, hasTests) {



  $scope.auth = auth;
  $scope.tests = myTests;
  console.log($scope.tests)
  $scope.myResults = myResults;
  $scope.hasTests = hasTests;
  this.formatDate = helpers.formatDate;

  this.logout = function(){
    console.log('logging out')
    auth.$logout();
  }

  this.newTest = function(){
    console.log('making new test')
    $location.path('/newtest')
  }

  this.editTest = function(test){
    $state.go('edit', {test: test.name})
  }

  this.viewResults = function(test){
    console.log("view", test.name)
    $state.go('results', {test: test.name})
  }

});
