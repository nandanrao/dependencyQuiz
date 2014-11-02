'use strict';

/**
 * @ngdoc service
 * @name dependencyQuizApp.helpers
 * @description
 * # helpers
 * Factory in the dependencyQuizApp.
 */
angular.module('dependencyQuizApp')
  .factory('helpers', function () {

    var levels = function(tq, test){
      var level = 1;
      (function recurser(tq){
        if (!tq.parent) return;
        level++
        recurser(test.testQuestions[tq.parent])
      })(tq)
      return level
    }

    var testLevels = function(test){
      // map reduce to get the max number of levels for any question in test
      var tl = _.reduce(_.map(test.testQuestions, function(tq){
        return levels(tq, test)
      }),
      function(a, b){
        return a > b ? a : b
      });
      // return
      return tl;
    }

    var dateFormatter = function(str){
      var date = new Date(str);
      return date.toLocaleString();
    }

    return {
      levels: levels,
      formatDate: dateFormatter,
      testLevels: testLevels,
    };
  });
