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
      controller: function($scope, $attrs, db){

        function createLink(id){
          var link = {};
          link.id = id;
          console.log(id, $scope.currentTest)
          link.question = db.getQuestion(id, $scope.currentTest).question;
          return link
        }

        var buildArray = function(question, property){
          var arr = [];
          function Traverse(question){
            if (!question[property]) return;
            var id = question[property]
            arr.unshift(createLink(id));
            var t = db.getTestQ(id, $scope.currentTest)
            console.log('t', t)
            Traverse(t);
          }
          if (property === '_dependencies'){
            question._dependencies.forEach(function(el){
              arr.push(createLink(el));
            }) 
          }
          else {
            Traverse(question);
          }
          return arr;
        }

        $scope.$watch('currentTestQ', function(curr, old){
          var str = '_' + $attrs.linksNav;
          $scope.arr = buildArray(curr, str);
        })

      }
    };
  });
