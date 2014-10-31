'use strict';

/**
 * @ngdoc service
 * @name dependencyQuizApp.formatDate
 * @description
 * # formatDate
 * Factory in the dependencyQuizApp.
 */
angular.module('dependencyQuizApp')
  .factory('formatDate', function () {
    var dateFormatter = function(str){
      var date = new Date(str);
      return date.toLocaleString();
    }
    return dateFormatter
  });
