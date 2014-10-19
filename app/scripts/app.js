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
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/teacher.html',
        controller: 'TeacherCtrl as main'
      })
      .when('/student', {
        templateUrl: 'views/student.html',
        controller: 'StudentCtrl as std'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .service('shared', function($localStorage){

    var db = $localStorage;
    var Questions = db.questions;
    var test = {};

    // $localStorage.$reset();
    // db.questions = {};
    // db.testQs = {};

    var dbPut = function(question){
      // console.log('in dbPut', test, db.testQs)
      var testQ = _.cloneDeep(question);
      testQ.parent = testQ.parent ? testQ.parent.id : null;
      testQ.next = testQ.next ? testQ.next.id : null;
      testQ.previous = testQ.previous ? testQ.previous.id : null;
      testQ.dependencies = testQ.dependencies.length > 0 ? testQ.dependencies.map(function(testQ){
        return testQ ? testQ.id : null;
      }) : [];
      testQ.Q = testQ.Q ? testQ.Q.id : null;
      return testQ;
    }
    //
    var dbGet = function(id){
      var testQ = _.cloneDeep(db.testQs[id]);
      testQ.parent = testQ.parent ? db.testQs[testQ.parent] : null;
      testQ.next = testQ.next ? db.testQs[testQ.next.id] : null;
      testQ.previous = testQ.previous ? db.testQs[testQ.previous.id] : null;
      testQ.dependencies = testQ.dependencies.length > 0 ? testQ.dependencies.map(function(testQId){
        return dbGet(testQId);
      }) : [];
      testQ.Q = testQ.Q ? db.questions[testQ.Q] : null;
      return testQ;   
    } 
    //
    var dbRetrieve = function(){
      for (var q in db.testQs){
        console.log(q);
        var question = dbGet(q);
        test[question.id] = question;
      }
    }
    //
    var dbSync = function(){
      for (var q in test){
        console.log('in dbSync all test', test)
        var question = dbPut(test[q]);
        db.testQs[question.id] = question;
      }
    }
    dbRetrieve();
    // API
    return {
      dbPut: dbPut,
      dbGet: dbGet,
      dbRetrieve: dbRetrieve,
      dbSync: dbSync,
      db:  db,
      test: test,
      Questions: Questions,
    }
  });



