'use strict';

/**
 * @ngdoc function
 * @name dependencyQuizApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the dependencyQuizApp
 */
angular.module('dependencyQuizApp')
  .controller('HomeCtrl', function ($state, $firebase, $scope, auth, $location, db) {

  $scope.auth = auth;


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

  });
