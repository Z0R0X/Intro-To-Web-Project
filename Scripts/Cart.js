let cart = [];

function removeFromCart(id) {
    cart = cart.filter(item => {
        return item.id !== id
    })
    saveCart();
    clearItems();
    loadCart();
}

function changeQuantity(id, amount, price) {
    let item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) {
            item.quantity = 1;
        }
        let newPrice = item.quantity * price;
        saveCart();
        $(`#quantity-${id}`).val(item.quantity);
        $(`#price-${id}`).html(newPrice);
        
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
    console.log(cart);

    fetch('./Scripts/Products.json')
  .then(response => response.json())
  .then(data => {
    if(cart.length === 0)
    {
        let header = $("<h1>").html("The Cart is empty!");
        $('#itemParent').append(header); 
    }
    let products = data.products
    for(let cartItem of cart)
    {
        let product = products.find(p => p.id === cartItem.id); 
            if (!product) continue;

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
            removeFromCart(product.id);
        });
        item.append(img, namesection, quantityDiv, priceDiv, deleteButton);
        $('#itemParent').append(item); 
    }
});
}


$(document).ready(function () {
    loadCart();
});

