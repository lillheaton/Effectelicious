
import 'babel-polyfill';
import Time from './time';
import Maze from './maze';

class App {
	constructor(){
		this.initCanvas();
		this.time = new Time();

		this.maze = new Maze(500, 500, 0, 0);

		this.start();
	}

	start(){
		this.time.start();
		this.loop();
	}

	initCanvas(){
		this.canvas = document.getElementById('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.addEventListener("click", this.onClick.bind(this), false);
		window.addEventListener('rezise', this.reziseCanvas.bind(this), false);
		this.reziseCanvas();
	}

	reziseCanvas(){
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}

	onClick(e){
		let x = e.x, 
			y = e.y;

		x -= this.canvas.offsetLeft;
		y -= this.canvas.offsetTop;

		this.maze = new Maze(500, 500, x, y);
	}

	loop(){
		window.requestAnimationFrame(this.loop.bind(this));
		this.time.update();
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.maze.update(this.time);
		this.maze.draw(this.time, this.ctx);
	}
}

// Init application
let app = new App();