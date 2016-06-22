
import 'babel-polyfill';
import Time from './utils/time';
import Maze from './maze';
import Vector from 'victor';
import LightningBolt from './lightningBolt';

class App {
	constructor(){
		this.lastUpdateTime = 0.0;
		this.$throttle = $('.throttle');

		$('.btn').on('click', (e) => {
			let type = $(e.currentTarget).data('effect');

			if(type == "maze") {
				this.currentEffectType = Maze;
			} else if(type == "lightningBolt"){
				this.currentEffectType = LightningBolt;
			}

			this.initializeEffect(this.defaultPosition.x, this.defaultPosition.y);
		});

		this.setupCanvas();
		this.defaultPosition = {x: this.canvas.width / 2, y: this.canvas.height / 2};
		this.currentEffectType = Maze; // The initial effect is the maze
		this.start();
	}

	/**
	 * Starts update & draw loop
	 */
	start(){
		this.initializeEffect(this.defaultPosition.x, this.defaultPosition.y);
		this.time = new Time();
		this.time.start();
		this.loop();
	}

	/**
	 * Create a new instance of the current effect
	 * @param  {int} x Mouse position X
	 * @param  {int} y Mouse position Y
	 */
	initializeEffect(x, y){
		this.currentEffect = new this.currentEffectType(new Vector(this.canvas.clientWidth, this.canvas.clientHeight), new Vector(x, y));
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

		this.initializeEffect(x, y);
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