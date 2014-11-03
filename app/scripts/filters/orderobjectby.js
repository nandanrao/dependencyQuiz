'use strict';

/**
 * @ngdoc filter
 * @name dependencyQuizApp.filter:orderobjectby
 * @function
 * @description
 * # orderobjectby
 * Filter in the dependencyQuizApp.
 */
angular.module('dependencyQuizApp') 
  .filter('orderObjectBy', function() {
    return function (items, field, reverse) {
      var filtered = [];
      angular.forEach(items, function(item) {
        filtered.push(item);
      });
      function index(obj, i) {
        return obj[i];
      }
      filtered.sort(function (a, b) {
        var comparator;
        var reducedA = field.split('.').reduce(index, a);
        var reducedB = field.split('.').reduce(index, b);
        if (reducedA === reducedB) {
          comparator = 0;
        } 
        else if (!reducedA || reducedA > reducedB){
          comparator = 1
        }
        else {
          comparator = -1
        }
        return comparator;
      });
      if (reverse) {
        filtered.reverse();
      }
      return filtered;
    };
  });

