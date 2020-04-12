document.addEventListener('DOMContentLoaded', () => {
	const squares = document.querySelectorAll('.grid div');
	const scoreDisplay = document.querySelector('span');
	const startBtn = document.querySelector('.start');

	const width = 10;
	let currentIndex = 0;
	let appleIndex = 0;
	let currentSnake = [2, 1, 0]; // so the div in our grid being 2 for Head and 0 for the tail
	let direction = 1;
	let speed = 0.9;
	let score = 0;
	let intervalTime = 0;
	let interval = 0;

	//start and restart the game
	function startGame() {
		currentSnake.forEach(index => squares[index].classList.remove('snake'));
		squares[appleIndex].classList.remove('apple');
		clearInterval(interval);
		score = 0;
		randomApple();
		direction = 1;
		scoreDisplay.innerText = score;
		intervalTime = 1000;
		currentSnake = [2, 1, 0];
		currentIndex = 0;
		currentSnake.forEach(index => squares[index].classList.add('snake'));
		interval = setInterval(moveOutcomes, intervalTime);
	}

	//function that deals with all the move outcomes of the snake
	function moveOutcomes() {

		//deals with snake hitting border and self
		if ((currentSnake[0]+width >= (width*width) && direction === width) ||//if the snake hits bottom
			(currentSnake[0]%width === width -1 && direction === 1) || //if the snake hits right wall
			(currentSnake[0]%width === 0 && direction === -1) || //if the snake hits left wall
			(currentSnake[0]-width < 0 && direction === -width) ||//if snaek hits top
			squares[currentSnake[0] + direction].classList.contains('snake')) {//snake hits itself 
				return clearInterval(interval); //clear the interval if the above thing happens
		}	

		const tail = currentSnake.pop(); //removes last item of the array and shows it
		squares[tail].classList.remove('snake'); //removes the class of snake from tail		
		currentSnake.unshift(currentSnake[0] + direction);//gives the direction to the head of the array

		//deals with snake getting apple
		if (squares[currentSnake[0]].classList.contains('apple')) {
			squares[currentSnake[0]].classList.remove('apple');
			squares[tail].classList.add('snake');
			currentSnake.push(tail);
			randomApple();
			score++;
			scoreDisplay.textContent = score;
			clearInterval(interval);
			intervalTime = intervalTime * speed;
			interval = setInterval(moveOutcomes, intervalTime);
		}
		squares[currentSnake[0]].classList.add('snake');
	}

	//generate new apple once apple is eaten
	function randomApple() {
		do {
			appleIndex = Math.floor(Math.random() * squares.length);
		} while (squares[appleIndex].classList.contains('snake')); //make sure the apples are not there
		squares[appleIndex].classList.add('apple');
	}

	//assign function to keycodes
	function control(e) {
		squares[currentIndex].classList.remove('snake'); //we are removing the class of snake
		if (e.keyCode === 39) {
			direction = 1; //if we press the right arrow button, the snake will go right 1
		} else if (e.keyCode === 38) {
			direction = -width; //up arow, the snake will go 10 divs appears to go up
		} else if (e.keyCode === 37) {
			direction = -1; //left button snake will go left 1 div
		} else if (e.keyCode == 40) {
			direction = +width; //down arrow means 10 steps down
		}
	}

	document.addEventListener('keyup', control);

	startBtn.addEventListener('click', startGame);
});