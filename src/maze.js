
import Effect from './effect';
import Grid from './grid';
import cell from './mazeCell';
import Random from './utils/random';
import AnimationHandler from './animation/animationHandler';
import FadeCircleAnimation from './animation/fadeCircleAnimation';

const TileSize = 20;

export default class Maze extends Effect {
	constructor(size, source){
		super();

		this.grid = new Grid(size.x / TileSize, size.y / TileSize, cell);
		this.animations = new AnimationHandler();

		this.currentCell = this.grid.getCell(source, TileSize);
		this.visitedCells = [];
		this.cellStack = [];
		this.tree = [];
		this.done = false;
	}

	update(time){
		if(!this.done){
			this.done = this.calculate();
		}
	}

	draw(time, ctx){

		ctx.beginPath();
		for (var i = 0; i < this.visitedCells.length; i++) {
			this.drawWalls(this.visitedCells[i], ctx);
		};
		ctx.stroke();

		this.animations.update(time);
		this.animations.draw(time, ctx);
	}

	drawWalls(cell, ctx){
		let x = cell.x * TileSize,
			y = cell.y * TileSize;

		ctx.strokeStyle = "#013760";

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
				this.currentCell.breakWallBetween(choice);
				this.cellStack.push(choice);
				this.animations.addAnimation(new FadeCircleAnimation(choice.x * TileSize, choice.y * TileSize, TileSize, "#00F7F9"));
				this.currentCell = choice;
				this.visitedCells.push(this.currentCell);
			} else{
				this.currentCell = this.cellStack.pop();
				this.animations.addAnimation(new FadeCircleAnimation(this.currentCell.x * TileSize, this.currentCell.y * TileSize, TileSize, "#E74C3C"));
			}

			return false;
		} else {
			return true;
		}
	}
}