function anchorLastColumn () {
    var self = this;
    self.grid = null;
    self.scope = null;
    self.services = null;
    self.init = function (scope, grid, services) {
      self.grid = grid;
      self.scope = scope;
      self.services = services;

      self.scope.$watch('isColumnResizing', function (newValue, oldValue) {
        if (newValue === false && oldValue === true) { //on stop resizing
          var gridWidth = self.grid.rootDim.outerWidth;
      	  var viewportH = self.scope.viewportDimHeight();
      	  var maxHeight = self.grid.maxCanvasHt;
      	  if(maxHeight > viewportH) { // remove vertical scrollbar width
      		  gridWidth -= self.services.DomUtilityService.ScrollW;
      	  }
  
          var cols = self.scope.columns;
          var col = cols[cols.length - 1]; // last column
          var sum = 0;
          for(var i = 0; i < cols.length - 1; i++) {
        		if(cols[i].visible) {
        			sum += cols[i].width;
        		}
          }
  
          if(sum + col.minWidth <= gridWidth) {
            col.width = gridWidth - sum; // the last gets the remaining
          }
        }
      });
    }
}
