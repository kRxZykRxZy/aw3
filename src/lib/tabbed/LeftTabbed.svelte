<script lang="ts">
  // Declare component props using $props()
  let {
    tabs = [], // Initialize with an empty array if not provided
    active = 0, // Initialize with 0 if not provided
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

<div class="flex flex-col md:flex-row min-h-[600px] overflow-hidden">
  <div class="flex flex-row md:flex-col min-w-60 py-2 mr-2 overflow-x-scroll">
    {#each tabs as tab, i}
      <button
        class="
                    flex-1 md:flex-none
                    bg-transparent outline-none text-center md:text-left
                    px-4 py-2 md:px-6 md:py-4
                    text-lg md:text-xl
                    border
                    text-text cursor-pointer transition-(colors, font-weight) ease-in-out duration-200
                    dark:text-text-dark
                    hover:bg-accent-secondary/10 hover:text-accent
                    focus:bg-accent-secondary/10 focus:text-accent
                    aria-selected:bg-footer aria-selected:text-accent aria-selected:border-accent font-light aria-selected:font-medium
                    dark:hover:bg-accent-secondary/10 dark:focus:bg-accent-secondary/10
                    dark:aria-selected:bg-footer-dark dark:aria-selected:text-accent-dark dark:aria-selected:border-accent-dark dark:aria-selected:font-bold
                    m-2 rounded-lg border-border dark:border-border-dark
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
    class="flex-1 p-8 text-text dark:text-text-dark bg-footer dark:bg-footer-dark min-w-0 rounded-lg border border-border dark:border-border-dark"
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