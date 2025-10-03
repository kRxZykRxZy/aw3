<script lang="ts">
    let { children, title, subtitle } = $props();
    import Banner from '$components/banner/Banner.svelte';
</script>

<Banner text={title} subtext={subtitle} />
<div class="prose prose-a:text-accent text-text dark:text-text-dark prose-headings:text-text prose-headings:dark:text-text-dark prose-strong:text-text prose-strong:dark:text-text-dark max-w-4xl m-auto mt-8">
    {@render children()}
</div>

<svelte:head>
    <title>{title} - AmpMod</title>
</svelte:head>