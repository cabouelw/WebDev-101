const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const elements = document.getElementsByClassName('form-control');

// show input error massage
function showError(input, message) {
	const formControl = input.parentElement;
	formControl.className = 'form-control error';
	const small = formControl.querySelector('small');
	small.innerText = message;
};

// show success outline
function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
};

// Event listeners
form.addEventListener('submit', function(e) {
	e.preventDefault();
	let arry = [username, email, password, password2];
	arry.forEach(function(elm)
	{
		if (elm.value.trim() == '')
			showError(elm, `${elm.id} is Required`);
		else
			showSuccess(elm);
	});
});