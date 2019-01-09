angular
        .module('CCCapp.Controllers', [])
        .controller(
                "stationCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper, 
                        RSURL,UURL,$controller, $timeout, $window,store,ngToast,authService,$q,STATION) {
                	
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
                	
                	$scope.StationList = [];
                    var url1=RSURL+"/stationMasters/search/findAllByOrderBySmStationId";
                    
                    $scope.getStationMasterList=function(){                	  
                        $http.get(url1)   
                          .then(function(results) {
                        	 console.log("results",results);
                        	 $scope.StationList 		= results.data._embedded.stationMasters;
                        	 
                         	 $timeout(function(){         
                         		 $('#dtBasicExample').DataTable();
                            	  	 $('.dataTables_length').addClass('bs-select');
      		            	},1000);
                         	 
                          });                	
                        }
                        $scope.getStationMasterList();
                	
                	
                });