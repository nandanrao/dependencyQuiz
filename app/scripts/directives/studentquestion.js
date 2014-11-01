'use strict';

/**
 * @ngdoc directive
 * @name dependencyQuizApp.directive:studentQuestion
 * @description
 * # studentQuestion
 */
angular.module('dependencyQuizApp')
  .directive('studentQuestion', function () {
    return {
      templateUrl: 'views/studentQuestion.html',
      restrict: 'E',
      scope: true,
      controllerAs: 'studentQuestion',
      controller: function($scope, $attrs, studentHelpers){
        // Helpers for selecting answers
        var isAnswered = studentHelpers.isAnswered
        this.style = function(i){
          if (!$scope.currentResults) return;
          return i === $scope.currentResults.answer ? {'background-color': '#F99'} : {'background-color': 'default'}
        }
        this.choose = function(i){
          $scope.currentResults.answer = i;
        }
        // On submission of a question!
        this.submit = function(results){
          $scope.$emit('submit', results)
        };
      }
    };
  });
