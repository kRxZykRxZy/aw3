<script lang="ts">
    import '../app.css';
    import { goto } from '$app/navigation';
    import { isBanned } from '$stores/session';
    import { page } from '$app/state';
    import { theme } from '$stores/theme';
    let { children } = $props();
    import Header from '$lib/header/Header.svelte';
    import Footer from '$lib/footer/Footer.svelte';

    if (true) {
        console.warn(
            '%cSCAM ALERT! Do NOT paste anything into the console!',
            "color: red; font-size: 3em; font-weight: bold; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"
        );
        console.log(
            "%cDo NOT paste anything into the console that someone you don't know asked you to! They can log in to your account, create inappropriate projects, delete your legitimate projects, and get your account banned! If you don't know what JavaScript is, exit now.",
            "font-size: 18px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"
        );
    }

    const banAllowedPages = [
        "/banned", // the ban information page itself, of course
        "/proj-guidelines", // project guidelines
        "/terms", // terms of use page
        "/privacy", // privacy policy page
        "/mirrors", // mirrors page
        "/gpl", "/mpl", // licences
        "/banned/mental" // mental health resources for users who are banned for expressing thoughts of self-harm
    ]

    $effect(() => {
      if ($isBanned && !banAllowedPages.includes(page.url.pathname)) {
        goto('/banned');
      }
    });

    function isAprilFoolsDay() {
      const today = new Date();
      // Months are 0-indexed in JavaScript, so April is 3.
      // The day is 1 for April 1st.
      return today.getMonth() === 3 && today.getDate() === 1;
    }
</script>

<div class="site-wrapper text-text dark:text-text-dark"> <Header />
    <main class="content-area"> 
      <noscript>
        <div
          class="bg-red-500 text-white p-3 text-center font-bold"
          style="display: block; width: 100%; z-index: 1000;"
        >
          <p>
            Most functionality on this site requires JavaScript to work.
          </p>
        </div>
      </noscript>
      {@render children()}
    </main>
    <Footer />
    <!-- Semicolon glitch -->
    {#if isAprilFoolsDay()}
        ;
    {/if}
</div>

<style>
  /* These are global styles affecting the body and site-wrapper */
  :global(body) {
    margin: 0;
    padding: 0;
    /* This ensures the body takes at least the full viewport height */
    min-height: 100vh;
    display: flex; /* Make body a flex container */
    flex-direction: column; /* Stack children vertically */
  }

  /* The site-wrapper will now stretch to fill the body */
  .site-wrapper {
    display: flex; /* Make the wrapper a flex container */
    flex-direction: column; /* Stack header, main, footer vertically */
    min-height: 100vh; /* Ensure it's at least viewport height */
    width: 100%; /* Important: Use 100% here, NOT 100vw */
  }

  /* This is the key: tell the main content area to grow and push the footer down */
  .content-area {
    flex-grow: 1; /* This makes main take up all available vertical space */
    /* Add padding to the content area if your header is fixed and covers it */
  }
</style>