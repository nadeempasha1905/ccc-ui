angular
        .module('CCCapp.Controllers', [])
        .controller(
                "usersCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper, $window,
                        RSURL,UURL,$controller, $timeout, $window,store,ngToast,authService,$q,Users) {
                	
                	console.log("User Page initiated !!!");
                	$scope.heading = "User Page";
                	
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
                	
                	$scope.UsersList = [];
                    var url1=RSURL+"/users?page=0&size=1000";
                    
                    $scope.getUsersList=function(){                	  
	                    $http.get(url1)
	                        .then(function(results) {
	                        	console.log("results",results);
	                        	 $scope.UsersList	= results.data._embedded.users;

	                         	 $timeout(function(){         
	                         		 $('#dtBasicExample').DataTable();
	                            	  	 $('.dataTables_length').addClass('bs-select');
	      		            	},1000);
	                         	 
	                          });                	
	                    }
                	
                    $scope.getUsersList();
                	
                	
                });