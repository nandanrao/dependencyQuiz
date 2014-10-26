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
        this.style = function(choice){
          return choice.chosen ? {'background-color': '#F99'} : {'background-color': 'default'}
        }
        this.choose = function(question, choice){
          var pickedOption = isAnswered(question);
          choice.chosen ? choice.chosen = false : choice.chosen = true;
          if (pickedOption) {
            pickedOption.chosen = false;
          }  
        }
        // On submission of a question!
        this.submit = function(question){
          console.log('emit')
          $scope.$emit('submit', question)
        };
      }
    };
  });
