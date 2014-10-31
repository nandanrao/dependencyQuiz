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
      controller: function($scope, $attrs){
        console.log("here")
        this.button = function(){
          console.log($attrs)
        }
      },
    }
  });

