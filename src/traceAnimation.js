
const LifeSpan = 2000;

export default class TraceAnimation {
	constructor(x, y, size){
		this.x = x;
		this.y = y;
		this.size = size;
		this.lifeTime = LifeSpan;
		this.alive = true;
	}

	update(time){
		this.lifeTime -= time.elapsedMs;
		if(this.lifeTime < 1){
			this.alive = false;
		}
	}

	draw(time, ctx){
		ctx.fillStyle = "rgba(255, 0, 0, " + this.lifeTime / LifeSpan + ")";

		ctx.beginPath();
		ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, 2*Math.PI);
		ctx.closePath();

		ctx.fill();
	}
}