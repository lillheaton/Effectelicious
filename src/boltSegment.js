
import Utils from './utils/utils';

export default class BoltSegment {
	constructor(a, b, thickness, color, startTime, lifeSpan){
		this.a = a;
		this.b = b;
		this.thickness = thickness;
		this.lifeSpan = this.lifeTime = lifeSpan;
		this.startTime = startTime;
		this.rgb = Utils.hexToRgb(color);
		this.alive = true;
	}

	update(time){
		if(!this.alive)
			return;

		this.startTime -= time.elapsedMs;
		if(this.startTime < 1){
			this.lifeTime -= time.elapsedMs;
			if(this.lifeTime < 1){
				this.alive = false;
			}	
		}
	}

	draw(time, ctx, color) {
		if(!this.alive || this.startTime > 0)
			return;

		ctx.strokeStyle = `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, ${this.lifeTime / this.lifeSpan})`;
		ctx.moveTo(this.a.x, this.a.y);
		ctx.lineTo(this.b.x, this.b.y);
	}
}