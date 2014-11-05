'use strict';

/**
 * @ngdoc directive
 * @name dependencyQuizApp.directive:linksNav
 * @description
 * # linksNav
 */
angular.module('dependencyQuizApp')
  .directive('linksNav', function (Gradient) {
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
            arr.push(createLink(id));
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

        this.style = function(arr, i){
          var gradient = new Gradient;

          gradient.setSpectrum('#79c6ff', '#8aee7e')
          var inc = 100/arr.length;

          var color = gradient.colourAt(inc*i);

          return {
            "color": '#' + color
          }
        }

        var orderKey = {
          dependency: 'reverse',
          parent: '',
          next: 'reverse',
          previous: ''
        }

        $scope.order = function(){
          return orderKey[$attrs.linksNav]
        }

        $scope.$watch('currentTestQ', function(curr, old){
          var str = $attrs.linksNav;
          $scope.arr = buildArray(curr, str);
        })

      }
    };
  });
