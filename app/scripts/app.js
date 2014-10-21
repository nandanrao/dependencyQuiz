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
  .factory('shared', function($localStorage){

    var db = $localStorage;
    var Questions = db.questions;
    var test = {};

    // $localStorage.$reset();
    // db.questions = {};
    // db.testQs = {};

    var dbPut = function(question){
      console.log('in dbPut', test, db.testQs)
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


    var dbGet = function(id) {
      if (typeof id !== 'string'){
        return id;
      }
      console.log( 'idtype', typeof id);
      var testQ = _.cloneDeep(db.testQs[id]);
      if (!testQ) return null;

      testQ.parent = typeof testQ.parent === 'string' ? dbGet(testQ.parent) : null;
      testQ.next = typeof testQ.next === 'string' ? dbGet(testQ.next) : null;
      testQ.previous = typeof testQ.previous === 'string' ? dbGet(testQ.previous) : null;
      testQ.dependencies = testQ.dependencies.length > 0 ? testQ.dependencies.map(function(testQId){
        return dbGet(testQId);
      }) : [];
      testQ.Q = testQ.Q ? db.questions[testQ.Q] : null;
      return testQ;   
    } 
    //
    var dbRetrieve = function(){
      console.log('retrieving', db.testQs)
      for (var q in db.testQs){
        var question = dbGet(q);
        test[question.id] = question;
      }
    }
    //
    var dbSync = function(){
      console.log('firststore...')
      for (var q in test){
        // console.log('in dbSync all test', test)
          console.log('storing', test[q])
          var question = dbPut(test[q]);
          db.testQs[question.id] = question;
        }
        // console.log('in dbSync all db.testQs', db.testQs)
    }
    console.log(db.testQs);
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
  }).
  directive('dqNewQuestion', function(){
    return {
      link: function(scope, el, attrs){
        var name = el[0].name
        scope.$watch('currentTestQ.Q', function(curr, old){
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
  });




