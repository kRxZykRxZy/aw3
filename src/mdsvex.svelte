<script lang="ts">
	let { children, title, subtitle } = $props();
	import Banner from '$components/banner/Banner.svelte';
</script>

<Banner text={title} subtext={subtitle} />
<div
	class="m-auto prose mt-8 max-w-4xl text-text dark:text-text-dark prose-headings:text-text prose-headings:dark:text-text-dark prose-a:text-accent prose-strong:text-text prose-strong:dark:text-text-dark"
>
	{@render children()}
</div>

<svelte:head>
	<title>{title} - AmpMod</title>
</svelte:head>
