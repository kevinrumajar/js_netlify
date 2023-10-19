import os
import requests
import firebase_admin
import random
import logging
from datetime import date
from firebase_admin import credentials, firestore
from flask import Flask, request, jsonify, render_template
from urllib.parse import urlparse

# Mengatur logging
logging.basicConfig(level=logging.DEBUG)


# Konfigurasi Firebase dan Google Custom Search
CRED_PATH = "C:\\Users\\Acer\\netlify_firebase\\auto-netlify-firebase-adminsdk-z4jza-fbe18d4489.json"
API_KEY = 'AIzaSyDbAHHH8mkJvCMPBjL0l_HUAkzkN90n3Sk' 
CSE_ID = '30dfd31d44f5947c1'      

# Inisialisasi Firebase
cred = credentials.Certificate(CRED_PATH)
firebase_admin.initialize_app(cred)
db = firestore.client()

# Muat kata kunci dari file dan simpan ke Firestore
try:
    with open('keywords.txt', 'r') as file:
        keywords = file.readlines()
except FileNotFoundError:
    print("File keywords.txt not found.")
    keywords = []


# Periksa dan simpan kata kunci ke Firestore
for keyword in keywords:
    original_keyword = keyword  # menyimpan kata kunci asli untuk debug
    keyword = keyword.strip()
    cleaned_keyword = keyword.replace('.', '-').replace('/', '_')

    # Hapus spasi dan karakter '/' dari awal dan akhir cleaned_keyword
    cleaned_keyword = cleaned_keyword.strip().strip('/')

    # Pastikan cleaned_keyword tidak kosong setelah pembersihan
    if cleaned_keyword:
        # Mengecek jika kata kunci sudah ada di database
        if not db.collection('keyword_collections').document(cleaned_keyword).get().exists:
            db.collection('keyword_collections').document(cleaned_keyword).set({'keyword': keyword})
    else:
        print(f"Kata kunci asli '{original_keyword}' setelah pembersihan menjadi kosong dan tidak valid sebagai ID dokumen.")

app = Flask(__name__)

