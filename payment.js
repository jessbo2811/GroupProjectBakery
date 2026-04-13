// Submit handler
document.getElementById("payment-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(this));

    const message = document.getElementById("message");

    // Clean card number (remove spaces)
    const cardNumber = formData.card.replace(/\s/g, "");

    // Validation
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

        message.innerText = "Payment successful 🌸";

        setTimeout(() => {
            window.location.href = "success.html";
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
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("order-summary");

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = "<p>No items in cart</p>";
        return;
    }

    let total = 0;
    container.innerHTML = "<h2>Order Summary</h2>";

    cart.forEach(item => {
        total += item.price * item.qty;

        container.innerHTML += `
            <p>${item.name} x${item.qty} - £${(item.price * item.qty).toFixed(2)}</p>
        `;
    });

    container.innerHTML += `<h3>Total: £${total.toFixed(2)}</h3>`;

    // Update button price
    const button = document.querySelector("#payment-form button");
    if (button) {
        button.innerText = `Pay £${total.toFixed(2)}`;
    }
}

loadOrderSummary();