let totalPrice = 0;

let totalElement = document.getElementById("shoppingCartTotal");

let buttons = document.getElementsByClassName("item_button");
let buttonsArray = Array.prototype.slice.call(buttons)

buttonsArray.forEach(button => {
    button.addEventListener("click", updateTotal);
})

function updateTotal(event) {
    console.log(event)
    let button = event.target;
    let parent = button.parentElement;
    let price = parseInt(parent.getElementsByClassName("item_price")[0].getAttribute("value"));    

    totalPrice += price;
    totalElement.innerText = totalPrice;

    parent.style.borderColor = "blue";
}

let paragraph = document.createElement("p");
let textNode = document.createTextNode("Some text for our paragraph");
paragraph.appendChild(textNode);

let navbar = document.getElementsByClassName("navbar")[0];
let shoppingCart = document.getElementsByClassName("shoppingCart")[0];
navbar.insertBefore(paragraph, shoppingCart);