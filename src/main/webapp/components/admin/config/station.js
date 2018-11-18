angular
        .module('CCCapp.Controllers', [])
        .controller(
                "stationCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper, $window,
                        RSURL,UURL,$controller, $timeout, $window,store,ngToast,authService,$q,DESIGNATION) {
                	
                	console.log("stationCtrl Page initiated !!!");
                	$scope.heading = "stationCtrl Page";
                	
                	if($cookies.get("access_token")) {
                		$rootScope.IsLogin=true;
                		$http.get(RSURL+"/profile")
				  		.then(function (data){
				    		  console.log(data);	
				    	   },function (data){
				    	   });
                		$rootScope.username = $cookies.get("user");
					   }else{
						   $rootScope.IsLogin=false;
						   $state.go('login');
					   }
                	
                	
                });