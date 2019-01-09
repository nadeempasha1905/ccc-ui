angular
        .module('CCCapp.Controllers', [])
        .controller(
                "complaintmodeCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper,  
                        RSURL,UURL,$controller, $timeout, $window,store,ngToast,authService,$q,COMPLAINTMODE) {
                	
                	console.log("complaintmodeCtrl Page initiated !!!");
                	$scope.heading = "complaintmodeCtrl Page";
                	
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
                	
                	$scope.ComplaintModeList = [];
                    var url1=RSURL+"/complaintmodes?page=0&size=1000";
                    
                    $scope.getComplaintModeList=function(){                	  
	                    $http.get(url1)
	                        .then(function(results) {
	                        	console.log("results",results);
	                        	 $scope.ComplaintModeList	= results.data._embedded.complaintmodes;

	                         	 $timeout(function(){         
	                         		 $('#dtBasicExample').DataTable();
	                            	  	 $('.dataTables_length').addClass('bs-select');
	      		            	},1000);
	                         	 
	                          });                	
	                    }
                	
                    $scope.getComplaintModeList();
                	
                	
                });