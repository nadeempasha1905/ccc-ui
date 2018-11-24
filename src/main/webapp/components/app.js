'use strict';
angular.module('CCCapp',['ngRoute','ngResource','ui.router','ngCookies','angular-jwt',
'CCCapp.services','angular-storage','ngToast','oc.lazyLoad','ng-appcache','ngTableToCsv',
'ngCsv','ui.bootstrap','google.places','angucomplete-alt','ngDomToPdf','http-auth-interceptor','ngC3Export'])

.constant('UURL','http://localhost:8084/ccc-oauth2')

//.constant('RSURL','http://localhost:8084/ccc-oauth2')

.constant('RSURL','http://localhost:8085/ccc-res')



.constant('CACHEBUST_VERSION','1.0')
.config(function($stateProvider, $urlRouterProvider,$ocLazyLoadProvider,CACHEBUST_VERSION) {              
	$ocLazyLoadProvider.config({
        'debug': false, //For debugging 'true/false'
        'events':false, //For Event 'true/false' 
        'modules': [{
            name : 'login', 
            files: ['components/login.js'+'?v='+CACHEBUST_VERSION]
        },
        {
            name : 'home', 
            files: ['components/help/home.js'+'?v='+CACHEBUST_VERSION]
        },
        {
            name : 'dashboard', 
            files: ['components/admin/dashboard.js'+'?v='+CACHEBUST_VERSION]    
        } 
        ,
        /*{
            name : 'dashboardmdb', 
            files: ['components/admin/dashboardmdb.js'+'?v='+CACHEBUST_VERSION]    
        },*/
        {
            name : 'dashboardmdb', 
            files: ['components/admin/dashboardmdb.js'+'?v='+CACHEBUST_VERSION]    
        },
        {
            name : 'quickcomplaint', 
            files: ['components/admin/quickcomplaint.js'+'?v='+CACHEBUST_VERSION]    
        },
        {
            name : 'registercomplaint', 
            files: ['components/admin/registercomplaint.js'+'?v='+CACHEBUST_VERSION]    
        },
        {
            name : 'designation', 
            files: ['components/admin/config/designation.js'+'?v='+CACHEBUST_VERSION]
        },       
        {
            name : 'department', 
            files: ['components/admin/config/department.js'+'?v='+CACHEBUST_VERSION]
        },       
        {
            name : 'cadre', 
            files: ['components/admin/config/cadre.js'+'?v='+CACHEBUST_VERSION]
        },       
        {
            name : 'category', 
            files: ['components/admin/config/category.js'+'?v='+CACHEBUST_VERSION]
        },       
        {
            name : 'complaintmode', 
            files: ['components/admin/config/complaintmode.js'+'?v='+CACHEBUST_VERSION]
        },       
        {
            name : 'feeder', 
            files: ['components/admin/config/feeder.js'+'?v='+CACHEBUST_VERSION]
        },       
        {
            name : 'station', 
            files: ['components/admin/config/station.js'+'?v='+CACHEBUST_VERSION]
        },       
        {
            name : 'subcategory', 
            files: ['components/admin/config/subcategory.js'+'?v='+CACHEBUST_VERSION]
        },       
        {
            name : 'users', 
            files: ['components/admin/config/users.js'+'?v='+CACHEBUST_VERSION]
        }    
        ]
    });   
	
    $stateProvider    
    
/*    .state('index', {
        url: '/',
        templateUrl: 'index.html',
        controller:'appCtrl',                         
        resolve: {
            loadMyCtrl: ['$ocLazyLoad','$cookies','$state', function($ocLazyLoad,$cookies,$state) {
                // if($cookies.get("access_token")==null) {                                
                //     return $state.go('login');
                // }
                //return $ocLazyLoad.load('index'); // Resolve promise and load before view 
            	return $state.go('index');
            }]
        }                  
    })*/
    
    
	    .state('login', {
	        url: '/login',
	        templateUrl: 'components/login.html',
	        controller:'loginCtrl',                         
	        resolve: {
	            loadMyCtrl: ['$ocLazyLoad','$cookies','$state', function($ocLazyLoad,$cookies,$state) {
	                // if($cookies.get("access_token")==null) {                                
	                //     return $state.go('login');
	                // }
	                return $ocLazyLoad.load('login'); // Resolve promise and load before view 
	            }]
	        }                  
	    }) 
        .state('home', {
            url: '/home',
            templateUrl: 'components/help/home.html',
            controller:'homeCtrl',                         
            resolve: {
                loadMyCtrl: ['$ocLazyLoad','$cookies','$state', function($ocLazyLoad,$cookies,$state) {
                    // if($cookies.get("access_token")==null) {                                
                    //     return $state.go('login');
                    // }
                    return $ocLazyLoad.load('home'); // Resolve promise and load before view 
                }]
            }                  
        }) 
        
         .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'components/admin/dashboard.html',
            controller:'dashboardCtrl',                         
            resolve: {
                loadMyCtrl: ['$ocLazyLoad','$cookies','$state', function($ocLazyLoad,$cookies,$state) {
                    // if($cookies.get("access_token")==null) {                                
                    //     return $state.go('login');
                    // }
                    return $ocLazyLoad.load('dashboard'); // Resolve promise and load before view 
                }]
            }                  
        }) 
