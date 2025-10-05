<svelte:head>
    <title>Tor blocked - AmpMod</title>
</svelte:head>
<script lang="ts">
    import { onMount } from 'svelte';
    import Spinner from '$lib/spinner/Spinner.svelte';

    let fullyLoaded = false;

    onMount(() => {
        fullyLoaded = true;
    });
</script>

<style>
    .ban-container {
        max-width: 900px;
        margin: 64px auto;
        border-radius: 8px;
        font-family: var(--font-stack);
        font-size: 1.02em;
    }

    .ban-message {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        color: #dc3545; /* Error red */
    }
</style>

<div class="ban-container">
    {#if fullyLoaded}
        <h1 class="ban-message">You are using Tor</h1>
        <p>
            It appears you are connected to a Tor exit node. For safety reasons, access to AmpMod may be
            restricted to prevent abuse.
        </p>
        <p>
            Please try to access AmpMod without connecting through Tor.
        </p>
        <p>We understand that Tor is commonly use to bypass censorship in certain areas.
            If you do not have any other way to access AmpMod, follow these steps:</p>
        <ol>
            <!-- TODO: Fill in emails with domain (e.g. ampmod.org)-->
            <li>Email <a href="mailto:tor@ampmod.example.org">tor@ampmod.example.org</a> with the username of the account
                you are using, or the account you want to create. If you ask for a new account, you will be provided
                with a temporary password to be used within 30 days.</li>
            <li>Go to <a href="/login">the login page</a> and enter the credentials of your account.</li>
            <li>Access AmpMod as normal.</li>
        </ol>
    {:else}
        <Spinner />
    {/if}
</div>