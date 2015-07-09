var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl : '/home.html',
            controller : 'ServiceController'
        })
        .when('/servicess/:id', {
            templateUrl : '/services.html',
            controller : 'ServicesController'
        });
});
app.controller('ServiceController', function($scope,$http){
	$scope.description='Users Details';

	$scope.add = function(){
		$http.post('/users', $scope.user)
		.success($scope.people);
	};
	$scope.people = function(){
		$http.get('/users')
		.success($scope.renderUser);
	};
	$scope.renderUser = function(response){
		$scope.users = response;
	};
	$scope.remove = function(id){
		$http.delete('/users/'+id).success($scope.people);
	};

	$scope.people();
});

app.controller('ServicesController', function($scope,$http,$routeParams,$location){
 	$http.get('/servicess/'+$routeParams.id)
	.success(function(data) {
		$scope.personal=data;
	});
	$scope.update = function(id){
		$http.put('/servicess/'+id,$scope.personal).
		success(function() {
			$location.path('/');
		});
	};
});