'use strict';

angular.module('dependencyQuizApp')
  .controller("NewTestCtrl", function($scope, db, $state){

  

  $scope.createTest = {
    name: null,
  }

  this.newTest = function(){
    if ($scope.createTest.name){
      var test = db.newTest($scope.createTest.name);
      test.$loaded().then(function(){
        $state.go('edit', {test: test.name})  
      })
    }
  }
});
