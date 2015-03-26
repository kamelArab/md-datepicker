


var myAppModule = angular.module('myApp', ['ngMaterial','md-datepicker']);

// configure the module.
// in this example we will create a greeting filter
myAppModule.controller('totoCtrl', function($scope){
	$scope.toto = "TITI";
	$scope.mindate = "0/2015";
	$scope.date = new Date();
	$scope.mindate = $scope.date.getMonth() +1 +'/' + $scope.date.getFullYear();
    $scope.maxdate = new Date($scope.date.getFullYear(), $scope.date.getMonth()+2, $scope.date.getDate() );
    $scope.date2 = new Date($scope.date.getFullYear(), $scope.date.getMonth()+1, $scope.date.getDate() +1);

    $scope.ok ="YO";
    $scope.cancel="PasYO"
	$scope.coucou = function(){
		console.log("COUCOU");
	}
	$scope.formateDateReg = "^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$"	
});
myAppModule.filter('greet', function() {
    return function(name) {
        return 'Hello, ' + name + '!';
    };
});
