'use strict';

/**
 * @ngdoc directive
 * @name dependencyQuizApp.directive:dqNewQuestion
 * @description
 * # dqNewQuestion
 */
angular.module('dependencyQuizApp')
  .directive('dqNewQuestion', function () {
    return {    
      restrict: 'A',
      templateUrl: 'views/newQuestion.html',
      controllerAs: 'dqNewQuestion',
      controller: function($scope, $attrs, $firebase, db){
        this.addChoice = function(){
          $scope.currentQuestion.choices.push({false: false})
        };
        this.db = db;
        this.$firebase = $firebase;


        // var QRef = ctrl.db.data.questions.$inst().$ref().child(scope.currentQuestion.id);
        // var Q = ctrl.$firebase(QRef).$asObject();

        
        // this.bindQ = (function($scope, db){
        //   var run = false;

        //   var bind = function(){
        //     if (run) return;
        //     .$loaded().then(function(Q){
        //       Q.save();
        //       run = true;
        //     });
        //   }

        //   var unbind = function(){
        //     if 
        //   }
        //   return {
        //     bind: bind,
        //     unbind: unbind
        //   }

        // })($scope, db);  
      },
      link: function(scope, el, attrs, ctrl){
        var name = el[0].name

        

        scope.$watch('currentQuestion', function(curr, old){
          if (curr){
            var choices = curr.choices
            if (choices.length > 1 && _.some(choices, 'correct')){
              scope[name].$setValidity('custom', true);
              // Q.$save();
              // scope.currentQuestion.$save();
            }
            else { 
              scope[name].$setValidity('custom', false);  
              // ctrl.bindQ.unbind();
              // console.log('scope current in validator', scope.currentQuestion)
            }
          }
        }, true);
      }
    };
  });

