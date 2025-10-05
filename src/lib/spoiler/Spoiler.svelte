<script>
    let isBlurred = true;

    function toggleBlur() {
        isBlurred = !isBlurred;
    }
</script>

<span
    class="spoiler"
    class:blurred={isBlurred}
    on:click={toggleBlur}
    role="button"
    tabindex="0"
    aria-label="Toggle spoiler"
>
    <slot />
</span>

<style>
    .blurred {
        filter: blur(0.25em);
        cursor: pointer;
    }
</style>
