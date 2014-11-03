  'use strict';

/**
 * @ngdoc function
 * @name dependencyQuizApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the dependencyQuizApp
 */
angular.module('dependencyQuizApp')
  .controller('ProfileCtrl', function ($scope, auth) {
    this.auth = auth;
  });
