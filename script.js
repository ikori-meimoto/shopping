let TRUE = "true";
let FALSE = "false";

var showPopup = document.getElementById("add-button"); // add button at bottom of the screen
var addItemButton = document.getElementById("add-item"); // add item button to list

var popupElement = document.getElementById("popup"); // grab the popup element

const item = {
    name: "",
    required: FALSE,
    snap: FALSE,
    price: 0.00,
    quantity: 0,
    total_item: 0,
    total_snap: 0
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

function addItemToTable(){
    createItemObject();
    closePopup();

    let table = document.getElementById("table");

    let row = table.insertRow(-1);

    let data_item = row.insertCell(0);
    let data_required = row.insertCell(1);
    let data_snap = row.insertCell(2);
    let data_price = row.insertCell(3);
    let data_qu = row.insertCell(4);
    let data_total_1 = row.insertCell(5);
    let data_total_2 = row.insertCell(6);

    data_item.innerText = item.name;
    data_required.innerText = item.required;
    data_snap.innerText = item.snap;
    data_price.innerText = item.price;
    data_qu.innerText = item.quantity;

    if(item.snap = TRUE){
        data_total_2.innerText = item.total_snap;
        data_total_1.innerText = "$0.00";
    }
    else{
        data_total_1.innerText = item.total_item;
        data_total_2.innerText = "$0.00";
    }
}

function createItemObject(){
    item.name = document.getElementById("item").value;
    item.price = document.getElementById("price").value;
    item.quantity = document.getElementById("quantity").value;

    item.total_item = item.price * item.quantity;
    item.total_snap = item.total_item;

    item.required = document.getElementById("required").value;
    item.snap = document.getElementById("snap-eligible").value;

    console.log(item.required);
    console.log(item.snap);

    if(item.required = "on"){
        item.required = TRUE;
    }
    else{
        item.required = FALSE;
    }

    if(item.snap = "on"){
        item.snap = TRUE;
    }
    else{
        item.snap = FALSE;
    }

    toConsole();
}

function toConsole(){
    console.log("item.name: " + item.name);
    console.log("item.required: " + item.required);
    console.log("item.snap: " + item.snap);
    console.log("item.price: " + item.price);
    console.log("item.quantity: " + item.quantity);
    console.log("item.total_item: " + item.total_item);
    console.log("item.total_snap: " + item.total_snap);
}

showPopup.addEventListener("click", openPopup);
addItemButton.addEventListener("click", addItemToTable);