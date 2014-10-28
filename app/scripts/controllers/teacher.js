'use strict';

angular.module('dependencyQuizApp')
  .controller("TeacherCtrl", function($scope, db){
 
  $scope.tests = db.data.tests;

  $scope.currentTest;

  $scope.createTest = {
    name: null,
  }

  this.setTest = function(test){
    $scope.currentTest = test;
  }

  this.newTest = function(){
    if ($scope.createTest.name){
      var test = db.newTest($scope.createTest.name);
      test.$bindTo($scope, 'currentTest');
    }
  }
});
