'use strict';

/**
 * @ngdoc service
 * @name dependencyQuizApp.auth
 * @description
 * # auth
 * Factory in the dependencyQuizApp.
 */
angular.module('dependencyQuizApp')
  .factory('auth', function ($firebaseSimpleLogin, fb, $rootScope, $state, $location){

    var simpleLogin = $firebaseSimpleLogin(fb.ref)

    simpleLogin.$getCurrentUser().then(function(){

      $rootScope.$on('$firebaseSimpleLogin:login', function(){
        console.log('fb login')
      if($state.params.redirect){
        $location.path(decodeURIComponent($state.params.redirect));
      }
      });
      $rootScope.$on('$firebaseSimpleLogin:logout', function(){
        console.log('fb logout')
        $state.go('welcome')
      });
      $rootScope.$on('$firebaseSimpleLogin:error', function(){
        console.log('firebase simple login had an error!')
      });
    })

    return simpleLogin
  });
