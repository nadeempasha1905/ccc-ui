angular
        .module('CCCapp.Controllers', [])
        .controller(
                "subcategoryCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper,  
                        RSURL,UURL,$controller, $timeout, $window,store,ngToast,authService,$q,SUBCATEGORY) {
                	
                	console.log("subcategoryCtrl Page initiated !!!");
                	$scope.heading = "subcategoryCtrl Page";
                	
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
                	
                	$scope.SubCategoryList = [];
                    var url1=RSURL+"/subcategories?page=0&size=1000";
                    
                    $scope.getSubCategoryList=function(){                	  
                        $http.get(url1)   
                          .then(function(results) {
                        	 console.log("results",results);
                        	 $scope.SubCategoryList 		= results.data._embedded.subcategories;
                        	 
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
                        $scope.getSubCategoryList();
                	
                });