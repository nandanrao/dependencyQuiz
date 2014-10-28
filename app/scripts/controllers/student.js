angular.module('dependencyQuizApp')
.controller("StudentCtrl", function($scope, db, studentHelpers){

  // Helpers for test runner  
  var isAnswered = studentHelpers.isAnswered
  var isCorrect = function(question){
    var ans = isAnswered(question);
    return ans.correct ? true : false;
  }
  // Test runner!
  var runner = function(question, cb){
    console.log('running')
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
    $scope.$apply();
    // Run after submission!
    submitted.then(function(results){
      if (!isCorrect(results) && question._dependency){
        runner(question._dependency, function(){
          if (question._next) {
            runner(question._next, cb)
          }
          else {
            cb();
          }
        })      
      }
      else if (question._next){
        runner(question._next, cb)
      }
      else {
        cb();
      }
    })
  };

  // Init
  $scope.letters = ['a','b','c','d','e','f','g','h','i'];
  console.log(db.data.tests);
  $scope.currentTest =  _.find(db.data.tests, _.constant(true));
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
      return db.data.questions[$scope.currentTestQ._Q]
    },
    set: function(q){
      $scope.currentTestQ._Q = q.id
    }
  })

  // run the test runner!
  runner($scope.currentTestQ.id, function(){
    alert('all done!')
  });

});