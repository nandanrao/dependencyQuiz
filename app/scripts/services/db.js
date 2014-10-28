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
  .factory('db', function($localStorage, $firebase){

    var URL = 'https://dependencyquiz.firebaseio.com/'
    var ref = new Firebase(URL);
    var db_questions = ref.child('questions');
    var db_tests = ref.child('tests');
    var db = {};
    db.questions = $firebase(new Firebase(db_questions.toString())).$asObject();
    db.tests = $firebase(new Firebase(db_tests.toString())).$asObject();


    var getQuestion = function(t_id, test) {
      var t = getTestQ(t_id, test)
      return db.questions[t.Q]
    };

    var getTestQ = function(id, test){
      return test.testQuestions[id]
    };

    var setTestQ = function(q, test){
      if (!test.testQuestions){
        console.log('reseting testQuestions!')
        test.testQuestions = {};
      }
      test.testQuestions[q.id] = q;
    }

    var deleteTestQ = function(id, test){
      delete test.testQuestions[id];
      _.forOwn(test.testQuestions, function(v, k, o){
        o[k] = _.mapValues(v, function(v, k){
          return v === id ? null : v
        });
      })
    }

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
      var id = generateUUID();
      var QRef = db_questions.child(id)
      QRef.set({
        id: id,
        ogTest: test.name,
        question: null,
        choices: [{value: ''}],
      });
      var Q = $firebase(QRef).$asObject();
      return Q;
    }
    // Create a new question in this test
    var newTestQ = function(test){
      var testQ = {};
      testQ.id = generateUUID(),
      testQ.Q = false,
      testQ.dependency = false,
      testQ.parent = false,
      testQ.next = false,
      testQ.previous = false,
      setTestQ(testQ, test);
      return testQ;
    }

    var newTest = function(name){
      if (!name) throw 'error';
      var testRef = db_tests.child(name);
      var test = $firebase(new Firebase(testRef.toString()));
      test.$set({
        name: name,
        testQuestions: false,
      })
      return test.$asObject();
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