/*        .state('dashboardmdb', {
            url: '/dashboardmdb',
            templateUrl: 'components/admin/dashboardmdb.html',
            controller:'dashboardmdbCtrl',                         
            resolve: {
                loadMyCtrl: ['$ocLazyLoad','$cookies','$state', function($ocLazyLoad,$cookies,$state) {
                    return $ocLazyLoad.load('dashboardmdb'); // Resolve promise and load before view 
                }]
            }                  
        })*/
        .state('admin', {
            url: '/admin',
            templateUrl: 'components/admin/admin.html'   
                                
        })
        .state('admin.dashboardmdb', {
            url: '/dashboardmdb',
            views:{
          	  "admin": {  
          		 controller:'dashboardmdbCtrl',  
	    		 templateUrl: 'components/admin/dashboardmdb.html'		    		 
	           }		           
              },
              resolve: {
                  loadMyCtrl: ['$ocLazyLoad','$cookies','$state', function($ocLazyLoad,$cookies,$state) {                  
                      return $ocLazyLoad.load('dashboardmdb'); // Resolve promise and load before view 
                  }]
              } 
                                
        })
        .state('admin.quickcomplaint', {
            url: '/quickcomplaint',
            views:{
          	  "admin": {  
          		 controller:'quickcomplaintCtrl',  
	    		 templateUrl: 'components/admin/quickcomplaint.html'		    		 
	           }		           
              },
              resolve: {
                  loadMyCtrl: ['$ocLazyLoad','$cookies','$state', function($ocLazyLoad,$cookies,$state) {                  
                      return $ocLazyLoad.load('quickcomplaint'); // Resolve promise and load before view 
                  }]
              } 
                                
        })
        .state('admin.registercomplaint', {
           /* url: '/registercomplaint/:mobileno/:accountid/:quickstatus',*/
        	 url: '/registercomplaint',
            params:{
            	mobileno : null,
            	accountid : null,
            	quickstatus : null
            },
            views:{
          	  "admin": {  
          		 controller:'registercomplaintCtrl',  
	    		 templateUrl: 'components/admin/registercomplaint.html'		    		 
	           }		           
              },
              resolve: {
                  loadMyCtrl: ['$ocLazyLoad','$cookies','$state', function($ocLazyLoad,$cookies,$state) {                  
                      return $ocLazyLoad.load('registercomplaint'); // Resolve promise and load before view 
                  }]
              } 
                                
        })
        .state('config', {
            url: '/config',
            templateUrl: 'components/admin/config/config.html'   
                                
        })
        .state('config.designation', {
            url: '/designation',          
            views:{
            	  "config": {  
            		 controller:'designationCtrl',  
		    		 templateUrl: 'components/admin/config/designation.html'		    		 
		           }		           
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad','$cookies','$state', function($ocLazyLoad,$cookies,$state) {                  
                    return $ocLazyLoad.load('designation'); // Resolve promise and load before view 
                }]
            }  
                                
        })
        .state('config.department', {
            url: '/department',          
            views:{
            	  "config": {  
            		 controller:'departmentCtrl',  
		    		 templateUrl: 'components/admin/config/department.html'		    		 
		           }		           
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad','$cookies','$state', function($ocLazyLoad,$cookies,$state) {                  
                    return $ocLazyLoad.load('department'); // Resolve promise and load before view 
                }]
            }  
                                
        })
        .state('config.cadre', {
            url: '/department',          
            views:{
            	  "config": {  
            		 controller:'cadreCtrl',  
		    		 templateUrl: 'components/admin/config/cadre.html'		    		 
		           }		           
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad','$cookies','$state', function($ocLazyLoad,$cookies,$state) {                  
                    return $ocLazyLoad.load('cadre'); // Resolve promise and load before view 
                }]
            }  
        })
        .state('config.category', {
            url: '/category',          
            views:{
            	  "config": {  
            		 controller:'categoryCtrl',  
		    		 templateUrl: 'components/admin/config/category.html'		    		 
		           }		           
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad','$cookies','$state', function($ocLazyLoad,$cookies,$state) {                  
                    return $ocLazyLoad.load('category'); // Resolve promise and load before view 
                }]
            }  
        })
        .state('config.complaintmode', {
            url: '/complaintmode',          
            views:{
            	  "config": {  
            		 controller:'complaintmodeCtrl',  
		    		 templateUrl: 'components/admin/config/complaintmode.html'		    		 
		           }		           
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad','$cookies','$state', function($ocLazyLoad,$cookies,$state) {                  
                    return $ocLazyLoad.load('complaintmode'); // Resolve promise and load before view 
                }]
            }  
        })
        .state('config.feeder', {
            url: '/feeder',          
            views:{
            	  "config": {  
            		 controller:'feederCtrl',  
		    		 templateUrl: 'components/admin/config/cadre.html'		    		 
		           }		           
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad','$cookies','$state', function($ocLazyLoad,$cookies,$state) {                  
                    return $ocLazyLoad.load('feeder'); // Resolve promise and load before view 
                }]
            }  
        })
        .state('config.station', {
            url: '/station',          
            views:{
            	  "config": {  
            		 controller:'stationCtrl',  
		    		 templateUrl: 'components/admin/config/station.html'		    		 
		           }		           
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad','$cookies','$state', function($ocLazyLoad,$cookies,$state) {                  
                    return $ocLazyLoad.load('station'); // Resolve promise and load before view 
                }]
            }  
        })    
        .state('config.subcategory', {
            url: '/subcategory',          
            views:{
            	  "config": {  
            		 controller:'subcategoryCtrl',  
		    		 templateUrl: 'components/admin/config/subcategory.html'		    		 
		           }		           
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad','$cookies','$state', function($ocLazyLoad,$cookies,$state) {                  
                    return $ocLazyLoad.load('subcategory'); // Resolve promise and load before view 
                }]
            }  
        })           
        .state('config.users', {
            url: '/users',          
            views:{
            	  "config": {  
            		 controller:'usersCtrl',  
		    		 templateUrl: 'components/admin/config/users.html'		    		 
		           }		           
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad','$cookies','$state', function($ocLazyLoad,$cookies,$state) {                  
                    return $ocLazyLoad.load('users'); // Resolve promise and load before view 
                }]
            }  
        })          
        //$urlRouterProvider.otherwise('/');	
    	//$urlRouterProvider.otherwise('dashboardmdb');	
        $urlRouterProvider.otherwise('login');	
            
})
.filter('offset', function() {
		  return function(input, start) {
		    start = parseInt(start, 10);
		    return input.slice(start);
		  };
 })	
 // e.g. increment when templates updated or get a build version from build process or what ever suits your needs
