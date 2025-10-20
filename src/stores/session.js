import { writable } from 'svelte/store';

export const isLoggedIn = writable(false);
export const isBanned = writable(false);
export const sessionToken = writable('');
export const username = writable('');
export const userData = writable(false);

export async function loadSession() {
	const res = await fetch('/internalapi/session', {
		credentials: 'include'
	});
	if (!res.ok) return;

	let data = null;
	try {
		data = await res.json();
	} catch {
		data = null;
	}

	if (data) {
		userData.set(data);
		username.set(data.username);
		isLoggedIn.set(true);
		isBanned.set(data.isBanned || false);
	} else {
		userData.set(null);
		username.set(null);
		isLoggedIn.set(false);
		isBanned.set(false);
	}
}

loadSession();
