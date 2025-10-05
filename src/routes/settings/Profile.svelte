<script lang="ts">
    import ToggleSwitch from '$components/toggle-switch/ToggleSwitch.svelte';
    import { slide } from 'svelte/transition';
    import { username } from '$stores/session.js';
    import { Pencil } from '@lucide/svelte';
    import Spinner from '$components/spinner/Spinner.svelte';

    let privateToggle = false;
    let followToggle = false;
    let avatarUrl = '/ugctest.png';
    let uploading = false;
    let fileInput: HTMLInputElement;

    function onAvatarClick() {
        if (uploading) return;
        fileInput?.click();
    }

    function fileChanged(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files[0]) {
            const file = target.files[0];
            const reader = new FileReader();
            uploading = true;

            reader.onload = (e) => {
                // Fake API delay
                setTimeout(() => {
                    avatarUrl = e.target?.result as string;
                    uploading = false;
                }, 2000);
            };

            reader.readAsDataURL(file);
        }
    }
</script>

<h3 class="text-xl font-semibold mb-4">Information</h3>
<div class="flex items-center gap-4 mb-4">
    <div class="relative w-20 h-20 cursor-pointer" on:click={onAvatarClick}>
        <img src={avatarUrl} alt="User Icon" class="w-full h-full object-cover rounded" />
        {#if uploading}
            <div class="absolute inset-0 rounded bg-black/40 flex items-center justify-center">
                <Spinner colour="#fff" />
            </div>
        {:else}
            <div class="absolute inset-0 rounded bg-black/40 text-white opacity-0 hover:opacity-100 flex items-center justify-center">
                <Pencil />
            </div>
        {/if}
    </div>
    <h1 class="text-3xl font-bold">{$username}</h1>
</div>

<input
    type="file"
    accept="image/*"
    class="hidden"
    on:change={fileChanged}
    bind:this={fileInput}
/>

<h3 class="text-xl font-semibold mb-4">Visibility</h3>
<ToggleSwitch id="private-toggle" bind:checked={privateToggle}>
    Make my profile private
</ToggleSwitch>

{#if privateToggle}
    <div transition:slide>
        <br />
        <ToggleSwitch id="private-follows-toggle" bind:checked={followToggle}>
            Allow people I follow to see my profile
        </ToggleSwitch>
    </div>
{/if}