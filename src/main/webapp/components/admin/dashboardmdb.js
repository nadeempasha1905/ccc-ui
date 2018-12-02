angular
        .module('CCCapp.Controllers', [])
        .controller(
                "dashboardmdbCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper, $window,
                        RSURL,$controller, $timeout, $window,store,ngToast,authService,$q) {
                	
                	console.log("Dashboard MDB Page initiated !!!");
                	$scope.heading = "Dashboard MDB Page";
                	
                	console.log($('#pills-tab'));
                	
                	$('#dashboardlink').addClass('active');
                	
                	if($cookies.get("access_token")) {
                		$rootScope.IsLogin=true;
                		/*$http.get(RSURL+"/profile")
				  		.then(function (data){
				    		  console.log(data);	
				    	   },function (data){
				    	   });*/
                		$rootScope.username = $cookies.get("user");
                		
                		
					   }else{
						   $rootScope.IsLogin=false;
						   $state.go('login');
					   }
                	
                	
                	
                });