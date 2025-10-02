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
        $theme = $theme === "dark" ? "light" : "dark";
        // Update localStorage as a side effect
        localStorage.theme = $theme;
    }

    function toggleLogin() {
        isLoginOpen = !isLoginOpen;
    }

    async function logIn() {
        try {
            const { success } = await (await fetch('/internalapi/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: loginUsername, password: loginPassword })
            })).json();
            if (success) { $isLoggedIn = true; location.reload(); localStorage.setItem('ssid', success.session_id); isLoginOpen = false; }  
            else alert("Invalid username or password.");

        } catch { alert("Login error."); } 
    }


    function closeLogin() {
        isLoginOpen = false;
    }

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    onMount(() => {
        // Initialize theme based on localStorage on mount
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            $theme = 'dark';
        } else {
            $theme = 'light';
        }

        // Apply initial theme class
        if ($theme === 'dark') {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        // React to theme store changes to update the DOM
        const unsubscribe = theme.subscribe(value => {
            if (value === 'dark') {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        });

        const handleClickOutside = (event: MouseEvent) => {
            // Close profile dropdown if click is outside
            if (isProfileOpen && !event.composedPath().some(el => (el as HTMLElement).closest('.profile-dropdown'))) {
                closeProfile();
            }
            // Close hamburger menu if click is outside
            if (isMenuOpen && !event.composedPath().some(el => (el as HTMLElement).closest('.hamburger-container'))) {
                toggleMenu(); // This will close the menu since it's a toggle
            }
            // Close login dropdown if click is outside
            if (isLoginOpen && !event.composedPath().some(el => (el as HTMLElement).closest('.login-dropdown'))) {
                closeLogin();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            unsubscribe(); // Clean up subscription
        };
    });
</script>

<header class="fixed top-0 left-0 w-full h-[50px] flex items-center justify-center bg-accent text-white font-sans text-sm border-b border-black/20 shadow-md px-2 md:px-4 z-10">
    <div class="flex items-center justify-center w-full gap-4">
        <div class="relative flex items-center md:hidden hamburger-container">
            <button class="flex items-center justify-center p-3 min-w-[44px] min-h-[44px] text-white text-xl focus:outline-none" onclick={toggleMenu} aria-expanded={isMenuOpen} aria-controls="main-menu">
                <MenuIcon />
            </button>
            {#if isMenuOpen}
                <div class="absolute left-0 top-full w-48 max-w-[90vw] bg-accent text-white border border-black/20 rounded shadow-lg mt-2 hamburger-menu" transition:fade={{ duration: 100 }} id="main-menu">
                    <a href="https://ampmod.codeberg.page/credits.html" class="block px-4 py-2 font-bold hover:bg-black/5" onclick={toggleMenu}>Credits</a>
                    <a href="https://ampmod.flarum.cloud" class="block px-4 py-2 font-bold hover:bg-black/5" onclick={toggleMenu}>Discuss</a>
                    <a href="https://codeberg.org/AmpMod" class="block px-4 py-2 font-bold hover:bg-black/5" onclick={toggleMenu}>Contribute</a>
                    <a href="https://ampmod.codeberg.page/editor.html" class="block px-4 py-2 font-bold hover:bg-black/5" onclick={toggleMenu}>Create</a>
                    <hr class="my-1 border-t border-black/20" />
                    <a href="/settings" class="block px-4 py-2 font-bold hover:bg-black/5" onclick={toggleMenu}>Settings</a>
                    <input type="text" placeholder="Search for projects..." bind:value={searchQuery} aria-label="Search for projects" class="w-full p-2 rounded bg-transparent text-white placeholder:text-white/70 focus:bg-white focus:text-black focus:outline-none" />
                </div>
            {/if}
        </div>

        <a href="/" class="flex items-center logo-link">
            <img src={Logo} draggable=false height=28 alt="AmpMod" class="h-[28px] transition-transform duration-100 hover:scale-105" />
        </a>

        <div class="hidden md:flex items-center gap-2">
            <a href="/create" class="font-bold px-3 py-2 rounded cursor-pointer whitespace-nowrap header-link hover:bg-black/10">Create</a>
            <a href="https://ampmod.codeberg.page/credits.html" class="font-bold px-3 py-2 rounded cursor-pointer whitespace-nowrap header-link hover:bg-black/10">Credits</a>
            <a href="https://ampmod.flarum.cloud" class="font-bold px-3 py-2 rounded cursor-pointer whitespace-nowrap header-link hover:bg-black/10">Discuss</a>
            <a href="https://codeberg.org/AmpMod" class="font-bold px-3 py-2 rounded cursor-pointer whitespace-nowrap header-link hover:bg-black/10">Contribute</a>
        </div>

        <nav class="flex items-center gap-2 justify-center">
            <div class="hidden md:flex items-center gap-2 search-bar">
                <input type="search" placeholder="Search for projects..." bind:value={searchQuery} aria-label="Search for projects" class="p-2 rounded bg-black/10 text-white placeholder:text-white/70 focus:bg-white focus:text-black focus:outline-none w-[300px] focus:shadow-[0_0_0_2px_rgba(0,0,0,0.2)] focus:placeholder:text-gray-500 transition-all" />
            </div>
            {#if $isLoggedIn}
                <a href="/messages" class="inline-flex items-center justify-center h-6 min-w-[44px] min-h-[44px] px-2 py-1 rounded" title="Messages" aria-label="Messages"><Mail /></a>
                <a href="/mystuff" class="inline-flex items-center justify-center h-6 min-w-[44px] min-h-[44px] px-2 py-1 rounded" title="My Stuff" aria-label="My Stuff"><FolderOpen /></a>
                <div class="relative flex-shrink-0 profile-dropdown">
                    <button class="flex items-center gap-1 px-3 py-2 rounded font-bold text-white cursor-pointer profile-button hover:bg-black/10" onclick={toggleProfile} aria-expanded={isProfileOpen} aria-controls="profile-menu">
                        {$username} <ChevronDown size=16 />
                    </button>
                    {#if isProfileOpen}
                        <div class="absolute right-0 top-full mt-2 w-48 max-w-[90vw] bg-accent text-white border border-black/20 rounded shadow-lg z-20" transition:fade={{ duration: 100 }} id="profile-menu">
                            <a href={`/@${$username}`} class="block px-4 py-2 font-bold hover:bg-black/5" onclick={closeProfile}>Profile</a>
                            <a href="/settings" class="block px-4 py-2 font-bold hover:bg-black/5" onclick={closeProfile}>Settings</a>
                            <hr class="my-1 border-t border-black/20" />
                            <!-- The direct theme toggle is removed here as well, assuming settings page handles it -->
                            <a href="/logout" class="block px-4 py-2 font-bold hover:bg-black/5" onclick={closeProfile}>Log Out</a>
                        </div>
                    {/if}
                </div>
            {:else}
                <!-- Settings button for logged out users -->
                <a href="/settings" class="hidden md:block  font-bold px-3 py-2 rounded cursor-pointer whitespace-nowrap header-link hover:bg-black/10">Settings</a>

                <div class="relative login-dropdown">
                    <button class="font-bold px-3 py-2 rounded cursor-pointer whitespace-nowrap header-link hover:bg-black/10" onclick={toggleLogin} aria-expanded={isLoginOpen} aria-controls="login-menu">Log in</button>
                    {#if isLoginOpen}
                        <div class="absolute right-0 top-full mt-2 w-50 max-w-[95vw] bg-accent text-white border border-black/20 rounded shadow-lg z-20 p-6 flex flex-col gap-4" id="login-menu" style="min-width:260px;" transition:fade={{ duration: 100 }}>
                            <input id="login-username" type="text" bind:value={loginUsername} class="p-2 rounded bg-white text-black focus:outline-none" autocomplete="username" placeholder="Username" />
                            <input id="login-password" type="password" bind:value={loginPassword} class="p-2 rounded bg-white text-black focus:outline-none" autocomplete="current-password" placeholder="Password" />
                            <div class="flex items-center justify-between">
                                <button class="px-4 py-2 rounded bg-white text-accent font-bold hover:bg-gray-100 transition" onclick={logIn}>Log in</button>
                                <a href="/login-help" class="font-bold text-white/90 hover:underline">Can't login?</a>
                            </div>
                        </div>
                    {/if}
                </div>
                <a href="/join" class="font-bold px-3 py-2 rounded cursor-pointer whitespace-nowrap header-link bg-white text-accent hover:text-accent-secondary">Join</a>
            {/if}
        </nav>
    </div>
</header>
<div class="w-full mt-[50px]"></div>
