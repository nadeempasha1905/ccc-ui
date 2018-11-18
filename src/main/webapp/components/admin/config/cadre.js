angular
        .module('CCCapp.Controllers', [])
        .controller(
                "cadreCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper, $window,
                        RSURL,UURL,$controller, $timeout, $window,store,ngToast,authService,$q,CADRE) {
                	
                	console.log("cadreCtrl Page initiated !!!");
                	$scope.heading = "cadreCtrl Page";
                	
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

                	$scope.CadreList = [];
                    var url1=RSURL+"/cadres?page=0&size=1000";
                    
                    $scope.getCadreList=function(){                	  
                        $http.get(url1)   
                          .then(function(results) {
                        	 console.log("results",results);
                        	 $scope.CadreList 		= results.data._embedded.cadres;
                        	 
                          	/* $scope.CadreList.map(function (t) {
                         		// console.log(moment.utc(t.dsgCreatedOn).format('DD-MM-YYYY hh:m:ss a'));
                         		 t.cdrCreatedBy = moment.utc(t.cdrCreatedBy).format('DD-MM-YYYY hh:m:ss a');
                         	 });*/

                         	 $timeout(function(){         
                         		 $('#dtBasicExample').DataTable();
                            	  	 $('.dataTables_length').addClass('bs-select');
      		            	},1000);
                         	 
                          });                	
                        }
                        $scope.getCadreList();
                });