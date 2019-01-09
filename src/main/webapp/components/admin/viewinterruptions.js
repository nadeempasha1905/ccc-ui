angular
        .module('CCCapp.Controllers', [])
        .controller(
                "viewinterruptionsCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper, 
                        RSURL,$controller, $timeout, $window,store,ngToast,authService,$q) {
                	
                	console.log("viewinterruptionsCtrl initiated !!!");
                	
                	$scope.consumerinfo = {};
                	if($cookies.get("access_token")) {
                		$rootScope.IsLogin=true;
                		$rootScope.username = $cookies.get("user");
					   }else{
						   $rootScope.IsLogin=false;
						   $state.go('login');
					   }
                	
                	
                	var USERINFO= store.get("userinfo");
                	
               	 $scope.loadinterruptions = function()
                 {
                 	$scope.INTERRUPTIONDETAILS = [];
                 	 $http.get(RSURL+"/query/loadinterruptiondetails")
				  		.then(function (data){
				    		  console.log(data);	
				    		  $scope.INTERRUPTIONDETAILS = data.data;
				    	   },function (data){
				    	   });
                 }
                 
                $scope.loadinterruptions();
                	
                	
            	$rootScope.activelink(7);	
                });