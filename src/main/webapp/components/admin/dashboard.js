angular
        .module('CCCapp.Controllers', [])
        .controller(
                "dashboardCtrl",
                function ($scope, $rootScope, $http, $filter, $compile, $state,           
                $cookies, $httpParamSerializer, jwtHelper, $window,
                        RSURL,$controller, $timeout, $window,store,ngToast,authService,$q) {
                	
                	console.log("Dashboard Page initiated !!!");
                	$scope.heading = "Dashboard Page";
                	
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
                  	$scope.getdahboardcomplaintlist = function(type)
                    {
                  		if(type === 1){
                  			$scope.dashboardlisttype = "total";
                  		}else if(type === 2){
                  			$scope.dashboardlisttype = "pending";
                  		}else if(type === 3){
                  			$scope.dashboardlisttype = "resolved";
                  		}else if(type === 4){
                  			$scope.dashboardlisttype = "rejected";
                  		}
                  		
                  		 var locationcode = "2";
                  		 var fromdate = '01/01/2017';
                  		 var todate = '30/11/2018';
                  		 
                    	$scope.DASHBOARDCOMPLAINTLIST = [];
                    	 $http.get(RSURL+"/query/getdahboardcomplaintlist?" +
	                   			"locationcode="+locationcode+"" +
	                   			"&fromdate="+fromdate+"" +
	                   			"&todate="+todate)
   				  		.then(function (data){
   				    		 // console.log(data);	
   				    		  $scope.DASHBOARDCOMPLAINTLIST = data.data;
   				    		
   				    		 $('#dashboarddetaillist').modal('toggle');
   				    		 
   				    		 $timeout(function(){
   				    			 $scope.openmodalanddisplaychart();
   				    		 },500);
   				    		  
   				    	   },function (data){
   				    	   });
                    }
                  	
                  	$scope.param_statusname = "";
                  	$scope.render_submainpiechart = function(pie_slice_clicked,filter_type){
                  		
                  		chart1.data = null;
                  		
                  		 var locationcode = "2";
                  		 var fromdate = '01/01/2017';
                  		 var todate = '30/11/2018';
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
                  		
                  		 var locationcode = "212";
                  		 var fromdate = '01/01/2017';
                  		 var todate = '30/11/2018';
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
                  		
                 		 var locationcode = "2";
                  		 var fromdate = '01/01/2017';
                  		 var todate = '30/11/2018';
                  		 
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
                   		
                 		 var locationcode = "2";
                  		 var fromdate = '01/01/2017';
                  		 var todate = '30/11/2018';
                  		 
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
                  	$scope.getmaindashboarddetails();
                	
                });

