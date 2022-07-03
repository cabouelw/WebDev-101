const SPEED = .02

export default class Paddle {
	constructor(paddleElm) {
		this.paddleElm = paddleElm;
		this.reset()
	}

	get position() {
		return parseFloat(getComputedStyle(this.paddleElm).getPropertyValue('--position'));
	}

	set position(value) {
		this.paddleElm.style.setProperty('--position', value);
	}

	reset () {
		this.position = 50;
	}

	rect() {
		return this.paddleElm.getBoundingClientRect();
	}

	update(delta, ballHeight) {
		this.position += SPEED * delta * (ballHeight - this.position);
	}
}