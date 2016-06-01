
export default class Effect {
	constructor(){
		if (new.target === Effect) {
			throw new TypeError("Cannot construct Abstract instances directly");
	    }
	}

	/**
	 * Will get updated based on the throttle value
	 */
	update(){}

	/**
	 * Draw loop, frames of requestAnimationFrame
	 */
	draw(){}
}