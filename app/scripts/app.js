'use strict';

/**
 * @ngdoc overview
 * @name dependencyQuizApp
 * @description
 * # dependencyQuizApp
 *
 * Main module of the application.
 */
angular
  .module('dependencyQuizApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngStorage',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/teacher.html',
        controller: 'TeacherCtrl as teacher'
      })
      .when('/student', {
        templateUrl: 'views/student.html',
        controller: 'StudentCtrl as student'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .directive('dqNewQuestion', function(){
    return {
      link: function(scope, el, attrs){
        var name = el[0].name
        scope.$watch('currentQuestion', function(curr, old){
          if (curr){
            var choices = curr.choices
            if (choices.length > 1 && _.some(choices, 'correct')){
              scope[name].$setValidity('custom', true);
            }
            else { 
              scope[name].$setValidity('custom', false);  
            }
          }
        }, true);
      }
    }
  })
  
