angular
        .module('CCCapp.Controllers', [])
        .controller(
                "reportsCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper,  
                        RSURL,$controller, $timeout, $window,store,ngToast,authService,$q) {
                	
                	console.log("reportsCtrl Page initiated !!!");
                	$scope.heading = "reportsCtrl Page";
                	
                	$scope.report = {
                	};
                	
                	$scope.LOCATION_CODE_PARAM = '';
                    $scope.report.fromdate = moment(new Date()).subtract(1, 'year').format('DD/MM/YYYY').toString();
                    $scope.report.todate = moment(new Date()).format("DD/MM/YYYY").toString();
                	
                	if($cookies.get("access_token")) {
                		$rootScope.IsLogin=true;
                		$rootScope.username = $cookies.get("user");
					   }else{
						   $rootScope.IsLogin=false;
						   $state.go('login');
					   }
                	
                	$rootScope.getUserRoles();
                	
                	console.log("rootscope = ",$rootScope.COMPANY_USER ,$rootScope.ZONE_USER,$rootScope.CIRCLE_USER,
                			$rootScope.DIVISION_USER,$rootScope.SUBDIVISION_USER ,$rootScope.OMSECTION_USER);
                	
                	
                  	$scope.ZONELIST = [];
                  	$scope.CIRCLELIST = [];
                  	$scope.DIVISIONLIST = [];
                  	$scope.SUBDIVISIONLIST = [];
                  	$scope.OMSECTIONLIST = [];
                  	
                  	$scope.getzonelist = function(){
	                	$scope.ZONELIST = [];
	                	$scope.CIRCLELIST = [];
	                	
	                	 $http.get(RSURL+"/query/getzonelist?locationcode="+$rootScope.COMPANYCODE)
				  		.then(function (data){
				    		  $scope.ZONELIST = data.data;
				    		  
				    		  if(!$rootScope.ZONE_USER){
				    			  $scope.report.zone =  $filter('filter')($scope.ZONELIST,{ld_code:$rootScope.GLOBAL_LOCATION_CODE.substring(0,2)},true)[0];
				    			  $scope.getcirclelist();
			                	}
				    	   },function (data){
				    	   });
                  	 }
                  	
                  	$scope.getcirclelist = function(){
                  		$scope.CIRCLELIST = [];
                      	$scope.DIVISIONLIST = [];
                  		if($scope.report.zone != undefined || $scope.report.zone != null){
                  			$http.get(RSURL+"/query/getcirclelist?locationcode="+$scope.report.zone.ld_code)
    				  		.then(function (data){
    				    		  $scope.CIRCLELIST = data.data;
    				    		  if(!$rootScope.CIRCLE_USER){
    				    			  $scope.report.circle =  $filter('filter')($scope.CIRCLELIST,{ld_code:$rootScope.GLOBAL_LOCATION_CODE.substring(0,3)},true)[0];
    				    			  $scope.getdivisionlist();
    			                	}
    				    	   },function (data){
    				    	   });
                  		}
                  	 }
                  	
                  	$scope.getdivisionlist = function(){
                  		$scope.DIVISIONLIST = [];
                      	$scope.SUBDIVISIONLIST = [];
                  		if($scope.report.circle != undefined || $scope.report.circle != null){
                  			$http.get(RSURL+"/query/getdivisionlist?locationcode="+$scope.report.circle.ld_code)
    				  		.then(function (data){
    				    		  $scope.DIVISIONLIST = data.data;
    				    		  
    				    		  if(!$rootScope.DIVISION_USER){
    				    			  $scope.report.division =  $filter('filter')($scope.DIVISIONLIST,{ld_code:$rootScope.GLOBAL_LOCATION_CODE.substring(0,5)},true)[0];
    				    			  $scope.getsubdivisionlist();
    			                	}
    				    	   },function (data){
    				    	   });
                  		}
                  	 }
                  	
                  	$scope.getsubdivisionlist = function(){
                  		$scope.SUBDIVISIONLIST = [];
                      	$scope.OMSECTIONLIST = [];
                  		if($scope.report.division != undefined || $scope.report.division != null){
                  			$http.get(RSURL+"/query/getsubdivisionlistbydivision?locationcode="+$scope.report.division.ld_code)
    				  		.then(function (data){
    				    		  $scope.SUBDIVISIONLIST = data.data;
    				    		  
    				    		  if(!$rootScope.SUBDIVISION_USER){
    				    			  $scope.report.subdivision =  $filter('filter')($scope.SUBDIVISIONLIST,{ld_code:$rootScope.GLOBAL_LOCATION_CODE.substring(0,7)},true)[0];
    				    			  $scope.getomsectionlist();
    			                	}
    				    	   },function (data){
    				    	   });
                  		}
                  	 }
                  	
                  	$scope.getomsectionlist = function(){
                  		$scope.OMSECTIONLIST = [];
                  		if($scope.report.subdivision != undefined || $scope.report.subdivision != null){
                  			$http.get(RSURL+"/query/getomsectionlist?locationcode="+$scope.report.subdivision.ld_code)
    				  		.then(function (data){
    				    		  $scope.OMSECTIONLIST = data.data;
    				    			  $scope.report.omsection =  $filter('filter')($scope.OMSECTIONLIST,{ld_code:$rootScope.GLOBAL_LOCATION_CODE.substring(0,9)},true)[0];
    				    	   },function (data){
    				    	   });
                  		}
                  	 }
                  	
                  	$scope.resetpage = function(){
                  		$scope.getzonelist();
                  		$scope.report.reporttype = undefined;
                  	}
                  	
                  	$scope.downloadreport = function(){
                  		
                  		$scope.LOCATION_CODE_PARAM = $rootScope.COMPANYCODE;
                  		
                  		if($scope.report.zone != undefined || $scope.report.zone != null){
                  			$scope.LOCATION_CODE_PARAM = $scope.report.zone.ld_code;
                  		}
                  		if($scope.report.circle != undefined || $scope.report.circle != null){
                  			$scope.LOCATION_CODE_PARAM = $scope.report.circle.ld_code;
                  		}
                  		if($scope.report.division != undefined || $scope.report.division != null){
                  			$scope.LOCATION_CODE_PARAM = $scope.report.division.ld_code;
                  		}
                  		if($scope.report.subdivision != undefined || $scope.report.subdivision != null){
                  			$scope.LOCATION_CODE_PARAM = $scope.report.subdivision.ld_code;
                  		}
                  		if($scope.report.omsection != undefined || $scope.report.omsection != null){
                  			$scope.LOCATION_CODE_PARAM = $scope.report.omsection.ld_code;
                  		}
                  		
                  		console.log($scope.LOCATION_CODE_PARAM);
                  		
                  		
                  		
                  		 var downloadURL= RSURL+"/query/generatereports?" +
		     			 		"locationcode="+$scope.LOCATION_CODE_PARAM +
		     	 				"&fromdate="+$scope.report.fromdate+"" +
		     	 				"&todate="+$scope.report.todate+
		     	 				"&reporttype="+$scope.report.reporttype;
                  		 $http.get(downloadURL, {responseType : 'arraybuffer'}).then(handleResponse1);
                  	};
                  	
                	function handleResponse1(response){
               		 var pdfFile = new Blob([response.data], { type : 'application/pdf' });	
               		 var downloadURL = URL.createObjectURL(pdfFile);
               		 $window.open(downloadURL);
               	}
                	
                  	$scope.getzonelist();
                  	
                });

