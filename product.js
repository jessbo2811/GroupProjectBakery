window.addEventListener('load', function() {

    const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

    const thisProduct = document.querySelectorAll(".product");

    thisProduct.forEach(thisProduct => {

        const addProductBtn = thisProduct.querySelector(".link-btn");

        addProductBtn.addEventListener('click', function (e) {

            e.preventDefault();

            const productName = thisProduct.querySelector(".name").innerText;
            const productPrice = thisProduct.querySelector(".price").innerText;

            addToShoppingCart({productName, productPrice});

            console.log(shoppingCart);

        })
    })

    function addToShoppingCart(product) {

        shoppingCart.push(product);

        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

    }

})