.config(["$provide", function($provide) {
    return $provide.decorator("$http", ["$delegate","CACHEBUST_VERSION", function($delegate,CACHEBUST_VERSION) {
        var cacheBustVersion = CACHEBUST_VERSION;
        var get = $delegate.get;
        $delegate.get = function(url, config) {
            // The template check is to avoid breaking AngularUI ui-bootstrap-tpls.js: "template/accordion/accordion-group.html"
            // The rest are examples for any other assets that should not use cache busting
            if (url.indexOf('template/')) {
                // Append ?v=[cacheBustVersion] to url
                url += (url.indexOf("?") === -1 ? "?" : "&");
                url += "v=" + cacheBustVersion;
            }
            return get(url, config);
        };
        return $delegate;
    }]);
}])
.factory('myService', function() {
 var savedData = {}
 function set(data) {
   savedData = data;
 }
 function get() {
  return savedData;
 }

 return {
  set: set,
  get: get
 }

})
/*.factory('myHttpResponseInterceptor',['$q','$rootScope','$injector','$window',function($q,$rootScope,$injector,$window){
    
       var loadingCount = 0;
       return {
           request: function(config) {	
        	   if(++loadingCount === 1) $rootScope.$broadcast('loading:progress');
             return config || $q.when(config);             
           },
           response: function(response) {	
             if(--loadingCount === 0) $rootScope.$broadcast('loading:finish');	
             return response || $q.when(response);
           },
           responseError: function(rejection) {
               if(--loadingCount === 0) $rootScope.$broadcast('loading:finish');
               if(rejection.status === 401){
            	   //console.log('refresh token');
            	   //$rootScope.obtainAccessToken({grant_type:"refresh_token"});
            	   //$rootScope.isLoggedIn = false;
            	   $injector.get('$state').transitionTo('home');
              }					        
              return $q.reject(rejection);
           }
         };
         
   }])
   .config(['$httpProvider',function($httpProvider) {
       $httpProvider.interceptors.push('myHttpResponseInterceptor');
   }])  */ 


    .run(function($rootScope,authService,$http,$httpParamSerializer,$state,$cookies) {
    	  $rootScope.$on('event:auth-loginRequired', function() {
    	      console.log('test login');

    	      /*	if($cookies.get("access_token")){
    	        	 
    	        	 $rootScope.IsLogin = true;
    	        	 $state.go('dashboardmdb');
    	        	 $rootScope.username = $cookies.get("user");
    	        	 
    	         }else{
    	        	 $rootScope.IsLogin = false;
    	             console.log("run");
    	             $state.go('dashboardmdb');
    	             $window.location.reload();
    	         }*/
    	      
    	      var req = {
                      method: 'POST',
                      url: "oauth/token",
                      headers: {
                          "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                      },
                      data: $httpParamSerializer({grant_type:"refresh_token"})
                  }
                  $http(req)
                  .then(
                      function (data) {
                         console.log(data);
                    	  $http.defaults.headers.common.Authorization = 'Bearer ' + data.data.access_token;
                          var config=function(config){
                        	  config.headers.Authorization = 'Bearer ' + data.data.access_token;
                        	  return config;
                        	  }
                          var expireDate = new Date(new Date().getTime() + (1000 * data.data.expires_in));
                          $cookies.put("access_token", data.data.access_token, {'expires': expireDate});
                          authService.loginConfirmed(data,config);
                          
                        //  $rootScope.IsLogin = true;
                        //  $state.go('dashboardmdb');
                      },
                      function (data) {
                    	 // $rootScope.IsLogin = false;
                          $state.go('login');
                          console.log("333");
                    	  $scope.error = true;
                          $timeout(function () {
                              $scope.error = false;
                          }, 2000);
                      });
    	    })
    	    
    })

   .run(['$rootScope','$state','$cookies','$window','$templateCache',function($rootScope,$state,$cookies,$window,$templateCache) {			 
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            console.log('state change');
        	if ($cookies.get("access_token")==null) {
            	event.preventDefault();
            	console.log("222");
            	return $state.go('dashboardmdb');
             //   return $state.go('home');
            }
            return;
        });
  }]).config(['$qProvider', function ($qProvider) {
	    $qProvider.errorOnUnhandledRejections(false);
  }])
