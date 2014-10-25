'use strict';

/**
 * @ngdoc directive
 * @name dependencyQuizApp.directive:dqNewQuestion
 * @description
 * # dqNewQuestion
 */
angular.module('dependencyQuizApp')
  .directive('dqNewQuestion', function () {
    return {    
      restrict: 'A',
      templateUrl: 'views/newQuestion.html',
      controllerAs: 'dqNewQuestion',
      controller: function($scope, $attrs){
        this.addChoice = function(){
          $scope.currentQuestion.choices.push({value: null})
        };  
      },
      link: function(scope, el, attrs){
        var name = el[0].name
        scope.$watch('currentQuestion', function(curr, old){
          if (curr){
            var choices = curr.choices
            if (choices.length > 1 && _.some(choices, 'correct')){
              scope[name].$setValidity('custom', true);
            }
            else { 
              scope[name].$setValidity('custom', false);  
            }
          }
        }, true);
      }
    };
  });

