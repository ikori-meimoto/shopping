let TRUE = "true";
let FALSE = "false";
let ZERO_VALUE = "0";

var j = 0;
var itemsCounter = 1; // index, gives items their key for map

// totals variables
var overallTotal = 0;
var snapTotal = 0;
var nonSnapTotal = 0;

// button elements
var addButton = document.getElementById("add-button"); // the ADD BUTTON
var removeButton = document.getElementById("remove-button"); // the REMOVE BUTTON
var addItemButton = document.getElementById("add-item"); // the ADD ITEM BUTTON
var removeItemButton = document.getElementById("closeRemovePopupBtn"); // the REMOVE ITEM BUTTON

// div elements
var addPopup = document.getElementById("popup"); // the ADD POPUP DIV
var removePopup = document.getElementById("remove-input"); // the REMOVE POPUP DIV
var expenseListContainer = document.getElementById("expenses-list"); // the

// totals elements
var overallTotalElement = document.getElementById("totals-overall");
var snapTotalElement = document.getElementById("totals-snap");
var nonSnapTotalElement = document.getElementById("totals-non");

// Object template for all items
// const item = {
//   name: "",
//   required: FALSE,
//   snap: FALSE,
//   price: 0.0,
//   quantity: 0,
//   total_item: 0,
//   total_snap: 0,
// };

// List to store items
const clientItems = new Map([]);

// === OPEN AND CLOSE ADD ITEM POPUP ===========================

function openPopup() {
  console.log("openPopup() was called...");
  addPopup.classList.remove("d-none"); // show add popup
  addButton.classList.add("d-none"); // hide add btn
  removeButton.classList.add("d-none"); // hide remove btn
}

function closePopup() {
  console.log("closePopup() was called...");
  addPopup.classList.add("d-none"); // hide add popup
  addButton.classList.remove("d-none"); // show add btn
  removeButton.classList.remove("d-none"); // show remove btn
}

// ==============================================================

// ADD THE ITEM TO THE TABLE ON-SCREEN
function addItemToTable() {
  console.log("addItemToTable() was called...");

  var item = {
    name: document.getElementById("item").value,
    required: document.getElementById("required").checked,
    snap: document.getElementById("snap-eligible").checked,
    price: document.getElementById("price").value,
    quantity: document.getElementById("quantity").value,
    total_item:
      document.getElementById("price").value *
      document.getElementById("quantity").value,
    total_snap:
      document.getElementById("price").value *
      document.getElementById("quantity").value,
  };

  createItemObject(item);
  expensiveItems();
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

  if ((item.snap = TRUE)) {
    data_total_2.innerText = item.total_snap;
    data_total_1.innerText = ZERO_VALUE;
  } else {
    data_total_1.innerText = item.total_item;
    data_total_2.innerText = ZERO_VALUE;
  }
}

// GRAB VALUES FROM FORM AND ASSIGN THEM TO CORRESPONDING ITEM OBJECT VALUES
function createItemObject(item) {
  console.log("createItemObject() was called...");

  // Add the current item to the Dictionary, with its key as the current Map index
  clientItems.set(itemsCounter, item);

  // clientItems.set(itemsCounter, {
  //   name: item.name,
  //   price: item.price,
  //   quantity: item.quantity,
  //   total_item: item.total_item,
  //   total_snap: item.total_snap,
  //   required: item.required,
  //   snap: item.snap,
  // });

  updateTotal();
  itemToConsole(itemsCounter);
  itemsCounter++;
}

// SENDS ITEM TO CONSOLE SO DEV KNOWS THAT ITEM WAS SUCCESSFULLY PLACED IN DICTIONARY
function itemToConsole(key) {
  console.log("itemToConsole() was called with key [" + key + "]");
  var currentItem = clientItems.get(key);
  console.log(currentItem);
}

// UPDATES TOTAL BY RUNNING THROUGH MAP AND ADDING TOTAL OF ALL ITEMS
function updateTotal() {
  console.log("updateTotal() was called...");

  overallTotal = 0;
  snapTotal = 0;
  nonSnapTotal = 0;

  console.log(clientItems);

  for (var i = 1; i <= clientItems.size; i++) {
    var indexItem = clientItems.get(i);
    console.log(indexItem);

    overallTotal += indexItem.total_item;
    if ((indexItem.snap = TRUE)) {
      snapTotal += indexItem.total_snap;
      console.log(`[${indexItem.name}] is snap-applicable`);
    } else {
      nonSnapTotal += indexItem.total_item;
      console.log(`[${indexItem.name}] is not snap-applicable`);
    }
  }

  overallTotalElement.innerText = "Overall Total: $" + overallTotal;
  snapTotalElement.innerText = "SNAP Total: $" + snapTotal;
  nonSnapTotalElement.innerText = "Non-SNAP Total: $" + nonSnapTotal;
  // if(budgetValue != null){

  //   budgetValue = budgetValue - overallTotal;
  // }

  console.log("overallTotal: " + overallTotal);
  console.log("snapTotal: " + snapTotal);
  console.log("nonTotal: " + nonSnapTotal);
}

// OPEN REMOVE ITEM POPUP
function openRemovePopup() {
  console.log("openRemovePopup() was called...");
  removePopup.classList.remove("d-none"); // show remove popup
  removeButton.classList.add("d-none"); // hide remove btn
  addButton.classList.add("d-none"); // hide add btn
}

// REMOVE ITEM ASSOCIATED WITH KEY FROM MAP AND TABLE
function removeItems() {
  const key = document.getElementById("key").value;
  console.log("The current key is " + key);

  console.log("removeItemsChecked() was called...");
  removeButton.classList.remove("d-none"); // show remove btn
  addButton.classList.remove("d-none"); // show add btn
  removePopup.classList.add("d-none"); // hide remove popup

  console.log(clientItems); // show me the map
  itemToConsole(key); // show me the item the key returns

  let table = document.getElementById("table"); // grab the table so we can edit it
  var removeItem = clientItems.get(key); // this is the item we're removing
  var isGone = clientItems.delete(key); // DELETE IT -- returns true or false if it actually deleted

  console.log(`Also calling ${table} for editing and removal.`);

  if (isGone == true) {
    console.log(`Successfully deleted [${removeItem.name}]`);
    table.deleteRow(key + 1); // DELETE THE ROW WITH THE ITEM IN IT
    console.log(`Successfully deleted row ${key}.`);
  } else {
    console.log(`Removal of item on row ${key} failed. Wrong row number?`);
  }

  updateTotal(); // Make sure the totals reflect the removed item
}

// GRAB THE MOST EXPENSIVE ITEM
function expensiveItems() {
  console.log("expensiveItems() was called...");

  console.log(clientItems);

  const expItems = [""];

  for (var i = 1; i <= clientItems.size; i++) {
    var indexItem = clientItems.get(i);
    console.log(indexItem);

    if (indexItem.price > expItems[0]) {
      expItems[0] = indexItem;
      console.log(`${expItems[0].price} is less than ${indexItem.price}`);
    }
  }

  var list_code = `${indexItem.name}: $${indexItem.price}`;
  expenseListContainer.innerText = list_code;
}

addButton.addEventListener("click", openPopup);
addItemButton.addEventListener("click", addItemToTable);
removeButton.addEventListener("click", openRemovePopup);
removeItemButton.addEventListener("click", removeItems);