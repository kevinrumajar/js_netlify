// fungsi generate-sitemap yang menghasilkan konten sitemap XML secara dinamis
exports.handler = async (event, context) => {
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <!-- Isi sitemap secara dinamis di sini -->
    </urlset>`;

    return {
        statusCode: 200,
        body: sitemapContent,
        headers: {
            "Content-Type": "application/xml",
        },
    };
};
