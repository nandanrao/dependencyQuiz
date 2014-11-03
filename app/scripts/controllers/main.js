
/**
 * @ngdoc function
 * @name dependencyQuizApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dependencyQuizApp
 */
angular.module('dependencyQuizApp')
  .controller('MainCtrl', function ($scope, auth, $state) {
    $scope.auth = auth;
    $scope.expanded;

    this.profileClick = function(){
      if ($state.current.name === "home"){
        $scope.expanded = !$scope.expanded;
      }
      else {
        $state.go('home');
      }
    }

    this.profileClass = function(){
      if ($scope.expanded){
        return 'expanded'
      }
      else {
        return ''
      }
    }

  })