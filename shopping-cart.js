function updateCartSize() {
    const cartSizeElement = document.querySelector("#cart-size");
    if (!cartSizeElement) return;

    const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    cartSizeElement.textContent = cart.length;
}



// Always update cart size on page load
updateCartSize();

window.addEventListener("load", function () {

    let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

    const cartItemsElement = document.querySelector("#cart-items");
    const cartTotalElement = document.querySelector("#cart-total");

    if (!cartItemsElement || !cartTotalElement) return;

    function renderCart() {
        cartItemsElement.innerHTML = "";
        let totalAmount = 0;

        if (shoppingCart.length === 0) {
            cartItemsElement.textContent = "";
            cartTotalElement.textContent = "0.00";
            updateCartSize();
            return;
        }

        shoppingCart.forEach((item, index) => {
            const card = document.createElement("div");
            card.className = "cart-item-card";

            card.innerHTML = `
                <img src="${item.productImage}" class="cart-item-image">

                <div class="cart-item-info">
                    <div>
                        <h4 class="cart-item-name">${item.productName}</h4>
                        <p class="cart-item-price">${item.productPrice}</p>
                    </div>

                    <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
                </div>
            `;

            cartItemsElement.append(card);

            const priceNumber = parseFloat(item.productPrice.replace("Price: £", ""));
            totalAmount += priceNumber;
        });

        cartTotalElement.textContent = totalAmount.toFixed(2);
        updateCartSize();
    }

    // Delete item + update cart size instantly
    window.deleteItem = function (index) {
        shoppingCart.splice(index, 1);
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
        updateCartSize();
        renderCart();
    };

    renderCart();
});
