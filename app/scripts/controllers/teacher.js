'use strict';

angular.module('dependencyQuizApp')
  .controller("TeacherCtrl", function($scope, db){
 
  $scope.tests = db.data.tests;

  $scope.currentTest;

  $scope.createTest = {
    name: 'holla'
  }

  this.setTest = function(test){
    $scope.currentTest = test;
    console.log($scope.currentTest)
  }

  this.newTest = function(){
    console.log($scope.createTest.name)
    $scope.currentTest = db.newTest($scope.createTest.name)
  }
});
