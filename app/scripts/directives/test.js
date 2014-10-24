'use strict';

/**
 * @ngdoc directive
 * @name dependencyQuizApp.directive:test
 * @description
 * # test
 */
angular.module('dependencyQuizApp')
  .directive('test', function () {
    return {
      templateUrl: 'views/test.html',
      restrict: 'E',
      controllerAs: 'test',
      controller: function($scope, $attrs, db){

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
          var Q = db.newQ($scope.currentTest);
          $scope.currentTestQ._Q = Q.id;
        }

        this.oldQuestionBtn = function(){
          // console.log(db.data.questions)
          $scope.oldQuestions = _.toArray(db.data.questions)
          console.log($scope.oldQuestions)
          // show lookup form
        }

        this.setQ = function(q){
          $scope.currentQuestion = q;
        }

        this.addChoice = function(){
          $scope.currentQuestion.choices.push({value: null})
        };


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
          return t;
        }

        // Initialize 
        $scope._currentTQ = hasFirst($scope.currentTest) ? hasFirst($scope.currentTest).id : createFirst($scope.currentTest).id;
        $scope.oldQuestions;

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
      }
    };
  });
