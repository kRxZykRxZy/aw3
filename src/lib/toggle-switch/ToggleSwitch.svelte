<script>
    let { checked = $bindable(false), disabled = false, id = null, children = null } = $props();

    function toggle() {
        if (!disabled) checked = !checked;
    }
</script>

<style>
    .toggle-switch {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        user-select: none;
    }

    .switch {
        width: 40px;
        height: 22px;
        background: #e5e7eb;
        border-radius: 9999px;
        position: relative;
        transition: background 0.2s;
    }

    .switch.checked {
        background: #0abb25;
    }

    .switch.disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .knob {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 18px;
        height: 18px;
        background: #fff;
        border-radius: 50%;
        transition: left 0.2s;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .switch.checked .knob {
        left: 20px;
    }

    /* Hide the native checkbox */
    input[type="checkbox"] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        margin: 0;
        padding: 0;
        pointer-events: none;
    }

    /* Dark mode support */
    :global(.dark) .switch {
        background: #374151;
    }
    :global(.dark) .switch.checked {
        background: #22cc4a;
    }
    :global(.dark) .knob {
        background: #1e293b;
    }
</style>

<label class="toggle-switch">
    <input
        type="checkbox"
        bind:checked
        disabled={disabled}
        aria-checked={checked}
        aria-disabled={disabled}
        id={id}
    />
    <div class="switch {checked ? 'checked' : ''} {disabled ? 'disabled' : ''}">
        <div class="knob"></div>
    </div>
    {@render children?.()}
</label>