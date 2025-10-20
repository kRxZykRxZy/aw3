<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	// Define the possible theme modes
	type ThemeMode = 'system' | 'light' | 'dark';

	// Reactive variable to hold the current theme preference, initialized to a default
	let themePreference: ThemeMode = 'system'; // Default to 'system'

	// Media query listener for system dark mode preference
	let mediaQuery: MediaQueryList | undefined;

	/**
	 * Applies the 'dark' class to the document's <html> element
	 * based on the current theme preference and system setting.
	 */
	function applyTheme() {
		if (typeof document === 'undefined') {
			return;
		}

		const isSystemDark = mediaQuery?.matches ?? false;
		const htmlElement = document.documentElement;

		if (!htmlElement) {
			console.error('HTML element (document.documentElement) not found.');
			return;
		}

		const shouldBeDark =
			themePreference === 'dark' || (themePreference === 'system' && isSystemDark);

		if (shouldBeDark) {
			htmlElement.classList.add('dark');
		} else {
			htmlElement.classList.remove('dark');
		}
	}

	/**
	 * Handles changes in the system's preferred color scheme.
	 */
	function handleSystemThemeChange() {
		if (themePreference === 'system') {
			applyTheme();
		}
	}

	// --- Lifecycle Hooks ---

	onMount(() => {
		// Initialize media query listener
		try {
			if (typeof window !== 'undefined' && window.matchMedia) {
				mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
				mediaQuery.addEventListener('change', handleSystemThemeChange);
			}
		} catch (e) {
			console.warn('`window.matchMedia` not available or accessible:', e);
		}

		// Load theme preference from localStorage first
		try {
			const savedTheme = localStorage.getItem('theme') as ThemeMode;
			// Only set themePreference if a valid saved theme exists.
			// Otherwise, it remains its default 'system'.
			if (savedTheme && ['system', 'light', 'dark'].includes(savedTheme)) {
				themePreference = savedTheme;
			}
		} catch (e) {
			console.warn('Could not access localStorage for theme preference:', e);
		}

		// Apply the theme immediately after loading or defaulting
		applyTheme();
	});

	// Reactive statement: runs whenever `themePreference` changes
	// This is the core logic for saving/removing based on user selection.
	$: {
		// Only attempt to save/remove if themePreference has a valid value.
		// This implicitly handles the first run after onMount sets the initial value.
		if (themePreference) {
			try {
				if (themePreference === 'system') {
					// If 'system' is selected, remove the item from localStorage
					localStorage.removeItem('theme');
				} else {
					// If 'light' or 'dark' is selected, save the choice
					localStorage.setItem('theme', themePreference);
				}
			} catch (e) {
				console.warn('Could not update theme preference in localStorage:', e);
			}
			// Always re-apply theme when preference changes
			applyTheme();
		}
	}

	onDestroy(() => {
		if (mediaQuery) {
			mediaQuery.removeEventListener('change', handleSystemThemeChange);
		}
	});
</script>

<div class="gap-4 flex flex-col">
	<p class="text-sm text-gray-700 dark:text-gray-300">
		These settings only apply to your current browser and device.
	</p>
	<label for="theme-select" class="font-medium text-gray-700 dark:text-gray-300 block">Theme:</label
	>
	<select
		id="theme-select"
		class="focus:border-accent focus:ring-accent rounded-md border-gray-300 p-2 pr-8 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white block w-full cursor-pointer border"
		bind:value={themePreference}
	>
		<option value="system">Managed by OS</option>
		<option value="light">Light</option>
		<option value="dark">Dark</option>
	</select>
</div>

<div class="bg-background dark:bg-background-dark mt-8 rounded-lg p-6 shadow-md">
	<p>This is a demonstration of your current theme preference.</p>
	<div class="rounded inline-flex columns-1 overflow-hidden">
		<div class="bg-accent h-8 w-9"></div>
		<div class="bg-border dark:bg-border-dark h-8 w-9"></div>
		<div class="bg-footer dark:bg-footer-dark h-8 w-9"></div>
	</div>
</div>
