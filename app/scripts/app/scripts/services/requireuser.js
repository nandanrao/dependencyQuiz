'use strict';

/**
 * @ngdoc service
 * @name scriptsApp.requireUser
 * @description
 * # requireUser
 * Factory in the scriptsApp.
 */
angular.module('scriptsApp')
  .factory('requireUser', function (auth, $q) {
    return function(){
      return auth.$getCurrentUser().then(function(user){
        return user ? user : $q.reject({authRequired: true})
      }
    })
  });
