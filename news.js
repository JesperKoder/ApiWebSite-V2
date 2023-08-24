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

            // Create a div for the image and a div for the text content
            const newsImageDiv = document.createElement("div");
            const newsContentDiv = document.createElement("div");

            // Set classes for styling
            newsImageDiv.className = "news-image";
            newsContentDiv.className = "news-content";

            // Set the content of the image and text divs
            newsImageDiv.innerHTML = `<img src="${article.image}" width="90%" height="100%">`;
            newsContentDiv.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.description}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;

            // Append the image and content divs to the main news item div
            newsItem.appendChild(newsImageDiv);
            newsItem.appendChild(newsContentDiv);

            // Append the main news item div to the news container
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
