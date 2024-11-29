document.addEventListener('DOMContentLoaded', function () {
    let loginButton = document.querySelector('.login-button'); 
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        loginButton.textContent = loggedInUser.name; 
        loginButton.href = '#';

        loginButton.addEventListener('click', function () {
            let Confirm = confirm('Do you want to log out?');
            if (Confirm) {
                localStorage.removeItem('loggedInUser'); 
                window.location.reload();
            }
        });
    }
});