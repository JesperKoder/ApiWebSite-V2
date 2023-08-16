document.addEventListener("DOMContentLoaded", () => {
const apiKey = "4bf07334da16a38adda5b523ea484d18";
const symbol = "STOCK"; // Replace with the desired stock symbol
const maxArticles = 3;

const apiUrl = `https://gnews.io/api/v4/search?q=${symbol}&token=${apiKey}`;

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const articles = data.articles || [];

    if (articles.length > 0) {
      const newsContainer = document.getElementById("news-list");
      let articleCount = 0;

      for (const article of articles) {
        if (articleCount < maxArticles) {
          const newsItem = document.createElement("div");
          newsItem.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.publishedAt}</p>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
          `;
          newsContainer.appendChild(newsItem);

          articleCount++;
        } else {
          break; // Exit the loop once the desired number of articles is reached
        }
      }

      if (articleCount === 0) {
        console.log("No news articles available.");
      }
    }
    })
.catch((error) => {
      console.error("Error fetching data:", error);
    });
});
