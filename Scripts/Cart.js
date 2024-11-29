let cart = [];
let loggedInUser;
function removeFromCart(id) {
    cart = cart.filter(item => {
        return item.id !== id || item.user !== loggedInUser.username
    })
    saveCart();
    calculateTotal();
}
function calculateTotal() {
    let total = 0;
    cart.forEach(item => {
        if(item.user === loggedInUser.username)
        {
        let productPrice = parseFloat($(`#price-${item.id}`).text());
        total += productPrice;
        }
    });
    $("#total-text").html(`Total: $${total}`);
}

function changeQuantity(id, amount, price) {
    let item = cart.find(item => item.id === id && loggedInUser.username == item.user);
    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) {
            item.quantity = 1;
        }
        let newPrice = item.quantity * price;
        saveCart();
        $(`#quantity-${id}`).val(item.quantity);
        $(`#price-${id}`).html(newPrice);
        calculateTotal();
    }
}
function checkItemParent()
{
    if($('#itemParent').children().length === 0)
    {
        let header = $("<h1>").html("The Cart is empty!");
        $('#itemParent').append(header); 
    }
}
function clearItems()
{
    $("#itemParent").html("");
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    let savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    fetch('./Scripts/Products.json')
  .then(response => response.json())
  .then(data => {
    let products = data.products
    for(let cartItem of cart)
    {
        let product = products.find(p => p.id === cartItem.id); 
            if (!product || cartItem.user !== loggedInUser.username) continue;

        let item = $("<section>").addClass("cartItem");
        let img = $("<img>").attr("src", product.image);
        
        let name = $("<p>").html(product.name);
        let namesection = $("<section>").append($("<h2>").html("Name"), name)

        let subtractButton = $("<button>").html("-");
        let quantity = $("<input>").val(cartItem.quantity).attr("id","quantity-"+cartItem.id).attr("type", "number").attr("min", "1");
        let addButton = $("<button>").html("+");
        subtractButton.click(()=>{changeQuantity(product.id, -1, product.price)});
        addButton.click(()=>{changeQuantity(product.id, 1, product.price)});
        quantity.on('input', function () {
            let newQuantity = parseInt($(this).val());
            if (isNaN(newQuantity) || newQuantity <= 0) {
                newQuantity = 1;
            }
            changeQuantity(product.id, newQuantity - cartItem.quantity, product.price);
            $(this).val(newQuantity);
        });
        let quantityDiv = $("<div>").append($("<h2>").html("Quantity"), subtractButton, quantity, addButton);
        
        let price = $("<span>").html(product.price * cartItem.quantity).attr("id","price-"+cartItem.id);
        let priceDiv = $("<div>").append($("<h2>").html("Price"), price, "$");
        
        let deleteButton = $("<button>").html("REMOVE");
        deleteButton.click(()=>{ 
            item.addClass("removed");
            setTimeout(() => {
                removeFromCart(product.id);
                item.remove();
                
                checkItemParent();
            }, 300); 
        });
        item.append(img, namesection, quantityDiv, priceDiv, deleteButton);
        $('#itemParent').append(item); 
    }
    checkItemParent();
});
}


$(document).ready(function () {
    loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if(!loggedInUser)
        window.location.href = "index.html";

    loadCart();
    $('#pay-button').click(function() {
        let cardNumber = $('#card-number').val().trim();
        let cardHolder = $('#card-holder').val().trim();
        let expiryDate = $('#expiry-date').val().trim();
        let cvv = $('#cvv').val().trim();

        if (cardNumber === '' || cardHolder === '' || expiryDate === '' || cvv === '') {
            $("#paymentText").html('Please fill in all fields.');
            $("#paymentText").addClass("fail");
            setTimeout(()=>$("#paymentText").removeClass("fail"), 1000)
            return;
        }

        if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, ''))) {
            $("#paymentText").html('Please enter a valid 16-digit card number.');
            $("#paymentText").addClass("fail");
            setTimeout(()=>$("#paymentText").removeClass("fail"), 1000)
            return;
        }
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
            $("#paymentText").html('Please enter a valid expiry date in MM/YY format.');
            $("#paymentText").addClass("fail");
            setTimeout(()=>$("#paymentText").removeClass("fail"), 1000);
            return;
        }

        if (!/^\d{3,4}$/.test(cvv)) {
            $("#paymentText").html('Please enter a valid CVV.');
            $("#paymentText").addClass("fail");
            setTimeout(()=>$("#paymentText").removeClass("fail"), 1000);
            return;
        }

        $("#itemParent").children().addClass("removed");
        cart = cart.filter(item=>{return item.user !== loggedInUser.username;});
        saveCart();
        $("#paymentText").html('Payment successful! Thank you for your purchase.');
        $("#paymentText").addClass("succeed");
        setTimeout(()=>{$("#paymentText").removeClass("succeed"); location.reload();}, 1000)
    });

    setTimeout(()=>calculateTotal(), 100)
});

