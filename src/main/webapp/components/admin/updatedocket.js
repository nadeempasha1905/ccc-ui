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
                   	
                	 //$scope.loadsubcategory($scope.updatedocket.subcategoryid);
                 	$scope.loadcomplaintstatus();
                 	$scope.loadcomplaintupdates();
                	 
                	
                });