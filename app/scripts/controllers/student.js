angular.module('dependencyQuizApp')
  .controller("StudentCtrl", function($scope, db){


  $scope.submit = function(question){
    $scope.$emit('submit', question)
  };
  
  function isCorrect(question){
    var ans = isAnswered(question);
    return ans.correct ? true : false;
  }

  var runner = function(question, cb){
    console.log(shared.test, shared.db.testQs)
    // if (question.Q === null || question.Q === undefined){
    //   return
    // }
    // Promise for submission
    var submitted = new Promise(function(resolve, reject){
      $scope.$on('submit', function(e, obj){
        resolve(obj);
      })
    });

    $scope.letters = ['a','b','c','d','e','f','g','h','i'];
    $scope.question = question;
    // $scope.$apply();

    submitted.then(function(results){
      if (!isCorrect(results)){
        console.log('here', question, question.dependencies)
        async.eachSeries(question.dependencies, function(el, callback){
        console.log('not', results);
          $scope.runner(el, callback);
        }, function(err, done){
            if (err) throw err;
            if(question.next) {
              $scope.runner(question.next)
            }
            else {
              cb();
            }
        });
      }
      else if (question.next){
        console.log('theres a next');
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
    return choice.chosen ? {'background-color': '#F99'} : {'background-color': 'default'}
  }

  this.choose = function(question, choice){
    var pickedOption = isAnswered(question);
    choice.chosen ? choice.chosen = false : choice.chosen = true;
    if (pickedOption) {
      pickedOption.chosen = false;
    }  
  }
  // Run FUNCTIONS
  console.log(db.tests);
  console.log(_.find(db.tests[0], {'_parent' : null, '_previous' : null}))
  $scope.question = _.find(db.tests[0], {'_parent' : null, '_previous' : null})
  // weird starter function that finds the first question...
  
  runner(startingQ, function(){
    alert('all done!')
  });


  });