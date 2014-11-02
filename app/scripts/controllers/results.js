'use strict';

/**
 * @ngdoc function
 * @name dependencyQuizApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the dependencyQuizApp
 */

angular.module('dependencyQuizApp')
  .controller('ResultsCtrl', function ($scope, db, helpers, $state, test, testResults, users, questions) {

    testResults.$bindTo($scope, 'testResults')
    $scope.test = test;
    $scope.questions = questions;
    $scope.users = users;
    $scope.testLevels = helpers.testLevels($scope.test)
    $scope.testSize = _.size(test.testQuestions);
    this.formatDate = helpers.formatDate;

    testResults.$inst().$ref().on('child_added', function(snap){
      console.log(snap.val());
      var result = snap.val();
      db.getUserFromResults(result).$loaded().then(function(user){
        $scope.users[user.id] = user;
      })
    })

    this.answerStyle = function(ans){
      var tq = _.find($scope.test.testQuestions, { Q: ans.Q })
      var width = 1/$scope.testSize*100 + '%';
      var height = (($scope.testLevels + 1 - helpers.levels(tq, $scope.test))/$scope.testLevels) *100 + '%';
      return {
        "width": width,
        "height": height
      }
    }

  });
