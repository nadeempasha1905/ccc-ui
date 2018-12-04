angular
        .module('CCCapp.Controllers', [])
        .controller(
                "loginCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper, $window,
                        RSURL,UURL,$controller, $timeout, $window,store,ngToast,authService,$q) {
                	
                	console.log("Login initiated !!!");
                	$scope.heading = "Login Page";
                	
                	$scope.user = {
                            username: '',
                            password: ''
                        };
                	
                	$scope.quick = {
                			mobileno : '',
                			accountno : '',
                			description : '',
                			selectedcategory : null,
                			selectedsubcategory : null
                        };
                	
                    if($cookies.get("access_token")){
                   	 
                   	 $rootScope.IsLogin = true;
                   	 $state.go('dashboard');
                   	 $rootScope.username = $cookies.get("user");
                   	 
                    }else{
                   	 $rootScope.IsLogin = false;
                        
                        console.log("login");
                        $scope.user = {
                                username: '',
                                password: ''
                            };
                    }
                    
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
                    
                    $scope.loadsubcategory = function(){
                    	$scope.SUBCATEGORYLIST = [];
                    	
                    	if($scope.quick.selectedcategory){
                    		$http.get(RSURL+"/query/loadsubcategories?categoryid="+$scope.quick.selectedcategory.categoryid)
     				  		.then(function (data){
    			    		  console.log(data);	
    			    		  $scope.SUBCATEGORYLIST = data.data;
    			    	   },function (data){
    			    	   });
                    	}
                    }
                    
                    
                    $scope.login = function () {

                        $scope.loginError = false;
                        $scope.loginData = {
                            grant_type: "password",
                            username: $scope.user.username,
                            password: $scope.user.password
                        }
                        $rootScope.obtainAccessToken($scope.loginData);
                    }
                    $rootScope.obtainAccessToken=function(params) {
                        var req = {
                            method: 'POST',
                            url: "oauth/token",
                            headers: {
                                "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                            },
                            data: $httpParamSerializer(params)
                        }
                        $http(req)
                        .then(
                            function (data) {                                          
                        	  $scope.loginError = false;
                             $http.defaults.headers.common.Authorization = 'Bearer ' + data.data.access_token;
                             var expireDate = new Date(new Date().getTime() + (1000 * data.data.expires_in));
                             $cookies.put("access_token", data.data.access_token, {'expires': expireDate});
                             $rootScope.username = $scope.user.username;
                             $cookies.put("user", $scope.user.username);
                             $rootScope.IsLogin = true;
                             
                            // $('#signinmodal').modal('toggle');
                             
                           //function to get quick complaints on load
                     		$rootScope.getquickcomplaints();
                             
                             $state.go('dashboard');
                            },
                            function (error) {
           	                 $scope.error = true;
           	                 $timeout(function () {
           	                     $scope.error = false;
           	                 }, 2000);
                            }
                        ),function(response){
                        	console.log(response);
                        };           
                    }
                    
                    $scope.registerquickcomplaint = function(){
                    	
                    	console.log("quick",$scope.quick);
                    	
                    	var todaysdate = new Date();
                    	
                    	$http.get(RSURL+"/query/registerquickcomplaint?" +
                    			"categoryid="+$scope.quick.selectedcategory.categoryid +
                    			"&subcategoryid="+$scope.quick.selectedsubcategory.subcategoryid +
                    			"&mobileno="+$scope.quick.mobileno +
                    			"&accountno="+$scope.quick.accountno +
                    			"&description="+$scope.quick.description +
                    			"&todaysdate="+todaysdate)
 				  		.then(function (data){
			    		  console.log(data);	
			    		  $scope.message = data.data.nameValuePairs.message;
			    		  $scope.error = !data.data.nameValuePairs.status;
			    		  
			    		  $scope.quickcomplaintform.$setPristine();
			    		  $scope.clearquickcomplaintform();
			    		  $scope.quickcomplaintform.$setPristine();
			    		  $timeout(function(){
		    		    		$scope.message = null;
		    		    		$scope.error = false;
		    		    		
		    				},4000);
			    		  
			    	   },function (data){
			    		   console.log(data);
			    	   });
                    	
                    };
                    
                    $scope.clearquickcomplaintform = function(){
                    	$scope.quick = {
                    			mobileno : '',
                    			accountno : '',
                    			description : '',
                    			selectedcategory : null,
                    			selectedsubcategory : null
                            };
                    	$scope.loadcategory();
                    }
                    
                    $scope.loadcategory();
                    
                	$rootScope.getquickcomplaints = function(){
                		
                		$rootScope.QUICKCOMPLAINTS = [];
	                   	 $http.get(RSURL+"/query/getquickcomplaints")
				  		.then(function (data){
				    		  console.log(data);	
				    		  $rootScope.QUICKCOMPLAINTS = data.data;
				    	   },function (data){
				    	   });
                	};
                	
                	$scope.trackcomplaint = function(){
                		
                		if(!$scope.track.docketnumber){
                			alert("Please enter docket number to track complaint !!!");
                			return;
                		}
                		
                		$scope.TRACKCOMPLAINT = [];
	                   	 $http.get(RSURL+"/query/trackcomplaint?docketnumber="+$scope.track.docketnumber)
				  		.then(function (data){
				    		  console.log(data.data);	
				    		  $scope.TRACKCOMPLAINT = data.data;
				    		  
				    		  if($scope.TRACKCOMPLAINT.length > 0){
				    			  $state.go('trackcomplaint',{'p_trackcomplaint':$scope.TRACKCOMPLAINT});
				    		  }else{
				    			  $scope.message = "Docket Number Not Exists !!!";
					    		  $scope.error = true;
				    			  return;
				    		  }
				    		  
				    	   },function (data){
				    	   });
                	};
                	
                });