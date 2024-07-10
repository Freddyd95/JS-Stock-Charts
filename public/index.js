function getColor(stock) {
    if (stock === "AMZN") {
      return "rgba(61, 161, 61, 0.7)";
    }
    if (stock === "SONY") {
      return "rgba(209, 4, 25, 0.7)";
    }
    if (stock === "DIS") {
      return "rgba(18, 4, 209, 0.7)";
    }
    if (stock === "BNTX") {
      return "rgba(166, 43, 158, 0.7)";
    }
  }

async function main() {

    let response = await fetch(
        "https://api.twelvedata.com/time_series?symbol=AMZN,SONY,DIS,BNTX&interval=1day&apikey=8c1057957c3d4bd49704523dd9e3ae2c"
    );
    let result = await response.json();
    const timeChartCanvas = document.querySelector("#time-chart")
    const highestPriceChartCanvas = document.querySelector(
        "#highest-price-chart"
    );
    const averagePriceChartCanvas = document.querySelector(
        "#average-price-chart"
    );

    let { AMZN, SONY, DIS, BNTX } = result;
    let stocks = [AMZ, SONY, DIS, BNTX];
    console.log(mockData);
    console.log(stocks[0].values);

    stocks.forEach((stock) => stock.values.reverse());
    new CharacterData(timeChartCanvas.getContext("2d"), {
        type: "line",
        data: {
            labels: stocks[0].values.map((value) => value.datetime),
            datasets: stocks.map((stock) => ({
                label: stock.meta.symbol,
                data: stock.values.map((value) => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                broderColor: getColor(stock.meta.symbol),
            })),
        },
    }),

    new CharacterData(averagePriceChartCanvas.getContext("2d"), {
        type: "pie",
        data: {
            labels: stocks.map((stock) => stock.meta.sybol), 
            datasets: [
                {
                    label: "Average",
                    data: stocks.map((stock) => averageValue(stock.values)),
                    backgroundColor: stocks.map((stock) => getColor(stock.meta.symbol)),
                    broderColor: stocks.map((stock) => getColor(stock.meta.symbol)),
                },
            ],
        },
    });
}

function highestValue(values) {
    let highest =0;
    values.forEach((value) => {
        if (parseFloat(value.high) > highest) {
            highest = value.high;
        }
    });
    return highest;
}
function averageValue(values) {
    let average = 0;
    values.forEach((value) => {
        average += parseFloat(value.high);
    });
    return average / value.length;
}

main();