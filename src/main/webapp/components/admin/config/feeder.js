angular
        .module('CCCapp.Controllers', [])
        .controller(
                "feederCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper,  
                        RSURL,UURL,$controller, $timeout, $window,store,ngToast,authService,$q,FEEDER) {
                	
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
                	
                	$scope.FeederList = [];
                    var url1=RSURL+"/feederMasters/search/findAllByOrderByFmFeederId";
                    
                    $scope.getFeederMasterList=function(){                	  
                        $http.get(url1)   
                          .then(function(results) {
                        	 console.log("results",results);
                        	 $scope.FeederList 		= results.data._embedded.feederMasters;
                        	 
                         	 $timeout(function(){         
                         		 $('#dtBasicExample').DataTable();
                            	  	 $('.dataTables_length').addClass('bs-select');
      		            	},1000);
                         	 
                          });                	
                        }
                        $scope.getFeederMasterList();
                	
                	
                });