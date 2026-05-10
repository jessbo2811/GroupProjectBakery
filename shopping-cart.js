const cartSize = document.querySelector("#cart-size");
if (cartSize) {
    const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    cartSize.textContent = cart.length;
}

window.addEventListener('load', function() {

    const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    const cartItems = document.querySelector("#cart-items");
    const cartTotal = document.querySelector("#cart-total");
    const cartSize = document.querySelector("#cart-size");
    const shoppingCartSize = shoppingCart.length;
    let total = 0;

    if (!cartItems || !cartTotal) return;

    if (shoppingCartSize === 0) {
        cartItems.textContent = "Your Shopping Cart is Empty";
    } else {
        shoppingCart.forEach(item => {
            const liItem = document.createElement("li");
            liItem.className = 'item';
            liItem.textContent = item.productName + ' - ' + item.productPrice;
            cartItems.append(liItem);
            const priceNumber = parseFloat(item.productPrice.replace("Price: £", ""));
            total += priceNumber;
        });
    }

    cartTotal.textContent = total.toFixed(2);
    cartSize.textContent = shoppingCartSize;

});