.directive('pwCheck', [function () {
    return {
          require: 'ngModel',
          link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function () {
              scope.$apply(function () {
                var v = elem.val()===$(firstPassword).val();
                ctrl.$setValidity('pwmatch', v);
              });
            });
          }
    };
}])
.filter('start', function () {
	  return function (input, start) {
		    if (!input || !input.length) { return; }
		    start = +start;
		    return input.slice(start);
		  };
		})
.filter('pagination', function()
		{
	  return function(input, start) {
	    if(input!=undefined){
	    	start = +start;
	    	  return input.slice(start);
	    }
	  };
})
.filter('slice', function() {
	return function(arr, start, limit) {
		if(arr != undefined){
			var lim = parseInt(limit);
			var arr1 = arr.slice((((start-1)*(lim))), ((start*lim)));
		}  
		return arr1;
	}; 
})
.directive("compareTo", function(){
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
})
.directive('contenteditable', function() {
    return {
      restrict: 'A', // only activate on element attribute
      require: '?ngModel', // get a hold of NgModelController
      link: function(scope, element, attrs, ngModel) {
        if(!ngModel) return; // do nothing if no ng-model

        // Specify how UI should be updated
        ngModel.$render = function() {
          element.html(ngModel.$viewValue || '');
        };

        // Listen for change events to enable binding
        element.on('blur keyup change', function() {
          scope.$apply(read);
        });
        read(); // initialize

        // Write data to the model
        function read() {
          var html = element.html();
          // When we clear the content editable the browser leaves a <br> behind
          // If strip-br attribute is provided then we strip this out
          if( attrs.stripBr && html == '<br>' ) {
            html = '';
          }
          ngModel.$setViewValue(html);
        }
      }
    }
})
/*.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          scope.isLoading = function () {
            return $http.pendingRequests.length > 0;
          };
          scope.$watch(scope.isLoading, function (value) {
        	  console.log("2121");
            if (value) {
              //element.removeClass('ng-hide');
              $('#loading').show();
            } else {
              //element.addClass('ng-hide');
              $('#loading').hide();
            }
          });
        }
    };
}])*/
.directive('dirCustomLoader', ['$http', function ($http) {
    return {
        restrict: 'E',
        template: '<div class="loading"></div>',
        link: function (scope, element, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function (value) {
                if (value) 
                    element.removeClass('ng-hide');
                else 
                    element.addClass('ng-hide');
            });
        }
    };
}])

