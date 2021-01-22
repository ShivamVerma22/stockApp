let search = document.querySelector("#search");
let btnsearch = document.querySelector("#btnsearch");
let result = document.querySelector("#result");
let dropDownStock = document.querySelector("#stock");
let number = document.querySelector("#number");
let datePicker = document.querySelector("#datePicker");
let calculate = document.querySelector("#calculate");
let clear = document.querySelector("#clear");

let selectedStock, noOfStock, dateOfPurchase, valueToday, valueThatDay, diff;

// Search functionality

// const searchStocks = async (searchText) => {
//   if (searchText !== "") {
//     const res = await fetch(
//       `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=XZREFBEP6G53E33E`
//     );

//     const stocks = await res.json();

//     console.log(stocks);

//     outputHtml(stocks);
//   }
// };

// outputHtml = (stocks) => {
//   if (stocks.bestMatches.length > 0) {
//     const html = stocks.bestMatches.map((s) => {
//       if ((s["4. region"] = "India/Bombay")) {
//         return `<h2 id="${s["1. symbol"]}"> ${s["2. name"]} </h2>`;
//       }
//     });

//     result.innerHTML = html.join(" ");
//   }
// };

// if (btnsearch) {
//   btnsearch.addEventListener("click", () => searchStocks(search.value));
// }

// Profit or Loss Calculate Functionality

const getStockData = async () => {
  const res = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BSE:${selectedStock}&outputsize=full&apikey=XZREFBEP6G53E33E`
  );

  const stocks = await res.json();

  console.log(stocks);

  valueToday = stocks["Time Series (Daily)"][`${today}`]["4. close"];

  console.log(valueToday);
};

const getStockData2 = async () => {
  const res = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BSE:${selectedStock}&outputsize=full&apikey=XZREFBEP6G53E33E`
  );

  const stocks = await res.json();

  console.log(stocks);

  valueThatDay = stocks["Time Series (Daily)"][`${dateOfPurchase}`]["4. close"];

  if(valueThatDay){
    calculate.hidden = false
    clear.hidden = false
  } else{
    setErrorStatement("Sorry value for that day is not available.")
  }
  console.log(valueThatDay);
};

dropDownStock.addEventListener("change", function () {
  selectedStock = dropDownStock.value;
  if(selectedStock){
   getStockData();
  } 
});

datePicker.addEventListener("change", function () {
  dateOfPurchase = datePicker.value;
  if(dateOfPurchase){
    getStockData2();
  }
});

number.addEventListener("change", function(){
  noOfStock = number.value;
})

var today = new Date();
var dd = String(today.getDate() - 1).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();

today = `${yyyy}-${mm}-${dd}`;



calculate.addEventListener("click", function(){
  if (!selectedStock) {
    setErrorStatement("Please Select a Stock")
  } else {
    setErrorStatement("")
  }
  if(!noOfStock){
    setErrorStatement("Enter the number of stocks")
  } else {
    if (isNaN(noOfStock)) {
      number.value = "";
      setErrorStatement("Only number input allowed for number of stock");
    } else {
      setErrorStatement("");
    }
  }
  if(!dateOfPurchase){
    setErrorStatement("Enter date of purchase for stock")
  } else {
    setErrorStatement("")
  }
  if(valueToday && valueThatDay && noOfStock){
    let totalTodayValue = valueToday * noOfStock;
    let totalPastValue = valueThatDay * noOfStock;
    let diff = totalTodayValue - totalPastValue;

    document.querySelector(".result-data").innerHTML = `
      <h3>Stock: ${selectedStock}</h3>
      <h3>Value per stock when purchased: ${valueThatDay}</h3>
      <h3>Value per stock today: ${valueToday}</h3>
      <h3>Amount spent when purchased: ${totalPastValue}</h3>
      <h3>Total value of stocks today: ${totalTodayValue}</h3>
      ${diff > 0 ? `<h3 class="profit">Profit :  ${diff}</h3>` : `<h3 class="loss">Loss : ${-diff}</h3>`}
    `;
  }
})

clear.addEventListener("click", function(){
  dropDownStock.value = ""
  number.value = ""
  datePicker.value = ""
})

function setErrorStatement(statement){
  if(statement !== ""){
    document.querySelector(".error").innerHTML =
      document.querySelector(".error").innerHTML + `<h3>${statement}</h3>`;
  } else {
    document.querySelector(".error").textContent = ``;
  }
}