'use strict';

angular.module('dependencyQuizApp')
  .controller("TeacherCtrl", function($scope, db){

  // DB
  var db = db;

  // __________Next/Dependency btn Dir________________________

  this.next = function(){
    if (!leaveAndCreate()) return;
    console.log($scope.nextQuestions);
    if ($scope.currentTestQ._next){
      $scope.currentTestQ = $scope.currentTestQ._next;
    }
    else {
      var thisQuestion = db.newTestQ($scope.currentTest);
      $scope.currentTestQ._next = thisQuestion.id;
      thisQuestion._previous = $scope.currentTestQ.id;
      $scope.currentTestQ = thisQuestion.id;  
    }
  }

  this.newDependency = function(){
    if (!leaveAndCreate()) return;
    var thisQuestion = db.newTestQ($scope.currentTest);
    $scope.currentTestQ._dependencies.push(thisQuestion.id)
    thisQuestion._parent = $scope.currentTestQ.id;
    $scope.currentTestQ = thisQuestion.id; 
  };

  function leaveAndCreate(){
    if (!$scope.newQuestion.$valid){
      alert('you gotta finish this one before making more!')
      return false
    }
    else return true;
  };

  //_________________________________________

  this.newQuestionBtn = function(){
    var Q = db.newQ();
    $scope.currentTestQ._Q = Q.id;
  }

  this.oldQuestionBtn = function(){
    // show lookup form
  }

  this.addChoice = function(){
    $scope.currentQuestion.choices.push({value: null})
  };

  this.show = function(question){
    if (leave()) {
      $scope.currentTestQ = question.id;
    }
  };

  // Helper function to check before leaving a page
  function leave(){
    if ($scope.newQuestion.$valid){
      console.log($scope.newQuestion)
      return true
    }
    else {
      if (window.confirm('you really wanna go?')){
        db.deleteTestQ($scope.currentTestQ, $scope.currentTest);
        return true
      }
      else {
        return false
      }
    }
  };

  // window.onbeforeunload = function(e){
  //   if (leave())
  //   confirm('youre leaving!!')
  // }

  this.submit = function(){
    console.log($scope.nextQuestions)
  }

  
  // Initialize
  $scope.currentTest = db.newTest('sampleTest'); 
  $scope._currentTQ = db.newTestQ($scope.currentTest).id;

  // $scope.currentTestQ
  Object.defineProperty($scope, 'currentTestQ', {
    get: function(){
      return $scope.currentTest.testQuestions[$scope._currentTQ]
    },
    set: function(id){
      $scope._currentTQ = id
    }
  })

  // $scope.currentQuestion
  Object.defineProperty($scope, 'currentQuestion', {
    get: function(){
      return db.data.questions[$scope.currentTestQ._Q]
    }
  })

  // $scope.$watch('currentTestQ.Q', function(curr, old){
  //   if ($scope.newQuestion.$valid){
  //     // shared.dbSync();
  //   }
  // }, true)
 
});
