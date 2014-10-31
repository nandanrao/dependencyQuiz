'use strict';

/**
 * @ngdoc directive
 * @name dependencyQuizApp.directive:linksNav
 * @description
 * # linksNav
 */
angular.module('dependencyQuizApp')
  .directive('linksNav', function () {
    return {
      templateUrl: 'views/linksNav.html',
      restrict: 'A',
      scope: true,
      controllerAs: 'linksNav',
      controller: function($scope, $attrs, db){

        function createLink(id){
          var link = {};
          link.id = id;
          var t = $scope.currentTest.testQuestions[id];
          db.getQuestion(t.Q).$loaded().then(function(Q){
            link.question = Q.question;
          })
          return link
        }

        var buildArray = function(question, property){
          var arr = [];
          function Traverse(question){
            if (!question[property]) return;
            var id = question[property]
            arr.unshift(createLink(id));
            var t = db.getTestQ(id, $scope.currentTest)
            Traverse(t);
          }
          Traverse(question);
          return arr;
        };

        // Helper function to check before leaving a page
        function leave(){
          if(!$scope.currentQuestion){
            db.deleteTestQ($scope.currentTestQ.id, $scope.currentTest);
            return true;
          };
          if ($scope.newQuestion.$valid){
            return true
          }
          else {
            if (window.confirm('you really wanna go?')){
              $scope.unbind();
              console.log($scope._currentQ)
              db.deleteQuestion($scope.currentQuestion.id)
              db.deleteTestQ($scope.currentTestQ.id, $scope.currentTest);
              return true
            }
            else {
              return false
            }
          }
        };

        this.show = function(question){
          if (leave()) {
            $scope.currentTestQ = question.id;
          }
        };

        $scope.$watch('currentTestQ', function(curr, old){
          var str = $attrs.linksNav;
          $scope.arr = buildArray(curr, str);
        })

      }
    };
  });
