'use strict';

/**
 * @ngdoc controller
 * @name dependencyQuizApp.controller:edit
 * @description
 * # edit
 */
angular.module('dependencyQuizApp')
  .controller('EditCtrl', function ($scope, $stateParams, db, leave, test, questions){

    // __________Next/Dependency btn Dir________________________

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
      if ($scope.currentTestQ.dependency){
        $scope.currentTestQ = $scope.currentTestQ.dependency;
      }
      else {
        var thisQuestion = db.newTestQ($scope.currentTest);
        $scope.currentTestQ.dependency = thisQuestion.id
        thisQuestion.parent = $scope.currentTestQ.id;
        $scope.currentTestQ = thisQuestion.id;
      }
    };

    function leaveAndCreate(){
      if (!$scope.newQuestion.$valid){
        alert('you gotta finish this one before making more!')
        return false
      }
      else {
        return true;
      }
    };

    //_________________________________________

    this.newQuestionBtn = function(){
      var Q = db.newQ($scope.currentTest);
      Q.$loaded().then(function(Q){
        questions[Q.id] = Q;
        $scope.currentQuestion = Q.id;
      })
      // console.log(Q)
    }

    this.oldQuestionBtn = function(){
      // console.log(db.data.questions)
      db.getAllQuestions().$loaded().then(function(questions){
        $scope.oldQuestions = questions;
      })
      // show lookup form
    }

    // Used when picking an old question...
    this.setQ = function(Q){ 
      db.getQuestion(Q.id).$loaded().then(function(Question){
        questions[Question.id] = Question;
        $scope.currentQuestion = Question.id;  
      })
    }

    // $scope.$on('$locationChangeStart', function(event, next, current) {
    //   if (next === 'edit') return;
    //   if (leave($scope)) return;
    // });

    window.onunload = function(e){
      if (!leave($scope)) {
        db.deleteQuestion($scope.currentQuestion.id); 
        db.deleteTestQAsync($scope.currentTestQ.id, $scope.currentTest);
      }
    };

    window.onbeforeunload = function(e){
      if (!leave($scope)){
        return 'you sure, this question is unsaved!'
      }
    }

    $scope.$on('$destroy', function() {
        delete window.onbeforeunload;
        delete window.onunload;
    });

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
      $scope.currentTestQ = hasFirst($scope.currentTest) ? hasFirst($scope.currentTest).id : createFirst($scope.currentTest).id;
      $scope.oldQuestions;
    });
    
    // $scope.currentTestQ
    Object.defineProperty($scope, 'currentTestQ', {
      get: function(){
        return $scope.currentTest.testQuestions[$scope._currentTQ]
      },
      set: function(id){
        $scope._currentTQ = id;
        $scope.currentQuestion = $scope.currentTestQ.Q;
        $scope.oldQuestions = undefined;
      }
    })

    // $scope.currentQuestion
    Object.defineProperty($scope, 'currentQuestion', {
      get: function(){
        return $scope._currentQ
      },
      set: function(id){
        $scope.unbind && $scope.unbind();
        if (!id){
          $scope._currentQ = undefined;
        }
        else {
          var Q = questions[id];
          Q.$bindTo($scope, '_currentQ').then(function(unbind){
            $scope.unbind = unbind
            $scope.currentTestQ.Q = Q.id
          })
        }
      }
    })
    
  });