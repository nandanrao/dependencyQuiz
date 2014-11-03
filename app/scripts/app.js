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
    'ngSanitize',
    'firebase',
    'ui.router'
  ])
  .config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl as home',
        resolve: {
          'user': ['auth', function(auth){
            return auth.$getCurrentUser();
          }],
          'myTests': ['db', 'user', function(db, user){
            return db.myTests(user).$loaded();
          }],
          'myResults': ['db', 'user', function(db, user){
            return db.myResults(user);
          }],
        }
      })
      .state('welcome', {
        url: '/welcome:redirect',
        templateUrl: 'views/welcome.html',
        controller: 'WelcomeCtrl as welcome',
      })
      .state('teacher', {
        url: '/teacher',
        templateUrl: 'views/teacher.html',
        controller: 'TeacherCtrl as teacher'
      })
      .state('student', {
        url: '/student',
        templateUrl: 'views/student.html',
        controller: 'StudentCtrl as std',
      })
      .state('newTest', {
        url: '/newtest',
        templateUrl: 'views/newtest.html',
        controller: 'NewTestCtrl as newtest',
      })
      .state('edit', {
        url: '/edit/:test',
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl as edit',
        resolve: {
          'test': ['db', '$stateParams', function(db, $stateParams){
            return db.getTest($stateParams.test)
          }],
          'questions': ['db', 'test', function(db, test){
            return db.getQuestions(test)
          }]
        }
      })
      .state('tests', {
        url: '/tests/:test',
        templateUrl: 'views/student.html',
        controller: 'StudentCtrl as std',
        resolve: {
          'test': ['db', '$stateParams', function(db, $stateParams){
            return db.getTest($stateParams.test)
          }],
          'questions': ['db', 'test', function(db, test){
            return db.getQuestions(test)
          }]
        }
      })
      .state('results', {
        url: '/results/:test',
        templateUrl: 'views/testresults.html',
        controller: 'ResultsCtrl as results',
        resolve: {
          'test': ['db', '$stateParams', function(db, $stateParams){
            return db.getTest($stateParams.test)
          }],
          'questions': ['db', 'test', function(db, test){
            return db.getQuestions(test)
          }],
          'testResults': ['test', 'db', function(test, db){
            return db.getTestResults(test).$loaded();           
          }],
          'users': ['testResults', 'db', function(testResults, db){
            return db.getTakersOfTest(testResults)
          }]
        }
      })
  })
.run(function($rootScope, auth, $location, $state){
  // Check for user, if not redirect to welcome, with same params... 
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams){
    auth.$getCurrentUser().then(function(user){
      if (!user){
        var href = $state.href(toState, toParams)
        if(toState.name === 'welcome'){
          href = '/'
        };
        $state.go('welcome', {redirect: href}, {notify: false, reload: true}).then(function(results){
          $state.reload();
        });
      }
    })
  })
})