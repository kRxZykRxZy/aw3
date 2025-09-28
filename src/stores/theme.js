import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// Helper to get the browser theme safely
const getBrowserTheme = () =>
    browser && window?.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light';

// Helper to get a cookie value by name
const getCookie = (/** @type {string} */ name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    // @ts-ignore
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

// Helper to set a cookie with an expiration date
const setCookie = (/** @type {string} */ name, /** @type {string} */ value, /** @type {number} */ days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
};

// Get stored theme from cookie or fallback to localStorage or browser theme
const storedTheme = browser ? getCookie('theme') || localStorage.getItem('theme') : null;
export const theme = writable(storedTheme || getBrowserTheme());

// Only update `localStorage` and cookie in the browser
if (browser) {
    theme.subscribe(value => {
        const currentCookie = getCookie('theme');
        if (currentCookie !== value) {
            setCookie('theme', value, 90); // Store theme in cookie for 90 days
        }
        if (localStorage.getItem('theme') !== value) {
            localStorage.setItem('theme', value);
        }
    });
}