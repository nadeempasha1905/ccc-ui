angular
        .module('CCCapp.Controllers', [])
        .controller(
                "updatedocketCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper, $window,
                        RSURL,$controller, $timeout, $window,store,ngToast,authService,$q,$stateParams) {
                	
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
                	
                	$scope.updatedocket = {};

                	if($stateParams != null){
                		if($stateParams.docketno != null){
                			$scope.updatedocket.docketno = $stateParams.docketno;
                		}else{
                			$state.go('admin.complaintdashboard');
                		}
	                	if($stateParams.location_code != null){
	                		$scope.updatedocket.location_code = $stateParams.location_code;
	                	}
	                	if($stateParams.docketdate != null){
	                		$scope.updatedocket.docketdate = $stateParams.docketdate;
	                	}
	                	if($stateParams.subcategoryid != null){
	                		$scope.updatedocket.subcategoryid = $stateParams.subcategoryid;
	                	}
	                	if($stateParams.statusname != null){
	                		$scope.updatedocket.statusname = $stateParams.statusname;
	                	}
	                	if($stateParams.requestid != null){
	                		$scope.updatedocket.requestid = $stateParams.requestid;
	                	}
	                	if($stateParams.statusid != null){
	                		$scope.updatedocket.statusid = $stateParams.statusid;
	                	}
                	}else{
                		$state.go('admin.complaintdashboard');
                	}
                	
                	console.log("updatedocketCtrl initiated !!!");
                	
/*                	 $scope.loadsubcategory = function(value){
                      	$scope.SUBCATEGORYLIST = [];
                      	console.log("21212");
                      		$http.get(RSURL+"/query/loadsubcategories?categoryid="+$scope.updatedocket.categoryid)
       				  		.then(function (data){
      			    		  console.log(data);	
      			    		  $scope.SUBCATEGORYLIST = data.data;
      			    		  
      			    		  if(value != 0){
      			    			 $scope.updatedocket.selected_complaintsubcategory = $filter('filter')($scope.SUBCATEGORYLIST,{subcategoryid:value},true)[0];
      			    		  }
      			    		  
      			    	   },function (data){
      			    	   });
                      }*/
                	 
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
                   	
                   	$scope.loadcomplaintupdates = function()
                    {
                    	$scope.UPDATESLIST = [];
                    	 $http.get(RSURL+"/query/loadcomplaintupdates")
    				  		.then(function (data){
    				    		  console.log(data);	
    				    		  $scope.UPDATESLIST = data.data;
    				    	   },function (data){
    				    	   });
                    }
                   	
                   	$scope.loadcomplaintstatusmappings = function()
                    {
                    	$scope.COMPLAINTSTATUSMAPPINGLIST = [];
                    	 $http.get(RSURL+"/query/loadcomplaintstatusmappings?statusid="+$scope.updatedocket.statusid)
    				  		.then(function (data){
    				    		  console.log(data);	
    				    		  $scope.COMPLAINTSTATUSMAPPINGLIST = data.data;
    				    	   },function (data){
    				    	   });
                    }
                   	
                 	$scope.warning = null;
                 	
                 	$scope.logcomment = function(p_statusid,p_statusname,updatessts){
                 		
                 		$scope.warning = null;
                 		
	                  var requestid					= $scope.updatedocket.requestid;
            		  var docketno 					= $scope.updatedocket.docketno;
               		  var comments 					= (updatessts === true ? $scope.updatedocket.consumerdescription : $scope.updatecomplaintform.consumerdescription);
               		  var statusid 					= p_statusid;//$scope.updatedocket.selected_complaintupdates.statusid;
               		  var statusname 				= p_statusname;//$scope.updatedocket.selected_complaintupdates.statusname;	
               		  var relpath 					= '';
               		  var firstname 				= 'Firstname test';
               		  var middlename 				= '';
               		  var lastname					= '';
		    		  var userid					= 1;//$rootScope.username;
		    		  var user_name					= 'Administrator';
		    		  var updatesid					= ($scope.updatedocket.selected_complaintupdates === undefined || $scope.updatedocket.selected_complaintupdates === null ? '' : $scope.updatedocket.selected_complaintupdates.cu_pkid) ;
		    		  var updatesname				= ($scope.updatedocket.selected_complaintupdates === undefined || $scope.updatedocket.selected_complaintupdates === null ? '' : $scope.updatedocket.selected_complaintupdates.cu_name) ;
		    		  
		    		  $http.get(RSURL+"/query/insertcomment?" +
		    		  		"requestid="+requestid+
		    		  		"&docketno="+docketno+
		    		  		"&userid="+userid+
		    		  		"&username="+user_name+
		    		  		"&comments="+comments+
		    		  		"&statusid="+statusid+
		    		  		"&statusname="+statusname+
		    		  		"&relpath="+relpath+
		    		  		"&firstname="+firstname+
		    		  		"&middlename="+middlename+
		    		  		"&lastname="+lastname+
		    		  		"&updatesid="+updatesid+
		    		  		"&updatesname="+updatesname
		    		  	)
  				  		.then(function (data){
  				  			console.log(data.data);
  				  			if(data.data[0].sts === "success"){
  				  			  $scope.message = "Comment Updated Successfully. \n Docket No : "+data.data[0].docketno ;
 			    			  $scope.warning = false;
 			    			  
 			    			 $scope.updatecomplaintform.consumerdescription = null ;
 			    			 $scope.updatedocket.selected_complaintupdates = undefined;
 			    			 $scope.updatedocket.consumerdescription = null;
 			    			 
 			    			
 			    		  	
 			    		  	$timeout(function(){
 			    		  		
 			    				 $scope.updatedocket.statusid = p_statusid;
 	 			    			 $scope.updatedocket.statusname = p_statusname;
 			    		  	 
 			    		  		$scope.loadcomplaintstatusmappings();
 			    		  		$scope.getCommentsList();
 			    		  		$scope.toggletabs();
 			    		  	},200);
 			    			 
  				  			}else{
   			    			  $scope.message = "Error occured while saving a comment !!!";
 			    			  $scope.warning = true;
 			    		  }
  				  		},function (data){
  				  		});
                 		
                 	};
                 	
                 	$scope.toggletabs = function(){
                 		
                 		if($scope.updatedocket.statusid === 1 || $scope.updatedocket.statusid ===2 || $scope.updatedocket.statusid === 4 ){
                 			
                 			//show update docket tab;
                 			console.log("show update docket tab;");
                 			$('#myTab a[href="#panel21"]').tab('show') // Select tab by name
                 			
                 		}else{
                 			
                 			//hide update docket tab;
                 			console.log("hide update docket tab;");
                 			$('#myTab a[href="#panel22"]').tab('show') // Select tab by name
                 		}
                 		
                 	};
                 	
                 	$scope.getCommentsList = function(){
                 		
                 		$scope.COMMENTSLIST = [];
                 		$http.get(RSURL+"/query/getcommentslist?docketno="+$scope.updatedocket.docketno+"&requestid="+$scope.updatedocket.requestid)
   				  		.then(function (data){
   				    		  console.log(data);	
   				    		  $scope.COMMENTSLIST = data.data;
   				    	   },function (data){
   				    	   });
                 		
                 	};
                 	
                	 
                 	 //$scope.loadsubcategory($scope.updatedocket.subcategoryid);
                 	//$scope.loadcomplaintstatus();
                 	$scope.loadcomplaintupdates();
                 	$scope.loadcomplaintstatusmappings();
                 	$scope.toggletabs();
                 	$scope.getCommentsList();
                 	
                 	
                });