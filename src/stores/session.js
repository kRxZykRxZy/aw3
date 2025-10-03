import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const isLoggedIn = writable(false);
export const isBanned = writable(false);
export const username = writable('');

if (browser) fetch('/internalapi/session')
  .then(r => r.json())
  .then(j => j.user?.username && (username.set(j.user.username), isLoggedIn.set(true)));
