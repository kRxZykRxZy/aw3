<script lang="ts">
	import Logo from './logo.svg';
	import { isLoggedIn, username } from '$stores/session';
	import { Mail, FolderOpen, ChevronDown, MenuIcon } from '@lucide/svelte';
	import { theme } from '$stores/theme';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let searchQuery = '';
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

	function toggleLogin() {
		isLoginOpen = !isLoginOpen;
	}
	function closeLogin() {
		isLoginOpen = false;
	}

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
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
				localStorage.setItem('ssid', success.session_id);
				location.reload();
			} else alert('Invalid username or password.');
		} catch {
			alert('Login error.');
		}
	}

	onMount(() => {
		// Theme initialization
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			$theme = 'dark';
		} else {
			$theme = 'light';
		}
		document.documentElement.classList.toggle('dark', $theme === 'dark');

		const unsubscribe = theme.subscribe((value) => {
			document.documentElement.classList.toggle('dark', value === 'dark');
		});

		// Click outside to close dropdowns
		const handleClickOutside = (event: MouseEvent) => {
			const path = event.composedPath();
			if (isProfileOpen && !path.some((el) => (el as HTMLElement).closest('.profile-dropdown'))) {
				isProfileOpen = false;
			}
			if (isMenuOpen && !path.some((el) => (el as HTMLElement).closest('.hamburger-container'))) {
				isMenuOpen = false;
			}
			if (isLoginOpen && !path.some((el) => (el as HTMLElement).closest('.login-dropdown'))) {
				isLoginOpen = false;
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
			unsubscribe();
		};
	});
</script>

<header
	class="bg-accent fixed left-0 top-0 z-10 flex h-[50px] w-full items-center justify-center border-b border-black/20 px-2 font-sans text-sm text-white shadow-md md:px-4"
