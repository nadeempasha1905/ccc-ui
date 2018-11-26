angular
        .module('CCCapp.Controllers', [])
        .controller(
                "complaintdashboardCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper, $window,
                        RSURL,$controller, $timeout, $window,store,ngToast,authService,$q) {
                	
                	console.log("complaintdashboardCtrl initiated !!!");
                	
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
                	
                	$scope.complaintdashboard = {};
                	
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
                  	 
                  	$scope.getdashboardreportsummary = function()
                    {
                  		$scope.complaintdashboard.location = '2';
                  		$scope.complaintdashboard.modeid = 0;
                  		$scope.complaintdashboard.fromdate = '01/01/2018';
                  		$scope.complaintdashboard.todate = '26/11/2018';
                  		
                    	$scope.COMPLAINTSUMMARYLIST = [];
                    	 $http.get(RSURL+"/query/getdashboardreportsummary?" +
                    	 		"location="+$scope.complaintdashboard.location+"&" +
                    	 		"modeid="+$scope.complaintdashboard.modeid+"&" +
                    	 		"fromdate="+$scope.complaintdashboard.fromdate+"&"+
                    	 		"todate="+$scope.complaintdashboard.todate)
   				  		.then(function (data){
   				    		  console.log(data);	
   				    		  $scope.COMPLAINTSUMMARYLIST = data.data;
   				    	   },function (data){
   				    	   });
                    }
                  	 
                	
                	$scope.gotosummarylist = function(statusname,categoryid,statusid,modeid){
                		$state.go('admin.summarylist',{location:'2',categoryid:categoryid,statusid:statusid,modeid:modeid,statusname:statusname});
                	};
                	
                	$scope.loadcomplaintmodes();
                	$scope.getdashboardreportsummary();
                	
                	$scope.opencomplaintupdate = function(requestid,categoryid,subcategoryid){
                		$state.go('admin.updatedocket',{requestid:requestid,categoryid:categoryid,subcategoryid:subcategoryid});
                	};
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                });