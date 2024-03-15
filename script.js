let TRUE = "true";
let FALSE = "false";

var overallTotal = 0;
var snapTotal = 0;
var nonSnapTotal = 0;

var showPopup = document.getElementById("add-button"); // add button at bottom of the screen
var addItemButton = document.getElementById("add-item"); // add item button to list
var popupElement = document.getElementById("popup"); // grab the popup element

// grab h3 elements to update totals onscreen
var total_overall = document.getElementById("totals-overall");
var total_snap = document.getElementById("totals-snap");
var total_non = document.getElementById("totals-non");

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

    item.required = document.getElementById("required").checked;
    item.snap = document.getElementById("snap-eligible").checked;

    overallTotal += item.total_item;

    if(item.snap == true){
        snapTotal += item.total_snap;
        console.log("This item is snap");
    }
    else{
        nonSnapTotal += item.total_item;
        console.log("This item is not snap");
    }

    updateTotal();
    toConsole();
}

function toConsole(){
    console.log("toConsole() was called...");

    console.log(item);

    console.log("overallTotal: " + overallTotal);
    console.log("snapTotal: " + snapTotal);
    console.log("nonTotal: " + nonSnapTotal);
}

function updateTotal(){
    console.log("updateTotal() was called...");

    total_overall.innerText = "Overall Total: $" + overallTotal;
    total_snap.innerText = "SNAP Total: $" + snapTotal;
    total_non.innerText = "Non-SNAP Total: $" + nonSnapTotal;
}

showPopup.addEventListener("click", openPopup);
addItemButton.addEventListener("click", addItemToTable);