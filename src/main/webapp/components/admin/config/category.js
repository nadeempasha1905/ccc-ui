angular
        .module('CCCapp.Controllers', [])
        .controller(
                "categoryCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper, 
                        RSURL,UURL,$controller, $timeout, $window,store,ngToast,authService,$q,CATEGORY) {
                	
                	console.log("categoryCtrl Page initiated !!!");
                	$scope.heading = "categoryCtrl Page";
                	
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
                	
                	$scope.CategoryList = [];
                    var url1=RSURL+"/categories?page=0&size=1000";
                    
                    $scope.getCategoryList=function(){                	  
                        $http.get(url1)   
                          .then(function(results) {
                        	 console.log("results",results);
                        	 $scope.CategoryList 		= results.data._embedded.categories;
                        	 
                          	/* $scope.CategoryList.map(function (t) {
                         		// console.log(moment.utc(t.dsgCreatedOn).format('DD-MM-YYYY hh:m:ss a'));
                         		 t.cdrCreatedBy = moment.utc(t.cdrCreatedBy).format('DD-MM-YYYY hh:m:ss a');
                         	 });*/

                         	 $timeout(function(){         
                         		 $('#dtBasicExample').DataTable();
                            	  	 $('.dataTables_length').addClass('bs-select');
      		            	},1000);
                         	 
                          });                	
                        }
                        $scope.getCategoryList();
                	
                	
                });