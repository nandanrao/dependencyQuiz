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
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl as home',
        resolve: {
          'dbLoaded': ['db', function(db){
            return db.loaded;
          }]
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
        templateUrl: 'views/teacher.html',
        controller: 'TeacherCtrl as teacher',
      })
      .state('tests', {
        url: '/tests/:id',
        templateUrl: 'views/student.html',
        controller: 'StudentCtrl as std',
        resolve: {
          'currentTest': ['$firebase', '$stateParams', 'fb', function($firebase, $stateParams, fb){
            var _testRef = fb.tests.child($stateParams.id);
            var _fbtest = $firebase(_testRef).$asObject();
            return _fbtest.$loaded()
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
});
