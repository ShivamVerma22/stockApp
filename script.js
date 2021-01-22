let search = document.querySelector("#search");
let btnsearch = document.querySelector("#btnsearch");
let result = document.querySelector("#result");

const searchStocks = async (searchText) => {
  if (searchText !== "") {
    // const res = await fetch(
    //   `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=XZREFBEP6G53E33E`
    // );
    const res = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BSE:TCS&outputsize=full&apikey=XZREFBEP6G53E33E`
    );
    const stocks = await res.json();

    console.log(stocks);

    // outputHtml(stocks);
  }
};

outputHtml = (stocks) => {
  if (stocks.bestMatches.length > 0) {
    const html = stocks.bestMatches.map((s) => {
      if ((s["4. region"] = "India/Bombay")) {
        return `<h2 id="${s["1. symbol"]}"> ${s["2. name"]} </h2>`;
      }
    });

    result.innerHTML = html.join(" ");
  }
};

btnsearch.addEventListener("click", () => searchStocks(search.value));


