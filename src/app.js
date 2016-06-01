
import 'babel-polyfill';
import Time from './utils/time';
import Maze from './maze';

class App {
	constructor(){
		this.lastUpdateTime = 0.0;
		this.$throttle = $('.throttle');

		this.setupCanvas();
		this.start();
	}

	/**
	 * Starts update & draw loop
	 */
	start(){
		this.currentEffectType = Maze;
		this.currentEffect = new this.currentEffectType(this.canvas.clientWidth, this.canvas.clientHeight, 0, 0);
		this.time = new Time();
		this.time.start();
		this.loop();
	}

	setupCanvas(){
		this.canvas = document.getElementById('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.addEventListener("click", this.onClick.bind(this), false);
	}

	onClick(e){
		let x = e.x, 
			y = e.y;

		x -= this.canvas.offsetLeft;
		y -= this.canvas.offsetTop;

		this.currentEffect = new this.currentEffectType(this.canvas.clientWidth, this.canvas.clientHeight, x, y);
	}

	loop(){
		window.requestAnimationFrame(this.loop.bind(this));
		this.time.update();
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.lastUpdateTime += this.time.elapsedMs;
		let throttleVal = this.$throttle.val();
		if(this.lastUpdateTime > throttleVal) {
			this.currentEffect.update(this.time);
			this.lastUpdateTime -= throttleVal;
		}

		this.currentEffect.draw(this.time, this.ctx);
	}
}

// Init application
let app = new App();