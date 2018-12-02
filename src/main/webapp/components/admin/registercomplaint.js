angular
        .module('CCCapp.Controllers', [])
        .controller(
                "registercomplaintCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state, $stateParams,           
                $cookies, $httpParamSerializer, jwtHelper, $window,
                        RSURL,$controller, $timeout, $window,store,ngToast,authService,$q,REQUEST) {
                	
                	console.log("registercomplaintCtrl initiated !!!");
                	
                	console.log($('#pills-tab'));
                	
                	console.log($stateParams);
                	$scope.quick = {}; 
                	
                	if($stateParams != null){
                		if($stateParams.quickstatus != null){
                			$scope.quick.quickstatus = $stateParams.quickstatus;
                		}else{
                			$scope.quick.quickstatus = false;
                		}
	                	if($stateParams.accountid != null){
	                		$scope.quick.accountid = $stateParams.accountid;
	                	}
	                	if($stateParams.mobileno != null){
	                		$scope.quick.mobileno = $stateParams.mobileno;
	                	}
                	}
                	
                	$scope.heading = "quickcomplaintCtrl Page";
                	
                	$('#registercomplaintlink').addClass('active');
                	
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
                     
                 	$scope.getofficersdetails = function(value){
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
				    		  
				    		  if(value != 0){
				    			  $scope.consumerinfo.selected_assignedto = $filter('filter')($scope.OFFICERDETAILLIST,{od_locatoin_code:value},true)[0];
	     			    		  }
				    		  
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
 			    		  
 			    		  $scope.consumerinfo.qc_pkid						= $scope.current_record.qc_pkid;
 			    		  $scope.consumerinfo.mobilenumber  				= $scope.current_record.qc_mobile_number;
 			    		  $scope.consumerinfo.accountnumber 				= $scope.current_record.qc_account_id;
 			    		  $scope.consumerinfo.rrnumber      				= $scope.current_record.cm_rr_number;
 			    		  $scope.consumerinfo.consumername     				= $scope.current_record.cm_consumer_name;
 			    		  $scope.consumerinfo.emailid   					= $scope.current_record.cm_email_id;	
 			    		  $scope.consumerinfo.consumeraddress 				= $scope.current_record.cm_address;
 			    		  $scope.consumerinfo.consumerdescription 			= $scope.current_record.qc_complaint_description;
 			    		  $scope.consumerinfo.selected_subdivision 			= $filter('filter')($scope.SUBDIVISIONLIST,{ld_code:$scope.current_record.cm_location_code},true)[0];
 			    		  $scope.consumerinfo.selected_comaplintcategory 	= $filter('filter')($scope.CATEGORYLIST,{categoryid:$scope.current_record.qc_complaint_category},true)[0];

 			    		  $scope.getofficersdetails($scope.current_record.cm_section_code);
 			    		  $scope.getomsectionlist($scope.current_record.cm_section_code);
 			    		  $scope.loadsubcategory($scope.current_record.qc_complaint_subcategory);
 			    		 
 			    		  //$scope.consumerinfo.selected_assignedto 			= undefined;
 			    		  $scope.consumerinfo.selected_complaintmode 		= $filter('filter')($scope.COMPLAINTMODELIST,{modeid:1},true)[0];
 			    		  $scope.consumerinfo.selected_complaintstatus 		= $filter('filter')($scope.COMPLAINTSTATUSLIST,{statusid:1},true)[0];
 			    		  $scope.consumerinfo.selected_complaintpriority    = $filter('filter')($scope.COMPLAINTPRIORITYLIST,{priorityid:1},true)[0];
 			    		  
 			    		  $scope.consumerinfo.latitude  					= $scope.current_record.cm_lattitude;
 			    		  $scope.consumerinfo.longitude  					= $scope.current_record.cm_longitude;
 			    		  if($scope.current_record.recsts === true){
 			    			  $scope.message = "Consumer Details Found !!!" ;
 			    			  $scope.warning = false;
 			    		  }else{
 			    			  $scope.message = "Consumer Details Not Found !!!";
 			    			  $scope.warning = true;
 			    		  }
 			    		  
 			    		 $scope.recordfound = false; //to enable fields
 			    		 
 			    	   },function (data){
 			    	   });
                	}; 
                	
                	$scope.save = function(){
                		
                		//$scope.save_record = new REQUEST();
                		
                		  var qc_pkid						= $scope.consumerinfo.qc_pkid;
                		  var mobilenumber 					= $scope.consumerinfo.mobilenumber;
	               		  var accountnumber 				= $scope.consumerinfo.accountnumber;
	               		  var rrnumber 						= $scope.consumerinfo.rrnumber;
	               		  var consumername 					= $scope.consumerinfo.consumername;
	               		  var emailid 						= $scope.consumerinfo.emailid;	
	               		  var consumeraddress 				= $scope.consumerinfo.consumeraddress;
	               		  var consumerdescription 			= $scope.consumerinfo.consumerdescription;
	               		  var selected_subdivision 			= $scope.consumerinfo.selected_subdivision.ld_code;
	               		  var selected_comaplintcategory	= $scope.consumerinfo.selected_comaplintcategory.categoryid;
	               		  var selected_omsection 			= $scope.consumerinfo.selected_omsection.ld_code;
	               		  var selected_complaintsubcategory = $scope.consumerinfo.selected_complaintsubcategory.subcategoryid;
			    		  var selected_assignedto 			= $scope.consumerinfo.selected_assignedto.od_emp_id;
			    		  var selected_complaintmode 		= $scope.consumerinfo.selected_complaintmode.modeid;
			    		  var selected_complaintstatus 		= $scope.consumerinfo.selected_complaintstatus.statusid;
			    		  var selected_complaintpriority 	= $scope.consumerinfo.selected_complaintpriority.priorityid;
			    		  var latitude 						= $scope.consumerinfo.latitude === null ? 0.0 : $scope.consumerinfo.latitude ;
			    		  var longitude 					= $scope.consumerinfo.longitude === null ? 0.0 : $scope.consumerinfo.longitude; 
			    		  var recsts						= $scope.current_record.recsts;
			    		  var userid						= $rootScope.username;
			    		  
			    		  $http.get(RSURL+"/query/registercomplaint?" +
			    		  		"mobilenumber="+mobilenumber+
			    		  		"&accountnumber="+accountnumber+
			    		  		"&rrnumber="+rrnumber+
			    		  		"&consumername="+consumername+
			    		  		"&emailid="+emailid+
			    		  		"&consumeraddress="+consumeraddress+
			    		  		"&consumerdescription="+consumerdescription+
			    		  		"&subdivision="+selected_subdivision+
			    		  		"&comaplintcategory="+selected_comaplintcategory+
			    		  		"&omsection="+selected_omsection+
			    		  		"&complaintsubcategory="+selected_complaintsubcategory+
			    		  		"&assignedto="+selected_assignedto+
			    		  		"&complaintmode="+selected_complaintmode+
			    		  		"&complaintstatus="+selected_complaintstatus+
			    		  		"&complaintpriority="+selected_complaintpriority+
			    		  		"&latitude="+latitude+
			    		  		"&longitude="+longitude+
			    		  		"&recsts="+recsts+
			    		  		"&qc_pkid="+qc_pkid+
			    		  		"&userid="+userid
			    		  	)
	  				  		.then(function (data){
	  				  			console.log(data.data);
	  				  			if(data.data[0].sts === "success"){
	  				  			  $scope.message = "Complaint Registered Successfully. \n Docket No : "+data.data[0].docketno ;
	 			    			  $scope.warning = false;
	 			    			  
	 			    			  $scope.consumerinfo = {} ;
	 			    			  $scope.current_record = {};
	 			    			  
	  				  			}else{
	   			    			  $scope.message = "Error occured while saving a complaint !!!";
	 			    			  $scope.warning = true;
	 			    		  }
	  				  		},function (data){
	  				  		});
                	};
                	
                	$scope.recordfound = null;
                	$scope.searchconsumerdetails = function(){
                		
            		    var mobilenumber 				= $scope.consumerinfo.mobilenumber === undefined || $scope.consumerinfo.mobilenumber === null? '' : $scope.consumerinfo.mobilenumber ;
               		    var accountnumber 				= $scope.consumerinfo.accountnumber === undefined || $scope.consumerinfo.accountnumber === null? '' : $scope.consumerinfo.accountnumber;
                		
                		$scope.current_record = null;
                 		$scope.message = null;
                 		$scope.error = null;
                 		$scope.warning = null;
                 		
                 		$http.get(RSURL+"/query/searchconsumerdetails?mobileno="+mobilenumber+"&accountid="+accountnumber)
   				  		.then(function (data){
  			    		  console.log(data.data);	
  			    		  
  			    		  if(data.data.length === 0){
  			    			  $scope.message = "Consumer Details Not Found !!!";
  			    			  $scope.warning = true;
  			    			  console.log("Record Not found");
  			    			  $scope.recordfound = false;
  			    			  return;
  			    		  }else{
  			    			$scope.recordfound = null;
  			    		  }
  			    		  
  			    		 $scope.current_record = null;
  			    		 $scope.searchlist = data.data;
  			    		  
  			    		  if($scope.searchlist.length > 1){
  			    			  $scope.searchrecord = false;
  			    			  //open modal to select 
  			    			  $('#searchdetailmodal').modal('toggle');
  			    		  }else{
  			    			$scope.searchrecord = false;
  			    			$scope.fillsearchdetails(data.data[0],false)
  			    		  }
  			    	   },function (data){
  			    	   });
                	};
                	
                	$scope.searchrecord = false;
                	$scope.fillsearchdetails = function(object,status){
                		
                			$scope.searchrecord = true;
                			 $scope.recordfound = false;
                		
                		  $scope.current_record = object;
                		
  			    		  $scope.consumerinfo.qc_pkid						= $scope.current_record.cm_pkid;
  			    		  $scope.consumerinfo.mobilenumber  				= $scope.current_record.cm_mobile_number;
  			    		  $scope.consumerinfo.accountnumber 				= $scope.current_record.cm_account_id;
  			    		  $scope.consumerinfo.rrnumber      				= $scope.current_record.cm_rr_number;
  			    		  $scope.consumerinfo.consumername     				= $scope.current_record.cm_consumer_name;
  			    		  $scope.consumerinfo.emailid   					= $scope.current_record.cm_email_id;	
  			    		  $scope.consumerinfo.consumeraddress 				= $scope.current_record.cm_address;
  			    		  $scope.consumerinfo.consumerdescription 			= '';
  			    		  $scope.consumerinfo.selected_subdivision 			= $filter('filter')($scope.SUBDIVISIONLIST,{ld_code:$scope.current_record.cm_location_code},true)[0];
  			    		  $scope.consumerinfo.selected_comaplintcategory 	= $filter('filter')($scope.CATEGORYLIST,{categoryid:$scope.current_record.qc_complaint_category},true)[0];

  			    		  $scope.getofficersdetails($scope.current_record.cm_section_code);
  			    		  $scope.getomsectionlist($scope.current_record.cm_section_code);
  			    		  $scope.loadsubcategory($scope.current_record.qc_complaint_subcategory);
  			    		 
  			    		  $scope.consumerinfo.selected_complaintmode 		= $filter('filter')($scope.COMPLAINTMODELIST,{modeid:2},true)[0];
  			    		  $scope.consumerinfo.selected_complaintstatus 		= $filter('filter')($scope.COMPLAINTSTATUSLIST,{statusid:1},true)[0];
  			    		  $scope.consumerinfo.selected_complaintpriority    = $filter('filter')($scope.COMPLAINTPRIORITYLIST,{priorityid:1},true)[0];
  			    		  
  			    		  $scope.consumerinfo.latitude  					= $scope.current_record.cm_lattitude;
  			    		  $scope.consumerinfo.longitude  					= $scope.current_record.cm_longitude;
  			    		  if($scope.current_record.recsts === true){
  			    			  $scope.message = "Consumer Details Found !!!" ;
  			    			  $scope.warning = false;
  			    		  }else{
  			    			  $scope.message = "Consumer Details Not Found !!!";
  			    			  $scope.warning = true;
  			    		  }
  			    		  
  			    		  if(status)
  			    			  $('#searchdetailmodal').modal('toggle');
                		
                	};
                	
                	$scope.resetform = function(){
                		
                		  $scope.consumerinfo.qc_pkid							= null;
			    		  $scope.consumerinfo.mobilenumber  				= null;
			    		  $scope.consumerinfo.accountnumber 				= null;
			    		  $scope.consumerinfo.rrnumber      				= null;
			    		  $scope.consumerinfo.consumername     				= null;
			    		  $scope.consumerinfo.emailid   					= null;	
			    		  $scope.consumerinfo.consumeraddress 				= null;
			    		  $scope.consumerinfo.consumerdescription 			= null;
			    		  $scope.consumerinfo.latitude  					= null;
			    		  $scope.consumerinfo.longitude  					= null;
			    		  $scope.getsubdivisionlist();
		                  $scope.loadcategory();
   	                	  $scope.loadcomplaintmodes();
		                  $scope.loadcomplaintpriority();
		                  $scope.loadcomplaintstatus();
		                  $scope.getomsectionlist(0);
		                  $scope.getofficersdetails();
		                  
		                  $scope.searchrecord = false;
		                  $scope.warning = null;
		                  $scope.recordfound = null;
		                  
		                  $scope.quickcomplaint_consumerinfo.$setPristine();
                		
                	};
                	
                	
                	
                	if($scope.quick.quickstatus){
                		$scope.getComplaintDetails($scope.quick.mobileno,$scope.quick.accountid);
                	}else{
                		
                	}
                	
                	$rootScope.getquickcomplaints();
                	
                });
