const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

function Recovry(){
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
	if (selectedSeats !== null && selectedSeats.length > 0)
	{
		seats.forEach((seat , index) => {
			if (selectedSeats.indexOf(index) > -1)
				seat.classList.add('selected');
		});
	}
	const selectedMovieIndex = +localStorage.getItem('movieIndex');
	if (selectedMovieIndex !== null){
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}

Recovry();


// update total and count
function updateSelectedCount() {
	const selectedSeats = document.querySelectorAll('.row .seat.selected');

	// copy selected seatsin arry && map through it 
	const seatindex = [...selectedSeats].map( (seat) => ([...seats].indexOf(seat)));

	localStorage.setItem('selectedSeats', JSON.stringify(seatindex));

	const test = selectedSeats.length;
	count.innerText = test;
	total.innerText = test * ticketPrice;
}

// Seat click event
container.addEventListener('click', (e) =>{
	if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
		e.target.classList.toggle('selected');
		updateSelectedCount();
	}
});

// Movie Select event
movieSelect.addEventListener('change', e => {
	ticketPrice = +e.target.value;
	updateSelectedCount();
	localStorage.setItem('movieIndex', e.target.selectedIndex);
	localStorage.setItem('moviePrice', e.target.value);
});

// Initial count and total set
updateSelectedCount();