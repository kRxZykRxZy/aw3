<script lang="ts">
	import { onMount } from 'svelte';
	import defaultProject from '$lib/default-project/Project.apz';

	onMount(async () => {
		const sessionRes = await fetch('/internalapi/session', {
			method: 'GET',
			credentials: 'include'
		});
		if (!sessionRes.ok) return;
		const sessionData = await sessionRes.json();
		if (!sessionData.username) return;

		const response = await fetch(defaultProject);
		const blob = await response.blob();
		const formData = new FormData();
		formData.append('files', new File([blob], 'Project.apz'));

		const createRes = await fetch('/internalapi/create/projects', {
			method: 'POST',
			body: formData,
			credentials: 'include'
		});
		if (!createRes.ok) return;
		const projectJson = await createRes.json();
		if (projectJson.id) window.location.href = `/projects/${projectJson.id}/editor`;
	});
</script>

<main>
	<p>Loading your default project...</p>
</main>