.filter('groupBy', ['pmkr.filterStabilize', function(stabilize){
    return stabilize( function (data, key) {
        if (!(data && key)) return;
        var result = {};
        for (var i=0;i<data.length;i++) {
            if (!result[data[i][key]])
                result[data[i][key]]=[];
            result[data[i][key]].push(data[i])
        }
        return result;
    });
}]).filter('unique', function() {
	   // we will return a function which will take in a collection
	   // and a keyname
	   return function(collection, keyname) {
	      // we define our output and keys array;
	      var output = [], 
	          keys = [];

	      // we utilize angular's foreach function
	      // this takes in our original collection and an iterator function
	      angular.forEach(collection, function(item) {
	          // we check to see whether our object exists
	          var key = item[keyname];
	          // if it's not already part of our keys array
	          if(keys.indexOf(key) === -1) {
	              // add it to our keys array
	              keys.push(key); 
	              // push this item to our final output array
	              output.push(item);
	          }
	      });
	      // return our array which should be devoid of
	      // any duplicates
	      return output;
	   };
	})
.factory('pmkr.filterStabilize', [
  'pmkr.memoize',
  function(memoize) {
    function service(fn) {
      function filter() {
        var args = [].slice.call(arguments);
        // always pass a copy of the args so that the original input can't be modified
        args = angular.copy(args);
        // return the `fn` return value or input reference (makes `fn` return optional)
        var filtered = fn.apply(this, args) || args[0];
        return filtered;
      }
      var memoized = memoize(filter);
      return memoized;
    }
    return service;
  }
])
.factory('pmkr.memoize', [
  function() {
    function service() {
      return memoizeFactory.apply(this, arguments);
    }
    function memoizeFactory(fn) {
      var cache = {};
      function memoized() {
        var args = [].slice.call(arguments);
        var key = JSON.stringify(args);
        var fromCache = cache[key];
        if (fromCache) {
          return fromCache;
        }
        cache[key] = fn.apply(this, arguments);
        return cache[key];
      }
      return memoized;
    }
    return service;
  }
])
.controller("appCtrl", function($scope,$rootScope,$httpParamSerializer,$http,$cookies,store,$state,$timeout,
		$window,appcache,$templateCache,RSURL,CACHEBUST_VERSION,notify,remote){
         $rootScope.version=CACHEBUST_VERSION; 
         
        /* if($cookies.get("access_token")){
        	 
        	 $rootScope.IsLogin = true;
        	 $state.go('dashboardmdb');
        	 $rootScope.username = $cookies.get("user");
        	 
         }else{
        	 $rootScope.IsLogin = false;
             $state.go('login');
             $window.location.reload();
             
         }*/

 })
