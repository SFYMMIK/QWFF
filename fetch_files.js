const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url');

const fetchAndSave = async (fileUrl, directory) => {
    try {
        const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
        const filePath = path.join(directory, path.basename(fileUrl));
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, response.data);
        console.log(`Saved: ${filePath}`);
    } catch (error) {
        console.error(`Failed to download ${fileUrl}: ${error.message}`);
    }
};

const processUrl = async (baseUrl, directory) => {
    try {
        const response = await axios.get(baseUrl);
        const $ = cheerio.load(response.data);

        // Save HTML file
        const indexFilePath = path.join(directory, 'index.html');
        fs.writeFileSync(indexFilePath, response.data);
        console.log(`Saved: ${indexFilePath}`);

        // Collect all the assets
        const assets = [];

        $('link[rel="stylesheet"]').each((_, el) => {
            const href = $(el).attr('href');
            if (href) {
                assets.push(url.resolve(baseUrl, href));
            }
        });

        $('script[src]').each((_, el) => {
            const src = $(el).attr('src');
            if (src) {
                assets.push(url.resolve(baseUrl, src));
            }
        });

        $('img[src]').each((_, el) => {
            const src = $(el).attr('src');
            if (src) {
                assets.push(url.resolve(baseUrl, src));
            }
        });

        // Download all assets
        for (const assetUrl of assets) {
            await fetchAndSave(assetUrl, directory);
        }

    } catch (error) {
        console.error(`Failed to process URL ${baseUrl}: ${error.message}`);
    }
};

// Command-line arguments
const [,, baseUrl, directory] = process.argv;

if (!baseUrl || !directory) {
    console.error('Usage: node fetch_files.js <baseUrl> <directory>');
    process.exit(1);
}

processUrl(baseUrl, directory);
