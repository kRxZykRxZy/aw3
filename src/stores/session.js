import { writable } from 'svelte/store';
<<<<<<< HEAD
import { timestamp } from 'drizzle-orm/gel-core';
=======
import { browser } from '$app/environment';
>>>>>>> 50dd1707d26de04453420718ca780582529b5a2f

export const isLoggedIn = writable(false);
export const isBanned = writable(false);
<<<<<<< HEAD
export const sessionToken = writable(true);
export const username = writable(true);
export const userData = writable(false);
=======
export const username = writable('');

if (browser) fetch('/internalapi/session')
  .then(r => r.json())
  .then(j => j.user?.username && (username.set(j.user.username), isLoggedIn.set(true)));
>>>>>>> 50dd1707d26de04453420718ca780582529b5a2f
