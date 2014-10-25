'use strict';

/**
 * @ngdoc service
 * @name dependencyQuizApp.db
 * @description
 * # db
 * Factory in the dependencyQuizApp.
 */
angular
  .module('dependencyQuizApp')
  .factory('db', function($localStorage){

    var db = $localStorage;
    db.questions = db.questions || {};
    db.tests = db.tests || {};

    var getQuestion = function(t_id, test) {
      var t = getTestQ(t_id, test)
      return db.questions[t._Q]
    };

    var getTestQ = function(id, test){
      return test.testQuestions[id]
    };

    var setTestQ = function(q, test){
      test.testQuestions[q.id] = q;
    }

    var deleteTestQ = function(id, test){
      delete test.testQuestions[id];
      _.forOwn(test.testQuestions, function(v, k, o){
        o[k] = _.mapValues(v, function(v, k){
          // edge case for dependencies
          if (_.isArray(v)){
            _.remove(v, function(v){ 
              return v === id;
            });
          }
          // map value to null if it's the deleted ID
          return v === id ? null : v
        });
      })
    }

    // deleteTestQ("f1e3b6e7-655b-46dc-9735-598fb77e925d", db.tests['holla'])

    // ID helper function
    function generateUUID(){
      var d = Date.now();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
      });
      return uuid;
    }; 
    // Create a whole new question
    var newQ = function(test){
      var Q = {
        id: generateUUID(),
        ogTest: test.name,
        question: null,
        choices: [{
          value: null,
        }],
      }
      db.questions[Q.id] = Q;
      return Q;
    }
    // Create a new question in this test
    var newTestQ = function(test){
      var testQ = {
        id: generateUUID(),
        _Q: null,
        _dependencies : [],
        _parent: null,
        _next: null,
        _previous: null,
      }
      setTestQ(testQ, test);
      return testQ;
    }

    var newTest = function(name){
      var test = {
        name: name,
        testQuestions: {},
      };
      db.tests[name] = test;
      return test
    }

    return {
      data: db,
      getQuestion: getQuestion,
      getTestQ: getTestQ,
      setTestQ: setTestQ,
      deleteTestQ: deleteTestQ,
      newTestQ: newTestQ,
      newQ: newQ,
      newTest: newTest,
    }

  })
