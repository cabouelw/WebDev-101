const addUserbtn = document.getElementById('add_user');
const doublebtn = document.getElementById('double');
const onlymillionairesbtn = document.getElementById('show_millionaires');
const sortbtn = document.getElementById('sort');
const calculWealthbtn = document.getElementById('calculate_wealth');
const main = document.getElementById('main');

let users = [];

// fetch new user from IPA
async function getRandomUser() {
	const res = await fetch('https://randomuser.me/api');
	const data = await res.json();

	const user = {name: `${data.results[0].name.first} ${data.results[0].name.last}`,
			wealth: Math.floor(Math.random() * 1000000)
		};
	users.push(user);
	updateListUser();
}

// Update DOM with ForEach Loop
function updateListUser(prv = users)
{
	main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
	prv.forEach((user, idx) => {
		const div = document.createElement('div');
		div.classList.add('person');
		div.innerHTML = `<strong>${user.name}</strong> ${'$' + user.wealth.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
		main.appendChild(div);
	})
}

// event listeners
addUserbtn.addEventListener('click', getRandomUser);

// event listeners
doublebtn.addEventListener('click', () => {
	users.map((user) => {
		user.wealth = user.wealth * 2;
	});
	updateListUser();
});

// event listeners
sortbtn.addEventListener('click', () => {
	users = users.sort((a, b) => (b.wealth - a.wealth));
	updateListUser();
});

// event listeners
onlymillionairesbtn.addEventListener('click', () => {
	users = users.filter(mill => mill.wealth >= 1000000);
	updateListUser();
});

// event listeners
calculWealthbtn.addEventListener('click', () => {
	let Total = users.reduce((acc, usr) => (acc += usr.wealth), 0);
	const div = document.createElement('div');
	div.innerHTML = `<h3>Total Wealth: <strong>${'$' + Total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</strong></h3>`;
	updateListUser();
	main.appendChild(div);
});

