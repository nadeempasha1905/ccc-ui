(function () {

  angular.module('ngC3Export.config', [])
    .value('ngC3Export.config', {
      debug: true
    });

  angular.module('ngC3Export',
    [
      'ngC3Export.config'
    ]);

})(angular);

(function () {
  'use strict';

  exportChartDirective.$inject = ["ExportService"];
  angular
    .module('ngC3Export')
    .directive('exportChart', exportChartDirective);

  /** @ngInject */
  function exportChartDirective(ExportService) {
    return {
      restrict: 'A',
      priority: 1,
      controller: ["$scope", function ($scope) {
        $scope.config = {
          exportedFileName: "c3 chart",
          backgroundColor : "#FFF",
          removeDefs: true
        };
      }],
      link: {
        post: function postLink(scope, element, attrs) {

          var linkEl = angular.element('<div class="exporter"><a class="savePNG"><i class="fa fa-download"></i></a></div>');
          
          console.log("attrs",attrs);
          console.log("scope",scope);
          console.log("element",element);
          console.log("element[0].id",element[0].id);
          //alert("hi");

          if (attrs.exportedFileName) {
            scope.config.exportedFileName = attrs.exportedFileName;
          }

          if(!attrs.backgroundColor){
           /* scope.config.backgroundColor = attrs.backgroundColor;*/
        	  scope.config.backgroundColor = "#FFF";
          }

          if(attrs.removeDefs){
            scope.config.removeDefs = attrs.removeDefs ==='true';
          }

          element.prepend(linkEl);
          
          /*ExportService.createChartImages(element, scope.config,scope);*/
          
          linkEl.on('click', function () {
            ExportService.createChartImages(element, scope.config,scope);
          });
          
          /*linkEl.on('load', function () {
              ExportService.createChartImages(element, scope.config);
            });*/
        }
      }
    };
  }

})();


(function () {
  'use strict';

  angular
    .module('ngC3Export')
    .factory('ExportService', ["StyleFactory", function (StyleFactory) {
      return {
        createChartImages: createChartImages
      };

      function createChartImages (element,config,scope) {
          var chartEl = $(element);

          var svgEl = $(element.find('svg')).first()[0];
          var svgCopyEl = angular.element(svgEl.outerHTML)[0];
          var canvasEl = angular.element('<canvas id="canvasOriginal"></canvas>')[0];
          var emptySvgEl = angular.element('<svg id="emptysvg" xmlns="http://www.w3.org/2000/svg" version="1.1" height="2" />')[0];
          var emptyCanvasEl = angular.element('<canvas id="canvasComputed"></canvas>')[0];

          if(config.removeDefs) {
            $(svgCopyEl).find('defs').remove();
          }

          canvasEl.width = chartEl.width();
          emptyCanvasEl.width = chartEl.width();
          canvasEl.height = chartEl.height();
          emptyCanvasEl.height = chartEl.height();

          var container = angular.element('<div style="display: none;" class="c3"></div>');
          element.append(container);
          container.append(canvasEl);
          container.append(emptyCanvasEl);
          container.append(emptySvgEl);
          container.append(svgCopyEl);

          exportSvgToCanvas(svgCopyEl, canvasEl);

          var canvasComputed = StyleFactory.exportStyles(canvasEl, emptyCanvasEl, svgCopyEl, emptySvgEl);

          exportSvgToCanvas(svgCopyEl, canvasComputed);

          exportCanvasToPng(chartEl.find('.savePNG'), canvasComputed, config.exportedFileName,element[0].id,scope);

          canvasEl.remove();
          emptyCanvasEl.remove();
          emptySvgEl.remove();
          svgCopyEl.remove();
        }

      function exportSvgToCanvas(svg, canvas) {
        canvg(canvas, new XMLSerializer().serializeToString(svg));
      }

      function exportCanvasToPng(linkEl,canvasEl, filename,element_id,scope) {
    	  
    	  console.log(canvasEl.toDataURL('png'));
        //  $scope.imagedata_new = canvasEl.toDataURL('png') ;
    	  
    	  var chart_image_dataurl = {
    		"image_id" : element_id,
    		"image_data" : canvasEl.toDataURL('png')
    	  };
    	  
    	  scope.chartImages_nadeem.push(chart_image_dataurl);
          
        linkEl.attr('href', canvasEl.toDataURL('png'))
          .attr('download', function () {
            return filename + '.png';
          });
        
       
        
      }

      function exportCanvasToImage(canvasComputed) {
        Canvas2Image.saveAsPNG(canvasComputed);
      }
    }]);
})();

(function () {
  'use strict';

  angular
    .module('ngC3Export')
    .factory('StyleFactory', function () {
      return {
        exportStyles: function (canvasOriginal, canvasComputed, svg, emptySvg) {
          var tree = [];
          var emptySvgDeclarationComputed = getComputedStyle(emptySvg);
          var allElements = traverse(svg, tree);
          var i = allElements.length;

          while (i--) {
            explicitlySetStyle(allElements[i],emptySvgDeclarationComputed);
          }

          return canvasComputed;
        }
      };

      function traverse(obj, tree) {
        tree.push(obj);
        if (obj.hasChildNodes()) {
          var child = obj.firstChild;
          while (child) {
            if (child.nodeType === 1 && child.nodeName != 'SCRIPT') {
              traverse(child, tree);
            }
            child = child.nextSibling;
          }
        }
        return tree;
      }

      function explicitlySetStyle(element, emptySvgDeclarationComputed) {
        var cSSStyleDeclarationComputed = getComputedStyle(element);
        var i, len, key, value;
        var computedStyleStr = "";
        for (i = 0, len = cSSStyleDeclarationComputed.length; i < len; i++) {
          key = cSSStyleDeclarationComputed[i];
          value = cSSStyleDeclarationComputed.getPropertyValue(key);
          if (value !== emptySvgDeclarationComputed.getPropertyValue(key)) {
            if (key == 'visibility' && value == 'hidden') {
              computedStyleStr += 'display: none;';
            } else {
              computedStyleStr += key + ":" + value + ";";
            }
          }
        }
        element.setAttribute('style', computedStyleStr);
      }
    });
})();
