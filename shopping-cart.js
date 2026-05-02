window.addEventListener('load', function() {

    const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

    const cartItems = document.querySelector("#cart-items");
    const cartTotal = document.querySelector("#cart-total");

    let total = 0;

    if (cartTotal === 0) {
        cartItems.textContent = "Your Shopping Cart is Empty";
    } else {
        shoppingCart.forEach(item => {
            const liItem = document.createElement("li");
            liItem.className = 'item';
            liItem.textContent = 'Product Name: ' + item.productName +
                                 'Product Price: ' + item.productPrice;
            cartItems.append(liItem);

            const priceNumber = parseFloat(item.productPrice.replace("Price: £", ""));
            total += priceNumber;
        })
    }

    cartTotal.textContent = total.toFixed(2);
    console.log(total);

})
