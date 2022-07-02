const table = document.getElementById('table-usrs');
const btnAdd = document.getElementById('btnAdd');
const btnSave = document.getElementById('save-btn');
const form = document.getElementById('formUser');
const cntAddBtn = document.getElementById('container-btnAdd');
const userContainer = document.getElementById('user-container');
const addbtn = document.getElementById('addBtn');
const trashbtn = document.getElementsByTagName('img');

const Etat = document.getElementById('inpt-Etat');
const Prenom = document.getElementById('inpt-Prenom');
const Nom = document.getElementById('inpt-Nom');
const NomUtilisateur = document.getElementById('inpt-NomUtilisateur');
const Matricule = document.getElementById('inpt-Matricule');
const inptDate = document.getElementById('inpt-Date');


let trs = [];

let users = [
	{
		id: "123456789",
		createdDate: "2021-01-06T00:00:00.000Z",
		status: "En validation",
		firstName: "Mohamed",
		lastName: "Taha",
		userName: "mtaha",
		registrationNumber: "2584",
	},
	{
		id: "987654321",
		createdDate: "2021-07-25T00:00:00.000Z",
		status: "Validé",
		firstName: "Hamid",
		lastName: "Orrich",
		userName: "horrich",
		registrationNumber: "1594",
	},
	{
		id: "852963741",
		createdDate: "2021-09-15T00:00:00.000Z",
		status: "Rejeté",
		firstName: "Rachid",
		lastName: "Mahidi",
		userName: "rmahidi",
		registrationNumber: "3576",
	}
];

let checkAllinput = () => {
	var arr = Array.from(document.getElementsByTagName('input'));
	let err = 0;
	arr.forEach(input => {
		if (input.type === 'text' || input.type === 'number') {
			if (input.value === '' || (input.value.length < 3)) {
				input.classList.add('Error');
				err = 1;
			}
			else
				input.classList.remove('Error');
		}
		if (input.id === 'inpt-Date' && !/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(input.value))
			input.classList.add('Error');
	});
	return err;
};

function resetInput()
{
	Etat.value = '';
	Prenom.value = '';
	Nom.value = '';
	NomUtilisateur.value = '';
	Matricule.value = '';
	inptDate.value = '';
}

function addUserToList() {
	let date = new Date(inptDate.value);
	let user = {
		id: `${Math.round(Math.random() * 100000000) + 900000000}`,
		createdDate: date,
		status: Etat.value,
		firstName: Prenom.value,
		lastName: Nom.value,
		userName: NomUtilisateur.value,
		registrationNumber: Matricule.value,
	};
	users.push(user);
	resetInput();
}

function addUserToTable() {
	const user = users[users.length - 1];
	let tr = document.createElement('tr');
	for (let key of Object.keys(user))
	{
		let td = document.createElement('td');
		if (key === 'status')
			td.innerHTML = `<div class="${user.status}">${user.status}</div>`;
		else if (key === 'createdDate')
		{
			let date = new Date(user[key]);
			td.innerText = date.toLocaleDateString();
		}
		else
			td.innerText = user[key];
		tr.appendChild(td);
	}
	let td = document.createElement('td');
	let img = document.createElement('img');
	img.src = './trash.png';
	img.id = user.id;
	img.classList.add('img');
	td.appendChild(img);
	tr.appendChild(td);
	table.appendChild(tr);
}

function updateTable()
{
	users.forEach((user) => {
		let tr = document.createElement('tr');
		for (let key of Object.keys(user))
		{
			let td = document.createElement('td');
			if (key === 'status')
				td.innerHTML = `<div class="${user.status}">${user.status}</div>`;
			else if (key === 'createdDate')
			{
				let date = new Date(user[key]);
				td.innerText = date.toLocaleDateString();
			}
			else
				td.innerText = user[key];
			tr.appendChild(td);
		}
		let td = document.createElement('td');
		let img = document.createElement('img');
		img.src = './trash.png';
		img.id = user.id;
		img.classList.add('img');
		td.appendChild(img);
		tr.appendChild(td);
		table.appendChild(tr);
	});
}

updateTable();
resetInput();

addbtn.addEventListener('click', () => {
	cntAddBtn.classList.toggle('Heddin');
	form.classList.toggle('Heddin');
	userContainer.classList.toggle('expand');
});

table.addEventListener('click', (e) => {
	if (e.target.classList.value !== 'img')
		return;
	for( var i = 0; i < users.length; i++){
		if (users[i].id === e.target.id) {
			users.splice(i, 1);
			table.removeChild(table.rows[i + 1]);
		}
	}
});

btnSave.addEventListener('click', () => {
	if (checkAllinput())
		return;
	cntAddBtn.classList.toggle('Heddin');
	form.classList.toggle('Heddin');
	userContainer.classList.toggle('expand');
	addUserToList();
	addUserToTable();
});
