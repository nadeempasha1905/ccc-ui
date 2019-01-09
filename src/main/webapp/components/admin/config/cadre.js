angular
        .module('CCCapp.Controllers', [])
        .controller(
                "cadreCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper,               RSURL,UURL,$controller, $timeout, $window,store,ngToast,authService,$q,CADRE) {
                	
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
                    var url1=RSURL+"/cadres/search/findAllByOrderByCdrId";
                    
                    $scope.getCadreList=function(){                	  
                        $http.get(url1)   
                          .then(function(results) {
                        	 console.log("results",results);
                        	 $scope.CadreList 		= results.data._embedded.cadres;
                        	 
                         	 $timeout(function(){         
                         		 $('#dtBasicExample').DataTable();
                            	  	 $('.dataTables_length').addClass('bs-select');
      		            	},1000);
                         	 
                          });                	
                        }
                        $scope.getCadreList();
                        
                        
                        $scope.editCadre = function(row){
                        	
                        	$scope.message = null;
                        	
                        	var cadreid = row._links.self.href.split("/").pop();
                            $scope.modaltitle="Update "+row.cdrName+" details"
                        	
                        	$scope.editrecord = true;
                        	$scope.cadrerecord = row ;
                        	
                        	console.log(row);
                        	
                        	$('#addeditcadremodal').modal('toggle');
                        };
                        
                        $scope.addCadre = function(){
                        	
                        	$scope.message = null;
                        	$scope.cadrerecord =  new CADRE();
                        	
                        	$scope.editrecord = false;
                        	$scope.modaltitle="Adding New Cadre"
                        	
                        	$scope.cadrerecord.cdrName = '';
                        	
                        	$('#addeditcadremodal').modal('toggle');
                        };
                        
                        $scope.save = function(){
                        	
                        	/*cdrCategory: null
								cdrCreatedBy: "RAVI"
								cdrCreatedOn: "2018-11-05T20:09:17.579+0000"
								cdrDeleteStatus: false
								cdrDeletedDate: null
								cdrFdeCode: null
								cdrId: 1
								cdrName: "ACCOUNTS OFFICER"
								cdrUpdatedBy: null
								cdrUpdatedOn: null*/
                        	
                        	if($scope.editrecord){
                        		//Update record
                        		var cadreid = $scope.cadrerecord._links.self.href.split("/").pop();
                            	console.log("cadreid",cadreid);
                            	
                            	$scope.cadrerecord.cdrUpdatedBy = $rootScope.username;
                            	$scope.cadrerecord.cdrUpdatedOn = new Date();
                            	
                            	CADRE.update({id: cadreid}, $scope.cadrerecord);
                            	
                        		$scope.error = false;
                        		$scope.message = "Record Updated Successfully !!!" ; 
    							
    		    		    	$timeout(function(){
    		    		    		$scope.message = null;
    		    				},3000);
    		    		    	
                        		
                        	}else{
                        		
                                $http.get(RSURL+"/cadres/search/getCadreSMaxid")
                                .then(function(results) {
                          	 
                                	console.log("getCadreSMaxid",results);
                                	var maxdepid = results.data;
                                	
                                	$scope.cadrerecord.cdrId   =  maxdepid;
                                	$scope.cadrerecord.cdrCategory =  null;
                                	$scope.cadrerecord.cdrCreatedBy = $rootScope.username;
                                	$scope.cadrerecord.cdrCreatedOn = new Date();
                                	if($scope.cadrerecord.cdrDeleteStatus){
                                		$scope.cadrerecord.cdrDeletedDate = new Date();
                                	}
                                	$scope.cadrerecord.cdrFdeCode = null;
                                	$scope.cadrerecord.cdrUpdatedBy = null;
                                	$scope.cadrerecord.cdrUpdatedOn = null;
                                	

                                	$scope.cadrerecord.$save(function (data, headers) {
    	                			
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
                        	console.log("$scope.cadrerecord",$scope.cadrerecord);
                        };
                        
                });