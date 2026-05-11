window.addEventListener('load', function () {

    let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

    const products = document.querySelectorAll(".product");

    products.forEach(product => {

        const addProductBtn = product.querySelector(".link-btn");

        addProductBtn.addEventListener('click', function (e) {
            e.preventDefault();

            const productName = product.querySelector(".name").innerText;
            const productPrice = product.querySelector(".price").innerText;
            const productImage = product.querySelector("img").src;

            shoppingCart.push({ productName, productPrice, productImage });
            localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

            updateCartSize();

            addProductBtn.textContent = 'Added to Cart';
            addProductBtn.style.backgroundColor = 'green';

            setTimeout(() => {
                addProductBtn.textContent = 'Add to cart';
                addProductBtn.style.backgroundColor = '';
            }, 2000);
        });

    });

});