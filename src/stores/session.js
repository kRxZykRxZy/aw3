import { writable } from 'svelte/store';
import { onMount } from 'svelte';

export const isLoggedIn = writable(false);
export const isBanned = writable(false);
export const sessionToken = writable('');
export const username = writable('');
export const userData = writable(false);

async function getSession() {
	const res = await fetch('/internalapi/session', {
		credentials: 'include'
	});
	if (!res.ok) return null;
	try {
		return await res.json();
	} catch {
		return null;
	}
}

onMount(async () => {
	const data = await getSession();
	if (data) {
		userData.set(data);
		username.set(data.username);
		isLoggedIn.set(data ? true : false);
		isBanned.set(data.isBanned ? true : false);
	} else {
		userData.set(null);
		username.set(null);
		isLoggedIn.set(false);
		isBanned.set(false);
	}
});
