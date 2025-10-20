<script lang="ts">
	let { children, title, subtitle } = $props();
	import Banner from '$components/banner/Banner.svelte';
</script>

<Banner text={title} subtext={subtitle} />
<div
	class="prose text-text dark:text-text-dark prose-headings:text-text prose-headings:dark:text-text-dark prose-a:text-accent prose-strong:text-text prose-strong:dark:text-text-dark m-auto mt-8 max-w-4xl"
>
	{@render children()}
</div>

<svelte:head>
	<title>{title} - AmpMod</title>
</svelte:head>
