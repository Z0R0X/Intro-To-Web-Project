let loginForm = document.getElementById('login-form');
let signupForm = document.getElementById('signup-form');
let switchToRegister = document.getElementById('switch-to-register');
let switchToLogin = document.getElementById('switch-to-login');
let formTitle = document.getElementById('form-title');
let loginUsername = document.getElementById('login-username');
let loginPassword = document.getElementById('login-password');
let newUsername = document.getElementById('new-username');
let email = document.getElementById('email');
let newPassword = document.getElementById('new-password');

let userAccounts = JSON.parse(localStorage.getItem('userAccounts')) || [];

switchToRegister.addEventListener('click', function(prevent) {
    prevent.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    formTitle.textContent = 'Sign Up';
});

switchToLogin.addEventListener('click', function(prevent) {
    prevent.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
    formTitle.textContent = 'Login';
});

document.getElementById('signup-form-action').addEventListener('submit', function(prevent) {
    prevent.preventDefault();

    let usernameExists = userAccounts.some(user => user.username === newUsername.value);

    if (usernameExists) {
        alert('Username already exists. Please choose a different username.');
        return;
    }

    let newUser = {
        username: newUsername.value,
        email: email.value,
        password: newPassword.value
    };

    userAccounts.push(newUser);
    localStorage.setItem('userAccounts', JSON.stringify(userAccounts));

    alert('Account created successfully!');
    window.location.href = 'index.html';
});

document.getElementById('login-form-action').addEventListener('submit', function(prevent) {
    prevent.preventDefault(); 

    let username = loginUsername.value;
    let password = loginPassword.value;

    let userFound = userAccounts.find(user => user.username === username && user.password === password);

    if (userFound) {
        alert('Login successful!');
        window.location.href = 'index.html'; 
    } else {
        alert('Invalid username or password!');
    }
});
