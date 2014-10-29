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

    $rootScope.$on('$firebaseSimpleLogin:login', function(){
      // add params so we can redirect to the url they were trying to go to!
      // console.log($state.params)
      if($state.params.redirect){
        $location.path($state.params.redirect);
      }
    });
    $rootScope.$on('$firebaseSimpleLogin:logout', function(){
      $state.go('welcome');
    });
    $rootScope.$on('$firebaseSimpleLogin:error', function(){
      console.log('firebase simple login had an error!')
    });

    var simpleLogin = $firebaseSimpleLogin(fb.ref)

    return simpleLogin
    // var isLoggedIn = function(){
    //   return $rootScope.user.id ? true : false;
    // }

    // var login = function(){

    // }

    // simpleLogin.$getCurrentUser().then(function(user){
    //   if (user){
    //     $rootScope.user = user;  
    //   }
    //   else {
    //     $rootscope.user = 'anon';
    //   }
    // })

    // // if (!isLoggedIn()){
    // //   login();
    // // }

    // return {
    //   simpleLogin: simpleLogin,
    //   isLoggedIn: isLoggedIn,
    //   user: simpleLogin.user,
    // }
  });
