'use strict';

/**
 * @ngdoc directive
 * @name dependencyQuizApp.directive:accordion
 * @description
 * # accordion
 */
angular.module('dependencyQuizApp')
  .directive('accordion', function () {
    return {
      restrict: 'A',
      controller: function($scope, $attrs){
        $scope.expanded = false;
        $scope.click = function(){
          $scope.expanded = !$scope.expanded;
        }
      }
    };
  });
