<?php
$database_host = 'localhost';
$database_name = 'rtpkipas_kata_database';
$database_user = 'rtpkipas_sociogramics';
$database_password = 'selalu_Hoki88';

// Koneksi menggunakan PDO
$pdo = new PDO('mysql:host=' . $database_host . ';dbname=' . $database_name, $database_user, $database_password);
if (!$pdo) {
    die("Connection failed: " . $pdo->errorInfo());
}

// Header untuk format XML
header("Content-Type: text/xml");

echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

$query = $pdo->prepare("SELECT keyword FROM keywords ORDER BY RAND() LIMIT 1888");
$query->execute();
$keywords = $query->fetchAll(PDO::FETCH_COLUMN);

foreach ($keywords as $keyword) {
    $sanitizedKeyword = str_replace(' ', '-', strtolower($keyword));
    echo '<url>';
    $domain = $_SERVER['HTTP_HOST'];
    echo '<loc>https://' . htmlspecialchars($sanitizedKeyword) . '.' . $domain . '</loc>';
    echo '<lastmod>' . date("Y-m-d") . '</lastmod>';
    echo '<changefreq>daily</changefreq>';
    echo '<priority>0.9</priority>';
    echo '</url>';
}

echo '</urlset>';
?>
