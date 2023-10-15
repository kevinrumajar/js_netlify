// netlify-functions/sitemap.js
const admin = require('firebase-admin');
const serviceAccount = require('/.netlify/netlify-functions/auto-netlify-firebase-adminsdk-z4jza-fbe18d4489.json');
// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBE3V28VDRZiDnRmbUMiyeS59qAe0vVsRQ",
    authDomain: "auto-netlify.firebaseapp.com",
    projectId: "auto-netlify",
};

// Inisialisasi Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
admin.initializeApp(firebaseConfig);
const db = admin.firestore();

// mengambil kata kunci dari FB

async function getAllKeywords() {
    const keywordCollectionRef = db.collection('keyword_collections');
    const keywordSnapshot = await keywordCollectionRef.get();
    return keywordSnapshot.docs.map(doc => doc.data().keyword);
}


// menghasilkan konten sitemap

async function generateSitemap() {
    const keywords = await getAllKeywords();
    const sitemapEntries = keywords.map(keyword => {
        const formattedKeyword = keyword.replace(/ /g, '-').toLowerCase();
        const url = `https://(subdomain).netlify.app/${formattedKeyword}`;
        return `
<url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
</url>`;
    }).join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`;
}


// Menangani Permintaan Fungsi:

exports.handler = async function(event, context) {
    try {
        const sitemapContent = await generateSitemap();
        return {
            statusCode: 200,
            headers: {"Content-Type": "application/xml"},
            body: sitemapContent
        };
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return {
            statusCode: 500,
            body: 'Internal Server Error'
        };
    }
};
