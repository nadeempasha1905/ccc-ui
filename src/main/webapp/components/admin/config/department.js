angular
        .module('CCCapp.Controllers', [])
        .controller(
                "departmentCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper,  
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
                    var url1=RSURL+"/departments/search/findAllByOrderByDepartmentid";
                    
                    $scope.getDepartmentList=function(){       
                    	$scope.DepartmentList = [];
                    	$('.dataTables_length').removeClass('bs-select');
	                    $http.get(url1)
	                        .then(function(results) {
	                        	console.log("results",results);
	                        	 $scope.DepartmentList	= results.data._embedded.departments;

	                         	 $timeout(function(){         
	                         		 $('#dtBasicExample').DataTable();
	                            	  	 $('.dataTables_length').addClass('bs-select');
	      		            	},1000);
	                         	 
	                          });                	
	                    }
                	
                    $scope.getDepartmentList();
                    
                    $scope.OrganizationList = [
	                    {
                    		"organizationname":"Bescom",
                    		"organizationid":1
	        			},
	        			{
                    		"organizationname":"Mescom",
                    		"organizationid":2
	        			}
                    ];
                    
                    $scope.editDepartment = function(row){
                    	
                    	$scope.message = null;
                    	
                    	var departmentid = row._links.self.href.split("/").pop();
                        $scope.modaltitle="Update "+row.departmentname+" details"
                    	
                    	$scope.editrecord = true;
                    	$scope.departmentrecord = row ;
                    	
                    	$scope.selectedorganization =  $filter('filter')($scope.OrganizationList, {organizationid:2},true)[0];
                    	
                    	$('#addeditdepartmentmodal').modal('toggle');
                    };
                    
                    $scope.addDepartment = function(){
                    	
                    	$scope.message = null;
                    	$scope.departmentrecord =  new DEPARTMENT();
                    	
                    	$scope.editrecord = false;
                    	$scope.modaltitle="Adding New Department"
                    	
                    	$scope.selectedorganization =  $filter('filter')($scope.OrganizationList, {organizationid:2},true)[0];
                    	$scope.departmentrecord.departmentname = '';
                    	
                    	$('#addeditdepartmentmodal').modal('toggle');
                    };
                    
                    $scope.save = function(){
                    	
                    	/*"departmentid" : 1,
					      "departmentname" : "Technical",
					      "languageid" : "en_US",
					      "organizationid" : 1,*/
                    	
                    	if($scope.editrecord){
                    		//Update record
                    		var departmentid = $scope.departmentrecord._links.self.href.split("/").pop();
                        	console.log("departmentid",departmentid);
                        	
                        	$scope.departmentrecord.organizationid = $scope.selectedorganization.organizationid;
                        	$scope.departmentrecord.languageid = "en_US";
                        	
                        	DEPARTMENT.update({id: departmentid}, $scope.departmentrecord);
                    		
                    		//notify.success("Comment Saved Successfully");
                    		$scope.error = false;
                    		$scope.message = "Record Updated Successfully !!!" ; 
							
		    		    	$timeout(function(){
		    		    		//$scope.clearform_modal();
		    		    		$scope.message = null;
		    				},3000);
		    		    	
                    		
                    	}else{
                    		
                            $http.get(RSURL+"/departments/search/getDepartmentMaxid")
                            .then(function(results) {
                      	 
                            	console.log("getDepartmentMaxid",results);
                            	var maxdepid = results.data;
                            	
                            	$scope.departmentrecord.departmentid   =  maxdepid;
                            	$scope.departmentrecord.organizationid =  $scope.selectedorganization.organizationid;
                            	$scope.departmentrecord.languageid     =  "en_US";
                            	

	                      	 	$scope.departmentrecord.$save(function (data, headers) {
	                			
	                			console.log("data",data);
	                			console.log("headers",headers);
	                			
	                			if(data.$resolved){
	                				$scope.error = false;
	                        		$scope.message = "Record Inserted Successfully !!!" ;
	                            	
	                        		$timeout(function(){
	    		    		    		$scope.message = null;
	    		    				},3000);
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
	                        });
                    	}
                    	console.log("$scope.departmentrecord",$scope.departmentrecord);
                    };
                	
                });