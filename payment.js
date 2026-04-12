document.getElementById("payment-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(this));
    //Simple fake validation
    if (formData.card.length < 12) {
        document.getElementById(" message").innerText = "Invalid card number";
        return;

    }
//Simulate processing delay
    document.getElementById("message").innerText = "Processing payment...";
    setTimeout(() => {
//Save order locally (for demo)
        localStorage.setItem("lastOrder", JSON.stringify(formData));
        document.getElementById("message").innerText = "Payment successful";
        //Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = "success.html";
        }, 2000);
    }, 2000);
});