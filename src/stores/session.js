import { writable } from 'svelte/store';
import { timestamp } from 'drizzle-orm/gel-core';

// Client-only stores
export const isLoggedIn = writable(true);
export const isBanned = writable(false);
export const sessionToken = writable(true);
export const username = writable(true);
export const userData = writable(false);

const res = await fetch('/internalapi/session');
const json = await res.json();
if(json.user.username) {
    username.set(json.user.username);
    isLoggedIn.set(true);
}