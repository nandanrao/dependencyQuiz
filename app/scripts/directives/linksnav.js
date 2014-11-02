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
      controller: function($scope, $attrs, db, leave){

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


        this.show = function(question){
          if (leave($scope)) {
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
