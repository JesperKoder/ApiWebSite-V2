// Replace with your actual Alpha Vantage API key
const apiKey = "90PDM6IYSEDD2BH3";

const tickerInput = document.getElementById("tickerInput");
const searchButton = document.getElementById("searchButton");
const stockChart = document.getElementById("stockChart").getContext("2d");

searchButton.addEventListener("click", () => {
  const symbol = tickerInput.value;

  fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      const dates = Object.keys(data["Time Series (Daily)"]).reverse();
      const closingPrices = dates.map(
        (date) => data["Time Series (Daily)"][date]["4. close"]
      );

      renderChart(dates, closingPrices);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

function renderChart(dates, prices) {
  new Chart(stockChart, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Closing Price",
          data: prices,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}
