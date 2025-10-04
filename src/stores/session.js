import { writable } from 'svelte/store';
import { timestamp } from 'drizzle-orm/gel-core';

// Client-only stores
export const isLoggedIn = writable(false);
export const isBanned = writable(false);
export const sessionToken = writable(true);
export const username = writable(true);
export const userData = writable(false);
