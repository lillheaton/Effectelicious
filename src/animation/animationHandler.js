
export default class AnimationHandler {
	constructor(){
		this.animations = [];
	}

	addAnimation(animation){
		this.animations.push(animation);
	}

	update(time){
		for (var i = this.animations.length - 1; i >= 0; i--) {
			if(!this.animations[i].alive){
				this.animations.splice(i, 1);
				return;
			}

			this.animations[i].update(time);
		};
	}

	draw(time, ctx){
		for (var i = this.animations.length - 1; i >= 0; i--) {
			this.animations[i].draw(time, ctx);
		};
	}
}