angular
        .module('CCCapp.Controllers', [])
        .controller(
                "interruptionsCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper, $window,
                        RSURL,$controller, $timeout, $window,store,ngToast,authService,$q) {
                	
                	console.log("interruptionsCtrl initiated !!!");
                	
                	$scope.consumerinfo = {};
                	if($cookies.get("access_token")) {
                		$rootScope.IsLogin=true;
                		$rootScope.username = $cookies.get("user");
					   }else{
						   $rootScope.IsLogin=false;
						   $state.go('login');
					   }
                	
                	var USERINFO= store.get("userinfo");
                	
                	$scope.interruption = {};
                	$scope.interruption.fromdate = moment(new Date()).subtract(1, 'year').format('DD/MM/YYYY').toString();
                    $scope.interruption.todate = moment(new Date()).format("DD/MM/YYYY").toString();
                	
             	$scope.save = function(){
            		
            		//$scope.save_record = new REQUEST();
            		
            		  var statiocode 		= $scope.interruption.station.sm_location_code;
               		  var stationname 		= $scope.interruption.station.sm_station_name;
               		  var interruptiontype 	= $scope.interruption.type.interrupt_name;
               		  var fromdate 			= $scope.interruption.fromdate;
               		  var todate 			= $scope.interruption.todate;	
               		  var reason 			= $scope.interruption.description;
               		  var feedercode 		= $scope.interruption.feeder.fm_feeder_code;
               		  var feedername 		= $scope.interruption.feeder.fm_feeder_name;
               		  var userid 			= USERINFO.user_id;
		    		  
		    		  $http.get(RSURL+"/query/insertinterruption?" +
		    		  		"statiocode="+statiocode+
		    		  		"&stationname="+stationname+
		    		  		"&interruptiontype="+interruptiontype+
		    		  		"&fromdate="+fromdate+
		    		  		"&todate="+todate+
		    		  		"&reason="+reason+
		    		  		"&feedercode="+feedercode+
		    		  		"&feedername="+feedername+
		    		  		"&userid="+userid
		    		  	)
  				  		.then(function (data){
  				  			console.log(data.data);
  				  			if(data.data.nameValuePairs.status){
  				  			  $scope.message = data.data.nameValuePairs.message ;
 			    			  $scope.warning = false;
 			    			  
 			    			 $scope.resetform();
  				  			}else{
   			    			  $scope.message = "Error occured while saving a complaint !!!";
 			    			  $scope.warning = true;
 			    		  }
  				  		},function (data){
  				  		});
            	};
            	
              	 $scope.loadstationlist = function()
                 {
                 	$scope.STATIONLIST = [];
                 	 $http.get(RSURL+"/query/getstationlist?locationcode="+USERINFO.location_code)
				  		.then(function (data){
				    		  console.log(data);	
				    		  $scope.STATIONLIST = data.data;
				    	   },function (data){
				    	   });
                 }	
                	
              	 $scope.loadfeederlist = function()
                 {
                 	$scope.FEEDERLIST = [];
                 	 $http.get(RSURL+"/query/getfeederlist?stationcode="+USERINFO.location_code+"&stationid="+$scope.interruption.station.sm_station_id)
				  		.then(function (data){
				    		  console.log(data);	
				    		  $scope.FEEDERLIST = data.data;
				    	   },function (data){
				    	   });
                 }
              	 
              	$scope.loadinterruptions = function()
                {
                	$scope.INTERRUPTIONLIST = [
                	                           {
                	                        	   interrupt_name : "Interruption - 1",
                	                        	   interrupt_code : 1
                	                           },
                	                           {
                	                        	   interrupt_name : "Interruption - 2",
                	                        	   interrupt_code : 2
                	                           },
                	                           {
                	                        	   interrupt_name : "Interruption - 3",
                	                        	   interrupt_code : 3
                	                           },
                	                           {
                	                        	   interrupt_name : "Interruption - 4",
                	                        	   interrupt_code : 4
                	                           }
                	                           ];
                	
                	/* $http.get(RSURL+"/query/getstationlist?locationcode="+USERINFO.location_code)
				  		.then(function (data){
				    		  console.log(data);	
				    		  $scope.INTERRUPTIONLIST = data.data;
				    	   },function (data){
				    	   });*/
                }
              	
              	$scope.resetform = function(){
              		
              		    $scope.interruption = {};
		    			$scope.FEEDERLIST = [];
		    			$scope.interruption.fromdate = moment(new Date()).subtract(1, 'year').format('DD/MM/YYYY').toString();
	                    $scope.interruption.todate = moment(new Date()).format("DD/MM/YYYY").toString();
              	}
                	
              	$scope.loadinterruptions();
              	$scope.loadstationlist();
                	
                	
                	
                	
                	
                	
                });