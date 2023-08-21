document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "4bf07334da16a38adda5b523ea484d18";
  const maxArticles = 5;

  function fetchNews(symbol) {
    const apiUrl = `https://gnews.io/api/v4/search?q=${symbol}&token=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const articles = data.articles || [];
        const newsContainer = document.getElementById("news-list");
        newsContainer.innerHTML = ""; // Clear existing news

        let articleCount = 0;

        for (const article of articles) {
          if (articleCount < maxArticles) {
            const newsItem = document.createElement("div");
            newsItem.className = "news-article";

            newsItem.innerHTML = `
              <h3>${article.title}</h3>
              <img src="${article.image}" width="10%" height="10%"></img>
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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  // Button click handlers
  const worldNewsButton = document.getElementById("world-news");
  const localNewsButton = document.getElementById("local-news");
  const catNewsButton = document.getElementById("cat-news");

  // Set default news category to "Global" (world-news)
  fetchNews("world");

  worldNewsButton.addEventListener("click", (event) => {
    event.preventDefault();
    fetchNews("world");
  });

  localNewsButton.addEventListener("click", (event) => {
    event.preventDefault();
    fetchNews("norge");
  });

  catNewsButton.addEventListener("click", (event) => {
    event.preventDefault();
    fetchNews("cats");
  });
});



