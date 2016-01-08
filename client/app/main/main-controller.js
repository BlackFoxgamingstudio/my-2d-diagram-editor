(function() {

  'use strict';

  /*
   * Reference the App Module to attach a controller
   *
   * Dependency Injection Syntax and AngularJS
   * The notation that we have used is one of the two ways in which we can declare AngularJS controllers
   * (or services, directives, or filters). The style we have used, which is also the recommended way,
   * is the safe-style of Dependency Injection, or declaration.
   */

  angular.module('my-2d-diagram-editor')
    .controller('MainController', ['$log', '$scope', 'Fabric', 'FabricConstants', 'Keypress',
      function($log, $scope, Fabric, FabricConstants, Keypress) {

        $log.info('MainController');

        $scope.fabric = {};
        // $scope.FabricConstants = FabricConstants;

        $scope.init = function () {

          $scope.fabric = new Fabric({
            JSONExportProperties: FabricConstants.JSONExportProperties,
            shapeDefaults: FabricConstants.shapeDefaults,
            rectDefaults: FabricConstants.rectDefaults,
            textDefaults: FabricConstants.textDefaults,
            json: {}
          });

          var grid = 50;
          var width = 600;
          var height = 600;

          // Why did we start x and y at 0.5? Why not 0?
          // See: http://diveintohtml5.info/canvas.html

          // draw the Vertical lines
          for (var x = 0.5; x < width; x += grid) {
            $scope.fabric.addLine([ x, 0.5, x, width], { stroke: '#ccc', selectable: false });
          }

          // draw the Horizontal lines
          for (var y = 0.5; y < height; y += grid) {
            $scope.fabric.addLine([ 0.5, y, height, y], { stroke: '#ccc', selectable: false });
          }

          $scope.fabric.deselectActiveObject();
        };

        $scope.$on('canvas:created', $scope.init);

        var containerTextDefaults = FabricConstants.textDefaults;
        containerTextDefaults.fontSize = 20;
        containerTextDefaults.fontWeight = 'bold';

        var containerRectDefaults = FabricConstants.rectDefaults;

        $scope.newContainer = function(label, fill) {

          $log.info('MainController.newContainer()');

          label = label || 'New Container';
          fill = fill || '#cacaca';

          containerRectDefaults.fill = fill;

          $scope.fabric.addRect(containerRectDefaults);
          $scope.fabric.addText(label, containerTextDefaults);
        };

        $scope.fileNew = function() {
          $log.info('MainController.fileNew()');
        };

        $scope.editDelete = function() {
          $log.info('MainController.editDelete()');
          $scope.fabric.deleteActiveObject();
        };

      }]);
})();

/*

 var grid = 100;
 var verticalY1= 1;
 var horizontalX1 = 1;

 for (var i = 0; i < (600 / grid); i++) {
 // draw the Vertical grid lines
 $scope.fabric.addLine([ i * grid, verticalY1, i * grid, 600], { stroke: '#ccc', selectable: false });
 // draw the Horizontal grid lines
 $scope.fabric.addLine([ horizontalX1, i * grid, 600, i * grid], { stroke: '#ccc', selectable: false });
 }


 // containerTextDefaults.left = 0;
 // containerTextDefaults.top = 0;
 // containerTextDefaults.fontFamily = 'Tahoma';

 $scope.fabric.addText('Controlled Zone');
 $scope.fabric.setFontFamily('Tahoma');
 $scope.fabric.setFontSize(20);
 $scope.fabric.toggleBold();

 $scope.fabric.addLine([ 50, 25, 50, 550], { stroke: '#ccc', selectable: false });
 $scope.fabric.addLine([ 100, 25, 100, 550], { stroke: '#ccc', selectable: false });
 $scope.fabric.addLine([ 150, 25, 150, 550], { stroke: '#ccc', selectable: false });

 */


