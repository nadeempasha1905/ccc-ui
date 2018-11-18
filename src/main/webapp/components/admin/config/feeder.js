angular
        .module('CCCapp.Controllers', [])
        .controller(
                "feederCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper, $window,
                        RSURL,UURL,$controller, $timeout, $window,store,ngToast,authService,$q,DESIGNATION) {
                	
                	console.log("feederCtrl Page initiated !!!");
                	$scope.heading = "feederCtrl Page";
                	
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