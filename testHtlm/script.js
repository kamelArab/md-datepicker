


var myAppModule = angular.module('myApp', ['ngMaterial','md-datepicker']);

// configure the module.
// in this example we will create a greeting filter
myAppModule.controller('totoCtrl', function($scope){
	$scope.toto = "TITI";	
});
myAppModule.filter('greet', function() {
    return function(name) {
        return 'Hello, ' + name + '!';
    };
});
