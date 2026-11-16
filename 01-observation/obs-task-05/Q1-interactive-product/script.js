const productName = document.getElementById("productName");
const price = document.getElementById("price");
const quantity = document.getElementById("quantity");
const total = document.getElementById("total");

function calculateTotal() {
    const productPrice = parseFloat(price.value) || 0;
    const productQuantity = parseInt(quantity.value) || 0;

    const totalPrice = productPrice * productQuantity;

    total.textContent = totalPrice.toFixed(2);
}

price.addEventListener("input", calculateTotal);
quantity.addEventListener("input", calculateTotal);
productName.addEventListener("input", calculateTotal);