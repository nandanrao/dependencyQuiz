'use strict';

/**
 * @ngdoc service
 * @name dependencyQuizApp.fb
 * @description
 * # fb
 * Factory in the dependencyQuizApp.
 */
angular.module('dependencyQuizApp')
  .factory('fb', function ($firebase) {
    var URL = 'https://dependencyquiz.firebaseio.com/'
    var ref = new Firebase(URL);

    return {
      ref: ref,
      questions : ref.child('questions'),
      tests: ref.child('tests'),
      testResults: ref.child('testResults'),
      users: ref.child('users'),
    };
  });
