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
  
