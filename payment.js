// Submit handler
document.getElementById("payment-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(this));
    const message = document.getElementById("message");

    const cardNumber = formData.card.replace(/\s/g, "");

    if (cardNumber.length < 16) {
        message.innerText = "Invalid card number";
        return;
    }

    if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
        message.innerText = "Invalid expiry date";
        return;
    }

    if (formData.cvc.length < 3) {
        message.innerText = "Invalid CVC";
        return;
    }

    message.innerText = "Processing payment...";

    setTimeout(() => {
        localStorage.setItem("lastOrder", JSON.stringify(formData));
        message.innerText = "Payment successful";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);

    }, 2000);
});


// Card formatting
const cardInput = document.querySelector('input[name="card"]');

if (cardInput) {
    cardInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.substring(0, 16);
        value = value.replace(/(.{4})/g, "$1 ").trim();
        e.target.value = value;
    });
}


// Load order summary
function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    const container = document.getElementById("order-summary");

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = "<p>Your shopping cart is empty</p>";
        return;
    }

    let total = 0;
    container.innerHTML = "<h2>Order Summary</h2>";

    cart.forEach(item => {
        const price = parseFloat(item.productPrice.replace("Price: £", ""));
        total += price;

        container.innerHTML += `
            <p>${item.productName} - £${price.toFixed(2)}</p>
        `;
    });

    container.innerHTML += `<h3>Total: £${total.toFixed(2)}</h3>`;

    const button = document.querySelector("#payment-form button");
    if (button) {
        button.innerText = `Pay £${total.toFixed(2)}`;
    }
}

loadOrderSummary();