import fs from 'fs-extra';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const messagesPath = path.join(__dirname, 'messages');

// Load source English JSON
const enFile = path.join(messagesPath, 'en.json');
if (!fs.existsSync(enFile)) {
	console.error('en.json not found in messages/');
	process.exit(1);
}
const enContent = await fs.readJson(enFile);

// Fetch all languages from the API
async function getLanguages() {
	const res = await fetch('https://ftapi.pythonanywhere.com/languages');
	return await res.json();
}

// Translate full JSON for a target language
async function translateJSON(jsonObj, targetLang) {
	const url = `https://ftapi.pythonanywhere.com/translate?dl=${targetLang}&text=${encodeURIComponent(JSON.stringify(jsonObj))}`;
	try {
		const res = await fetch(url);
		const data = await res.json();
		const translatedText = data['destination-text'];
		return translatedText ? JSON.parse(translatedText) : jsonObj;
	} catch (err) {
		console.error(`Error translating to ${targetLang}:`, err);
		return jsonObj;
	}
}

// Main
const languages = await getLanguages();

for (const langCode of Object.keys(languages)) {
	if (langCode === 'en') continue; // skip English source

	const outFile = path.join(messagesPath, `${langCode}.json`);
	console.log(`Translating en.json → ${langCode}.json (${languages[langCode]})...`);

	const translatedJSON = await translateJSON(enContent, langCode);
	await fs.writeJson(outFile, translatedJSON, { spaces: 2 });
	console.log(`${langCode}.json created/updated`);
}

console.log('All translations completed!');
