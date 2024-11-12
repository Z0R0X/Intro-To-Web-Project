function loadProducts()
{
    fetch('products.json')
  .then(response => response.json())
  .then(data => {
    let categories = data.categories;
    let products = data.products
    categories.forEach(category => 
    {
        $('#links').append(
            '<section class="link">'+
                '<img src="'+category.image+'" />'+
                '<p>'+category.name+'</p>'+
            '</section>');
        $('main').append(
        '<div class="storePart">' +
            '<hr />'+
            '<h1>'+category.name+'</h1>'+
            '<section class="itemParent" id="category'+(categories.indexOf(category))+'">'+
            '</section>'+
        '</div>');
        console.log(categories.length-1);            
    })
    products.forEach(product => {
        let catIndex = categories.findIndex(category => category.name === product.category);
        $('#category' + catIndex).append(
            '<div class="item">'+
                '<img src="'+product.image+'" />'+
                '<div>'+
                    '<h4>'+product.name+'</h4>'+
                    '<p>Price:'+product.price+'$</p>'+
                    '<button>Add To Cart</button>'+
                '</div>'+
            '</div>'
        );     
    });
  })
  .catch(error => console.error('Error loading JSON:', error));
}

$(document).ready(loadProducts);