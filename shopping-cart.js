window.addEventListener('load', function() {

    const addProductBtn = document.querySelector('.link-btn');

    addProductBtn.addEventListener("click", function(e) {

        e.preventDefault();


    })

})

function addProductToCart(product) {

    const productName;
    const productPrice;
    const shoppingCart = [];

    if (product.className == "name") {
        productName = product.innerText;
    }

    if (product.className == "price") {
        productPrice = product.innerText;
    }

    const product = {name : productName,
                     price : productPrice
    };

    const stringProduct = JSON.stringify(product);

    if (!sessionStorage.getItem('cart')) {

    }

}
