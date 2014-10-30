angular.module('dependencyQuizApp')
.controller("StudentCtrl", function($scope, db, studentHelpers, $stateParams, $firebase, currentTest, auth){

  // Helpers for test runner  
  var isAnswered = studentHelpers.isAnswered
  var isCorrect = function(question){
    var ans = isAnswered(question);
    return ans.correct ? true : false;
  }
  // Test runner!
  var runner = function(question, cb){

    // Promise for submission
    var submitted = new Promise(function(resolve, reject){
      $scope.$on('submit', function(e, obj){
        console.log('recieve', e, obj)
        resolve(obj);
      })
    });
    // set question as current question & use that in this function!
    $scope.currentTestQ = question;
    question = $scope.currentTestQ;
        console.log('running', question)
    $scope.$applyAsync();
    // Run after submission!
    submitted.then(function(Q){
      $scope.testResults.results = $scope.testResults.results || [];
      console.log(Q.id, isAnswered(Q), isCorrect(Q));
      $scope.testResults.results.push({
       question: Q.id,
       answer: isAnswered(Q).value, 
       correct: isCorrect(Q), 
      });
      if (!isCorrect(Q) && question.dependency){
        runner(question.dependency, function(){
          if (question.next) {
            runner(question.next, cb)
          }
          else {
            cb();
          }
        })      
      }
      else if (question.next){
        runner(question.next, cb)
      }
      else {
        cb();
      }
    })
  };

  // Init
  $scope.letters = ['a','b','c','d','e','f','g','h','i'];

  this.startTest = function(test){
    $scope.testResults = true;
    var start = Date.now();
    db.createTestResults(test, auth.user, start).then(function(testResults){
      console.log('created!', testResults);
      testResults.$bindTo($scope, 'testResults');
    })
  };

  var endTest = function(){
    var end = Date.now();
    $scope.testResults.end = end;
    $scope.$apply();
  }

  $scope.currentTest = currentTest;
  $scope._currentTQ = _.find($scope.currentTest.testQuestions, { 'first' : true}).id

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
      return db.data.questions[$scope.currentTestQ.Q]
    },
    set: function(q){
      $scope.currentTestQ.Q = q.id
    }
  })

  // run the test runner!
  runner($scope.currentTestQ.id, function(){
    endTest();
  });

});