const mysql = require('mysql-client');

const dbConfig = {
  host: 'localhost',
  user: 'rtpkipas_db1',
  password: 'FtsTAh8QAbaTJL8',
  database: 'rtpkipas_cache_results'
};

const db = mysql.createConnection(dbConfig);
const apiKey = 'AIzaSyA3-bceyKmJcnLp1uswmu7Ef6CnUyVVd6U';
const engineId = '1317e53d925fc4773';
const hostname = window.location.hostname;
const subdomain = hostname.split('.')[0];
const formattedSubdomain = subdomain.replace(/-/g, ' ');
const query = formattedSubdomain;
const encodedQuery = encodeURIComponent(query);
const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&q=${encodedQuery}&cx=${engineId}&num=5`;

// Check if the search results are already stored in the database
db.query('SELECT * FROM search_results WHERE subdomain = ?', [subdomain], (err, results) => {
  if (err) {
    console.error(err);
  } else {
    if (results.length > 0) {
      // Serve the cached results directly to the visitor
      document.getElementById('title2').innerHTML = formattedSubdomain.concat(" ", "[sociogramics]");
      setImageAttributes(subdomain);
      const article = document.getElementById('dynamicArticle');
      results.forEach(result => {
        const title = result.title;
        const snippet = result.snippet;
        const h2 = document.createElement('h2');
        h2.textContent = title;
        article.appendChild(h2);
        const p = document.createElement('p');
        p.textContent = snippet;
        article.appendChild(p);
      });
    } else {
      // Make the API call to Google Custom Search and store the results in the database
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const results = data.items;
          const article = document.getElementById('dynamicArticle');
          results.forEach(result => {
            const title = result.title;
            const snippet = result.snippet;
            const h2 = document.createElement('h2');
            h2.textContent = title;
            article.appendChild(h2);
            const p = document.createElement('p');
            p.textContent = snippet;
            article.appendChild(p);
          });
          // Store the search results in the database
          db.query('INSERT INTO search_results (subdomain, results) VALUES (?, ?)', [subdomain, results], (err, results) => {
            if (err) {
              console.error(err);
            }
          });
        })
        .catch(error => console.error(error));
    }
  }
});

function setImageAttributes(subdomain) {
  const topImage = document.getElementById('topImage');
  if (subdomain) {
    topImage.setAttribute('alt', 'Alt ' + subdomain);
    topImage.setAttribute('title', 'Judul ' + subdomain);
  }
}