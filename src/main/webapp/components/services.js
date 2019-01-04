angular.module('CCCapp.services',[]) 
.factory('Users',['$resource','RSURL',function($resource,RSURL) {
	 return $resource(RSURL+'/users/:id',{id:'@_id'},{
 	     update: {
          method: 'PUT' // this method issues a PUT request
         }        
    }); 
}]).
factory('Authorities',['$resource','RSURL',function($resource,RSURL) {
	 return $resource(RSURL+'/authorities/:id',{id:'@_id'},{
 	     update: {
          method: 'PUT' // this method issues a PUT request
         }        
	 });	 
}]).
factory('DESIGNATION',['$resource','RSURL',function($resource,RSURL) {
	 return $resource(RSURL+'/designations/:id',{id:'@_id'},{
	     update: {
         method: 'PUT' // this method issues a PUT request
        }        
	 });	 
}]).
factory('DEPARTMENT',['$resource','RSURL',function($resource,RSURL) {
	 return $resource(RSURL+'/departments/:id',{id:'@_id'},{
	     update: {
        method: 'PUT' // this method issues a PUT request
       }        
	 });	 
}]).
factory('CADRE',['$resource','RSURL',function($resource,RSURL) {
	 return $resource(RSURL+'/cadres/:id',{id:'@_id'},{
	     update: {
        method: 'PUT' // this method issues a PUT request
       }        
	 });	 
}])
.factory('CATEGORY',['$resource','RSURL',function($resource,RSURL) {
	 return $resource(RSURL+'/categories/:id',{id:'@_id'},{
	     update: {
        method: 'PUT' // this method issues a PUT request
       }        
	 });	 
}])
.factory('SUBCATEGORY',['$resource','RSURL',function($resource,RSURL) {
	 return $resource(RSURL+'/subcategories/:id',{id:'@_id'},{
	     update: {
        method: 'PUT' // this method issues a PUT request
       }        
	 });	 
}])
.factory('COMPLAINTMODE',['$resource','RSURL',function($resource,RSURL) {
	 return $resource(RSURL+'/complaintmodes/:id',{id:'@_id'},{
	     update: {
        method: 'PUT' // this method issues a PUT request
       }        
	 });	 
}])
.factory('LOCATIONDETAIL',['$resource','RSURL',function($resource,RSURL) {
	 return $resource(RSURL+'/locationDetails/:id',{id:'@_id'},{
	     update: {
        method: 'PUT' // this method issues a PUT request
       }        
	 });	 
}])
.factory('REQUEST',['$resource','RSURL',function($resource,RSURL) {
	 return $resource(RSURL+'/locationDetails/:id',{id:'@_id'},{
	     update: {
        method: 'PUT' // this method issues a PUT request
       }        
	 });	 
}])
.factory('QUICKCOMPLAINT',['$resource','RSURL',function($resource,RSURL) {
	 return $resource(RSURL+'/quickComplaints/:id',{id:'@_id'},{
	     update: {
        method: 'PUT' // this method issues a PUT request
       }        
	 });	 
}])
.factory('STATION',['$resource','RSURL',function($resource,RSURL) {
	 return $resource(RSURL+'/stationMasters/:id',{id:'@_id'},{
	     update: {
        method: 'PUT' // this method issues a PUT request
       }        
	 });	 
}])
.factory('FEEDER',['$resource','RSURL',function($resource,RSURL) {
	 return $resource(RSURL+'/feederMasters/:id',{id:'@_id'},{
	     update: {
        method: 'PUT' // this method issues a PUT request
       }        
	 });	 
}])



.service('remote', ['$http','$rootScope','notify',function($http, $rootScope, notify){
    this.load = function(service, success, data, method, error, hide_loader, do_not_notify){
		if(!hide_loader){
		   $('#loading').show();
		}
	    $http(config).then( function(response){
	        if(!hide_loader){
	            $('#loading').hide();
	        }
	        if(response.data.status === 'invalid_session'){
	        	alert("Invalid session... Signing out");
	        	$rootScope.signout();
	        }else if(response.data.status === 'error' || response.data.status === 'fail'){
		    	if(response.data.message){
		        	notify.error(response.data.message);
		    	}
		    	if(typeof error === 'function' ){
		     		error(response.data);
		    	}
		    }else if(response.data.status === 'success'){
		    	console.log(response.data);
		    	if(response.data.message && !do_not_notify){
		     		notify.success(response.data.message);
		    	}
		    	success(response.data);
		   	}
	    }, function(response){
		    if(!hide_loader){
		    	$('#loading').hide();
		    }
		    if(response.message){
		    	notify.error(response.message);
		    }else if(response.data.status === 'fail' || response.data.status === 'failure'){
		    	if(response.data.message){
		     		notify.error(response.data.message);
		    	}
		    }
	    });
 	}
}])

.service('notify', [function(){
	this.clear = function(){
		$('#notification').removeClass('alert-dismissible alert-info alert-success alert-danger alert-warning');
	}
	this.success = function(message){
		this.clear();
		$('#notification').addClass('alert-success');
		var content = '<strong>Success!</strong> '+ message;
		$('#notification').html(content);
		$('#notification').fadeIn( 800 ).delay( 2000 ).fadeOut( 800 );
	}
	this.error = function(message){
		this.clear();
		$('#notification').addClass('alert-dismissible alert-danger');
		var content = '<button type="button" class="close"><span aria-hidden="true">&times;</span></button>';
			content += '<strong>Error!</strong> '+ message;
		$('#notification').html(content);
		$('#notification').fadeIn( 800 ,function(){
			$('#notification').find('.close').off('click').on('click',function(){
				$('#notification').fadeOut( 800 );
			});
		});
	}
	this.info = function(message){
		this.clear();
		$('#notification').addClass('alert-info');
		var content = '<strong>Info!</strong> '+ message;
		$('#notification').html(content);
		$('#notification').fadeIn( 800 ).delay( 2000 ).fadeOut( 800 );
	}
	this.warn = function(message){
		this.clear();
		$('#notification').addClass('alert-warning');
		var content = '<strong>Warning!</strong> '+ message;
		$('#notification').html(content);
		$('#notification').fadeIn( 800 ).delay( 2000 ).fadeOut( 800 );
	}
}])

.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });
                event.preventDefault();
            }
        });
    };
})
;
