let TRUE = "true";
let FALSE = "false";

var showPopup = document.getElementById("add-button"); // add button at bottom of the screen
var addItem = document.getElementById("add-item"); // add item button to list

var popupElement = document.getElementById("popup"); // grab the popup element

const item = {
    name: "",
    required: FALSE,
    snap: FALSE,
    price: 0.00,
    quantity: 0,
    total_item: price * quantity,
    total_snap: price * quantity
}

function openPopup(){
    popupElement.classList.remove("d-none");
    showPopup.classList.add("d-none");
    console.log("Popup was opened!");

}

function closePopup(){
    popupElement.classList.add("d-none");
    showPopup.classList.remove("d-none");
    console.log("Popup was closed");
}

showPopup.addEventListener("click", openPopup);
addItem.addEventListener("click", closePopup);