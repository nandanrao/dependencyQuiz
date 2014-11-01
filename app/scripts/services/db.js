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
  .factory('db', function($rootScope, $localStorage, $firebase, auth, fb, $q){
    
    var db = {};

     var getQuestions = function(test){
      // Helper function to build questions db!
      function questionsDbBuilder(arr){
        var questions = {};
        _.forEach(arr, function(Q){
          questions[Q.id] = Q;
        })
        return $q(function(resolve, reject){
          resolve(questions)
        })
      }
      // Create promises for each firebase question object to load
      var promises = [];
      console.log(test);
      _.forEach(test.testQuestions, function(tq){
        if (!tq.Q) {
          console.log('no question in this test question!')
        }
        else {
          var Q = $firebase(fb.questions.child(tq.Q)).$asObject();
          promises.push(Q.$loaded())
        }
      })
      return $q.all(promises).then(questionsDbBuilder)   
    }

    var getAllQuestions = function(){
      var allQuestions = $firebase(fb.questions.startAt(auth.user.id).endAt(auth.user.id)).$asArray();
      return allQuestions;
    }

    var getTestResults = function(test){
      var results = $firebase(fb.testResults.startAt(test.name).endAt(test.name)).$asObject();
      console.log('in db results', results, test.name)
      return results;
    }

    var myResults = function(user){
      var ref = fb.users.child(user.id).child('results');
      var results = $firebase(ref).$asArray();
      
      function testResultsFinder(results){
        var promises = [];
        _.forEach(results, function(result){
          var loaded = $firebase(fb.testResults.child(result.$id)).$asObject().$loaded();
          promises.push(loaded)
        })  
        return $q.all(promises)  
      }

      return results.$loaded().then(testResultsFinder)
    }

    var getTest = function(testId){
      var test = $firebase(fb.tests.child(testId)).$asObject();
      console.log('holla', test)
      return test.$loaded();
    }

    var loaded = auth.$getCurrentUser().then(loadDB)

    var myTests = function(user){
      var tests = $firebase(fb.tests.startAt(user.id).endAt(user.id)).$asObject();
      console.log(tests);
      return tests;
    }


    function loadDB(user){
      console.log('ran loadDB')
      if (!user){
        return
      }
      console.log('loaddb', auth.user.id)
      // db.questions = $firebase(fb.questions).$asObject();
      db.tests = $firebase(fb.tests.startAt(auth.user.id).endAt(auth.user.id)).$asObject();

      // $rootScope.tests = db.tests;
      // $rootScope.questions = db.questions;
      // lookup users tests
      // db.testsTaken = $firebase(user.testResults)
      // $rootScope.testsTaken = db.testsTaken
      return db.tests.$loaded()  
    }

    var getQuestion = function(id) {
      var Q = $firebase(fb.questions.child(id)).$asObject(); 
      console.log(Q);
      return Q
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

    var deleteQuestion = function(id){
      fb.questions.child(id).remove();
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
      var QRef = fb.questions.child(id)
      QRef.setWithPriority({
        id: id,
        ogTest: test.name,
        question: null,
        user: auth.user.id,
        choices: [{false: false}],
      }, auth.user.id);
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
      var testRef = fb.tests.child(name);
      testRef.setWithPriority({
        name: name,
        user: auth.user.id,
        testQuestions: false,
      }, auth.user.id)
      var test = $firebase(testRef);
      return test.$asObject();
    }

    var createTestResults = function(test, user, start){
      var id = generateUUID();
      var startingTQ = _.find(test.testQuestions, {'first' : true});
      // initialize results hash
      var startingResults = {};
      startingResults[startingTQ.id] = {
        Q: startingTQ.Q,
        answer: false
      }
      // --------------------
      var resultsRef = fb.testResults.child(id);
      resultsRef.setWithPriority({
        id: id,
        test: test.name,
        user: user.id,
        start: start,
        results: startingResults,
      }, test.name)
      var results = $firebase(resultsRef).$asObject();
      return results.$loaded();
    }


    return {
      data: db,
      getQuestion: getQuestion,
      getQuestions: getQuestions,
      getTestQ: getTestQ,
      setTestQ: setTestQ,
      deleteTestQ: deleteTestQ,
      deleteQuestion: deleteQuestion,
      newTestQ: newTestQ,
      newQ: newQ,
      newTest: newTest,
      getTest: getTest,
      getTestResults : getTestResults,
      myResults: myResults,
      myTests: myTests,
      createTestResults: createTestResults,
      getAllQuestions: getAllQuestions,
      // promise that resolves when the db has loaded...
      loaded: loaded,
    }

  })
