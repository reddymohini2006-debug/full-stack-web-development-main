const message = document.getElementById("message");

const contentButton = document.getElementById("contentButton");
const styleButton = document.getElementById("styleButton");
const attributeButton = document.getElementById("attributeButton");

const myLink = document.getElementById("myLink");

contentButton.addEventListener("click", function () {
    message.textContent = "The content has been changed using JavaScript.";
});

styleButton.addEventListener("click", function () {
    message.style.backgroundColor = "lightblue";
    message.style.color = "darkblue";
    message.style.fontSize = "24px";
    message.style.padding = "20px";
});

attributeButton.addEventListener("click", function () {
    myLink.setAttribute("href", "https://www.google.com");
    myLink.textContent = "Visit Google";
});