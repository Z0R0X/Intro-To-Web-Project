let cart = [];

function removeFromCart(id) {
    cart = cart.filter(item => {
        return item.id !== id
    })
    saveCart();
    clearItems();
    loadCart();
}

function changeQuantity(id, amount) {
    let item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) {
            item.quantity = 1;
        }
        saveCart();
        $(`#quantity-${id}`).html(item.quantity);
        
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
    let products = data.products
    for(let cartItem of cart)
    {
        let product = products.find(p => p.id === cartItem.id); 
            if (!product) continue;

        var item = $("<section>").addClass("cartItem");
        var img = $("<img>").attr("src", product.image);
        
        var name = $("<p>").html(product.name);
        var namesection = $("<section>").append($("<h2>").html("Name"), name)

        var subtractButton = $("<button>").html("-");
        var quantity = $("<span>").html(cartItem.quantity).attr("id","quantity-"+cartItem.id);
        var addButton = $("<button>").html("+");
        subtractButton.click(()=>{changeQuantity(product.id, -1)});
        addButton.click(()=>{changeQuantity(product.id, 1)});
        var quantityDiv = $("<div>").append($("<h2>").html("Quantity"), subtractButton, quantity, addButton);
        
        var price = $("<span>").html(product.price);
        var priceDiv = $("<div>").append($("<h2>").html("Price"), price, "$");
        
        var deleteButton = $("<button>").html("REMOVE");
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

