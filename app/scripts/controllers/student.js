angular.module('dependencyQuizApp')
  .controller("StudentCtrl", function($scope, db){


  $scope.submit = function(question){
    $scope.$emit('submit', question)
  };
  
  function isCorrect(question){
    var ans = isAnswered(question);
    return ans.correct ? true : false;
  }

  $scope.letters = ['a','b','c','d','e','f','g','h','i'];

  var runner = function(question, cb){
    // Promise for submission
    var submitted = new Promise(function(resolve, reject){
      $scope.$on('submit', function(e, obj){
        resolve(obj);
      })
    });

    // set question as current question & use that in this function!
    $scope.currentTestQ = question;
    question = $scope.currentTestQ;
    $scope.$apply();

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

  function isAnswered(question){
    var ans;
    question.choices.forEach(function(choice){
      if (choice.chosen === true) {
        ans = choice;
      }
    })
    return ans;
  }

  this.style = function(choice){
    return choice.chosen ? {'background-color': '#F99'} : {'background-color': 'default'}
  }

  this.choose = function(question, choice){
    // console.log(question, choice)
    var pickedOption = isAnswered(question);
    choice.chosen ? choice.chosen = false : choice.chosen = true;
    if (pickedOption) {
      pickedOption.chosen = false;
    }  
  }
  // Run FUNCTIONS
  // console.log(db);
  $scope.currentTest = db.data.tests['holla'];
  // console.log(db.tests);
  // console.log($scope.currentTest)
  // console.log(_.find($scope.currentTest.testQuestions, { 'first' : true}))
  

   // $scope.currentTestQ
  Object.defineProperty($scope, 'currentTestQ', {
    get: function(){
      // console.log($scope.currentTest.testQuestions[$scope._currentTQ])
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

  $scope._currentTQ = _.find($scope.currentTest.testQuestions, { 'first' : true}).id

  // weird starter function that finds the first question...
  
  runner($scope.currentTestQ.id, function(){
    alert('all done!')
  });


  });