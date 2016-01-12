function anchorLastColumn() {
	var self = this;
	self.grid = null;
	self.scope = null;
	self.services = null;
	self.init = function(scope, grid, services) {
		self.grid = grid;
		self.scope = scope;
		self.services = services;
		var lastSum = 0;
		var startSum = 0;
		var lastCol;
		var gridWidth;

	
		self.scope.$watch('isColumnResizing', function(newValue, oldValue) {

			if (newValue === false && oldValue === true) {

				lastSum = 0;
				var cols = self.scope.columns;

				var col = cols[cols.length - 1]; // last column
				gridWidth = self.grid.rootDim.outerWidth;
				var viewportH = self.scope.viewportDimHeight();
				var maxHeight = self.grid.maxCanvasHt;
				console.log('maxHieght: ',maxHeight,'viewPortHieght: ', viewportH);
				if (maxHeight > viewportH+1) { // remove vertical scrollbar
					// width
					gridWidth -= self.services.DomUtilityService.ScrollW
				}

				for ( var i = 0; i < cols.length - 1; i++) {
					if (cols[i].visible) {
						lastSum += cols[i].width;
					}
				}

				lastWidthAtEnd = col.width;
				console.log('Resizing stop------ ', lastSum);

				if (lastCol != undefined) {

					if (lastSum < startSum) {

						if (lastSum + col.minWidth <= gridWidth) {
							var diff = gridWidth - lastSum;
							lastCol.width = diff;
						}
					}
				}

			}

			if (newValue === true && oldValue === false) { // on stop resizing

				gridWidth = self.grid.rootDim.outerWidth;
				var viewportH = self.scope.viewportDimHeight();
				var maxHeight = self.grid.maxCanvasHt;
				console.log('maxHieght: ',maxHeight,'viewPortHieght: ', viewportH);

				if (maxHeight > viewportH) { // remove vertical scrollbar
					// width
					gridWidth -= self.services.DomUtilityService.ScrollW
				}
				startSum = 0;
				var cols = self.scope.columns;

				var col = cols[cols.length - 1]; // last column

				for ( var i = 0; i < cols.length - 1; i++) {
					if (cols[i].visible) {
						startSum += cols[i].width;
					}
					if (i === cols.length - 2)
						lastWidthAtStart = cols[i + 1].width;
				}

				console.log('Resizing start------ ', startSum);

				gridWidth = self.grid.rootDim.outerWidth;
				if (startSum + col.minWidth <= gridWidth) {
					col.width = gridWidth - startSum; // the last gets the
					lastCol = col;
					// remaining
				}
			} else if (newValue === true) {

				gridWidth = self.grid.rootDim.outerWidth;

				startSum = 0;
				var cols = self.scope.columns;

				var col = cols[cols.length - 1]; // last column

				for ( var i = 0; i < cols.length - 1; i++) {
					if (cols[i].visible) {
						startSum += cols[i].width;
					}

				}

				console.log('Resizing start------ ', startSum);

				if (startSum + col.minWidth <= gridWidth) {
					col.width = gridWidth - startSum; // the last gets the
					lastCol = col;
					// remaining
				}
			}

		});

	}
}
