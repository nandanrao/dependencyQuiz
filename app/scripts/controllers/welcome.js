'use strict';

/**
 * @ngdoc function
 * @name dependencyQuizApp.controller:WelcomeCtrl
 * @description
 * # WelcomeCtrl
 * Controller of the dependencyQuizApp
 */
angular.module('dependencyQuizApp')
  .controller('WelcomeCtrl', function ($scope, auth, fb, $state) {

  var setUser = function(id){
    var user = $firebase(users.child(id)).$asObject();
    console.log(user)
    user.$loaded().then(function(obj){
      obj.$bindTo($scope, 'user')
        .then(function(){
          console.log('scope user:', $scope.user)  
        })
    })
  };

  this.login = function(mthd){
    console.log('logging in via:', mthd);
    auth.$login(mthd).then(function(user){
      var ref = fb.users.child(user.id)
      ref.once('value', function(snap){
        if (snap.val()){
          $scope.user = snap.val();
          console.log($state.get($state.current));
          // $state.go()
          return
        }
        else {
          console.log('creating new user!')
          fb.users.child(user.id).set({
            id: user.id,
            name: user.displayName,
            pic: user.thirdPartyUserData.picture,
          })
          setUser(user.id);
        }
      })
    });
  }

});
