
import MathHelper from './utils/mathHelper';

export default class Grid {
	constructor(w, h, cellGenerator){
		this._grid = [];

		for (var i = 0; i < w; i++) {
			this._grid[i] = [];
			for (var j = 0; j < h; j++) {
				this._grid[i][j] = cellGenerator(i,j);
			};
		};
	}

	get arr(){
		return this._grid;
	}

	get nCells(){
		return this._grid.length * this._grid[0].length;
	}

	getCell(position, cellSize) {
		let gridPos = this.getGridPos(position, cellSize);

		if(gridPos.x < this._grid.length && gridPos.y < this._grid[0].length){
			return this._grid[gridPos.x][gridPos.y];
		}

		return null;
	}

	getGridPos(position, cellSize){
		return {
			x: MathHelper.snapToFloor(position.x, cellSize) / cellSize,
			y: MathHelper.snapToFloor(position.y, cellSize) / cellSize
		};
	}

	getNeighbours(cell, diagonal) {
		let x = cell.x,
			y = cell.y,
			resp = [];

		/*let baseX = x - 1 > -1 ? x - 1 : 0,
			maxX = x + 1 < this._grid.length ? x + 1 : this._grid.length - 1,
			baseY = y - 1 > -1 ? y - 1 : 0,
			maxY = y + 1 < this._grid[0].length ? y + 1 : this._grid[0].length - 1;

		for (var i = baseX; i < maxX + 1; i++) {
			for (var j = baseY; j < maxY + 1; j++) {
				if(i == x && j == y)
					continue;

				resp.push(this._grid[i][j]);
			};
		};*/

		// West
        if(this._grid[x-1] && this._grid[x-1][y]) {
            resp.push(this._grid[x-1][y]);
        }
 
        // East
        if(this._grid[x+1] && this._grid[x+1][y]) {
            resp.push(this._grid[x+1][y]);
        }
 
        // South
        if(this._grid[x] && this._grid[x][y-1]) {
            resp.push(this._grid[x][y-1]);
        }
 
        // North
        if(this._grid[x] && this._grid[x][y+1]) {
            resp.push(this._grid[x][y+1]);
        }
 
        if (diagonal) {
 
            // Southwest
            if(this._grid[x-1] && this._grid[x-1][y-1]) {
                resp.push(this._grid[x-1][y-1]);
            }

            // Southeast
            if(this._grid[x+1] && this._grid[x+1][y-1]) {
                resp.push(this._grid[x+1][y-1]);
            }
 
            // Northwest
            if(this._grid[x-1] && this._grid[x-1][y+1]) {
                resp.push(this._grid[x-1][y+1]);
            }
 
            // Northeast
            if(this._grid[x+1] && this._grid[x+1][y+1]) {
                resp.push(this._grid[x+1][y+1]);
            }
        }

        return resp;
	}
}