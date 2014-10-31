'use strict';

/**
 * @ngdoc function
 * @name dependencyQuizApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the dependencyQuizApp
 */
angular.module('dependencyQuizApp')
  .controller('ResultsCtrl', function ($scope, db, test, testResults, users, $state, formatDate) {

    console.log('test results', testResults)

    var levels = function(tq){
      var level = 1;
      (function recurser(tq){
        if (!tq.parent) return;
        level++
        recurser(test.testQuestions[tq.parent])
      })(tq)
      return level
    }

    this.levels = levels;
    
    $scope.testLevels = _.reduce(_.map(test.testQuestions, levels)
      ,function(a, b){
        return a > b ? a : b
      });

    $scope.testSize = _.size(test.testQuestions);

    $scope.users = users

    testResults.$bindTo($scope, 'testResults')

    this.formatDate = formatDate;

    this.answerStyle = function(ans){
      var color, height, width;

      color = ans.correct ? 'green' : 'red'
      width = 1/$scope.testSize*100 + '%'

      return {
        "background-color": color,
        "width": width
      }
    }

    // this.showInd = function(user){
      
    // }

  });