.controller("navCtrl", function($scope,$rootScope,$httpParamSerializer,$http,$cookies,store,$state,$timeout,
		$window,appcache,$templateCache,RSURL,CACHEBUST_VERSION,notify,remote){
	
	$scope.testdate=new Date();
	$rootScope.version=CACHEBUST_VERSION;
	
			
         

         $rootScope.logout = function() {
        	 $rootScope.IsLogin = false;
     		$cookies.remove("access_token");
     		//$state.go('dashboardmdb');
     		$state.go('login',null,{reload:true});
     		$window.location.reload();
     		//$state.go('dashboardmdb');
     	}       
	
	$rootScope.downloadApk=function(){
		$window.open(RSURL+'/downloadapk?access_token='+$cookies.get("access_token"),'_self');
	}
	
	function handleResponse1(response){
		var pdfFile = new Blob([response.data], { type : 'application/pdf' })
		var downloadURL = URL.createObjectURL(pdfFile);				
		var link = document.createElement('a');
		link.href = downloadURL;
		link.download = "sForm.pdf"
		document.body.appendChild(link);
		link.click();
	}
	
    $scope.sformpdf = function () {     	
    	
    	$http.get(RSURL+'/generatepdfblank?name=sform'
				, { responseType : 'arraybuffer' }).then(handleResponse1);
	
    }
    
    function handleResponse2(response){
		var pdfFile = new Blob([response.data], { type : 'application/pdf' })
		var downloadURL = URL.createObjectURL(pdfFile);				
		var link = document.createElement('a');
		link.href = downloadURL;
		link.download = "pForm.pdf"
		document.body.appendChild(link);
		link.click();
	}
	
    $scope.pformpdf = function () {     	
    	
    	$http.get(RSURL+'/generatepdfblank?name=pform'
				, { responseType : 'arraybuffer' }).then(handleResponse2);
	
    }
    
    function handleResponse3(response){
		var pdfFile = new Blob([response.data], { type : 'application/pdf' })
		var downloadURL = URL.createObjectURL(pdfFile);				
		var link = document.createElement('a');
		link.href = downloadURL;
		link.download = "lForm.pdf"
		document.body.appendChild(link);
		link.click();
	}
	
    $scope.lformpdf = function () {     	
    	console.log("bfugfhbgusntim dfij")
    	$http.get(RSURL+'/generatepdfblank?name=lform'
				, { responseType : 'arraybuffer' }).then(handleResponse3);
	
    }

	$rootScope.downloadUserGuide=function(){
		$window.open(RSURL+'/downloaduserguide?access_token='+$cookies.get("access_token"),'_self');
	}
	
	appcache.checkUpdate().then(function() {           
          appcache.swapCache(); 
          $templateCache.removeAll();
          $window.location.reload(true); 
          
       });
 });


(function (angular) {
    'use strict';
    function printDirective() {
    	
        function link(scope, element, attrs) {
            element.on('click', function () {
                var elemToPrint = document.getElementById(attrs.printElementId);
                if (elemToPrint) {                
                    printElement(elemToPrint);
                }
            });
            window.onafterprint = function () {
                //clean the print section before adding new content
                printSection.innerHTML='';
            }
        }
        function printElement(elem) {         	
        	
        	var printSection = document.getElementById('printSection');
            if(!printSection) {
                printSection = document.createElement('div');
                printSection.id = 'printSection';            
                document.body.appendChild(printSection);
            }else{
            	while (printSection.firstChild) {
            		printSection.removeChild(printSection.firstChild);
            	}
            	
            } 
            
        	var domClone = elem.cloneNode(true);
            printSection.appendChild(domClone);
            window.print();
        }
        return {
            link: link,
            restrict: 'A'
        };
    }
   angular.module('CCCapp').directive('ngPrint', [printDirective]);
}(window.angular));
/*Back to Top */
//window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

		
		