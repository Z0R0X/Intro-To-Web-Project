document.addEventListener('DOMContentLoaded', function () {
    let loginButton = document.querySelector('.login-button'); 
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        loginButton.textContent = loggedInUser.name;
        loginButton.href = '#';

        loginButton.addEventListener('click', function () {
            LogoutConfirmation();
        });
    }
});

function LogoutConfirmation() {
    let lay = document.createElement('div');
    lay.className = 'lay';

    let message = document.createElement('div');
    message.className = 'logout';

    let modalMessage = document.createElement('p');
    modalMessage.textContent = 'do you want to log out?';

    let confirmButton = document.createElement('button');
    confirmButton.textContent = 'yes';
    confirmButton.className = 'confirm-button';

    let cancelButton = document.createElement('button');
    cancelButton.textContent = 'cancel';
    cancelButton.className = 'cancel-button';

    message.appendChild(modalMessage);
    message.appendChild(confirmButton);
    message.appendChild(cancelButton);
    lay.appendChild(message);
    document.body.appendChild(lay);

    confirmButton.addEventListener('click', function () {
        localStorage.removeItem('loggedInUser'); 
        document.body.removeChild(lay);
        window.location.reload();
    });

    cancelButton.addEventListener('click', function () {
        document.body.removeChild(lay);
    });
}
