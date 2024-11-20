let cart = [];

function addToCart(id) {
    let existingItem = cart.find(item => item === id);

    if (existingItem) {
        alert("Item is already in the cart!");
    } else {
        cart.push(id);
        alert("Item added to the cart!");
        saveCart();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    let savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}
function loadProducts()
{
    fetch('products.json')
  .then(response => response.json())
  .then(data => {
    let categories = data.categories;
    let products = data.products
    categories.forEach(category => 
    {
        var link = $("<section>").addClass("link");
        var img = $("<img>").attr("src", category.image);
        var a = $("<a>").attr("href", '#category'+(categories.indexOf(category)));
        a.append(img);
        var p = $("<p>").html(category.name);
        link.append(a, p);
        $('#links').append(link);
        $('main').append(
        '<div class="storePart">' +
            '<hr />'+
            '<h1>'+category.name+'</h1>'+
            '<section class="itemParent" id="category'+(categories.indexOf(category))+'">'+
            '</section>'+
        '</div>');     
    })
    products.forEach(product => {
        let catIndex = categories.findIndex(category => category.name === product.category);
        var div = $("<div>").addClass("item");
        var img = $("<img>").attr("src", product.image);
        var dChild = $("<div>");
        var name = $("<h4>").html(product.name);
        var price = $("<p>").html('<p>Price:'+product.price+'$</p>');
        var btn = $("<button>").html("Add To Cart");
        btn.click(()=>{ 
            addToCart(product.id);
        });
        dChild.append(name, price, btn);
        div.append(img, dChild);
        $('#category' + catIndex).append(div); 
    });
  })
  .catch(error => console.error('Error loading JSON:', error));
}

$(document).ready(loadProducts);