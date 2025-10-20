<script lang="ts">
	let {
		id,
		background = 'grey',
		foreground = 'white',
		children,
		button = null,
		icon = null,
		closable = true
	} = $props();
	import { XIcon, Icon } from '@lucide/svelte';
	import { slide } from 'svelte/transition';

	let hiddenAlerts: string[] = $state([]);
	if (typeof window !== 'undefined') {
		hiddenAlerts = JSON.parse(localStorage.getItem('amwf:hiddenAlerts') || '[]');
	}

	function removeAlert(id: any) {
		if (typeof window !== 'undefined') {
			const hiddenAlerts = JSON.parse(localStorage.getItem('amwf:hiddenAlerts') || '[]');
			if (!hiddenAlerts.includes(id) && closable) {
				hiddenAlerts.push(id);
				localStorage.setItem('amwf:hiddenAlerts', JSON.stringify(hiddenAlerts));
			}
		}
		hiddenAlerts = [...hiddenAlerts, id];
	}
</script>

{#if typeof window !== 'undefined' && (!hiddenAlerts.includes(id) || !closable)}
	<div
		class="flex items-center justify-between p-2 font-bold transition-all"
		style="--alert-bg-param: {background}; --alert-fg-param: {foreground}; background: var(--alert-bg-param); color: var(--alert-fg-param);"
		out:slide={{ duration: 400 }}
	>
		<div class="flex min-h-[40px] flex-grow items-center justify-center">
			{#if icon}
				<div class="mr-2 flex items-center">
					<Icon iconNode={icon} />
				</div>
			{/if}
			<div class="block">
				{@render children()}
			</div>
			{#if button}
				<a
					href={button.uri}
					class="ml-2 cursor-pointer rounded-full px-4 py-2 text-sm font-bold no-underline"
					style="background: var(--alert-fg-param); color: var(--alert-bg-param);"
				>
					<span class="sr-only">{@render children()} </span>{button.text}
				</a>
			{/if}
		</div>
		{#if closable}
			<button
				class="ml-auto cursor-pointer px-2 text-lg"
				style="background: none; border: none; color: var(--alert-fg-param);"
				onclick={() => removeAlert(id)}
			>
				<XIcon />
				<span class="sr-only">Close alert</span>
			</button>
		{/if}
	</div>
{/if}
