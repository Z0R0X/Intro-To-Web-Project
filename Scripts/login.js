let loginForm = document.getElementById('login-form');
let signupForm = document.getElementById('signup-form');
let switchToRegister = document.getElementById('switch-to-register');
let switchToLogin = document.getElementById('switch-to-login');
let formTitle = document.getElementById('form-title');

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