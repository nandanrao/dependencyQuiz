'use strict';

/**
 * @ngdoc service
 * @name dependencyQuizApp.leave
 * @description
 * # leave
 * Factory in the dependencyQuizApp.
 */
angular.module('dependencyQuizApp')
  .factory('leave', function (db) {
    var leave = function ($scope){
      if(!$scope.currentQuestion){
        db.deleteTestQSync($scope.currentTestQ.id, $scope.currentTest);
        return true;
      };
      if ($scope.newQuestion.$valid){
        return true
      }
      else {
        if (window.confirm('you have unsaved changes, you really wanna go?')){
          $scope.unbind();
          db.deleteQuestion($scope.currentQuestion.id)
          db.deleteTestQSync($scope.currentTestQ.id, $scope.currentTest);
          return true
        }
        else {
          return false
        }
      }
    };
    return leave
});
