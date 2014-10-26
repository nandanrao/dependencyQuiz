'use strict';

/**
 * @ngdoc service
 * @name dependencyQuizApp.studentHelpers
 * @description
 * # studentHelpers
 * Factory in the dependencyQuizApp.
 */
angular.module('dependencyQuizApp')
  .factory('studentHelpers', function () {
    // Determines if a question is answered, and what the answer is
    var isAnswered = function(question){
      var ans;
      question.choices.forEach(function(choice){
        if (choice.chosen === true) {
          ans = choice;
        }
      })
      return ans;
    };
    // Public API here
    return {
      isAnswered: isAnswered
    };
  });
