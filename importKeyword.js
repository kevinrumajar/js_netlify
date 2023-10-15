// importKeywords.js

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, collection, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Inisialisasi Firebase
const firebaseConfig = {
    // Konfigurasi Firebase Anda
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function importKeywords() {
    try {
        // Baca file keywords.txt (disimpan dalam repositori Netlify)
        const response = await fetch('/keywords.txt');
        const keywordsText = await response.text();
        const keywords = keywordsText.split('\n');

        // Loop melalui kata kunci dan simpan ke Firebase Firestore
        for (const keyword of keywords) {
            const cleanedKeyword = keyword.trim().replace(/\./g, '-').replace(/\//g, '_');
            const keywordDocRef = doc(db, 'keyword_collections', cleanedKeyword);
            const keywordDoc = await getDoc(keywordDocRef);

            // Periksa apakah kata kunci sudah ada di Firestore
            if (!keywordDoc.exists()) {
                await setDoc(keywordDocRef, { keyword: keyword });
            }
        }

        console.log('Data kata kunci berhasil diimpor ke Firebase Firestore.');
    } catch (error) {
        console.error('Gagal mengimpor data kata kunci:', error);
    }
}

// Panggil fungsi importKeywords saat halaman dimuat
importKeywords();
