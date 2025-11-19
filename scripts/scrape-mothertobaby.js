/**
 * MotherToBaby Fact Sheet Scraper
 * Scrapes all 275+ medication/exposure fact sheets
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// List of all fact sheet URLs (will be populated)
const FACT_SHEET_URLS = [
  // Medications (A-Z)
  'https://mothertobaby.org/fact-sheets/acetaminophen-paracetamol/',
  'https://mothertobaby.org/fact-sheets/ibuprofen/',
  'https://mothertobaby.org/fact-sheets/amoxicillin/',
  'https://mothertobaby.org/fact-sheets/aspirin/',
  'https://mothertobaby.org/fact-sheets/azithromycin/',
  'https://mothertobaby.org/fact-sheets/bupropion/',
  'https://mothertobaby.org/fact-sheets/cetirizine/',
  'https://mothertobaby.org/fact-sheets/clonazepam/',
  'https://mothertobaby.org/fact-sheets/fluoxetine/',
  'https://mothertobaby.org/fact-sheets/gabapentin/',
  'https://mothertobaby.org/fact-sheets/hydrocodone/',
  'https://mothertobaby.org/fact-sheets/lamotrigine/',
  'https://mothertobaby.org/fact-sheets/levothyroxine/',
  'https://mothertobaby.org/fact-sheets/lisinopril/',
  'https://mothertobaby.org/fact-sheets/loratadine/',
  'https://mothertobaby.org/fact-sheets/metformin/',
  'https://mothertobaby.org/fact-sheets/methotrexate/',
  'https://mothertobaby.org/fact-sheets/omeprazole/',
  'https://mothertobaby.org/fact-sheets/ondansetron/',
  'https://mothertobaby.org/fact-sheets/prednisone/',
  'https://mothertobaby.org/fact-sheets/sertraline/',
  'https://mothertobaby.org/fact-sheets/warfarin/',
  // Add more as we discover them
];

async function scrapePage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractFactSheetData(html, url) {
  // Extract medication name from URL
  const medicationSlug = url.split('/fact-sheets/')[1]?.replace('/', '') || '';
  const medicationName = medicationSlug.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  // Simple HTML parsing (would use cheerio in production)
  const data = {
    name: medicationName,
    url: url,
    scrapedAt: new Date().toISOString(),
    // Placeholder for extracted data
    usage: extractSection(html, 'used for'),
    pregnancySafety: extractSection(html, 'pregnancy'),
    birthDefects: extractSection(html, 'birth defect'),
    breastfeeding: extractSection(html, 'breastfeeding'),
    warnings: extractSection(html, 'warning'),
  };

  return data;
}

function extractSection(html, keyword) {
  // Simplified extraction (would use proper DOM parsing in production)
  const lowerHtml = html.toLowerCase();
  const index = lowerHtml.indexOf(keyword);
  if (index === -1) return '';

  // Extract ~500 characters around keyword
  const start = Math.max(0, index - 100);
  const end = Math.min(html.length, index + 400);
  return html.substring(start, end).replace(/<[^>]*>/g, '').trim();
}

async function main() {
  console.log(`Scraping ${FACT_SHEET_URLS.length} fact sheets...`);

  const results = [];

  for (let i = 0; i < FACT_SHEET_URLS.length; i++) {
    const url = FACT_SHEET_URLS[i];
    console.log(`[${i + 1}/${FACT_SHEET_URLS.length}] Scraping: ${url}`);

    try {
      const html = await scrapePage(url);
      const data = extractFactSheetData(html, url);
      results.push(data);

      // Be respectful - wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error scraping ${url}:`, error.message);
    }
  }

  // Save results
  const outputPath = path.join(__dirname, '..', 'data', 'mothertobaby-factsheets.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

  console.log(`✅ Scraped ${results.length} fact sheets`);
  console.log(`📁 Saved to: ${outputPath}`);
}

main().catch(console.error);
