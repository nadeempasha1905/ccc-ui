angular
        .module('CCCapp.Controllers', [])
        .controller(
                "homeCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper, $window,
                        RSURL,UURL,$controller, $timeout, $window,store,ngToast,authService,$q) {
                	
                	console.log("Home Page initiated !!!");
                	$scope.heading = "Home Page";
                	
                	if($cookies.get("access_token")) {
						  $rootScope.IsLogin=true;
						  $http.get(UURL+"/profile")
					  		.then(function (data){
					    		  console.log(data);	
					    	   },function (data){
					    	   });
					   }
                	
                });