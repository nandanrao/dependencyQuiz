'use strict';

angular.module('dependencyQuizApp')
  .controller("TeacherCtrl", function($scope, shared){
  // Form validatioN!!

  // DB
  var test = shared.test;
  var Questions = shared.Questions;

  // DB Helper Functions
  var getQ = function(id){
    return Questions[id]
  }
  var getTestQ = function(id){
    return test[id];
  }



  // ID helper function
  function generateUUID(){
    var d = Date.now();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
  }; 
  // Create a whole new question
  var newQ = function(){
    var Question = {
      id: generateUUID(),
      question: null,
      choices: [{
        value: null,
      }],
    }
    return Question 
  }
  // Create a new question in this test
  var newTestQ = function(){
    var testQ = {
      id: generateUUID(),
      Q: null,
      dependencies : [],
      parent: null,
      next: null,
      previous: null,
    }
    return testQ;
  }
  $scope.newQuestionBtn = function(){
    var curr = $scope.currentTestQ
    test[curr.id] = curr;
    var Q = newQ();
    curr.Q = Q;
    Questions[Q.id] = Q; 
  }

  $scope.oldQuestionBtn = function(){
    // show lookup form
  }

  $scope.next = function(){
    if ($scope.currentTestQ.next){
      $scope.currentTestQ = $scope.currentTestQ.next;
    }
    else {
      var thisQuestion = newTestQ();
      $scope.currentTestQ.next = thisQuestion;
      thisQuestion.previous = $scope.currentTestQ;
      $scope.currentTestQ = thisQuestion;  
    }
  }

  $scope.newDependency = function(){
    var thisQuestion = newTestQ();
    $scope.currentTestQ.dependencies.push(thisQuestion)
    thisQuestion.parent = $scope.currentTestQ;
    $scope.currentTestQ = thisQuestion; 
  }

  $scope.addChoice = function(){
    var Q = getQ($scope.currentTestQ.Q.id)
    Q.choices.push({value: null})
  }

  $scope.show = function(question){
    $scope.currentTestQ = test[question.id];
  }

  $scope.submit = function(){
    console.log(_.some($scope.currentTestQ.Q.choices, 'correct'))
    console.log($scope.currentTestQ)
    // saveQuestion($scope.currentQuestion);
    // $scope.parentQuestion.pop(); // this is TEMP, cuz submit soon will be a final thing
    // $scope.currentQuestion = newQuestion();
  }

  var buildArray = function(question, property){
    var arr = [];
    function Traverse(question){
      if (!question[property]) return;
      arr.unshift(question[property]);
      Traverse(question[property]);
    }
    Traverse(question);
    return arr;
  }
 
  $scope.currentTestQ = newTestQ();
  $scope.currentTestQ.first = true;

  $scope.parentQuestions = [];
  $scope.previousQuestions = [];
  $scope.nextQuestions = [];

  $scope.$watch('currentTestQ.Q', function(curr, old){
    if ($scope.newQuestion.$valid){
      shared.dbSync();
    }
  }, true)

  $scope.$watchCollection('currentTestQ', function(curr, old){
    $scope.parentQuestions = buildArray(curr, 'parent');
    $scope.previousQuestions = buildArray(curr, 'previous');
    $scope.nextQuestions = buildArray(curr, 'next');
  })
  

});
