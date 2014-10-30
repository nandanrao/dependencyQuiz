'use strict';

/**
 * @ngdoc controller
 * @name dependencyQuizApp.controller:edit
 * @description
 * # edit
 */
angular.module('dependencyQuizApp')
  .controller('EditCtrl', function ($scope, $stateParams, db, test){

    // __________Next/Dependency btn Dir________________________

    console.log(db.data.questions);
    db.data.questions.$save().then(function(){
      console.log(db.data.questions)
    })

    this.next = function(){
      if (!leaveAndCreate()) return;
      if ($scope.currentTestQ.next){
        $scope.currentTestQ = $scope.currentTestQ.next;
      }
      else {
        var thisQuestion = db.newTestQ($scope.currentTest);
        $scope.currentTestQ.next = thisQuestion.id;
        thisQuestion.previous = $scope.currentTestQ.id;
        thisQuestion.parent = $scope.currentTestQ.parent || null;
        $scope.currentTestQ = thisQuestion.id;  
      }
    }

    this.dependency = function(){
      if (!leaveAndCreate()) return;
      var thisQuestion = db.newTestQ($scope.currentTest);
      $scope.currentTestQ.dependency = thisQuestion.id
      thisQuestion.parent = $scope.currentTestQ.id;
      $scope.currentTestQ = thisQuestion.id;
    };

    function leaveAndCreate(){
      if (!$scope.newQuestion.$valid){
        alert('you gotta finish this one before making more!')
        return false
      }
      else {
        db.data.questions.$save();
        return true;
      }
    };

    //_________________________________________

    this.newQuestionBtn = function(){
      var Q = db.newQ($scope.currentTest);
      Q.$loaded().then(function(){
        $scope.currentQuestion = Q;
        console.log(db.data.questions)
      })
      // console.log(Q)
    }

    this.oldQuestionBtn = function(){
      // console.log(db.data.questions)
      $scope.oldQuestions = _.toArray(db.data.questions)
      console.log($scope.oldQuestions)
      // show lookup form
    }

    // Used when picking an old question...
    this.setQ = function(q){
      $scope.currentQuestion = q;
    }

    // window.onbeforeunload = function(e){
    //   if (leave())
    //   confirm('youre leaving!!')
    // }

    this.submit = function(){
      console.log($scope.nextQuestions)
    }

    var hasFirst = function(test){
      return _.find(test.testQuestions, 'first')
    }

    var createFirst = function(test){
      var t = db.newTestQ(test);
      t.first = true;
      console.log(t.id)
      return t;
    }

    // Initialize 
    test.$bindTo($scope, 'currentTest').then(function(obj){
      $scope._currentTQ = hasFirst($scope.currentTest) ? hasFirst($scope.currentTest).id : createFirst($scope.currentTest).id;
      $scope._currentQ;
      $scope.oldQuestions;
    });
    
    // $scope.currentTestQ
    Object.defineProperty($scope, 'currentTestQ', {
      get: function(){
        return $scope.currentTest.testQuestions[$scope._currentTQ]
      },
      set: function(id){
        console.log('set currentTestQ')
        $scope._currentTQ = id
      }
    })

    // $scope.currentQuestion
    Object.defineProperty($scope, 'currentQuestion', {
      get: function(){
        return db.data.questions[$scope.currentTestQ.Q]
      },
      set: function(q){
        $scope.currentTestQ.Q = q.id
        console.log($scope.currentTestQ);
      }
    })
    
  });