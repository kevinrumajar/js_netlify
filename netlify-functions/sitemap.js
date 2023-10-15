// netlify-functions/sitemap.js
const admin = require('firebase-admin');
const serviceAccount = require('./auto-netlify-firebase-adminsdk-z4jza-fbe18d4489.json');

// Konfigurasi Firebase
const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount),
    apiKey: "AIzaSyBE3V28VDRZiDnRmbUMiyeS59qAe0vVsRQ",
    authDomain: "auto-netlify.firebaseapp.com",
    databaseURL: "https://auto-netlify-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "auto-netlify",
    storageBucket: "auto-netlify.appspot.com",
    messagingSenderId: "738942906760",
    appId: "1:738942906760:web:9017d863fbdf48f6ab8a3d",
    measurementId: "G-G6C253B2DQ"
};

// Inisialisasi Firebase
admin.initializeApp(firebaseConfig);

const db = admin.firestore();

// mengambil kata kunci dari FB

async function getAllKeywords() {
    const keywordCollectionRef = db.collection('keyword_collections');
    const keywordSnapshot = await keywordCollectionRef.get();
    return keywordSnapshot.docs.map(doc => doc.data().keyword);
}


// menghasilkan konten sitemap

async function generateSitemap(subdomain) {
    const keywords = await getAllKeywords();
    const sitemapEntries = keywords.map(keyword => {
        const formattedKeyword = keyword.replace(/ /g, '-').toLowerCase();
        const url = `https://${subdomain}.netlify.app/${formattedKeyword}`;
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
        const hostname = event.headers.host;  // Tambahkan baris ini
        const subdomain = hostname.split('.')[0];  // Tambahkan baris ini
        const sitemapContent = await generateSitemap(subdomain);  
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
