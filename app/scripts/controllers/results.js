'use strict';

/**
 * @ngdoc function
 * @name dependencyQuizApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the dependencyQuizApp
 */
angular.module('dependencyQuizApp')
  .controller('ResultsCtrl', function ($scope, db, test, testResults, users, $state, formatDate, questions) {

    console.log('test results', testResults)

    var test = test;

    var levels = function(tq){
      console.log(tq);
      var level = 1;
      (function recurser(tq){
        if (!tq.parent) return;
        level++
        recurser(test.testQuestions[tq.parent])
      })(tq)
      return level
    }

    // this.levels = levels;

    $scope.questions = questions
    
    $scope.testLevels = _.reduce(_.map(test.testQuestions, levels)
      ,function(a, b){
        return a > b ? a : b
      });

    $scope.testSize = _.size(test.testQuestions);

    $scope.users = users

    testResults.$bindTo($scope, 'testResults')

    this.formatDate = formatDate;

    var green = '#0C6';
    var red = '#F33';

    this.answerStyle = function(ans){
      console.log(ans)
      var tq = _.find(test.testQuestions, { Q: ans.Q })

      var color, height, width;
      color = ans.correct ? green : red;
      width = 1/$scope.testSize*100 + '%';
      height = ($scope.testLevels / levels(tq))/$scope.testLevels *100 + '%';

      return {
        "border-color": color,
        "width": width,
        "height": height
      }
    }

    this.lineStyle = function(ans){
      var tq = _.find(test.testQuestions, { Q: ans.Q })
      
      var color, width;
      color = ans.correct ? green : red;
      width = Math.pow((levels(tq)/$scope.testLevels*10), 2.5) + 'px';

      return {
        "width" : width,
        "border-color": color,
      }
    }

    this.expAnswerStyle = function(ans){

      var color
      color = ans.correct ? green : red;
      return {
        "border-color": color,
        "color": color,
      }

    }

  });
