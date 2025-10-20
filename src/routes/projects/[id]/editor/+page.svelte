<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let projectId: string;

	onMount(() => {
		projectId = get(page).params.id;
	});
</script>

{#if projectId}
	<iframe
		src={`https://ampmod.codeberg.page/editor#${projectId}`}
		allow="accelerometer; autoplay; camera; clipboard-write; encrypted-media; fullscreen; geolocation; gyroscope; microphone; midi; payment; usb; xr-spatial-tracking"
		allowfullscreen
	></iframe>
{/if}

<style>
	html,
	body,
	:global(#svelte) {
		margin: 0;
		padding: 0;
		height: 100%;
		width: 100%;
		overflow: hidden;
	}

	iframe {
		border: none;
		width: 100vw;
		height: 100vh;
	}
</style>
