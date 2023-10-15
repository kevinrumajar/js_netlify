// fungsi generate-sitemap yang menghasilkan konten sitemap XML secara dinamis
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    try {
        // Ganti URL berikut dengan URL dari fungsi Firebase di firebase-functions/index.js
        const firebaseFunctionURL = 'https://us-central1-auto-netlify.cloudfunctions.net/generateSitemap';
        const response = await fetch(firebaseFunctionURL);
        const sitemapContent = await response.text();

        return {
            statusCode: 200,
            body: sitemapContent,
            headers: {
                "Content-Type": "application/xml",
            },
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: 'Error generating sitemap: ' + error,
        };
    }
};