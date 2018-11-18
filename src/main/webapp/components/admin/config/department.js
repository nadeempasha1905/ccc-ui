angular
        .module('CCCapp.Controllers', [])
        .controller(
                "departmentCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper, $window,
                        RSURL,UURL,$controller, $timeout, $window,store,ngToast,authService,$q,DEPARTMENT) {
                	
                	console.log("Department Page initiated !!!");
                	$scope.heading = "Department Page";
                	
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
                	
                	$scope.DepartmentList = [];
                    var url1=RSURL+"/departments?page=0&size=1000";
                    
                    $scope.getDepartmentList=function(){                	  
	                    $http.get(url1)
	                        .then(function(results) {
	                        	 $scope.DepartmentList	= results.data._embedded.departments;

	                         	 $timeout(function(){         
	                         		 $('#dtBasicExample').DataTable();
	                            	  	 $('.dataTables_length').addClass('bs-select');
	      		            	},1000);
	                         	 
	                          });                	
	                    }
                	
                    $scope.getDepartmentList();
                	
                });