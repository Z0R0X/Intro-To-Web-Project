let loginForm = document.getElementById('login-form-action');
let signupForm = document.getElementById('signup-form-action');
let switchToregister = document.getElementById('switch-to-register');
let switchTologin = document.getElementById('switch-to-login');
let formTitle = document.getElementById('form-title');

let loginUsername = document.getElementById('login-username');
let loginPassword = document.getElementById('login-password');

let newName = document.getElementById('new-name');
let newUsername = document.getElementById('new-username');
let email = document.getElementById('email');
let newPassword = document.getElementById('new-password');

let userAccounts = JSON.parse(localStorage.getItem('userAccounts')) || [];

function setValidationMessage(input, message) {
    input.setCustomValidity(message);
    input.reportValidity();
    setTimeout(() => input.setCustomValidity(''), 3000); 
}

switchToregister.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
    formTitle.textContent = 'Sign Up';
});

switchTologin.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    formTitle.textContent = 'Login';
});

signupForm.addEventListener('submit', function (event) {
    event.preventDefault();
let sameuser=userAccounts.find(user => user.username === newUsername.value);
    if (!sameuser) {
        setValidationMessage(newUsername, 'This username is already taken. Please choose a different one.');
        return;
    }

    if (newPassword.value.length < 8) {
        setValidationMessage(newPassword, 'Password must be at least 8 characters long.');
        return;
    }

    let newUser = {
        name: newName.value,
        username: newUsername.value,
        email: email.value,
        password: newPassword.value
    };

    userAccounts.push(newUser);
    localStorage.setItem('userAccounts', JSON.stringify(userAccounts));
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    signupForm.reset();
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 200);
});

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    let userFound = userAccounts.find(user => user.username === loginUsername.value);

    if (!userFound) {
        setValidationMessage(loginUsername, 'Invalid username. Please try again.');
        return;
    }
    
    if (userFound.password !== loginPassword.value) {
        setValidationMessage(loginPassword, 'Invalid password. Please try again.');
        return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(userFound));
    loginForm.reset();
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 200);
});
