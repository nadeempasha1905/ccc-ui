angular
        .module('CCCapp.Controllers', [])
        .controller(
                "dashboardCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper, $window,
                        RSURL,$controller, $timeout, $window,store,ngToast,authService,$q) {
                	
                	console.log("Dashboard Page initiated !!!");
                	$scope.heading = "Dashboard Page";
                	
                	$scope.dashboard = {
                			
                	};
                	
                	$scope.LOCATION_CODE_PARAM = '';
                    $scope.dashboard.fromdate = moment(new Date()).subtract(1, 'year').format('DD/MM/YYYY').toString();
                    $scope.dashboard.todate = moment(new Date()).format("DD/MM/YYYY").toString();
                	
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
                	
                	$rootScope.getUserRoles();
                	
                	console.log("rootscope = ",$rootScope.COMPANY_USER ,$rootScope.ZONE_USER,$rootScope.CIRCLE_USER,
                			$rootScope.DIVISION_USER,$rootScope.SUBDIVISION_USER ,$rootScope.OMSECTION_USER);
                	
                	// Themes begin
                	am4core.useTheme(am4themes_animated);
                	// Themes end
                	
                	var chart  = am4core.create("chart", am4charts.PieChart);
                	
                	//var chart2 = am4core.create("chart2", am4charts.XYChart);
                	
                  	$scope.getmaindashboarddetails = function()
                    {
                  		
                    	$scope.MAINDASHBOARDDETAILS = [];
                    	 $http.get(RSURL+"/query/getmaindashboarddetails")
   				  		.then(function (data){
   				    		 // console.log(data);	
   				    		  $scope.MAINDASHBOARDDETAILS = data.data[0];
   				    		
   				    		 // $scope.rendercharts();
   				    		
   				    		  $scope.render_mainpiechart();
   				    		  
   				    	   },function (data){
   				    	   });
                    }
                  	
                  	$scope.dashboardlisttype = "";
                  	$scope.getdahboardcomplaintlist = function()
                    {
                  		 var locationcode = $scope.LOCATION_CODE_PARAM;
                  		 var fromdate = $scope.dashboard.fromdate;
                  		 var todate = $scope.dashboard.todate;
                  		 
                    	$scope.DASHBOARDCOMPLAINTLIST = [];
                    	 $http.get(RSURL+"/query/getdahboardcomplaintlist?" +
	                   			"locationcode="+locationcode+"" +
	                   			"&fromdate="+fromdate+"" +
	                   			"&todate="+todate)
   				  		.then(function (data){
   				    		 // console.log(data);	
   				    		  $scope.DASHBOARDCOMPLAINTLIST = data.data;
   				    		
   				    		// $('#dashboarddetaillist').modal('toggle');
   				    		 
   				    		// $timeout(function(){
   				    			// $scope.openmodalanddisplaychart_c3();
   				    			// $scope.openmodalanddisplaychart();
   				    		// },500);
   				    		  
   				    	   },function (data){
   				    	   });
                    }
                  	
                  	$scope.param_statusname = "";
                  	$scope.render_submainpiechart = function(pie_slice_clicked,filter_type){
                  		
                  		chart1.data = null;
                  		
                  		 var locationcode = $scope.LOCATION_CODE_PARAM;
                  		 var fromdate = $scope.dashboard.fromdate;
                  		 var todate = $scope.dashboard.todate;
                  		 //var statusname = filter_type;
                  		 
                  		$scope.heading_label = "Category Wise Complaints Breakup";
                  		 
                  		 if(!pie_slice_clicked){
                  			statusname = '';
                  			$scope.param_statusname = '';
                  			$scope.heading_label = $scope.heading_label + ' For All Status ';
                  		 }else{
                  			$scope.param_statusname = filter_type;
                  			$scope.heading_label = $scope.heading_label + ' For '+$scope.param_statusname + " Status ";
                  		 }
                  		 
                  		 
                  		 $scope.CATEGORY_PIE_CHART = [];
                  		 
                  		$scope.SUBMAINPIECHARTLIST = [];
	                   	$http.get(RSURL+"/query/getdashboardcategorywisedetails?" +
	                   			"locationcode="+locationcode+"" +
	                   			"&statusname="+$scope.param_statusname+"" +
	                   			"&fromdate="+fromdate+"" +
	                   			"&todate="+todate)
	  				  		.then(function (data){
	  				  			
	  				    		//  console.log(data);	
	  				    		  $scope.SUBMAINPIECHARTLIST = data.data;
	  				    		 
	  				    		var CATEGORY_IDS = [];
	  				    		var temp_id = $scope.SUBMAINPIECHARTLIST[0].category_id;
	  				    		CATEGORY_IDS.push($scope.SUBMAINPIECHARTLIST[0].category_id);
	  				    		
	  				    		$scope.SUBMAINPIECHARTLIST.map(function(e,index){
	  				    			
	  				    			if(e.category_id != temp_id){
	  				    				CATEGORY_IDS.push(e.category_id);
	  				    				temp_id = e.category_id;
	  				    			}
	  				    		});
	  				    		  
	  				    		for(var i = 0; i < CATEGORY_IDS.length ; i++){
	  				    			
	  				    			var categoryid = CATEGORY_IDS[i];
	  				    			var obj = {};
	  				    			var obj1 = [];
	  				    			var temp = {};
	  				    			
	  				    			var record = 0 ;
	  				    			$scope.SUBMAINPIECHARTLIST.map(function(e1,index){
	  				    				if(categoryid === e1.category_id){
		  				    					if(record === 0){
		  				    						obj = {
	  				  				    				type : e1.category_name,
	  				  				    				percent : e1.category_count,
	  				  				    				color: chart.colors.getIndex(index),
	  				  				    				subs : []
	  				  				    			};
		  				    					}
		  				    					temp = {
		  				    							type : e1.subcategory_name,
		  				    							percent : e1.subcategory_count
		  				    					}
		  				    					record = 1;
		  				    					obj1.push(temp);
	  				    					}
	  				    				});
	  				    				//console.log("subs",obj1);
	  				    				obj.subs = obj1;
	  				    				$scope.CATEGORY_PIE_CHART.push(obj);
	  				    			}
	  				    		
	  				    		$scope.render_category_subcategory_wise_charts();
	  				    		//console.log("$scope.CATEGORY_PIE_CHART",$scope.CATEGORY_PIE_CHART);
	  				    		
	  				    	 },
	  				    	 function (data){
	  				    		 
	  				    	 });
                  		
                  	};
                  	
                  	
                  	
                  	$scope.render_locationwise_piechart = function(pie_slice_clicked,filter_type){
                  		
                  		chart1.data = null;
                  		
                  		 var locationcode = $scope.LOCATION_CODE_PARAM;
                  		 var fromdate = $scope.dashboard.fromdate;
                  		 var todate = $scope.dashboard.todate;
                  		 //var statusname = filter_type;
                  		 
                  		$scope.heading_label = "Location Wise Complaints Breakup";
                 		 
                 		 if(!pie_slice_clicked){
                 			statusname = '';
                 			$scope.param_statusname = '';
                 			$scope.heading_label = $scope.heading_label + ' For All Status ';
                 		 }else{
                 			$scope.param_statusname = filter_type;
                 			$scope.heading_label = $scope.heading_label + ' For '+$scope.param_statusname + " Status ";
                 		 }
                  		 
                  		
                  		 $scope.LOCATION_PIE_CHART = [];
                  		 
                  		$scope.LOCATIONPIECHARTLIST = [];
	                   	$http.get(RSURL+"/query/getdashboardlocationwisesummary?" +
	                   			"locationcode="+locationcode+"" +
	                   			"&statusname="+$scope.param_statusname+"" +
	                   			"&fromdate="+fromdate+"" +
	                   			"&todate="+todate)
	  				  		.then(function (data){
	  				  			
	  				    		  //console.log(data);	
	  				    		  $scope.LOCATIONPIECHARTLIST = data.data;
	  				    		 
	  				    		var LOCATION_IDS = [];
	  				    		var temp_id = $scope.LOCATIONPIECHARTLIST[0].location_code1;
	  				    		LOCATION_IDS.push($scope.LOCATIONPIECHARTLIST[0].location_code1);
	  				    		
	  				    		$scope.LOCATIONPIECHARTLIST.map(function(e,index){
	  				    			
	  				    			if(e.location_code1 != temp_id){
	  				    				LOCATION_IDS.push(e.location_code1);
	  				    				temp_id = e.location_code1;
	  				    			}
	  				    		});
	  				    		  
	  				    		for(var i = 0; i < LOCATION_IDS.length ; i++){
	  				    			
	  				    			var locationid = LOCATION_IDS[i];
	  				    			var obj = {};
	  				    			var obj1 = [];
	  				    			var temp = {};
	  				    			
	  				    			var record = 0 ;
	  				    			$scope.LOCATIONPIECHARTLIST.map(function(e1,index){
	  				    				if(locationid === e1.location_code1){
		  				    					if(record === 0){
		  				    						obj = {
	  				  				    				type : e1.location_name1,
	  				  				    				percent : e1.location_count1,
	  				  				    				color: chart.colors.getIndex(index),
	  				  				    				subs : []
	  				  				    			};
		  				    					}
		  				    					temp = {
		  				    							type : e1.location_name2,
		  				    							percent : e1.location_count2
		  				    					}
		  				    					record = 1;
		  				    					obj1.push(temp);
	  				    					}
	  				    				});
	  				    				//console.log("subs",obj1);
	  				    				obj.subs = obj1;
	  				    				$scope.LOCATION_PIE_CHART.push(obj);
	  				    			}
	  				    		
	  				    		$scope.location_wise_charts();
	  				    		//console.log("$scope.LOCATION_PIE_CHART",$scope.LOCATION_PIE_CHART);
	  				    		
	  				    	 },
	  				    	 function (data){
	  				    		 
	  				    	 });
                  		
                  	};
                  	
                  	$scope.render_category_subcategory_wise_charts = function(){
                  		
                  		var chart1 = am4core.create("chart1", am4charts.PieChart);
                  		
                  		//console.log("CATEGORY_PIE_CHART",$scope.CATEGORY_PIE_CHART);
                    	//Set data
                    	var selected;
                    	var types = $scope.CATEGORY_PIE_CHART;

                    	// Add data
                    	chart1.data = generateChartData();
                    	
                    	// Add a legend
                    	//chart1.legend = new am4charts.Legend();

                    	// Add and configure Series
                    	var pieSeries = chart1.series.push(new am4charts.PieSeries());
                    	pieSeries.dataFields.value = "percent";
                    	pieSeries.dataFields.category = "type";
                    	pieSeries.slices.template.propertyFields.fill = "color";
                    	pieSeries.slices.template.propertyFields.isActive = "pulled";
                    	pieSeries.slices.template.strokeWidth = 0;
                    	
                    	// This creates initial animation
	                    	pieSeries.hiddenState.properties.opacity = 1;
	                    	pieSeries.hiddenState.properties.endAngle = -90;
	                    	pieSeries.hiddenState.properties.startAngle = -90;


                    	function generateChartData() {
                    	  var chartData = [];
                    	  for (var i = 0; i < types.length; i++) {
                    	    if (i == selected) {
                    	      for (var x = 0; x < types[i].subs.length; x++) {
                    	        chartData.push({
                    	          type: types[i].subs[x].type,
                    	          percent: types[i].subs[x].percent,
                    	          color: types[i].color,
                    	          pulled: true
                    	        });
                    	      }
                    	    } else {
                    	      chartData.push({
                    	        type: types[i].type,
                    	        percent: types[i].percent,
                    	        color: types[i].color,
                    	        id: i
                    	      });
                    	    }
                    	  }
                    	  return chartData;
                    	}

                    	pieSeries.slices.template.events.on("hit", function(event) {
                    	  if (event.target.dataItem.dataContext.id != undefined) {
                    	    selected = event.target.dataItem.dataContext.id;
                    	  } else {
                    	    selected = undefined;
                    	  }
                    	  chart1.data = generateChartData();
                    	});
                  	};
                  	
                  	
                  	$scope.location_wise_charts = function(){
                  		
                  		var chart1 = am4core.create("chart1", am4charts.PieChart);
                  		
                  		//console.log("LOCATION_PIE_CHART",$scope.LOCATION_PIE_CHART);
                    	//Set data
                    	var selected;
                    	var types = $scope.LOCATION_PIE_CHART;

                    	// Add data
                    	chart1.data = generateChartData();
                    	
                    	// Add a legend
                    	//chart1.legend = new am4charts.Legend();

                    	// Add and configure Series
                    	var pieSeries = chart1.series.push(new am4charts.PieSeries());
                    	pieSeries.dataFields.value = "percent";
                    	pieSeries.dataFields.category = "type";
                    	pieSeries.slices.template.propertyFields.fill = "color";
                    	pieSeries.slices.template.propertyFields.isActive = "pulled";
                    	pieSeries.slices.template.strokeWidth = 0;
                    	
                    	// This creates initial animation
	                    	pieSeries.hiddenState.properties.opacity = 1;
	                    	pieSeries.hiddenState.properties.endAngle = -90;
	                    	pieSeries.hiddenState.properties.startAngle = -90;


                    	function generateChartData() {
                    	  var chartData = [];
                    	  for (var i = 0; i < types.length; i++) {
                    	    if (i == selected) {
                    	      for (var x = 0; x < types[i].subs.length; x++) {
                    	        chartData.push({
                    	          type: types[i].subs[x].type,
                    	          percent: types[i].subs[x].percent,
                    	          color: types[i].color,
                    	          pulled: true
                    	        });
                    	      }
                    	    } else {
                    	      chartData.push({
                    	        type: types[i].type,
                    	        percent: types[i].percent,
                    	        color: types[i].color,
                    	        id: i
                    	      });
                    	    }
                    	  }
                    	  return chartData;
                    	}

                    	pieSeries.slices.template.events.on("hit", function(event) {
                    	  if (event.target.dataItem.dataContext.id != undefined) {
                    	    selected = event.target.dataItem.dataContext.id;
                    	  } else {
                    	    selected = undefined;
                    	  }
                    	  chart1.data = generateChartData();
                    	});
                  	};
                  	
                  	
                  	
                	

                  	$scope.render_mainpiechart = function(){
                  		
                  		chart  = am4core.create("chart", am4charts.PieChart);
                  		
                    	// Add data
                    	chart.data = [
		                    	/*{"complainttypes": "Total Complaints","values": $scope.MAINDASHBOARDDETAILS.total},*/ 
		                    	{"complainttypes": "Pending","values": $scope.MAINDASHBOARDDETAILS.pending},
		                    	{"complainttypes": "Resolved","values": $scope.MAINDASHBOARDDETAILS.resolved}, 
		                    	{"complainttypes": "Rejected","values": $scope.MAINDASHBOARDDETAILS.rejected}
                    	];

                    	// Add and configure Series
                    	var pieSeries = chart.series.push(new am4charts.PieSeries());
                    	pieSeries.dataFields.value = "values";
                    	pieSeries.dataFields.category = "complainttypes";
                    	pieSeries.dataFields.color = "color";
                    	pieSeries.slices.template.stroke = am4core.color("#fff");
                    	pieSeries.slices.template.strokeWidth = 2;
                    	pieSeries.slices.template.strokeOpacity = 1;
                    	
                    	pieSeries.colors.list = [
                    	                        /* am4core.color("#33b5e5"),*/
                    	                         am4core.color("#fb3"),
                    	                         am4core.color("#00c851"),
                    	                         am4core.color("#ff5252")
                    	                       ];

                    	// This creates initial animation
                    	pieSeries.hiddenState.properties.opacity = 1;
                    	pieSeries.hiddenState.properties.endAngle = -90;
                    	pieSeries.hiddenState.properties.startAngle = -90;

                    	//pieSeries.ticks.template.disabled = true;
                    	//pieSeries.labels.template.disabled = true;
                    	
                    	pieSeries.slices.template.events.on("hit", function(ev) {
                    		 //console.log("clicked on ", ev.target);
                    		 //console.log("clicked on ", ev.target.dataItem.properties.category);
                    		 //console.log("clicked on ", ev.target.isActive);
                    		 
                    		 $scope.render_submainpiechart(ev.target.isActive,ev.target.dataItem.properties.category);
                    		 
                    		 //$scope.render_locationwise_piechart(ev.target.isActive,ev.target.dataItem.properties.category);
                    		 
                    		 $('#categorywise').prop('checked',true);
                       		 $('#locationwise').prop('checked',false);
                 			 $('#departmentwise').prop('checked',false);
                 			 $('#complaintmodewise').prop('checked',false);
                    		 
                    		}, this);
                    	
                    	$scope.render_submainpiechart(false,'');
                    	//$scope.render_locationwise_piechart(false,'');
                  	};
                  	
                  	$scope.render_piechart_categorywise = function(){
                  		
                  		$scope.render_submainpiechart(false,'');
                  		
                  	}; 
                  	
                  	$scope.render_piechart_locationwise = function(){
                  		
                  		//$scope.render_submainpiechart(false,'');
                  		$scope.render_locationwise_piechart(false,'');
                  		
                  	}; 
                  	
                  	$scope.render_piechart_departmentwise = function(){
                  		
                  		 var chart1 = am4core.create("chart1", am4charts.PieChart);
                  		
                  		 var locationcode = $scope.LOCATION_CODE_PARAM;
                  		 var fromdate = $scope.dashboard.fromdate;
                  		 var todate = $scope.dashboard.todate;
                  		 
                  		 $scope.heading_label = "Department Wise Complaints Breakup";

                  		$scope.DEPARTMENTWISELIST = [];
	                   	$http.get(RSURL+"/query/getdashboarddepartmentwisedetails?" +
	                   			"locationcode="+locationcode+"" +
	                   			"&statusname="+$scope.param_statusname+"" +
	                   			"&fromdate="+fromdate+"" +
	                   			"&todate="+todate)
	  				  		.then(function (data){
	  				  			
	  				  			$scope.DEPARTMENTWISELIST = data.data;
	  				  			
	  				  			var object = [];
	  				  			$scope.DEPARTMENTWISELIST.map(function(e,index){
	  				  				temp = {
	  				  						"departmenttype" : e.department_name,
	  				  						"values" : e.department_count
	  				  				};
	  				  				object.push(temp);
	  				  			});
	  				  			
	  				  			chart1.data = object;

	  	                    	var pieSeries = chart1.series.push(new am4charts.PieSeries());
	  	                    	pieSeries.dataFields.value = "values";
	  	                    	pieSeries.dataFields.category = "departmenttype";
	  	                    	pieSeries.dataFields.color = "color";
	  	                    	pieSeries.slices.template.stroke = am4core.color("#fff");
	  	                    	pieSeries.slices.template.strokeWidth = 2;
	  	                    	pieSeries.slices.template.strokeOpacity = 1;
	  	                    	
	  	                    	// This creates initial animation
	  	                    	pieSeries.hiddenState.properties.opacity = 1;
	  	                    	pieSeries.hiddenState.properties.endAngle = -90;
	  	                    	pieSeries.hiddenState.properties.startAngle = -90;
	  				  		},
	  				  		function(data){
	  				  			
	  				  		});
                  	}; 
                  	
                  	$scope.render_piechart_compliantmodewise = function(){
                  		
                  		 var chart1 = am4core.create("chart1", am4charts.PieChart);
                   		
                  		 var locationcode = $scope.LOCATION_CODE_PARAM;
                  		 var fromdate = $scope.dashboard.fromdate;
                  		 var todate = $scope.dashboard.todate;
                  		 
                  		 $scope.heading_label = "Complaint Mode Wise Complaints Breakup";

                  		$scope.COMPLAINTMODEWISELIST = [];
	                   	$http.get(RSURL+"/query/getdashboardmodewisedetails?" +
	                   			"locationcode="+locationcode+"" +
	                   			"&statusname="+$scope.param_statusname+"" +
	                   			"&fromdate="+fromdate+"" +
	                   			"&todate="+todate)
	  				  		.then(function (data){
	  				  			
	  				  			$scope.COMPLAINTMODEWISELIST = data.data;
	  				  			
	  				  			var object = [];
	  				  			$scope.COMPLAINTMODEWISELIST.map(function(e,index){
	  				  				temp = {
	  				  						"complainttype" : e.mode_name,
	  				  						"values" : e.mode_count
	  				  				};
	  				  				object.push(temp);
	  				  			});
	  				  			
	  				  			chart1.data = object;

	  	                    	var pieSeries = chart1.series.push(new am4charts.PieSeries());
	  	                    	pieSeries.dataFields.value = "values";
	  	                    	pieSeries.dataFields.category = "complainttype";
	  	                    	pieSeries.dataFields.color = "color";
	  	                    	pieSeries.slices.template.stroke = am4core.color("#fff");
	  	                    	pieSeries.slices.template.strokeWidth = 2;
	  	                    	pieSeries.slices.template.strokeOpacity = 1;
	  	                    	
	  	                    	// This creates initial animation
	  	                    	pieSeries.hiddenState.properties.opacity = 1;
	  	                    	pieSeries.hiddenState.properties.endAngle = -90;
	  	                    	pieSeries.hiddenState.properties.startAngle = -90;
	  				  		},
	  				  		function(data){
	  				  		});
                  	}; 
                  	
                  	$scope.openmodalanddisplaychart_c3 = function(type){
                  		
                  		if(type === 1){
                  			$scope.dashboardlisttype = "total";
                  			$scope.modal_heading = "Total Complaints";
                  		}else if(type === 2){
                  			$scope.dashboardlisttype = "pending";
                  			$scope.modal_heading = "Pending Complaints";
                  		}else if(type === 3){
                  			$scope.dashboardlisttype = "resolved";
                  			$scope.modal_heading = "Resolved Complaints";
                  		}else if(type === 4){
                  			$scope.dashboardlisttype = "rejected";
                  			$scope.modal_heading = "Rejected Complaints";
                  		}
                  		
                  		var CATEGORY_OBJ = ['x'];
                  		var TOTAL_OBJ = ["Total"];
                  		var PENDING_OBJ = ["Pending"];
                  		var RESOLVED_OBJ = ["Resolved"];
                  		var CLOSED_OBJ = ["Closed"];
                  		var TOTAL_RESOLVED_OBJ = ["Total Resolved"];
                  		var REJECTED_OBJ = ["Rejected"];
                  		var OPEN_OBJ = ["Open"];
                  		var ASSIGNED_OBJ = ["Assigned"];
                  		var INPROGRESS_OBJ = ["In Progress"];
                  		var REOPENED_OBJ = ["Re Opned"];
                  		var ESCALATED_OBJ = ["Escalated"];
                  		
                  		$scope.DASHBOARDCOMPLAINTLIST.map(function(e,index){
                  			
                  			CATEGORY_OBJ.push(e.monthyear);
                  			TOTAL_OBJ.push(parseInt(e.total));
                  			PENDING_OBJ.push(parseInt(e.pending));
                  			RESOLVED_OBJ.push(parseInt(e.resolved));
                  			CLOSED_OBJ.push(parseInt(e.closed));
                  			TOTAL_RESOLVED_OBJ.push(parseInt(e.resolvedtotal));
                  			REJECTED_OBJ.push(parseInt(e.rejected));
                  			OPEN_OBJ.push(parseInt(e.open));
                  			ASSIGNED_OBJ.push(parseInt(e.assigned));
                  			INPROGRESS_OBJ.push(parseInt(e.inprogress));
                  			REOPENED_OBJ.push(parseInt(e.reopened));
                  			ESCALATED_OBJ.push(parseInt(e.escalated));
                  			
                  		});
                  		
                        var chart_dashboardlist = c3.generate({
                            bindto: '#chart_dashboardlist',
                            data: {
                                x: 'x',
                                columns: [],
                                type: 'bar',
                            },
                            legend: {
                                position: 'right'
                            },
                            zoom: {
                                enabled: true
                            },
            				tooltip : {
            					grouped : true
            				},
                            axis: {
                                x: {
                                    type: 'category',
                                    tick: {
                                        rotate: 75,
                                        multiline: false
                                    },
                                    height: 130
                                }
                            },
                            grid: {
                                y: {
                                    lines: [{value: 0}]
                                }
                            }
                        });
                  		
                  		
                  		if($scope.dashboardlisttype === "total"){
                  			
                  			$timeout(function () {
                  				chart_dashboardlist.load({
                  			        columns: [CATEGORY_OBJ,  TOTAL_OBJ ,PENDING_OBJ, TOTAL_RESOLVED_OBJ ,REJECTED_OBJ]
                  			    });
                  			}, 200);
                  			
                  		}else if($scope.dashboardlisttype === "pending"){
                  			$timeout(function () {
                  				chart_dashboardlist.load({
                  			        columns: [CATEGORY_OBJ,  PENDING_OBJ, OPEN_OBJ ,ASSIGNED_OBJ,INPROGRESS_OBJ, REOPENED_OBJ ,ESCALATED_OBJ]
                  			    });
                  			}, 200);
                  			
                  			
                  		}else if($scope.dashboardlisttype === "resolved"){
                  			$timeout(function () {
                  				chart_dashboardlist.load({
                  			        columns: [CATEGORY_OBJ,  RESOLVED_OBJ, CLOSED_OBJ ,TOTAL_RESOLVED_OBJ]
                  			    });
                  			}, 200);
                  			
                  		}else if($scope.dashboardlisttype === "rejected"){
                  			$timeout(function () {
                  				chart_dashboardlist.load({
                  			        columns: [CATEGORY_OBJ,  REJECTED_OBJ]
                  			    });
                  			}, 200);
                  		}
                  		
                  		
                  	
                  		
                  		$('#dashboarddetaillist').modal('toggle');
                  		
                  	};
                  	
                  	$scope.openmodalanddisplaychart = function(){
                  		
                  		var OBJECT = [];
                  		var LABELS = [];
                  		
                  		if($scope.dashboardlisttype === "total"){
                  			
                  			$scope.DASHBOARDCOMPLAINTLIST.map(function(e,index){
                      			var obj = {
                      					category : e.monthyear,
                      					value1 : e.pending,
                      					value2 : e.resolvedtotal,
                      					value3 : e.rejected,
                      					count : 3
                      			};
                      			OBJECT.push(obj);
                      		});
                  			
                  			LABELS = ["Pending","Resolved","Rejected"];
                  			
                  		}else if($scope.dashboardlisttype === "pending"){
                  			
                  			$scope.DASHBOARDCOMPLAINTLIST.map(function(e,index){
                      			var obj = {
                      					category : e.monthyear,
                      					value1 : e.pending,
                      					value2 : e.open,
                      					value3 : e.assigned,
                      					value4 : e.inprogress,
                      					value5 : e.reopened,
                      					value6 : e.escalated,
                      					count : 6
                      			};
                      			OBJECT.push(obj);
                      		});
                  			
                  			LABELS = ["Pending","Open","Assigned","In-Progress","Re-Opened","Escalated"];
                  			
                  		}else if($scope.dashboardlisttype === "resolved"){
                  			
                  			$scope.DASHBOARDCOMPLAINTLIST.map(function(e,index){
                      			var obj = {
                      					category : e.monthyear,
                      					value1 : e.resolved,
                      					value2 : e.closed,
                      					value3 : e.resolvedtotal,
                      					count : 3
                      			};
                      			OBJECT.push(obj);
                      		});
                  			
                  			LABELS = ["Resolved","Closed","Total Resolved"];
                  			
                  		}else if($scope.dashboardlisttype === "rejected"){
                  			$scope.DASHBOARDCOMPLAINTLIST.map(function(e,index){
                      			var obj = {
                      					category : e.monthyear,
                      					value1 : e.rejected,
                      					count : 1
                      			};
                      			OBJECT.push(obj);
                      		});
                  			
                  			LABELS = ["Rejected"];
                  		}
                  		
                  		
                  	// Create chart instance
                  		var chart_dashboardlist = am4core.create("chart_dashboardlist", am4charts.XYChart);

                  		chart_dashboardlist.hiddenState.properties.opacity = 0; // this creates initial fade-in

                  		chart_dashboardlist.data = OBJECT;

                  		chart_dashboardlist.colors.step = 2;
                  		chart_dashboardlist.padding(30, 30, 10, 30);
                  		chart_dashboardlist.legend = new am4charts.Legend();

                  		var categoryAxis = chart_dashboardlist.xAxes.push(new am4charts.CategoryAxis());
                  		categoryAxis.dataFields.category = "category";
                  		categoryAxis.renderer.grid.template.location = 0;

                  		var valueAxis = chart_dashboardlist.yAxes.push(new am4charts.ValueAxis());
                  		valueAxis.min = 0;
                  		valueAxis.max = 700;
                  		valueAxis.strictMinMax = true;
                  		valueAxis.calculateTotals = true;
                  		valueAxis.renderer.minWidth = 50;

                  		for(var i = 0; i < OBJECT[0].count; i++){
                  			
                  			//console.log("valuename"+(i+1));
                  			var series1 = chart_dashboardlist.series.push(new am4charts.ColumnSeries());
                      		series1.columns.template.width = am4core.percent(80);
                      		series1.columns.template.tooltipText =
                      		  "{name}: {valueY}";
                      		series1.name = LABELS[i];
                      		series1.dataFields.categoryX = "category";
                      		series1.dataFields.valueY = "value"+(i+1);
                      		series1.dataFields.valueYShow = "totalPercent";
                      		series1.dataItems.template.locations.categoryX = 0.5;
                      		series1.stacked = true;
                      		series1.tooltip.pointerOrientation = "vertical";
                      		
                      		var bullet1 = series1.bullets.push(new am4charts.LabelBullet());
                      		bullet1.label.text = "{valueY}";
                      		bullet1.label.fill = am4core.color("#ffffff");
                      		//bullet1.locationY = 0.5;
                  			
                  			
                  		}
                  		chart_dashboardlist.scrollbarX = new am4core.Scrollbar();
                  	};
                  	
                  	$scope.render_comparision_chart = function(){
                  		
                  		 var locationcode = $scope.LOCATION_CODE_PARAM;
                  		 var fromdate = $scope.dashboard.fromdate;
                  		 var todate = $scope.dashboard.todate;
                  		 
                    	$scope.COMPARISIONDATALIST = [];
                    	 $http.get(RSURL+"/query/getcomparisoindata?" +
	                   			"locationcode="+locationcode+"" +
               					"&category=" +
               					"&year=" +
	                   			"&fromdate="+fromdate+"" +
	                   			"&todate="+todate)
   				  		.then(function (data){
   				    		  $scope.COMPARISIONDATALIST = data.data;
   				    		
   				    		  
   				    		  var tmp = $scope.COMPARISIONDATALIST[0].yr;
   				    		  var YEARS = [$scope.COMPARISIONDATALIST[0].yr];
   				    		  
   				    		$scope.COMPARISIONDATALIST.map(function(e,index){
   				    			if(tmp != e.yr){
   				    				YEARS.push(e.yr);
   				    				tmp = e.yr;
   				    			}
   				    		});
   				    		
   				    		var OBJECT = new Array(YEARS.length);
   				    		var MONTHS = [];
   				    		for(var i = 0; i < YEARS.length; i++){
   				    			
   				    			OBJECT[i] = [];
   				    			OBJECT[i].push(YEARS[i]);
   				    			$scope.COMPARISIONDATALIST.map(function(e,index){
   	   				    			if(i === 0 && YEARS[i] === e.yr){
   	   				    				MONTHS.push(e.month);
   	   				    			}
   				    				if(YEARS[i] === e.yr){
   				    					OBJECT[i].push(parseInt(e.month_year_count));
   	   				    			}
   				    				
   	   				    		});
   				    		}
   				    		
   				    		//console.log("OBJECT",OBJECT);
   				    		//console.log("MONTHS",MONTHS);
   				    		  
   				    		  
   				    		var chart_compare = c3.generate({
                     			 bindto: '#chart_compare',
                     			data: {
                                    columns: [],
                                    type: 'spline',
                                },
                                axis: {
                                    x: {
                                    type: 'category',
                                    categories:MONTHS,
                                      tick: {
                                        rotate: 0,
                                        format: '%b%Y'
                                      }
                                    }
                                  }
                     		});
   				    		
   				    		$timeout(function () {
   				    			for(var i = 0 ; i < OBJECT.length; i++){
   				    				chart_compare.load({
   	                  			        columns: [OBJECT[i]]
   	                  			    });
   				    			}
                  			}, 200);
   				    		
   				    	   },function (data){
   				    	   });
                  		
                  		
                  		
                  	};
                  	
                  	
                  	$scope.render_resolutionstatus_chart = function(){
                  		
                  		 var locationcode = $scope.LOCATION_CODE_PARAM;
                  		 var fromdate = $scope.dashboard.fromdate;
                  		 var todate = $scope.dashboard.todate;
                		 
                  	$scope.RESOLUTIONSUMMARYLIST = [];
                  	 $http.get(RSURL+"/query/getdashboard_resolution_status_summary?" +
	                   			"locationcode="+locationcode)
 				  		.then(function (data){
 				    		  $scope.RESOLUTIONSUMMARYLIST = data.data;
 				    		  $scope.makeresolutionobjects();
 				    	   },function (data){
 				    	   });
                	};
                	
                	
                 	$scope.makeresolutionobjects = function(){
                 		
                 		var RESOLUTION_LOCATION_OBJ = [];
                 		var RESOLUTION_DEPARTMENT_OBJ = [];
                 		
                 		$scope.RESOLUTION_LOCATIONS = [];
                 		
                 		RESOLUTION_LOCATION_OBJ = $filter('filter')($scope.RESOLUTIONSUMMARYLIST, {group_type:'LOCATION'},true);
                 		RESOLUTION_DEPARTMENT_OBJ = $filter('filter')($scope.RESOLUTIONSUMMARYLIST, {group_type:'DEPARTMENT'},true);
                 		
                 		var tmp = RESOLUTION_LOCATION_OBJ[0].group_code;
                 		var temp_obj = {
                 				group_code : RESOLUTION_LOCATION_OBJ[0].group_code,
                 				group_name : RESOLUTION_LOCATION_OBJ[0].group_name,
                 		};
                 		$scope.RESOLUTION_LOCATIONS.push(temp_obj);
				    		  
                 		RESOLUTION_LOCATION_OBJ.map(function(e,index){
			    			if(tmp != e.group_code){
			    				temp_obj = {
			    						group_code : e.group_code,
		                 				group_name : e.group_name,
		                 		};
			    				$scope.RESOLUTION_LOCATIONS.push(temp_obj);
			    				tmp = e.group_code;
			    			}
			    		});
                 		
                 		for(var i = 0; i < $scope.RESOLUTION_LOCATIONS.length; i++){
                 			
                 			var DATES = ['x'];
                 			var CHART_DATA_RECEIVED = ['Received'];
                 			var CHART_DATA_RESOLVED = ['Resolved'];
                 			
                 			RESOLUTION_LOCATION_OBJ.map(function(e,index){
                 				if(e.group_code === $scope.RESOLUTION_LOCATIONS[i].group_code){
                 					DATES.push(e.group_date);
                 					CHART_DATA_RECEIVED.push(parseInt(e.received));
                 					CHART_DATA_RESOLVED.push(parseInt(e.resolved));
                 				}
                 			});
                 			$scope.drawlinecharts(DATES,CHART_DATA_RECEIVED,CHART_DATA_RESOLVED,$scope.RESOLUTION_LOCATIONS[i].group_code);
                 		}
                 		
                 	};
                 	
                 	$scope.drawlinecharts = function(DATES,CHART_DATA_RECEIVED,CHART_DATA_RESOLVED,idx){
                 		
                 		console.log(DATES);
                 		console.log(CHART_DATA_RECEIVED);
                 		console.log(CHART_DATA_RESOLVED);
                 		
                 		$timeout(function(){
                 			
                            var chart_dashboardlist = c3.generate({
                                bindto: '#resolutionstatus_chart'+idx,
                                data: {
                                    x: 'x',
                                    columns: [DATES,CHART_DATA_RECEIVED,CHART_DATA_RESOLVED],
                                    type: 'line',
                                },
                                zoom: {
                                    enabled: true
                                },
                				tooltip : {
                					grouped : true
                				},
                                axis: {
                                   /* x: {
                                        type: 'category',
                                        tick: {
                                            rotate: 75,
                                            multiline: false
                                        },
                                        height: 130
                                    }*/
                                	 x: {
                                         type: 'category',
                                         tick: {
                                             count:10,
                                             multiline: false
                                         }
                                     },
                      		        y: {					
                     		        	min:0,
                                        label: { // ADD
                                          text: 'Number Of Pending Complaints',
                                          position: 'outer-middle'
                                        }
                     		        }
                                },
                                grid: {
                                    y: {
                                        lines: [{value: 0}]
                                    }
                                }
                            });
                 		
                 		},200);
                 	};
                  	
                  	$scope.render_agewisesummary_chart = function(){
                  		
                  		 var locationcode = $scope.LOCATION_CODE_PARAM;
                  		 var fromdate = $scope.dashboard.fromdate;
                  		 var todate = $scope.dashboard.todate;
                 		 
                   	$scope.AGEWISESUMMARYLIST = [];
                   	 $http.get(RSURL+"/query/getdashboard_agewise_summary?" +
	                   			"locationcode="+locationcode)
  				  		.then(function (data){
  				    		  $scope.AGEWISESUMMARYLIST = data.data;
  				    		  $scope.makeagewiseobjects();
  				    	   },function (data){
  				    	   });
                 	};
                 	
                 	$scope.makeagewiseobjects = function(){
                 		
                 		var AGEWISE_CATEGORY_OBJ = [];
                 		var AGEWISE_DEPARTMENT_OBJ = [];
                 		
                 		$scope.AGEWISE_LOCATIONS = [];
                 		
                 		AGEWISE_CATEGORY_OBJ = $filter('filter')($scope.AGEWISESUMMARYLIST, {group_type:'CATEGORY'},true);
                 		AGEWISE_DEPARTMENT_OBJ = $filter('filter')($scope.AGEWISESUMMARYLIST, {group_type:'DEPARTMENT'},true);
                 		
                 		var tmp = AGEWISE_CATEGORY_OBJ[0].location_code;
                 		var temp_obj = {
                 				location_code : AGEWISE_CATEGORY_OBJ[0].location_code,
                 				location_name : AGEWISE_CATEGORY_OBJ[0].location_name,
                 		};
                 			
                 		$scope.AGEWISE_LOCATIONS.push(temp_obj);
                 		//$scope.AGEWISE_LOCATIONS = [AGEWISE_CATEGORY_OBJ[0].location_code];
				    		  
                 		AGEWISE_CATEGORY_OBJ.map(function(e,index){
			    			if(tmp != e.location_code){
			    				temp_obj = {
		                 				location_code : e.location_code,
		                 				location_name : e.location_name,
		                 		};
			    				$scope.AGEWISE_LOCATIONS.push(temp_obj);
			    				//$scope.AGEWISE_LOCATIONS.push(e.location_code);
			    				tmp = e.location_code;
			    			}
			    		});
                 		
                 		//console.log($scope.AGEWISE_LOCATIONS);
                 		//console.log(AGEWISE_CATEGORY_OBJ);
                 		//console.log(AGEWISE_DEPARTMENT_OBJ);
                 		
                 		
                 		var group_type    = [];
                 		var category_name = [];
                 		for(var i = 0; i < $scope.AGEWISE_LOCATIONS.length; i++){
                 			
                 			var lessthaneight = [];
                     		var eighttothirty = [];
                     		var thirtyabove   = [];
                     		
                     		var record = 0 ;
                 			AGEWISE_CATEGORY_OBJ.map(function(e,index){
                 				
                 				
                 				if(e.location_code === $scope.AGEWISE_LOCATIONS[i].location_code){
                 					
                 					var temp = [];
                 					
                 					temp = [e.category_name,parseInt(e.lessthaneight)];
                 					lessthaneight.push(temp);
                 					
                 					temp = [e.category_name,parseInt(e.eighttothirty)];
                 					eighttothirty.push(temp);
                 					
                 					temp = [e.category_name,parseInt(e.thirtyabove)];
                 					thirtyabove.push(temp);
                 					
                 				}
                 				
                 			});
                 			
                 			$scope.drawpiecharts(lessthaneight,eighttothirty,thirtyabove,$scope.AGEWISE_LOCATIONS[i].location_code);
                 		}
                 	};
                 	
                 	$scope.drawpiecharts = function(lessthaneight,eighttothirty,thirtyabove,idx){
                 		
                 		$timeout(function(){
                 			
                 		var chart1 = c3.generate({
                 			bindto:"#lessthaneight"+idx,
                 		    data: {
                 		        // iris data from R
                 		        columns: [],
                 		        type : 'pie'
                 		    },
                            legend: {
                                position: 'right'
                            }
                 		});
                 		
                 		var chart2 = c3.generate({
                 			bindto:"#eighttothirty"+idx,
                 		    data: {
                 		        // iris data from R
                 		        columns: [],
                 		        type : 'pie'
                 		    },
                            legend: {
                                position: 'right'
                            }
                 		});
                 		
                 		var chart3 = c3.generate({
                 			bindto:"#thirtyabove"+idx,
                 		    data: {
                 		        // iris data from R
                 		        columns: [],
                 		        type : 'pie'
                 		    },
                            legend: {
                                position: 'right'
                            }
                 		});
                 		
                 		$timeout(function(){
                 			for(var i = 0 ; i < lessthaneight.length; i++){
             					chart1.load({
	                  			        columns: [lessthaneight[i]]
	                  			    });
				    			}
                 		},100);
                 		
                 		$timeout(function(){
                 			for(var i = 0 ; i < eighttothirty.length; i++){
             					chart2.load({
	                  			        columns: [eighttothirty[i]]
	                  			    });
				    			}
                 		},100);
                 		
                 		$timeout(function(){
                 			for(var i = 0 ; i < thirtyabove.length; i++){
             					chart3.load({
	                  			        columns: [thirtyabove[i]]
	                  			    });
				    			}
                 		},100);
                 		
                 		},200);
                 	};
                 	
                  	$scope.getdashboard_locationwise_complients_summary = function(){
                  		
                  		 var locationcode = $scope.LOCATION_CODE_PARAM;
                  		 var fromdate = $scope.dashboard.fromdate;
                  		 var todate = $scope.dashboard.todate;
                		 var year = "2018";
                		 
                  	$scope.LOCATIONSCOMPLAINTSSUMMARY = [];
                  	 $http.get(RSURL+"/query/getdashboard_locationwise_complients_summary?" +
	                   			"locationcode="+locationcode+"&year="+year)
 				  		.then(function (data){
 				    		  
 				  				$scope.LOCATIONSCOMPLAINTSSUMMARY = data.data;
 				  				
 				  				$scope.LOCATIONSCOMPLAINTSSUMMARY_NEW = [];
 				    		  
 				  				var COLORS = ["#ea8703","#4b134f","#f94f62","#f0ad4e","#337ab7","#5cb85c","#81911e","#1f4037","#d9534f","#6D6027","#CB356B"];
 				  				
 				  				
 				  				var record = 0 ;
 				  				$scope.LOCATIONSCOMPLAINTSSUMMARY.map(function(e,index){
 				  					
 				  					var obj = {
			  							"location_code": e.location_code,
			  						    "location_name": e.location_name,
			  						    "total": e.total,
			  						    "pending": e.pending,
			  						    "resolved": e.resolved,
			  						    "color" : COLORS[index]
 				  					};
 				  					
 				  					$scope.LOCATIONSCOMPLAINTSSUMMARY_NEW.push(obj);
 				  					
 				  					if(index === COLORS.length){
 				  						record = 0;
 				  					}else{
 				  						record++;
 				  					}
 				  					
 				  					
 				  					
 				  				});
 				    		  
 				    	   },function (data){
 				    	   });
                	};
                	
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
				    			  $scope.dashboard.zone =  $filter('filter')($scope.ZONELIST,{ld_code:$rootScope.GLOBAL_LOCATION_CODE.substring(0,2)},true)[0];
				    			  $scope.getcirclelist();
			                	}
				    	   },function (data){
				    	   });
                  	 }
                  	
                  	$scope.getcirclelist = function(){
                  		$scope.CIRCLELIST = [];
                      	$scope.DIVISIONLIST = [];
                  		if($scope.dashboard.zone != undefined || $scope.dashboard.zone != null){
                  			$http.get(RSURL+"/query/getcirclelist?locationcode="+$scope.dashboard.zone.ld_code)
    				  		.then(function (data){
    				    		  $scope.CIRCLELIST = data.data;
    				    		  if(!$rootScope.CIRCLE_USER){
    				    			  $scope.dashboard.circle =  $filter('filter')($scope.CIRCLELIST,{ld_code:$rootScope.GLOBAL_LOCATION_CODE.substring(0,3)},true)[0];
    				    			  $scope.getdivisionlist();
    			                	}
    				    	   },function (data){
    				    	   });
                  		}
                  	 }
                  	
                  	$scope.getdivisionlist = function(){
                  		$scope.DIVISIONLIST = [];
                      	$scope.SUBDIVISIONLIST = [];
                  		if($scope.dashboard.circle != undefined || $scope.dashboard.circle != null){
                  			$http.get(RSURL+"/query/getdivisionlist?locationcode="+$scope.dashboard.circle.ld_code)
    				  		.then(function (data){
    				    		  $scope.DIVISIONLIST = data.data;
    				    		  
    				    		  if(!$rootScope.DIVISION_USER){
    				    			  $scope.dashboard.division =  $filter('filter')($scope.DIVISIONLIST,{ld_code:$rootScope.GLOBAL_LOCATION_CODE.substring(0,5)},true)[0];
    				    			  $scope.getsubdivisionlist();
    			                	}
    				    	   },function (data){
    				    	   });
                  		}
                  	 }
                  	
                  	$scope.getsubdivisionlist = function(){
                  		$scope.SUBDIVISIONLIST = [];
                      	$scope.OMSECTIONLIST = [];
                  		if($scope.dashboard.division != undefined || $scope.dashboard.division != null){
                  			$http.get(RSURL+"/query/getsubdivisionlistbydivision?locationcode="+$scope.dashboard.division.ld_code)
    				  		.then(function (data){
    				    		  $scope.SUBDIVISIONLIST = data.data;
    				    		  
    				    		  if(!$rootScope.SUBDIVISION_USER){
    				    			  $scope.dashboard.subdivision =  $filter('filter')($scope.SUBDIVISIONLIST,{ld_code:$rootScope.GLOBAL_LOCATION_CODE.substring(0,7)},true)[0];
    				    			  $scope.getomsectionlist();
    			                	}
    				    	   },function (data){
    				    	   });
                  		}
                  	 }
                  	
                  	$scope.getomsectionlist = function(){
                  		$scope.OMSECTIONLIST = [];
                  		if($scope.dashboard.subdivision != undefined || $scope.dashboard.subdivision != null){
                  			$http.get(RSURL+"/query/getomsectionlist?locationcode="+$scope.dashboard.subdivision.ld_code)
    				  		.then(function (data){
    				    		  $scope.OMSECTIONLIST = data.data;
    				    			  $scope.dashboard.omsection =  $filter('filter')($scope.OMSECTIONLIST,{ld_code:$rootScope.GLOBAL_LOCATION_CODE.substring(0,9)},true)[0];
    				    	   },function (data){
    				    	   });
                  		}
                  	 }
                  	
                  	$scope.resetpage = function(){
                  		
                  	}
                  	
                  	$scope.applyfilter = function(){
                  		
                  		$scope.LOCATION_CODE_PARAM = $rootScope.COMPANYCODE;
                  		
                  		if($scope.dashboard.zone != undefined || $scope.dashboard.zone != null){
                  			$scope.LOCATION_CODE_PARAM = $scope.dashboard.zone.ld_code;
                  		}
                  		if($scope.dashboard.circle != undefined || $scope.dashboard.circle != null){
                  			$scope.LOCATION_CODE_PARAM = $scope.dashboard.circle.ld_code;
                  		}
                  		if($scope.dashboard.division != undefined || $scope.dashboard.division != null){
                  			$scope.LOCATION_CODE_PARAM = $scope.dashboard.division.ld_code;
                  		}
                  		if($scope.dashboard.subdivision != undefined || $scope.dashboard.subdivision != null){
                  			$scope.LOCATION_CODE_PARAM = $scope.dashboard.subdivision.ld_code;
                  		}
                  		if($scope.dashboard.omsection != undefined || $scope.dashboard.omsection != null){
                  			$scope.LOCATION_CODE_PARAM = $scope.dashboard.omsection.ld_code;
                  		}
                  		
                  		$scope.getmaindashboarddetails();
                      	$scope.getdahboardcomplaintlist();
                      	$scope.render_comparision_chart();
                      	$scope.render_agewisesummary_chart();
                      	$scope.render_resolutionstatus_chart();
                      	$scope.getdashboard_locationwise_complients_summary();
                  		
                  	};
                  	
                  	$scope.getzonelist();
                  	
                  	$scope.applyfilter();
                  	
                });

