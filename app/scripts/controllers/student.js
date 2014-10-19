angular.module('dependencyQuizApp')
  .controller("StudentCtrl", function($scope, shared){


  $scope.submit = function(question){
    $scope.$emit('submit', question)
  };
  
  function isCorrect(question){
    var ans = isAnswered(question);
    return ans.correct ? true : false;
  }

  $scope.runner = function(question, cb){
    if (question.Q === null || question.Q === undefined){
      return
    }
    // Promise for submission
    var submitted = new Promise(function(resolve, reject){
      $scope.$on('submit', function(e, obj){
        resolve(obj);
      })
    });


    $scope.question = question;
    $scope.$apply();

    submitted.then(function(results){
      if (!isCorrect(results)){
        console.log('here', question, question.dependencies)
        async.eachSeries(question.dependencies, function(el, callback){
        console.log('not', results);
          $scope.runner(el, callback);
        }, function(err, done){
          cb();
        });
      }
      else if (question.next){
        $scope.runner(question.next, function(){
          cb()
        })
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
    return choice.chosen ? {'background-color': '#666'} : {'background-color': 'default'}
  }

  this.choose = function(question, choice){
    var pickedOption = isAnswered(question);
    choice.chosen ? choice.chosen = false : choice.chosen = true;
    if (pickedOption) {
      pickedOption.chosen = false;
    }  
  }
  // Run FUNCTIONS
  shared.dbRetrieve();
  $scope.question = null;
  (function(){

    for (q in shared.test){
      console.log(shared.test[q].first);
      if (shared.test[q].first) {
        $scope.runner(shared.test[q], function(){
          alert('all done!')
        });
      }
    }
  })();
  

  });