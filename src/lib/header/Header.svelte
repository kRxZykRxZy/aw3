<script lang="ts">
	let searchQuery = '';
	import Logo from './logo.svg';
	import { isLoggedIn, username } from '$stores/session';
	import { Mail, FolderOpen, ChevronDown, MenuIcon } from '@lucide/svelte'; // Removed Sun, Moon as direct toggle is removed
	import { theme } from '$stores/theme'; // This Is Writable
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let isProfileOpen = false;
	let isMenuOpen = false;
	let isLoginOpen = false;

	let loginUsername = '';
	let loginPassword = '';

	function toggleProfile() {
		isProfileOpen = !isProfileOpen;
	}

	function closeProfile() {
		isProfileOpen = false;
	}

	// This function is no longer directly used by a button in the logged-out state
	// The theme logic is now primarily driven by the settings page with the dropdown
	function toggleTheme() {
		// Toggle the theme value in the Svelte store
		$theme = $theme === 'dark' ? 'light' : 'dark';
		// Update localStorage as a side effect
		localStorage.theme = $theme;
	}

	function toggleLogin() {
		isLoginOpen = !isLoginOpen;
	}

	async function logIn() {
		try {
			const { success } = await (
				await fetch('/internalapi/login', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ username: loginUsername, password: loginPassword })
				})
			).json();
			if (success) {
				$isLoggedIn = true;
				location.reload();
				localStorage.setItem('ssid', success.session_id);
				isLoginOpen = false;
			} else alert('Invalid username or password.');
		} catch {
			alert('Login error.');
		}
	}

	function closeLogin() {
		isLoginOpen = false;
	}

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	onMount(() => {
		// Initialize theme based on localStorage on mount
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			$theme = 'dark';
		} else {
			$theme = 'light';
		}

		// Apply initial theme class
		if ($theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		// React to theme store changes to update the DOM
		const unsubscribe = theme.subscribe((value) => {
			if (value === 'dark') {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		});

		const handleClickOutside = (event: MouseEvent) => {
			// Close profile dropdown if click is outside
			if (
				isProfileOpen &&
				!event.composedPath().some((el) => (el as HTMLElement).closest('.profile-dropdown'))
			) {
				closeProfile();
			}
			// Close hamburger menu if click is outside
			if (
				isMenuOpen &&
				!event.composedPath().some((el) => (el as HTMLElement).closest('.hamburger-container'))
			) {
				toggleMenu(); // This will close the menu since it's a toggle
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			unsubscribe(); // Clean up subscription
		};
	});
</script>

<header
	class="fixed top-0 left-0 z-10 flex h-[50px] w-full items-center justify-center border-b border-black/20 bg-accent px-2 font-sans text-sm text-white shadow-md md:px-4"
>
	<div class="flex w-full items-center justify-center gap-4">
		<div class="hamburger-container relative flex items-center md:hidden">
			<button
				class="flex min-h-[44px] min-w-[44px] items-center justify-center p-3 text-xl text-white focus:outline-none"
				onclick={toggleMenu}
				aria-expanded={isMenuOpen}
				aria-controls="main-menu"
			>
				<MenuIcon />
			</button>
			{#if isMenuOpen}
				<div
					class="hamburger-menu absolute top-full left-0 mt-2 w-48 max-w-[90vw] rounded border border-black/20 bg-accent text-white shadow-lg"
					transition:fade={{ duration: 100 }}
					id="main-menu"
				>
					<a
						href="https://ampmod.codeberg.page/credits.html"
						class="block px-4 py-2 font-bold hover:bg-black/5"
						onclick={toggleMenu}>Credits</a
					>
					<a
						href="https://ampmod.flarum.cloud"
						class="block px-4 py-2 font-bold hover:bg-black/5"
						onclick={toggleMenu}>Discuss</a
					>
					<a
						href="https://codeberg.org/AmpMod"
						class="block px-4 py-2 font-bold hover:bg-black/5"
						onclick={toggleMenu}>Contribute</a
					>
					<a
						href="https://ampmod.codeberg.page/editor.html"
						class="block px-4 py-2 font-bold hover:bg-black/5"
						onclick={toggleMenu}>Create</a
					>
					<hr class="my-1 border-t border-black/20" />
					<a
						href="/settings"
						class="block px-4 py-2 font-bold hover:bg-black/5"
						onclick={toggleMenu}>Settings</a
					>
					<input
						type="text"
						placeholder="Search for projects..."
						bind:value={searchQuery}
						aria-label="Search for projects"
						class="w-full rounded bg-transparent p-2 text-white placeholder:text-white/70 focus:bg-white focus:text-black focus:outline-none"
					/>
				</div>
			{/if}
		</div>

		<a href="/" class="logo-link flex items-center">
			<img
				src={Logo}
				draggable="false"
				height="28"
				alt="AmpMod"
				class="h-[28px] transition-transform duration-100 hover:scale-105"
			/>
		</a>

		<div class="hidden items-center gap-2 md:flex">
			<a
				href="/editor"
				class="header-link cursor-pointer rounded px-3 py-2 font-bold whitespace-nowrap hover:bg-black/10"
				>Create</a
			>
			<a
				href="https://ampmod.codeberg.page/credits.html"
				class="header-link cursor-pointer rounded px-3 py-2 font-bold whitespace-nowrap hover:bg-black/10"
				>Credits</a
			>
			<a
				href="https://ampmod.flarum.cloud"
				class="header-link cursor-pointer rounded px-3 py-2 font-bold whitespace-nowrap hover:bg-black/10"
				>Discuss</a
			>
			<a
				href="https://codeberg.org/AmpMod"
				class="header-link cursor-pointer rounded px-3 py-2 font-bold whitespace-nowrap hover:bg-black/10"
				>Contribute</a
			>
		</div>

		<nav class="flex items-center justify-center gap-2">
			<div class="search-bar hidden items-center gap-2 md:flex">
				<input
					type="search"
					placeholder="Search for projects..."
					bind:value={searchQuery}
					aria-label="Search for projects"
					class="w-[300px] rounded bg-black/10 p-2 text-white transition-all placeholder:text-white/70 focus:bg-white focus:text-black focus:shadow-[0_0_0_2px_rgba(0,0,0,0.2)] focus:outline-none focus:placeholder:text-gray-500"
				/>
			</div>
			{#if $isLoggedIn}
				<a
					href="/messages"
					class="inline-flex h-6 min-h-[44px] min-w-[44px] items-center justify-center rounded px-2 py-1"
					title="Messages"
					aria-label="Messages"><Mail /></a
				>
				<a
					href="/mystuff"
					class="inline-flex h-6 min-h-[44px] min-w-[44px] items-center justify-center rounded px-2 py-1"
					title="My Stuff"
					aria-label="My Stuff"><FolderOpen /></a
				>
				<div class="profile-dropdown relative flex-shrink-0">
					<button
						class="profile-button flex cursor-pointer items-center gap-1 rounded px-3 py-2 font-bold text-white hover:bg-black/10"
						onclick={toggleProfile}
						aria-expanded={isProfileOpen}
						aria-controls="profile-menu"
					>
						{$username}
						<ChevronDown size="16" />
					</button>
					{#if isProfileOpen}
						<div
							class="absolute top-full right-0 z-20 mt-2 w-48 max-w-[90vw] rounded border border-black/20 bg-accent text-white shadow-lg"
							transition:fade={{ duration: 100 }}
							id="profile-menu"
						>
							<a
								href={`/@${$username}`}
								class="block px-4 py-2 font-bold hover:bg-black/5"
								onclick={closeProfile}>Profile</a
							>
							<a
								href="/settings"
								class="block px-4 py-2 font-bold hover:bg-black/5"
								onclick={closeProfile}>Settings</a
							>
							<hr class="my-1 border-t border-black/20" />
							<!-- The direct theme toggle is removed here as well, assuming settings page handles it -->
							<a
								href="/logout"
								class="block px-4 py-2 font-bold hover:bg-black/5"
								onclick={closeProfile}>Log Out</a
							>
						</div>
					{/if}
				</div>
			{:else}
				<!-- Settings button for logged out users -->
				<a
					href="/settings"
					class="header-link hidden cursor-pointer rounded px-3 py-2 font-bold whitespace-nowrap hover:bg-black/10 md:block"
					>Settings</a
				>

				<div class="login-dropdown relative">
					<button
						class="header-link cursor-pointer rounded px-3 py-2 font-bold whitespace-nowrap hover:bg-black/10"
						onclick={toggleLogin}
						aria-controls="login-menu">Log in</button
					>
					{#if isLoginOpen}
						<div
							class="absolute top-full right-0 z-20 mt-2 flex w-50 max-w-[95vw] flex-col gap-4 rounded border border-black/20 bg-accent p-6 text-white shadow-lg"
							id="login-menu"
							style="min-width:260px;"
							transition:fade={{ duration: 100 }}
						>
							<input
								id="login-username"
								type="text"
								bind:value={loginUsername}
								class="rounded bg-white p-2 text-black focus:outline-none"
								autocomplete="username"
								placeholder="Username"
							/>
							<input
								id="login-password"
								type="password"
								bind:value={loginPassword}
								class="rounded bg-white p-2 text-black focus:outline-none"
								autocomplete="current-password"
								placeholder="Password"
							/>
							<div class="flex items-center justify-between">
								<button
									class="rounded bg-white px-4 py-2 font-bold text-accent transition hover:bg-gray-100"
									onclick={logIn}>Log in</button
								>
								<a href="/login-help" class="font-bold text-white/90 hover:underline"
									>Can't login?</a
								>
							</div>
						</div>
					{/if}
				</div>
				<a
					href="/join"
					class="header-link cursor-pointer rounded bg-white px-3 py-2 font-bold whitespace-nowrap text-accent hover:text-accent-secondary"
					>Join</a
				>
			{/if}
		</nav>
	</div>
</header>
<div class="mt-[50px] w-full"></div>
