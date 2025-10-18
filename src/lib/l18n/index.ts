import type { Messages } from '$messages/en.json';
let currentMessages: Messages = {} as Messages;

export function setMessages(messages: Messages) {
	currentMessages = messages;
}

export function t(key: keyof Messages, params?: Record<string, string | number>) {
	let text = currentMessages[key] || String(key);
	if (params)
		Object.entries(params).forEach(([k, v]) => (text = text.replace(`{${k}}`, String(v))));
	return text;
}
