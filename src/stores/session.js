import { writable } from 'svelte/store';
import * as tables from '$lib/server/db/schema';
import { timestamp } from 'drizzle-orm/gel-core';

// Client-only stores
export const isLoggedIn = writable(false);
export const isBanned = writable(false);
export const sessionToken = writable(true);
export const username = writable(true);
export const userData = writable(false);

if (typeof window !== 'undefined') {
    if(username) {
        const data = {
            username: username,
            sessionToken: sessionToken,
            isLoggedIn: isLoggedIn,
            isBanned: isBanned,
            userData: userData
        }
        userData.set(data);
        if(data?.banned) {
            if (Math.floor(Date.now() / 1000) < data.bannedExpiry) {
                const ampmodderUpdate = db.update(tables.ampmodder).where(tables.ampmodder.username.eq(username)).set({
                        banned: false,
                        bannedExpiry: 0,
                        bannedReason: ''
                    }).returning().get();
                userData.set(ampmodderUpdate);
                isBanned.set(false);
            } else {
                isBanned.set(true);
            }
        } else {
            isBanned.set(false);
        }
    }
}
