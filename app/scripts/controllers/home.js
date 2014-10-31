'use strict';

/**
 * @ngdoc function
 * @name dependencyQuizApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the dependencyQuizApp
 */
angular.module('dependencyQuizApp')
  .controller('HomeCtrl', function ($state, $firebase, $scope, auth, $location, db, myResults, myTests, formatDate) {

  $scope.auth = auth;

  $scope.tests = myTests;

  $scope.myResults = myResults;

  this.formatDate = formatDate;

  // $scope.myResults = myResults;
  // var date = new Date(myResults[0].start)
  // var pretty = date.toLocaleString()
  // console.log(pretty)
  // console.log(Date.parse(myResults[0].start))

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
