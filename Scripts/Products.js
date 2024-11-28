let cart = [];

function addToCart(id) {
    let existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        alert("Item is already in the cart!");
    } else {
        cart.push({ id: id, quantity: 1 });
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
function itemInCart(id)
{
    if(cart.find(item => item.id === id))
        return true;

    return false;
}
function loadProducts()
{
    fetch('./Scripts/Products.json')
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
        let div = $("<div>").addClass("item");
        let img = $("<img>").attr("src", product.image);
        let dChild = $("<div>");
        let name = $("<h4>").html(product.name);
        let price = $("<p>").html('<p>Price:'+product.price+'$</p>');
        if(itemInCart(product.id))
            var btn = $("<button>").html("Go To Cart");
        else
            var btn = $("<button>").html("Add To Cart");

        
        btn.click(() => {
            if (itemInCart(product.id)) {
                window.location.href = "cart.html";
            } else {
                let oldText = $('<span>').addClass('text-out').text("Add To Cart");
                let newText = $('<span>').addClass('text-in').text("Go To Cart");
                btn.empty().append(oldText, newText);
                setTimeout(() => {
                    oldText.addClass('text-out-animate');
                    newText.addClass('text-in-animate');
                }, 100); 
                setTimeout(() => {
                    btn.html("Go To Cart")
                    addToCart(product.id); 
                }, 1000); 
            }
        });
        dChild.append(name, price, btn);
        div.append(img, dChild);
        $('#category' + catIndex).append(div); 
    });
  })
  .catch(error => console.error('Error loading JSON:', error));
}

function filterProducts(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    $(".item").each(function () {
        var productName = $(this).find("h4").text().toLowerCase();
        if (productName.includes(searchTerm)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

function scrollToHash()
{
    let hash = window.location.hash;
    if (hash) {
        let targetElement = document.querySelector(hash);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    }
}

window.addEventListener('hashchange', scrollToHash);


$(document).ready(function () {
    $("#search-bar").on("input", function () {
        const searchTerm = $(this).val();
        filterProducts(searchTerm);
    });

    
    loadCart();
    loadProducts();
    setTimeout(() => {
        scrollToHash();
      }, 500);
});

