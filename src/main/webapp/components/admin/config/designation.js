angular
        .module('CCCapp.Controllers', [])
        .controller(
                "designationCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper, 
                        RSURL,UURL,$controller, $timeout, $window,store,ngToast,authService,$q,notify,DESIGNATION) {
                	
                	console.log("Designation Page initiated !!!");
                	$scope.heading = "Designation Page";
                	
                	$scope.error = false;
                	$scope.message = null;
                	$scope.departmentrecord =  new DESIGNATION();
                	
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
						  
						  
                	
                	$scope.DesignationList = [];
                    var url1=RSURL+"/designations/search/findAllByOrderByDsgId";
                	//var url1=RSURL+"/designations/search/getDesignationList";
                    var url2=RSURL+"/cadres/search/findAllByOrderByCdrId";
                    var url3=RSURL+"/departments/search/findAllByOrderByDepartmentid";
                   // var url2=RSURL + '/query/getusersbyroles?roles=ROLE_USER,ROLE_ADMIN,ROLE_MANAGEMENT'
                    //var url3=RSURL + '/jlrRoomTypes'     
                    
                    
                    $scope.getDesignationList=function(){
                    	$scope.message = null;
                    	
                    	$scope.DesignationList = null;
                    	
                        $http.get(url1)
                              .then(function(results) {
                        	 console.log("results",results);
                        	 $scope.DesignationList = results.data._embedded.designations;
                        	 
                        	/* $scope.DesignationList.map(function (t) {
                        	 
                        		// console.log(moment.utc(t.dsgCreatedOn).format('DD-MM-YYYY hh:m:ss a'));
                        		 
                        		 t.dsgCreatedOn = moment.utc(t.dsgCreatedOn).format('DD-MM-YYYY hh:m:ss a');
                        	 });*/

                        	 $timeout(function(){         
                        		 $('#dtBasicExample').DataTable();
                           	  	 $('.dataTables_length').addClass('bs-select');
     		            	},1000);
                          });                	
                    }
                    
                    $scope.getDepartmentList=function(){                	  
	                    $http.get(url3)
	                        .then(function(results) {
	                        	 $scope.DepartmentList	= results.data._embedded.departments;
	                          });                	
	                    }
                    
                    $scope.getCadreList=function(){                	  
                    $http.get(url2)   
                              .then(function(results) {
                        	 console.log("results",results);
                        	 $scope.CadreList 		= results.data._embedded.cadres;
                          });                	
                    }
                    
                    $scope.getDesignationList();
                    $scope.getDepartmentList();
                    $scope.getCadreList();
                    
                    $scope.editDesignation = function(row){
                    	
                    	$scope.message = null;
                    	
                    	var departmentid = row._links.self.href.split("/").pop();
                        $scope.modaltitle="Update "+row.dsgName+" details"
                    	
                    	$scope.editrecord = true;
                    	$scope.departmentrecord = row ;
                    	
                    	console.log("departmentrecord",$scope.departmentrecord.dsgDepartmentId);
                    	
                    	if($scope.departmentrecord.dsgDepartmentId){
                    		$scope.selecteddepartment =  $filter('filter')($scope.DepartmentList, {departmentid:$scope.departmentrecord.dsgDepartmentId},true)[0]; 
                    	}else{
                    		$scope.selecteddepartment=undefined;   
                    	}
                    	
                    	if($scope.departmentrecord.dsgCadreId){
                    		$scope.selectedcadre =  $filter('filter')($scope.CadreList, {cdrId:$scope.departmentrecord.dsgCadreId},true)[0]; 
                    	}else{
                    		$scope.selectedcadre=undefined;   
                    	}
                    	
                    	console.log("row",row,$scope.selecteddepartment,$scope.selectedcadre);
                    	$('#addeditdesignationmodal').modal('toggle');
                    };
                    
                    $scope.addDesignation = function(){
                    	
                    	$scope.message = null;
                    	$scope.departmentrecord =  new DESIGNATION();
                    	
                    	$scope.editrecord = false;
                    	$scope.modaltitle="Adding New Designation"
                    	
                    	$scope.selecteddepartment=undefined;
                    	$scope.selectedcadre=undefined;   
                    	
                    	$('#addeditdesignationmodal').modal('toggle');
                    };
                    
                    $scope.save = function(){
                    	
                    	/*dsgCadreId: 1
                    	dsgCadreName: "ACCOUNTS OFFICER"
                    	dsgCreatedBy: "RAVI"
                    	dsgCreatedOn: "2018-11-05T20:26:36.867+0000"
                    	dsgDeleteStatus: false
                    	dsgDeletedDate: null
                    	dsgDepartmentId: 1
                    	dsgDepartmentName: null
                    	dsgId: 190
                    	dsgName: "ACCOUNTS OFFICER(EBC)"
                    	dsgUpdatedBy: null
                    	dsgUpdatedOn: null*/
                    	
                    	if(!$scope.departmentrecord.dsgDeleteStatus){
                    		$scope.departmentrecord.dsgDeleteStatus  = false;
                		}
                    	
                    	console.log("$scope.selectedcadre",$scope.selectedcadre);
                    	console.log("$scope.selecteddepartment",$scope.selecteddepartment);
                    	
                    	if($scope.editrecord){
                    		//Update record
                    		var designationid = $scope.departmentrecord._links.self.href.split("/").pop();
                        	console.log("designationid",designationid);
                        	
                        	//$scope.departmentrecord.dsgCreatedOn  =  moment.tz($scope.departmentrecord.dsgCreatedOn,"Asia/Kolkata").format();
                        	
                        	$scope.departmentrecord.dsgUpdatedBy  =   $rootScope.username;
                    		$scope.departmentrecord.dsgUpdatedOn  =   new Date();
                    		
                    		DESIGNATION.update({id: designationid}, $scope.departmentrecord);
                    		
                    		//notify.success("Comment Saved Successfully");
                    		$scope.error = false;
                    		$scope.message = "Record Updated Successfully !!!" ; 
							
		    		    	$timeout(function(){
		    		    		//$scope.clearform_modal();
		    		    		$scope.message = null;
		    				},8000);
		    		    	
                    		
                    	}else{
                    		//Add record
                    		
                    		
                            $http.get(RSURL+"/designations/search/getDesignationMaxid")
	                            .then(function(results) {
	                      	 
	                            	console.log("getDesignationMaxid",results);
	                            	var maxdesigid = results.data;
	                            	
	                            	$scope.departmentrecord.dsgId  				=  maxdesigid;
	                            	$scope.departmentrecord.dsgCadreId  		=  $scope.selectedcadre.cdrId;
	                        		$scope.departmentrecord.dsgCadreName  		=  $scope.selectedcadre.cdrName;
	                        		$scope.departmentrecord.dsgDepartmentId  	=  $scope.selecteddepartment.departmentid;
	                        		$scope.departmentrecord.dsgDepartmentName  	=  $scope.selecteddepartment.departmentname;
	                        		$scope.departmentrecord.dsgCreatedBy  		=  $rootScope.username;
	                        		$scope.departmentrecord.dsgCreatedOn  		=  new Date();
	                        		$scope.departmentrecord.dsgUpdatedBy  		=  null;
	                        		$scope.departmentrecord.dsgUpdatedOn  		=  null;
	                        		$scope.departmentrecord.dsgDeletedDate  	=  null;
	                        		$scope.departmentrecord.dsgDeleteStatus     =  false;
	                            	
	
	                      	 	$scope.departmentrecord.$save(function (data, headers) {
                    			
                    			console.log("data",data);
                    			console.log("headers",headers);
                    			
                    			if(data.$resolved){
                    				////console.log("helprequest",data);
                    				//var helprequestid=data._links.self.href.split("/").pop();
                    				$scope.error = false;
                            		$scope.message = "Record Inserted Successfully !!!" ;
                            		
                            		/*$scope.message = null;
                                	$scope.departmentrecord = null;
                                	
                                	$scope.editrecord = false;
                                	$scope.modaltitle="Adding New Department"
                                	
                                	$scope.selecteddepartment=undefined;
                                	$scope.selectedcadre=undefined;   */
                                	
                                	
                            		$timeout(function(){
        		    		    		//$scope.clearform_modal();
        		    		    		$scope.message = null;
        		    				},8000);
                    			}
                    		},function (response){
                    			console.log("response",response.data.cause.message);
                    			$scope.error = true;
                    			$scope.message = response.data.cause.message+"";
                    			
                    			$timeout(function(){
    		    		    		//$scope.clearform_modal();
    		    		    		$scope.message = null;
    		    		    		$scope.error = false;
    		    				},8000);
					    	   });

	                        });
                    		
                    			
                    	}
                    	console.log("$scope.departmentrecord",$scope.departmentrecord);
                    };
                });