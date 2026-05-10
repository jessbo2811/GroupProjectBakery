window.addEventListener('load', function () {

    const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

    const thisProduct = document.querySelectorAll(".product");

    thisProduct.forEach(thisProduct => {

        const addProductBtn = thisProduct.querySelector(".link-btn");

        addProductBtn.addEventListener('click', function (e) {
            e.preventDefault();

            const productName = thisProduct.querySelector(".name").innerText;
            const productPrice = thisProduct.querySelector(".price").innerText;

            addToShoppingCart({ productName, productPrice });

            addProductBtn.textContent = '✓ Added to Cart!';
            addProductBtn.style.backgroundColor = 'green';
            setTimeout(() => {
                addProductBtn.textContent = 'Add to cart';
                addProductBtn.style.backgroundColor = '';
            }, 2000);
        });

    });

    function addToShoppingCart(product) {
        shoppingCart.push(product);
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    }

});