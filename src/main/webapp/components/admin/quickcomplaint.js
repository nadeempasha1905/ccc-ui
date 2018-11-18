angular
        .module('CCCapp.Controllers', [])
        .controller(
                "quickcomplaintCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper, $window,
                        RSURL,$controller, $timeout, $window,store,ngToast,authService,$q,REQUEST) {
                	
                	console.log("quickcomplaintCtrl initiated !!!");
                	$scope.heading = "quickcomplaintCtrl Page";
                	
                	$('#quickcmplaintlink').addClass('active');
                	
                	$scope.consumerinfo = {}; 
                	
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
                	
                	
                	$scope.getsubdivisionlist = function(){
                		$scope.SUBDIVISIONLIST = [];
	                   	 $http.get(RSURL+"/query/getsubdivisionlist")
				  		.then(function (data){
				    		  console.log(data);	
				    		  $scope.SUBDIVISIONLIST = data.data;
				    	   },function (data){
				    	   });
                	};
                	
                	$scope.getomsectionlist = function(value){
                		$scope.OMSECTIONLIST = [];
                		console.log("Hi",$scope.consumerinfo.selected_subdivision);
                		if($scope.consumerinfo.selected_subdivision){
	                   	 $http.get(RSURL+"/query/getomsectionlist?locationcode="+$scope.consumerinfo.selected_subdivision.ld_code)
				  		.then(function (data){
				    		  console.log(data);	
				    		  $scope.OMSECTIONLIST = data.data;
				    		  
				    		  if(value != 0){
	     			    			 $scope.consumerinfo.selected_omsection = $filter('filter')($scope.OMSECTIONLIST,{ld_code:value},true)[0];
	     			    		  }
				    		  
				    	   },function (data){
				    	   });
                		}
                	};
                	
                	 $scope.loadcategory = function()
                     {
                     	$scope.CATEGORYLIST = [];
                     	 $http.get(RSURL+"/query/loadcategories")
  				  		.then(function (data){
  				    		  console.log(data);	
  				    		  $scope.CATEGORYLIST = data.data;
  				    	   },function (data){
  				    	   });
                     }
                     
                     $scope.loadsubcategory = function(value){
                     	$scope.SUBCATEGORYLIST = [];
                     	console.log("21212");
                     	if($scope.consumerinfo.selected_comaplintcategory){
                     		$http.get(RSURL+"/query/loadsubcategories?categoryid="+$scope.consumerinfo.selected_comaplintcategory.categoryid)
      				  		.then(function (data){
     			    		  console.log(data);	
     			    		  $scope.SUBCATEGORYLIST = data.data;
     			    		  
     			    		  if(value != 0){
     			    			 $scope.consumerinfo.selected_complaintsubcategory = $filter('filter')($scope.SUBCATEGORYLIST,{subcategoryid:value},true)[0];
     			    		  }
     			    		  
     			    	   },function (data){
     			    	   });
                     	}
                     }
                     
                 	$scope.getofficersdetails = function(){
                		$scope.OFFICERDETAILLIST = [];
                		var locationcode = "";
                		//console.log("Hi",$scope.consumerinfo.selected_subdivision);
                		if($scope.consumerinfo.selected_subdivision){
                			locationcode = $scope.consumerinfo.selected_subdivision.ld_code ;
                		}else{
                			locationcode = ""
                		}
	                   	 $http.get(RSURL+"/query/getofficersdetails?locationcode="+locationcode)
				  		.then(function (data){
				    		  console.log(data);	
				    		  $scope.OFFICERDETAILLIST = data.data;
				    	   },function (data){
				    	   });
                	};
                	
               	 $scope.loadcomplaintmodes = function()
                 {
                 	$scope.COMPLAINTMODELIST = [];
                 	 $http.get(RSURL+"/query/loadcomplaintmodes")
				  		.then(function (data){
				    		  console.log(data);	
				    		  $scope.COMPLAINTMODELIST = data.data;
				    	   },function (data){
				    	   });
                 }
               	 
               	$scope.loadcomplaintstatus = function()
                {
                	$scope.COMPLAINTSTATUSLIST = [];
                	 $http.get(RSURL+"/query/loadcomplaintstatus")
				  		.then(function (data){
				    		  console.log(data);	
				    		  $scope.COMPLAINTSTATUSLIST = data.data;
				    	   },function (data){
				    	   });
                }
               	
               	$scope.loadcomplaintpriority = function()
                {
                	$scope.COMPLAINTPRIORITYLIST = [];
                	 $http.get(RSURL+"/query/loadcomplaintpriority")
				  		.then(function (data){
				    		  console.log(data);	
				    		  $scope.COMPLAINTPRIORITYLIST = data.data;
				    	   },function (data){
				    	   });
                }
                     
                     $rootScope.getquickcomplaints = function(){
                 		
                 		$rootScope.QUICKCOMPLAINTS = [];
 	                   	 $http.get(RSURL+"/query/getquickcomplaints")
 				  		.then(function (data){
 				    		  console.log(data);	
 				    		  $rootScope.QUICKCOMPLAINTS = data.data;
 				    	   },function (data){
 				    	   });
                 	};
                 	
                	$rootScope.getquickcomplaints();
                	$scope.getsubdivisionlist();
                	$scope.loadcategory();
                	//$scope.getofficersdetails();
                	$scope.loadcomplaintmodes();
                	$scope.loadcomplaintpriority();
                	$scope.loadcomplaintstatus();
                	
                	$scope.current_record = null;
            		$scope.message = null;
            		$scope.error = null;
            		$scope.warning = null;
                	
                	$scope.getComplaintDetails = function(qc_mobile_number,qc_account_id){
                		
                		$scope.current_record = null;
                		$scope.message = null;
                		$scope.error = null;
                		$scope.warning = null;
                		
                		$http.get(RSURL+"/query/getcomplaintdetails?mobileno="+qc_mobile_number+"&accountid="+qc_account_id)
  				  		.then(function (data){
 			    		  console.log(data.data[0]);	
 			    		  
 			    		  $scope.current_record = data.data[0];
 			    		  
 			    		  $scope.consumerinfo.mobilenumber  				= $scope.current_record.qc_mobile_number;
 			    		  $scope.consumerinfo.accountnumber 				= $scope.current_record.qc_account_id;
 			    		  $scope.consumerinfo.rrnumber      				= $scope.current_record.cm_rr_number;
 			    		  $scope.consumerinfo.consumername     				= $scope.current_record.cm_consumer_name;
 			    		  $scope.consumerinfo.emailid   					= $scope.current_record.cm_email_id;	
 			    		  $scope.consumerinfo.consumeraddress 				= $scope.current_record.cm_address;
 			    		  $scope.consumerinfo.consumerdescription 			= $scope.current_record.qc_complaint_description;
 			    		  $scope.consumerinfo.selected_subdivision 			= $filter('filter')($scope.SUBDIVISIONLIST,{ld_code:$scope.current_record.cm_location_code},true)[0];
 			    		  $scope.consumerinfo.selected_comaplintcategory 	= $filter('filter')($scope.CATEGORYLIST,{categoryid:$scope.current_record.qc_complaint_category},true)[0];
 			    		  
 			    		  $scope.getofficersdetails();
 			    		  $scope.getomsectionlist($scope.current_record.cm_section_code);
 			    		  $scope.loadsubcategory($scope.current_record.qc_complaint_subcategory);
 			    		 
 			    		  $scope.consumerinfo.selected_assignedto 			= undefined;
 			    		  $scope.consumerinfo.selected_complaintmode 		= $filter('filter')($scope.COMPLAINTMODELIST,{modeid:1},true)[0];
 			    		  $scope.consumerinfo.selected_complaintstatus 		= $filter('filter')($scope.COMPLAINTSTATUSLIST,{statusid:1},true)[0];
 			    		  $scope.consumerinfo.selected_complaintpriority    = $filter('filter')($scope.COMPLAINTPRIORITYLIST,{priorityid:1},true)[0];
 			    		  
 			    		  $scope.consumerinfo.latitude  						= $scope.current_record.cm_lattitude;
 			    		  $scope.consumerinfo.longitude  					= $scope.current_record.cm_longitude;
 			    		  if($scope.current_record.recsts === true){
 			    			  $scope.message = "Consumer Details Found !!!" ;
 			    			  $scope.warning = false;
 			    		  }else{
 			    			  $scope.message = "Consumer Details Not Found !!!";
 			    			  $scope.warning = true;
 			    		  }
 			    	   },function (data){
 			    	   });
                	}; 
                	
                	$scope.save = function(){
                		
                		$scope.save_record = new REQUEST();
                		
                	};
                });