>
	<div class="flex w-full items-center justify-center gap-4">
		<!-- Hamburger for mobile -->
		<div class="hamburger-container relative flex items-center md:hidden">
			<button
				class="flex min-h-[44px] min-w-[44px] items-center justify-center p-3 text-xl text-white focus:outline-none"
				on:click={toggleMenu}
				aria-expanded={isMenuOpen}
				aria-controls="main-menu"
			>
				<MenuIcon />
			</button>

			{#if isMenuOpen}
				<div
					class="hamburger-menu bg-accent absolute left-0 top-full mt-2 w-48 max-w-[90vw] rounded border border-black/20 text-white shadow-lg"
					transition:fade={{ duration: 100 }}
					id="main-menu"
				>
					<a
						href="https://ampmod.codeberg.page/credits.html"
						class="block px-4 py-2 font-bold hover:bg-black/5"
						on:click={toggleMenu}>Credits</a
					>
					<a
						href="https://ampmod.flarum.cloud"
						class="block px-4 py-2 font-bold hover:bg-black/5"
						on:click={toggleMenu}>Discuss</a
					>
					<a
						href="https://codeberg.org/AmpMod"
						class="block px-4 py-2 font-bold hover:bg-black/5"
						on:click={toggleMenu}>Contribute</a
					>
					<a
						href="https://ampmod.codeberg.page/editor.html"
						class="block px-4 py-2 font-bold hover:bg-black/5"
						on:click={toggleMenu}>Create</a
					>
					<hr class="my-1 border-t border-black/20" />
					<a
						href="/settings"
						class="block px-4 py-2 font-bold hover:bg-black/5"
						on:click={toggleMenu}>Settings</a
					>
					<input
						type="text"
						placeholder="Search for projects..."
						bind:value={searchQuery}
						class="w-full rounded bg-transparent p-2 text-white placeholder:text-white/70 focus:bg-white focus:text-black focus:outline-none"
					/>
				</div>
			{/if}
		</div>

		<a href="/" class="logo-link flex items-center">
			<img
				src={Logo}
				alt="AmpMod"
				class="h-[28px] transition-transform duration-100 hover:scale-105"
				draggable="false"
			/>
		</a>

		<div class="hidden items-center gap-2 md:flex">
			<a href="/editor" class="header-link rounded px-3 py-2 font-bold hover:bg-black/10">Create</a>
			<a
				href="https://ampmod.codeberg.page/credits.html"
				class="header-link rounded px-3 py-2 font-bold hover:bg-black/10">Credits</a
			>
			<a
				href="https://ampmod.flarum.cloud"
				class="header-link rounded px-3 py-2 font-bold hover:bg-black/10">Discuss</a
			>
			<a
				href="https://codeberg.org/AmpMod"
				class="header-link rounded px-3 py-2 font-bold hover:bg-black/10">Contribute</a
			>
		</div>

		<nav class="flex items-center justify-center gap-2">
			{#if $isLoggedIn}
				<a
					href="/messages"
					class="inline-flex h-6 min-h-[44px] min-w-[44px] items-center justify-center rounded px-2 py-1"
					title="Messages"><Mail /></a
				>
				<a
					href="/mystuff"
					class="inline-flex h-6 min-h-[44px] min-w-[44px] items-center justify-center rounded px-2 py-1"
					title="My Stuff"><FolderOpen /></a
				>

				<div class="profile-dropdown relative flex-shrink-0">
					<button
						class="profile-button flex cursor-pointer items-center gap-1 rounded px-3 py-2 font-bold text-white hover:bg-black/10"
						on:click={toggleProfile}
						aria-expanded={isProfileOpen}
						aria-controls="profile-menu"
					>
						{$username}
						<ChevronDown size="16" />
					</button>
					{#if isProfileOpen}
						<div
							class="bg-accent absolute right-0 top-full z-20 mt-2 w-48 max-w-[90vw] rounded border border-black/20 text-white shadow-lg"
							transition:fade={{ duration: 100 }}
							id="profile-menu"
						>
							<a
								href={`/@${$username}`}
								class="block px-4 py-2 font-bold hover:bg-black/5"
								on:click={closeProfile}>Profile</a
							>
							<a
								href="/settings"
								class="block px-4 py-2 font-bold hover:bg-black/5"
								on:click={closeProfile}>Settings</a
							>
							<hr class="my-1 border-t border-black/20" />
							<a
								href="/logout"
								class="block px-4 py-2 font-bold hover:bg-black/5"
								on:click={closeProfile}>Log Out</a
							>
						</div>
					{/if}
				</div>
			{:else}
				<a
					href="/settings"
					class="header-link hidden rounded px-3 py-2 font-bold hover:bg-black/10 md:block"
					>Settings</a
				>

				<div class="login-dropdown relative">
					<button
						class="header-link cursor-pointer rounded px-3 py-2 font-bold hover:bg-black/10"
						on:click={toggleLogin}
						aria-controls="login-menu">Log in</button
					>
					{#if isLoginOpen}
						<div
							class="w-50 bg-accent absolute right-0 top-full z-20 mt-2 flex max-w-[95vw] flex-col gap-4 rounded border border-black/20 p-6 text-white shadow-lg"
							id="login-menu"
							style="min-width:260px;"
							transition:fade={{ duration: 100 }}
						>
							<input
								type="text"
								bind:value={loginUsername}
								class="rounded bg-white p-2 text-black focus:outline-none"
								placeholder="Username"
								autocomplete="username"
							/>
							<input
								type="password"
								bind:value={loginPassword}
								class="rounded bg-white p-2 text-black focus:outline-none"
								placeholder="Password"
								autocomplete="current-password"
							/>
							<div class="flex items-center justify-between">
								<button
									class="text-accent rounded bg-white px-4 py-2 font-bold hover:bg-gray-100"
									on:click={logIn}>Log in</button
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
					class="header-link text-accent hover:text-accent-secondary rounded bg-white px-3 py-2 font-bold"
					>Join</a
				>
			{/if}
		</nav>
	</div>
</header>

<div class="mt-[50px] w-full"></div>
