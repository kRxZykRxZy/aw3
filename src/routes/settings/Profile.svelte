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
<div class="mb-4 gap-4 flex items-center">
	<div class="h-20 w-20 relative cursor-pointer" on:click={onAvatarClick}>
		<img src={avatarUrl} alt="User Icon" class="rounded h-full w-full object-cover" />
		{#if uploading}
			<div class="inset-0 rounded bg-black/40 absolute flex items-center justify-center">
				<Spinner colour="#fff" />
			</div>
		{:else}
			<div
				class="inset-0 rounded bg-black/40 text-white absolute flex items-center justify-center opacity-0 hover:opacity-100"
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
