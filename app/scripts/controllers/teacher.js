'use strict';

angular.module('dependencyQuizApp')
  .controller("TeacherCtrl", function($scope, db){

  $scope.currentTest;

  $scope.createTest = {
    name: null,
  }

  this.newTest = function(){
    if ($scope.createTest.name){
      var test = db.newTest($scope.createTest.name);
      test.$bindTo($scope, 'currentTest');
    }
  }
});
