
import Grid from './grid';
import Random from './random';
import MathHelper from './mathHelper';

const TileSize = 30;

export default class Maze {
	constructor(w, h, screenX, screenY){
		this.grid = new Grid(w / TileSize, h / TileSize);

		this.currentCell = this.getCell(screenX, screenY);
		this.visitedCells = [];
		this.cellStack = [];
		this.tree = [];
		this.lastUpdateTime = 0.0;
		this.done = false;
	}

	update(time){
		this.lastUpdateTime += time.elapsedMs;
		if(this.lastUpdateTime > 5 & !this.done){
			this.done = this.calculate();
			this.lastUpdateTime -= 5;
		}
	}

	draw(time, ctx){
		ctx.beginPath();
		for (var i = 0; i < this.visitedCells.length; i++) {
			this.drawWalls(this.visitedCells[i], ctx);
		};
		ctx.stroke();

		for (var i = 0; i < this.cellStack.length; i++) {
			ctx.beginPath();
			ctx.arc(this.cellStack[i].x * TileSize + TileSize / 2, this.cellStack[i].y * TileSize + TileSize / 2, TileSize / 2, 0, 2*Math.PI);
			ctx.stroke();
		};		
	}

	drawWalls(cell, ctx){
		let x = cell.x * TileSize,
			y = cell.y * TileSize;

		if(cell.walls.includes('N')){
			ctx.moveTo(x, y); // top left
			ctx.lineTo(x + TileSize, y); // top right
		}

		if(cell.walls.includes('S')){
			ctx.moveTo(x, y + TileSize); // down left
			ctx.lineTo(x + TileSize, y + TileSize); // down right 
		}

		if(cell.walls.includes('W')){
			ctx.moveTo(x, y); // top left
			ctx.lineTo(x, y + TileSize); // down left
		}

		if(cell.walls.includes('E')){
			ctx.moveTo(x + TileSize, y); // top right
			ctx.lineTo(x + TileSize, y + TileSize); // down right
		}
	}

	calculate() {
		if(this.visitedCells.length < this.grid.nCells){
			let neighbours = this.grid.getNeighbours(this.currentCell).filter(s => this.visitedCells.findIndex(x => x == s) < 0);

			if(neighbours.length > 0) {
				let choice = Random.choice(neighbours);
				this.breakWalls(this.currentCell, choice);
				this.cellStack.push(choice);
				this.currentCell = choice;
				this.visitedCells.push(this.currentCell);
			} else{
				this.currentCell = this.cellStack.pop();
			}

			return false;
		} else {
			return true;
		}
	}

	breakWalls(cell1, cell2) {
		if(cell1.x < cell2.x){
			cell1.breakWall('E');
			cell2.breakWall('W');
		}

		if(cell1.x > cell2.x){
			cell1.breakWall('W');
			cell2.breakWall('E');
		}

		if(cell1.y < cell2.y){
			cell1.breakWall('S');
			cell2.breakWall('N');
		}

		if(cell1.y > cell2.y){
			cell1.breakWall('N');
			cell2.breakWall('S');
		}
	}

	getCell(x, y) {
		let gridPos = this.getGridPos(x, y);

		if(gridPos.x < this.grid.arr.length && gridPos.y < this.grid.arr[0].length){
			return this.grid.arr[gridPos.x][gridPos.y];
		}

		return null;
	}

	getGridPos(x, y){
		return {
			x: MathHelper.snapToFloor(x, TileSize) / TileSize,
			y: MathHelper.snapToFloor(y, TileSize) / TileSize
		};
	}
}