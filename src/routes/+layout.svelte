<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/header/Header.svelte';

	let { children } = $props();
</script>

<svelte:head>
    <Header />
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
