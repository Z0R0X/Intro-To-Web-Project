document.addEventListener('DOMContentLoaded', function () {
    let loginButton = document.querySelector('.login-button'); 
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        loginButton.textContent = loggedInUser.name;
        loginButton.href = '#';
        let cartButton = document.createElement('a');
        cartButton.innerHTML = "Cart";
        cartButton.href = "Cart.html";
        cartButton.classList.add("login-button");
        document.querySelector(".login-section").appendChild(cartButton);

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
    modalMessage.textContent = 'Are you sure you want to log out?';

    let confirmButton = document.createElement('button');
    confirmButton.textContent = 'Yes';
    confirmButton.className = 'confirm-button';

    let cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
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
