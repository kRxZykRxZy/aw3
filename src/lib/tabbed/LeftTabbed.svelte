<script lang="ts">
	// Declare component props using $props()
	let {
		tabs = [], // Initialize with an empty array if not provided
		active = 0 // Initialize with 0 if not provided
	} = $props<{ tabs: { label: string; content: any }[]; active?: number }>();

	// A regular function is generally preferred for clarity over a reactive statement for simple assignments.
	// It achieves the same reactivity because 'active' is now a $props variable.
	const setActive = (i: number) => {
		active = i;
	};

	// If 'active' was *internal* component state that only this component managed,
	// you would declare it with $state():
	// let active = $state(0);
	// In your current setup, it's an exported prop, so updating it here
	// will reflect changes back to the parent if two-way binding is used,
	// or it will just update the prop's value within this component instance.
</script>

<div class="flex min-h-[600px] flex-col overflow-hidden md:flex-row">
	<div class="mr-2 flex min-w-60 flex-row overflow-x-scroll py-2 md:flex-col">
		{#each tabs as tab, i}
			<button
				class="
                    transition-(colors, font-weight)
                    dark:aria-selected:text-accent-dark dark:aria-selected:border-accent-dark border-border text-text
                    hover:bg-accent-secondary/10 hover:text-accent focus:bg-accent-secondary/10 focus:text-accent
                    aria-selected:border-accent aria-selected:bg-footer
                    aria-selected:text-accent
                    dark:border-border-dark dark:text-text-dark dark:hover:bg-accent-secondary/10 dark:focus:bg-accent-secondary/10 dark:aria-selected:bg-footer-dark m-2
                    flex-1
                    cursor-pointer rounded-lg
                    border bg-transparent
                    px-4 py-2 text-center text-lg font-light
                    outline-none duration-200
                    ease-in-out aria-selected:font-medium md:flex-none md:px-6
                    md:py-4 md:text-left md:text-xl dark:aria-selected:font-bold
                "
				onclick={() => setActive(i)}
				tabindex={active === i ? 0 : -1}
				aria-selected={active === i}
				role="tab"
			>
				{tab.label}
			</button>
		{/each}
	</div>
	<div
		class="border-border bg-footer text-text dark:border-border-dark dark:bg-footer-dark dark:text-text-dark min-w-0 flex-1 rounded-lg border p-8"
	>
		{#if tabs[active]}
			{#if typeof tabs[active].content === 'string'}
				<div>{@html tabs[active].content}</div>
			{:else}
				{@render tabs[active].content()}
			{/if}
		{/if}
	</div>
</div>
