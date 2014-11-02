angular.module('dependencyQuizApp')
.controller("StudentCtrl", function($scope, db, fb, test, auth, questions, $q){

  // Helpers for test runner
  var isCorrect = function(results){
    var ans = questions[results.Q].choices[results.answer] 
    return ans.correct ? true : false;
  }
  // Test runner!
  var runner = function(question, cb){
    console.log('running', question)
    // Promise for submission
    var submitted = $q(function(resolve, reject){
      $scope.$on('submit', function(e, results){
        console.log('recieve', e, results)
        resolve(results);
      })
    });
    // set question as current question & use that in this function!
    $scope.currentTestQ = question;
    question = $scope.currentTestQ;
        
    $scope.$applyAsync();
    // Run after submission!
    submitted.then(function(results){
      console.log(isCorrect(results))
      $scope.currentResults.correct = isCorrect(results);
      $scope.currentResults.submitTime = Date.now();
      if (!isCorrect(results) && question.dependency){
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

  var setTestResultsOnUser = function(testResults){
    var update = {};
    update[testResults.id] = true;
    fb.users.child(auth.user.id).child('results').update(update);  
  }

  this.startTest = function(test){
    var start = Date.now();
    db.createTestResults(test, auth.user, start).then(function(testResults){
      // add test results to user
      setTestResultsOnUser(testResults)
      // Bind test results to scope
      testResults.$bindTo($scope, 'testResults')
    })
  };

  var endTest = function(){
    var end = Date.now();
    $scope.testResults.end = end;
    alert('all done!')
  }

  var Results = function(){
    this.Q = $scope.currentQuestion.id;
    this.answer = false;
  }

  // Init
  $scope.letters = ['a','b','c','d','e','f','g','h','i'];
  $scope.currentTest = test;
  $scope._currentTQ = _.find($scope.currentTest.testQuestions, { 'first' : true}).id

  Object.defineProperty($scope, 'currentResults', {
    get: function(){
      return $scope.testResults.results[$scope.currentTestQ.id]
    }
  })

  // $scope.currentTestQ
  Object.defineProperty($scope, 'currentTestQ', {
    get: function(){
      return $scope.currentTest.testQuestions[$scope._currentTQ]
    },
    set: function(id){
      $scope._currentTQ = id
      if ($scope.testResults){
        console.log($scope.testResults)
        $scope.testResults.results[id] = $scope.testResults.results[id] || new Results;
      }
      console.count('setting')
    }
  })

  // $scope.currentQuestion
  Object.defineProperty($scope, 'currentQuestion', {
    get: function(){
      return questions[$scope.currentTestQ.Q]
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