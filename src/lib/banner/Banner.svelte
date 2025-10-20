<script lang="ts">
	let { text, subtext = '' } = $props();
</script>

<div class="bg-accent-secondary p-8 text-white">
	<div class="mx-auto max-w-4xl text-center">
		<span class="text-4xl font-extrabold">
			{text}
		</span>
		{#if subtext}
			<p class="font-stretch-condensed mt-2">
				{subtext}
			</p>
		{/if}
	</div>
</div>
