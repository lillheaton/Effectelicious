
import Utils from '../utils/utils';

const LifeSpan = 2000;

export default class FadeCircleAnimation {
	constructor(x, y, size, hexColor){
		this.x = x;
		this.y = y;
		this.size = size;
		this.lifeTime = LifeSpan;
		this.alive = true;
		this.color = Utils.hexToRgb(hexColor);
	}

	update(time){
		this.lifeTime -= time.elapsedMs;
		if(this.lifeTime < 1){
			this.alive = false;
		}
	}

	draw(time, ctx){
		ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.lifeTime / LifeSpan})`;

		ctx.beginPath();
		ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, 2*Math.PI);
		ctx.closePath();

		ctx.fill();
	}
}