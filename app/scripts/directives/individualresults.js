'use strict';

/**
 * @ngdoc function
 * @name dependencyQuizApp.directive:individualresults
 * @description
 * # individualresults
 * Directive of the dependencyQuizApp
 */

 angular.module('dependencyQuizApp')
  .directive('individualResults', function () {
    return {    
      restrict: 'EA',
      templateUrl: 'views/individualresults.html',
      controllerAs: 'individual',
      scope: true,
      controller: function($scope, $attrs, helpers){
        
        // creates the tree line/graphic
        this.lineStyle = function(ans){
          var tq = _.find($scope.test.testQuestions, { Q: ans.Q })
          var width = Math.pow((helpers.levels(tq, $scope.test)/$scope.testLevels*10), 2.3) + 'px';
          return {
            "width" : width,
          }
        }

      },
      link: function(scope, el, attrs, ctrl){
        scope.username = attrs.username
      }
    }
  });

