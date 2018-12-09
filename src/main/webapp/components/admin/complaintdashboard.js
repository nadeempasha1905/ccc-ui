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
                	
                	var USERINFO= store.get("userinfo");
                	
                	$scope.complaintdashboard = {};
                	$scope.complaintdashboard.fromdate = moment(new Date()).subtract(1, 'year').format('DD/MM/YYYY').toString();
                    $scope.complaintdashboard.todate = moment(new Date()).format("DD/MM/YYYY").toString();
                    
                	$scope.LOCATION_CODE_PARAM = '';
                    $scope.complaintdashboard.location = USERINFO.location_code;
              		//$scope.complaintdashboard.selected_complaintmode.modeid = undefined;
                	
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
                    	$scope.COMPLAINTSUMMARYLIST = [];
                    	 $http.get(RSURL+"/query/getdashboardreportsummary?" +
                    	 		"location="+$scope.complaintdashboard.location+"&" +
                    	 		"modeid="+($scope.complaintdashboard.selected_complaintmode === undefined || 
                    	 					$scope.complaintdashboard.selected_complaintmode === null ? 0 : 
                    	 						$scope.complaintdashboard.selected_complaintmode.modeid)+"&" +
                    	 		"fromdate="+$scope.complaintdashboard.fromdate+"&"+
                    	 		"todate="+$scope.complaintdashboard.todate)
   				  		.then(function (data){
   				    		  console.log(data);	
   				    		  $scope.COMPLAINTSUMMARYLIST = data.data;
   				    	   },function (data){
   				    	   });
                    }
                  	 
                	
                	$scope.gotosummarylist = function(statusname,categoryid,statusid,modeid){
                		$state.go('admin.summarylist',{location:$scope.complaintdashboard.location,categoryid:categoryid,statusid:statusid,modeid:modeid,statusname:statusname});
                	};
                	
                	$scope.loadcomplaintmodes();
                	$scope.getdashboardreportsummary();
                	
                	$scope.opencomplaintupdate = function(requestid,categoryid,subcategoryid){
                		$state.go('admin.updatedocket',{requestid:requestid,categoryid:categoryid,subcategoryid:subcategoryid});
                	};
                	
                	$rootScope.getquickcomplaints();
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                	
                });