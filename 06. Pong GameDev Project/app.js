import Ball from "./classes/ball.js"
import Paddle from "./classes/Paddle.js"

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const computerPaddle = new Paddle(document.getElementById('computer-paddle'));
const playerScoreElm = document.getElementById('player-score');
const computerScoreElm = document.getElementById('computer-score');

let lastTime;
function update(time) {
	if (lastTime != null) {
		const delta = time - lastTime;
		ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
		computerPaddle.update(delta, ball.y);
		const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue'));
		document.documentElement.style.setProperty('--hue', hue + delta * 0.01);
		if (isLose())
			handleLose();
	}
	lastTime = time;
	window.requestAnimationFrame(update);
}

function handleLose() {
	const rect = ball.rect();
	if (rect.right >= window.innerWidth)
		playerScoreElm.textContent = parseInt(playerScoreElm.textContent) + 1;
	else
		computerScoreElm.textContent = parseInt(computerScoreElm.textContent) + 1;
	ball.reset();
	computerPaddle.reset();
}


function isLose(){
	const rect = ball.rect();
	return rect.right >= window.innerWidth || rect.left <= 0;
}

document.addEventListener('mousemove', e => {
	playerPaddle.position = (e.y / window.innerHeight) * 100;
})

window.requestAnimationFrame(update);
