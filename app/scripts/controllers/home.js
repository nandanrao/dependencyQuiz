'use strict';

/**
 * @ngdoc function
 * @name dependencyQuizApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the dependencyQuizApp
 */
angular.module('dependencyQuizApp')
  .controller('HomeCtrl', function ($state, $firebase, $scope, auth, $location, db, helpers, myResults, myTests) {

  $scope.auth = auth;
  $scope.tests = myTests;
  $scope.myResults = myResults;
  this.formatDate = helpers.formatDate;

  this.hasTests= function(tests){
    return _.size($scope.tests) > 4
  };

  this.logout = function(){
    console.log('logging out')
    auth.$logout();
  }

  this.tester = function(){
    console.log(auth.user);
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
