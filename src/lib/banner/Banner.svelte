<script lang="ts">
	let { text, subtext = '' } = $props();
</script>

<div class="bg-accent-secondary p-8 text-white">
	<div class="max-w-4xl mx-auto text-center">
		<span class="text-4xl font-extrabold">
			{text}
		</span>
		{#if subtext}
			<p class="mt-2 font-stretch-condensed">
				{subtext}
			</p>
		{/if}
	</div>
</div>
