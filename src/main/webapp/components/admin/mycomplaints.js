angular
        .module('CCCapp.Controllers', [])
        .controller(
                "mycomplaintsCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper, $window,
                        RSURL,$controller, $timeout, $window,store,ngToast,authService,$q) {
                	
                	console.log("mycomplaintsCtrl initiated !!!");
                	
                	$scope.consumerinfo = {};
                	if($cookies.get("access_token")) {
                		$rootScope.IsLogin=true;
                		$rootScope.username = $cookies.get("user");
					   }else{
						   $rootScope.IsLogin=false;
						   $state.go('login');
					   }
                	
                	$rootScope.activelink(4);
                	
                	var USERINFO= store.get("userinfo");
                	
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
                 
                 $scope.refreshcard = function(){
                	
                	 $scope.consumerinfo.selected_comaplintcategory = undefined;
                	 $scope.SUBCATEGORYLIST = [];
                	 $scope.consumerinfo.consumerdescription = "";
                	 
                 };
                	
                 $scope.loadcategory();
                	
                	
                	
             	$scope.save = function(){
            		
            		//$scope.save_record = new REQUEST();
            		
            		  var qc_pkid						= USERINFO.id;
            		  var mobilenumber 					= USERINFO.user_mobile_number;
               		  var accountnumber 				= '';
               		  var rrnumber 						= '';
               		  var consumername 					= '';
               		  var emailid 						= USERINFO.user_email;	
               		  var consumeraddress 				= '';
               		  var consumerdescription 			= $scope.consumerinfo.consumerdescription;
               		  var selected_subdivision 			= USERINFO.location_code;
               		  var selected_comaplintcategory	= $scope.consumerinfo.selected_comaplintcategory.categoryid;
               		  var selected_omsection 			= USERINFO.location_code;
               		  var selected_complaintsubcategory = $scope.consumerinfo.selected_complaintsubcategory.subcategoryid;
		    		  var selected_assignedto 			= '';
		    		  var selected_complaintmode 		= 1;
		    		  var selected_complaintstatus 		= 1;
		    		  var selected_complaintpriority 	= 1;
		    		  var latitude 						= $scope.consumerinfo.latitude === null || $scope.consumerinfo.latitude  === undefined ? 0.0 : $scope.consumerinfo.latitude ;
		    		  var longitude 					= $scope.consumerinfo.longitude === null || $scope.consumerinfo.latitude  === undefined ? 0.0 : $scope.consumerinfo.longitude; 
		    		  var recsts						= '';
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
 			    			  
 			    			 $scope.getmycomplaintdetails();
 			    			  
  				  			}else{
   			    			  $scope.message = "Error occured while saving a complaint !!!";
 			    			  $scope.warning = true;
 			    		  }
  				  		},function (data){
  				  		});
            	};
            	
            	$scope.getmycomplaintdetails = function()
                {
            		$scope.MYCOMPLAINTLIST = [];
               	 	$http.get(RSURL+"/query/getmycomplaints?userid="+USERINFO.user_id)
				  		.then(function (data){
				    		  console.log(data);	
				    		  $scope.MYCOMPLAINTLIST = data.data;
				    		  
                     	 $timeout(function(){         
                    		 $('#dtBasicExample').DataTable();
                       	  	 $('.dataTables_length').addClass('bs-select');
 		            	},1000);
                     	 
				    	   },function (data){
				    	   });
                };
                	
                	
                $scope.getmycomplaintdetails();
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                });