# Membersihkan data untuk Firebase
def clean_data_for_firebase(data):
    """Membersihkan data agar sesuai dengan aturan Firebase (mengganti karakter yang tidak diperbolehkan)"""
    if isinstance(data, dict):
        return {k.replace('.', '-').replace('$', 'S').replace('#', 'H').replace('[', 'O').replace(']', 'C').replace('/', 'SL'): clean_data_for_firebase(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [clean_data_for_firebase(item) for item in data]
    else:
        return data

@app.route('/', methods=['GET'])
def search_and_store():
    """Mengembalikan hasil pencarian berdasarkan subdomain dan menyimpan hasil pencarian ke Firebase"""
    host = request.headers.get('Host')
    parsed_host = urlparse(f"http://{host}")
    domain_parts = parsed_host.netloc.split('.')
    # Ambil hanya bagian domain utama dan TLD (misalnya, ambil 'domain.com' dari 'sub.domain.com')
    domain = '.'.join(domain_parts[-2:]) 
    subdomain = host.split('.')[0] if '.' in host else None
    print(f"Subdomain: {subdomain}")  # Debugging

    spintax_choices = ["berita keren", "info Terbaru"]
    selected_spintax = random.choice(spintax_choices)
    title = f"{selected_spintax.title()}"  # Ini akan memanggil metode title() dan mengembalikan string yang dimodifikasi.
    print(f"type of selected_spintax: {type(selected_spintax)}")
    print(f"type of subdomain: {type(subdomain)}")
    print(f"selected_spintax: {selected_spintax}")
    print(f"subdomain: {subdomain}")

    if not subdomain:
        return jsonify({"error": "Subdomain is required"}), 400

    # Cek hasil pencarian di Firestore
    keyword_ref = db.collection('search_results').document(subdomain)
    try:
        saved_results = keyword_ref.get().to_dict()
    except Exception as e:
        logging.exception(f"Failed to fetch data from Firestore: {e}")
        print(f"Failed to fetch data from Firestore: {e}")
        saved_results = None

    keywords_ref = db.collection('keyword_collections')
    from random import shuffle
    keywords_docs = keywords_ref.limit(1000).stream()
    keywords_list = [doc.id for doc in keywords_docs]
    shuffle(keywords_list)

    # Membuat tabel dengan konten dari kata kunci
    table_rows = 36
    table_cols = 5
    table_content = []
    for _ in range(table_rows):
        row_content = keywords_list[:table_cols]
        keywords_list = keywords_list[table_cols:]
        table_content.append(row_content)

    if saved_results and 'results' in saved_results:
        return render_template('results.html', results=saved_results['results'], title=title, host=host, canonical_url=request.url, domain=domain, keywords=keywords_list, table_content=table_content), 200

    # Jika belum ada di Firestore, gunakan Google Custom Search API
    search_url = f"https://www.googleapis.com/customsearch/v1?q={subdomain}&key={API_KEY}&cx={CSE_ID}"
    try:
        response = requests.get(search_url)
        response.raise_for_status()
        search_results = response.json().get('items', [])
        print(f"Search results from Google API: {search_results}")
        logging.debug(f"Search results from Google API: {search_results}")
    except requests.exceptions.HTTPError as e:
        logging.error(f"Request returned status code {response.status_code}")
        return jsonify({"error": f"Request returned status code {response.status_code}"}), 500
    except Exception as e:
        logging.error(f"Failed to fetch search results: {str(e)}")
        return jsonify({"error": f"Failed to fetch search results: {str(e)}"}), 500
    

        # ... kode sebelumnya ...

    # Membersihkan data dan menyimpan hasil pencarian ke Firestore
    cleaned_results = clean_data_for_firebase(search_results)
    data_to_save = {"results": cleaned_results}
    keyword_ref.set(data_to_save)

    if saved_results and 'results' in saved_results:
        for item in saved_results.get('results', []):
            if 'title' not in item:
                logging.warning(f"Missing title in item: {item}")
        return render_template('results.html', results=saved_results['results'], title=title, domain=domain, host=host, canonical_url=request.url, keywords=keywords_list, table_content=table_content), 200
    else:
        # Pastikan mengirim 'search_results', bukan 'saved_results'
        return render_template('results.html', results=search_results, title=title, host=host, domain=domain, canonical_url=request.url, keywords=keywords_list, table_content=table_content), 200


@app.route('/sitemap.xml', methods=['GET'])
def generate_sitemap():
    domain = request.headers.get('Host')
    keywords_ref = db.collection('keyword_collections')
    from random import shuffle
    keywords_docs = keywords_ref.limit(1000).stream()
    keywords_list = [doc.id for doc in keywords_docs]
    shuffle(keywords_list)
    
    # Ambil 1888 keywords acak dari list
    random_keywords = random.sample(keywords_list, min(1888, len(keywords_list)))

    sitemap_content = '<?xml version="1.0" encoding="UTF-8"?>'
    sitemap_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    
    for keyword in random_keywords:
        sitemap_content += f'''
        <url>
            <loc>https://{keyword}.{domain}</loc>
            <lastmod>{date.today().isoformat()}</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.9</priority>
        </url>'''
    
    sitemap_content += '</urlset>'
         # contoh sederhana dari data sitemap untuk dikirim ke template
    sitemap_data = [{'url': f"https://{keyword}.{domain}", 'name': keyword} for keyword in random_keywords]
    print(keywords_list)
    print(sitemap_content)
    return sitemap_content, 200, {'Content-Type': 'text/xml'}


if app.debug:
    logging.info("Running in Debug Mode")

if __name__ == '__main__':
    debug_mode = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(debug=debug_mode, port=int(os.environ.get('PORT', 8080)))


