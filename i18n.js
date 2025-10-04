export async function loadMessages(locale = 'en') {
  try {
    const messages = await import(`./messages/${locale}.js`);
    return messages.default;
  } catch (e) {
    console.warn(`Locale ${locale} not found, falling back to English.`);
    const fallback = await import(`./messages/en.js`);
    return fallback.default;
  }
}
