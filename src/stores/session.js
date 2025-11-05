import { writable } from 'svelte/store';

export const isLoggedIn = writable(false);
export const isBanned = writable(false);
export const sessionToken = writable('');
export const username = writable('');
export const userData = writable(false);
