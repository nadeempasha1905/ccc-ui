/**
 * 
 */

angular
        .module('CCCapp.Controllers', [])
        .controller(
                "trackcomplaintCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper, $window,
                        RSURL,$controller, $timeout, $window,store,ngToast,authService,$q,$stateParams) {
                	
                	console.log("trackcomplaint Page initiated !!!");
                	
                	console.log("$stateParams",$stateParams);
                	$scope.auth_page = true;
                	
                	if($stateParams.p_trackcomplaint === null ){
                		$scope.auth_page = false;
                		return;
                	}else{
                		$scope.auth_page = true;
                	}
                	
                	$scope.TRACK_COMPLAINT = $stateParams.p_trackcomplaint;
                	
                	$scope.CURRENT_STATUS = 0 ;
                	
                	$scope.DOCKETNUMBER = 0 ;
                	
                	$scope.open_status = null;
                	$scope.assigned_status = null;
                	$scope.inprogress_status = null;
                	$scope.resolved_status = null;
                	$scope.closed_status = null;
                	$scope.reopned_status = null;
                	$scope.rejected_status = null;
                	$scope.escalated_status = null;
                	
                	$scope.TRACK_COMPLAINT.map(function(e,index){
                		
                		if(e.statusid === 1){
                			$scope.open_status = $filter('filter')($scope.TRACK_COMPLAINT, {statusid:1},true)[0] ;
                		}else if(e.statusid === 2){
                			$scope.assigned_status = $filter('filter')($scope.TRACK_COMPLAINT, {statusid:2},true)[0] ;
                		}else if(e.statusid === 4){
                			$scope.inprogress_status = $filter('filter')($scope.TRACK_COMPLAINT, {statusid:4},true)[0] ;
                		}else if(e.statusid === 7){
                			$scope.resolved_status = $filter('filter')($scope.TRACK_COMPLAINT, {statusid:7},true)[0] ;
                		}else if(e.statusid === 5){
                			$scope.closed_status = $filter('filter')($scope.TRACK_COMPLAINT, {statusid:5},true)[0] ;
                		}else if(e.statusid === 3){
                			$scope.rejected_status = $filter('filter')($scope.TRACK_COMPLAINT, {statusid:3},true)[0] ;
                		}else if(e.statusid === 6){
                			$scope.reopned_status = $filter('filter')($scope.TRACK_COMPLAINT, {statusid:6},true)[0] ;
                		}else if(e.statusid === 8){
                			$scope.escalated_status = $filter('filter')($scope.TRACK_COMPLAINT, {statusid:8},true)[0] ;
                		}
                		
                		$scope.CURRENT_STATUS = e.statusid;
                		$scope.DOCKETNUMBER = e.docketno;
                		
                	});
                	
                	console.log($scope.open_status);
                	console.log($scope.assigned_status);
                	console.log($scope.inprogress_status);
                	console.log($scope.resolved_status);
                	console.log($scope.closed_status);
                	console.log($scope.rejected_status);
                	console.log($scope.reopned_status);
                	console.log($scope.escalated_status);
                	console.log($scope.CURRENT_STATUS);
                	
					  if($scope.CURRENT_STATUS === 1){
						  $('#circle_open').addClass('active');
						  $('#circle_assigned').removeClass('active');
						  $('#circle_inprogress').removeClass('active');
						  $('#circlr_resolved').removeClass('active');
						  $('#circle_closed').removeClass('active');
					  }else if($scope.CURRENT_STATUS === 2){
						  $('#circle_assigned').addClass('active');
						  $('#circle_open').removeClass('active');
						  $('#circle_inprogress').removeClass('active');
						  $('#circlr_resolved').removeClass('active');
						  $('#circle_closed').removeClass('active');
					  }else if($scope.CURRENT_STATUS === 4){
						  $('#circle_inprogress').addClass('active');
						  $('#circle_assigned').removeClass('active');
						  $('#circle_open').removeClass('active');
						  $('#circlr_resolved').removeClass('active');
						  $('#circle_closed').removeClass('active');
					  }else if($scope.CURRENT_STATUS === 7){
						  $('#circlr_resolved').addClass('active');
						  $('#circle_inprogress').removeClass('active');
						  $('#circle_assigned').removeClass('active');
						  $('#circle_open').removeClass('active');
						  $('#circle_closed').removeClass('active');
					  }else if($scope.CURRENT_STATUS === 5){
						  $('#circle_closed').addClass('active');
						  $('#circlr_resolved').removeClass('active');
						  $('#circle_inprogress').removeClass('active');
						  $('#circle_assigned').removeClass('active');
						  $('#circle_open').removeClass('active');
					  }
                	
                	
                });