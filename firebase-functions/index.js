/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Fungsi untuk mendapatkan semua kata kunci
async function getAllKeywords() {
    const keywordCollectionRef = admin.firestore().collection('keyword_collections');
    const keywordSnapshot = await keywordCollectionRef.get();
    return keywordSnapshot.docs.map(doc => doc.data().keyword);
}

// Fungsi untuk membuat sitemap XML
function generateRandomSitemap() {
    return new Promise(async (resolve, reject) => {
        const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${await generateSitemapEntries()}
</urlset>`;
        resolve(sitemapContent);
    });
}

// Fungsi untuk menghasilkan entri sitemap secara acak
async function generateSitemapEntries() {
    const keywords = await getAllKeywords();

    // Acak urutan kata kunci
    const shuffledKeywords = shuffleArray(keywords);

    return shuffledKeywords.map(keyword => {
        const sanitizedKeyword = keyword.replace(/ /g, '-').toLowerCase();
        const slug = sanitizedKeyword;
        const fullUrl = `https://${domain}/${slug}`;
        return `<url>
    <loc>${fullUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
</url>`;
    }).join('\n');
}

// Fungsi untuk mengacak urutan elemen dalam array
function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

exports.generateSitemap = functions.https.onRequest(async (request, response) => {
    const sitemapContent = await generateRandomSitemap();
    response.set("Content-Type", "application/xml");
    response.status(200).send(sitemapContent);
});



// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
