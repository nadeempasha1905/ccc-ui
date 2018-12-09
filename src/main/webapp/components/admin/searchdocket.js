angular
        .module('CCCapp.Controllers', [])
        .controller(
                "searchdocketCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper, $window,
                        RSURL,$controller, $timeout, $window,store,ngToast,authService,$q,$stateParams) {
                	
                	console.log("summarylistCtrl initiated !!!");
                	
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
                	
                	var USERINFO= store.get("userinfo");
                	
                	
                	$scope.searchdocket = {};
                	
/*                	if($stateParams != null){
                		if($stateParams.location != null){
                			$scope.summarylist.location = $stateParams.location;
                		}else{
                			$state.go('admin.complaintdashboard');
                		}
	                	
                		if($stateParams.categoryid != null){
	                		$scope.summarylist.categoryid = $stateParams.categoryid;
	                	}
	                	
	                	if($stateParams.statusid != null){
	                		$scope.summarylist.statusid = $stateParams.statusid;
	                	}
	                	
	                	if($stateParams.modeid != null){
	                		$scope.summarylist.modeid = $stateParams.modeid;
	                	}
	                	
	                	if($stateParams.statusname != null){
	                		$scope.summarylist.statusname = $stateParams.statusname;
	                	}
	                	
                	}else{
                		$state.go('admin.complaintdashboard');
                	}*/
                	
                  	$scope.getsearchcomplaintdetais = function()
                    {
                    	$scope.SEARCHDOCKETLIST = [];
                    	 $http.get(RSURL+"/query/getsearchcomplaintdetais?docketnumber="+$scope.searchdocket.docketnumber)
   				  		.then(function (data){
   				    		  console.log(data);	
   				    		  $scope.SEARCHDOCKETLIST = data.data;
   				    		  
                          	 $timeout(function(){         
                         		 $('#dtBasicExample').DataTable();
                            	  	 $('.dataTables_length').addClass('bs-select');
      		            	},1000);
                          	 
   				    	   },function (data){
   				    	   });
                    };
                    
                   // $scope.getdashboardcomplaintdetais();
                	
                	$scope.opencomplaintupdate = function(requestid,statusid,location_code,docketno,docketdate,subcategoryid,status_name){
                		
                		$state.go('admin.updatedocket',{requestid:requestid,statusid:statusid,location_code:location_code,docketno:docketno,docketdate:docketdate,subcategoryid:subcategoryid,statusname:status_name});
                		
                	};
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                });