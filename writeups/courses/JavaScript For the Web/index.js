let totalPrice = 0;

let totalElement = document.getElementById("shoppingCartTotal");

let buttons = document.getElementsByClassName("item_button");
let buttonsArray = Array.prototype.slice.call(buttons)

buttonsArray.forEach(button => {
    button.addEventListener("click", updateTotal);
})

function updateTotal(event) {
    let button = event.target;
    let parent = button.parentElement;
    let price = parseInt(parent.getElementsByClassName("item_price")[0].getAttribute("value"));    

    totalPrice += price;
    totalElement.innerText = totalPrice;
}