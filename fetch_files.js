// fetch_files.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url');

const fetchAndSave = async (fileUrl, directory) => {
    try {
        const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
        const parsedUrl = url.parse(fileUrl);
        const filePath = path.join(directory, parsedUrl.pathname);
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, response.data);
        console.log(`Saved: ${filePath}`);
    } catch (error) {
        console.error(`Failed to download ${fileUrl}: ${error.message}`);
    }
};

const fetchAndSaveAssets = async (baseUrl, directory) => {
    try {
        const response = await axios.get(baseUrl);
        const $ = cheerio.load(response.data);
        const promises = [];

        $('link[rel="stylesheet"]').each((_, element) => {
            const href = $(element).attr('href');
            if (href) {
                const assetUrl = url.resolve(baseUrl, href);
                promises.push(fetchAndSave(assetUrl, directory));
            }
        });

        $('script[src]').each((_, element) => {
            const src = $(element).attr('src');
            if (src) {
                const assetUrl = url.resolve(baseUrl, src);
                promises.push(fetchAndSave(assetUrl, directory));
            }
        });

        $('img[src]').each((_, element) => {
            const src = $(element).attr('src');
            if (src) {
                const assetUrl = url.resolve(baseUrl, src);
                promises.push(fetchAndSave(assetUrl, directory));
            }
        });

        promises.push(fetchAndSave(baseUrl, directory));
        await Promise.all(promises);
    } catch (error) {
        console.error(`Failed to fetch assets from ${baseUrl}: ${error.message}`);
    }
};

const processUrl = async (baseUrl, directory, fetchAssets) => {
    if (fetchAssets) {
        await fetchAndSaveAssets(baseUrl, directory);
    } else {
        await fetchAndSave(baseUrl, directory);
    }
};

// Command-line arguments
const [,, baseUrl, directory, fetchAssetsFlag] = process.argv;
const fetchAssets = fetchAssetsFlag === 'true';

if (!baseUrl || !directory) {
    console.error('Usage: node fetch_files.js <baseUrl> <directory> <fetchAssetsFlag>');
    process.exit(1);
}

processUrl(baseUrl, directory, fetchAssets);
