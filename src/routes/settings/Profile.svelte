<script lang="ts">
	import ToggleSwitch from '$lib/toggle-switch/ToggleSwitch.svelte';
	import { slide } from 'svelte/transition';
	import { username } from '$stores/session.js';
	import { Pencil } from '@lucide/svelte';
	import Spinner from '$lib/spinner/Spinner.svelte';

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

<h3 class="mb-4 text-xl font-semibold">Information</h3>
<div class="mb-4 flex items-center gap-4">
	<div class="relative h-20 w-20 cursor-pointer" on:click={onAvatarClick}>
		<img src={avatarUrl} alt="User Icon" class="h-full w-full rounded object-cover" />
		{#if uploading}
			<div class="absolute inset-0 flex items-center justify-center rounded bg-black/40">
				<Spinner colour="#fff" />
			</div>
		{:else}
			<div
				class="absolute inset-0 flex items-center justify-center rounded bg-black/40 text-white opacity-0 hover:opacity-100"
			>
				<Pencil />
			</div>
		{/if}
	</div>
	<h1 class="text-3xl font-bold">{$username}</h1>
</div>

<input type="file" accept="image/*" class="hidden" on:change={fileChanged} bind:this={fileInput} />

<h3 class="mb-4 text-xl font-semibold">Visibility</h3>
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
