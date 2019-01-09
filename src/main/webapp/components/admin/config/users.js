angular
        .module('CCCapp.Controllers', [])
        .controller(
                "usersCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper,  
                        RSURL,UURL,$controller, $timeout, $window,store,ngToast,authService,$q,Users,UserMaster) {
                	
                	console.log("User Page initiated !!!");
                	$scope.heading = "User Page";
                	
                	$scope.dashboard = {
                			
                	};
                	
                	$scope.LOCATION_CODE_PARAM = '';
                	
                	$rootScope.getUserRoles();
                	
                	console.log("rootscope = ",$rootScope.COMPANY_USER ,$rootScope.ZONE_USER,$rootScope.CIRCLE_USER,
                			$rootScope.DIVISION_USER,$rootScope.SUBDIVISION_USER ,$rootScope.OMSECTION_USER);
                	
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
                	
                	$scope.UsersList = [];
                    var url1=RSURL+"/users/search/findAllByOrderByUsername";
                    
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
                    
                    $scope.userdetails = {};
                    
                    $scope.COMPANYLIST = [];
                  	$scope.ZONELIST = [];
                  	$scope.CIRCLELIST = [];
                  	$scope.DIVISIONLIST = [];
                  	$scope.SUBDIVISIONLIST = [];
                  	$scope.OMSECTIONLIST = [];
                  	
                  	$scope.getcompanylist = function(){
                  		$scope.COMPANYLIST=[];
	                	$scope.ZONELIST = [];
	                	$scope.CIRCLELIST = [];
	                	
	                	 $http.get(RSURL+"/query/getelectricitycompanylist")
				  		.then(function (data){
				    		  $scope.COMPANYLIST = data.data;
				    		  
				    		  if(!$rootScope.COMPANYLIST){
				    			  $scope.userdetails.company =  $filter('filter')($scope.COMPANYLIST,{ld_code:$rootScope.GLOBAL_LOCATION_CODE.substring(0,2)},true)[0];
				    			  $scope.getzonelist();
			                	}
				    	   },function (data){
				    	   });
                  	 }
                  	
                  	$scope.getzonelist = function(){
	                	$scope.ZONELIST = [];
	                	$scope.CIRCLELIST = [];
	                	
	                	 $http.get(RSURL+"/query/getzonelist?locationcode="+$rootScope.COMPANYCODE)
				  		.then(function (data){
				    		  $scope.ZONELIST = data.data;
				    		  
				    		  if(!$rootScope.ZONE_USER){
				    			  $scope.userdetails.zone =  $filter('filter')($scope.ZONELIST,{ld_code:$rootScope.GLOBAL_LOCATION_CODE.substring(0,2)},true)[0];
				    			  $scope.getcirclelist();
			                	}
				    	   },function (data){
				    	   });
                  	 }
                  	
                  	$scope.getcirclelist = function(){
                  		$scope.CIRCLELIST = [];
                      	$scope.DIVISIONLIST = [];
                  		if($scope.userdetails.zone != undefined || $scope.userdetails.zone != null){
                  			$http.get(RSURL+"/query/getcirclelist?locationcode="+$scope.userdetails.zone.ld_code)
    				  		.then(function (data){
    				    		  $scope.CIRCLELIST = data.data;
    				    		  if(!$rootScope.CIRCLE_USER){
    				    			  $scope.userdetails.circle =  $filter('filter')($scope.CIRCLELIST,{ld_code:$rootScope.GLOBAL_LOCATION_CODE.substring(0,3)},true)[0];
    				    			  $scope.getdivisionlist();
    			                	}
    				    	   },function (data){
    				    	   });
                  		}
                  	 }
                  	
                  	$scope.getdivisionlist = function(){
                  		$scope.DIVISIONLIST = [];
                      	$scope.SUBDIVISIONLIST = [];
                  		if($scope.userdetails.circle != undefined || $scope.userdetails.circle != null){
                  			$http.get(RSURL+"/query/getdivisionlist?locationcode="+$scope.userdetails.circle.ld_code)
    				  		.then(function (data){
    				    		  $scope.DIVISIONLIST = data.data;
    				    		  
    				    		  if(!$rootScope.DIVISION_USER){
    				    			  $scope.userdetails.division =  $filter('filter')($scope.DIVISIONLIST,{ld_code:$rootScope.GLOBAL_LOCATION_CODE.substring(0,5)},true)[0];
    				    			  $scope.getsubdivisionlist();
    			                	}
    				    	   },function (data){
    				    	   });
                  		}
                  	 }
                  	
                  	$scope.getsubdivisionlist = function(){
                  		$scope.SUBDIVISIONLIST = [];
                      	$scope.OMSECTIONLIST = [];
                  		if($scope.userdetails.division != undefined || $scope.userdetails.division != null){
                  			$http.get(RSURL+"/query/getsubdivisionlistbydivision?locationcode="+$scope.userdetails.division.ld_code)
    				  		.then(function (data){
    				    		  $scope.SUBDIVISIONLIST = data.data;
    				    		  
    				    		  if(!$rootScope.SUBDIVISION_USER){
    				    			  $scope.userdetails.subdivision =  $filter('filter')($scope.SUBDIVISIONLIST,{ld_code:$rootScope.GLOBAL_LOCATION_CODE.substring(0,7)},true)[0];
    				    			  $scope.getomsectionlist();
    			                	}
    				    	   },function (data){
    				    	   });
                  		}
                  	 }
                  	
                  	$scope.getomsectionlist = function(){
                  		$scope.OMSECTIONLIST = [];
                  		if($scope.userdetails.subdivision != undefined || $scope.userdetails.subdivision != null){
                  			$http.get(RSURL+"/query/getomsectionlist?locationcode="+$scope.userdetails.subdivision.ld_code)
    				  		.then(function (data){
    				    		  $scope.OMSECTIONLIST = data.data;
    				    			  $scope.userdetails.omsection =  $filter('filter')($scope.OMSECTIONLIST,{ld_code:$rootScope.GLOBAL_LOCATION_CODE.substring(0,9)},true)[0];
    				    	   },function (data){
    				    	   });
                  		}
                  	 }
                  	
                  	var url1=RSURL+"/query/getuserroles";
                  	var url3=RSURL+"/departments/search/findAllByOrderByDepartmentid";
                  	
                    $scope.getUserroleList=function(){                	  
	                    $http.get(url1)
	                        .then(function(results) {
	                        	 $scope.USERROLES	= results.data;
	                          });                	
	                    }
                    
                    $scope.getDepartmentList=function(){                	  
	                    $http.get(url3)
	                        .then(function(results) {
	                        	 $scope.DepartmentList	= results.data._embedded.departments;
	                          });                	
	                    }
                    
                    $scope.getUserroleList();
                    $scope.getDepartmentList();
                    
                  //	$scope.getzonelist();
                  	
                    $scope.addUser = function(){
                    	
                    	$scope.message = null;
                    	$scope.userdetails = {};
                    	
                    	$scope.userdetails.enabled=true;
                    	
                    	$('#addeditusermodal').modal('toggle');
                    	
                    	$scope.getcompanylist();
                    };
                    
                    $scope.save = function(){
                    	
                    	$scope.userobject = new Users();
                    	$scope.usermasterobject = new UserMaster();
                    	
                    	$scope.LOCATION_CODE_PARAM = $rootScope.COMPANYCODE;
                  		
                  		if($scope.userdetails.zone != undefined || $scope.userdetails.zone != null){
                  			$scope.LOCATION_CODE_PARAM = $scope.userdetails.zone.ld_code;
                  		}
                  		if($scope.userdetails.circle != undefined || $scope.userdetails.circle != null){
                  			$scope.LOCATION_CODE_PARAM = $scope.userdetails.circle.ld_code;
                  		}
                  		if($scope.userdetails.division != undefined || $scope.userdetails.division != null){
                  			$scope.LOCATION_CODE_PARAM = $scope.userdetails.division.ld_code;
                  		}
                  		if($scope.userdetails.subdivision != undefined || $scope.userdetails.subdivision != null){
                  			$scope.LOCATION_CODE_PARAM = $scope.userdetails.subdivision.ld_code;
                  		}
                  		if($scope.userdetails.omsection != undefined || $scope.userdetails.omsection != null){
                  			$scope.LOCATION_CODE_PARAM = $scope.userdetails.omsection.ld_code;
                  		}
                  		
                  		$scope.usermasterobject.umCreatedon = new Date();
                  		$scope.usermasterobject.umCreatedby = $rootScope.username;
                  		$scope.usermasterobject.umDepartmentId = ($scope.userdetails.department === undefined || $scope.userdetails.department === null ? null : $scope.userdetails.department.departmentid);
                  		$scope.usermasterobject.umEmail = $scope.userdetails.email;
                  		$scope.usermasterobject.umLocationCode = $scope.LOCATION_CODE_PARAM;
                  		$scope.usermasterobject.umUserId = $scope.userdetails.userid;
                  		$scope.usermasterobject.umName = $scope.userdetails.username;
                  		$scope.usermasterobject.umPassword = $scope.userdetails.password;
                  		$scope.usermasterobject.umPhone = $scope.userdetails.phone;
                  		$scope.usermasterobject.umRole = ($scope.userdetails.userrole === undefined || $scope.userdetails.userrole === null ? null : $scope.userdetails.userrole.ur_role_cd);
                  		$scope.usermasterobject.umStatus = $scope.userdetails.enabled;
                  		$scope.usermasterobject.umValidFrom = $scope.userdetails.fromdate;
                  		$scope.usermasterobject.umValidTo = $scope.userdetails.todate;
                  		
                  		console.log("usermasterobject",$scope.usermasterobject);
                  		
                  		$scope.usermasterobject.$save(function (data, headers) {
                			
                  			var inserted_id = data._links.self.href.split("/").pop();	
                        	console.log("data",inserted_id);
                			console.log("data",data);
                			console.log("headers",headers);
                			
                			if(data.$resolved){
                				
                				$scope.userobject.id = parseInt(inserted_id);
                    			$scope.userobject.email = $scope.userdetails.email;
                    			$scope.userobject.enabled = $scope.userdetails.enabled;
                    			$scope.userobject.mobileno = $scope.userdetails.phone;
                    			$scope.userobject.name = $scope.userdetails.username;
                    			$scope.userobject.password = $scope.userdetails.password;
                    			$scope.userobject.username = $scope.userdetails.userid;
                    			
                    			$scope.userobject.$save(function (data, headers) {
                    				$scope.error = false;
                            		$scope.message = "Record Inserted Successfully !!!" ;
                                	
                            		$timeout(function(){
        		    		    		$scope.message = null;
        		    				},3000);
                    				
                    			},function (response){
                        			console.log("response",response.data.cause.message);
                        			$scope.error = true;
                        			$scope.message = response.data.cause.message+"";
                        			
                        			$timeout(function(){
        		    		    		$scope.message = null;
        		    		    		$scope.error = false;
        		    				},4000);
        				    	   });
                				
                				
                				/*$scope.error = false;
                        		$scope.message = "Record Inserted Successfully !!!" ;
                            	
                        		$timeout(function(){
    		    		    		$scope.message = null;
    		    				},3000);*/
                			}
                		},function (response){
                			console.log("response",response.data.cause.message);
                			$scope.error = true;
                			$scope.message = response.data.cause.message+"";
                			
                			$timeout(function(){
		    		    		$scope.message = null;
		    		    		$scope.error = false;
		    				},4000);
				    	   });
                    	
                    };
                	
                	
                });