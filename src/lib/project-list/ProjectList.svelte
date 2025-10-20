<script lang="ts">
	import { onMount } from 'svelte';
	import Project from '$lib/project/Project.svelte';
	import { Image } from '@lucide/svelte';

	export let title: string;

	// Define the interface for a project, including a thumbnailUrl
	interface ProjectType {
		id: number;
		title: string;
		author: string;
		thumbnailUrl: string; // This is crucial for displaying actual thumbnails
	}

	let projects: ProjectType[] = [];
	let loading = true;
	let error: string | null = null;

	let proj = [];
	async function fetchProjects(): Promise<ProjectType[]> {
		// In a real application, you would replace this with an actual API call
		// For demonstration, we use a Promise with setTimeout to simulate network latency
		const res = await fetch('/internalapi/featured_projects');
		const data = await res.json();
		projects.forEach((project) => {
			proj[project.id]['id'] = project.id;
			proj[project.id]['title'] = project.title || 'Untitled Project';
			proj[project.id]['author'] = project.author || 'No Author'; // fallback Url
			proj[project.id]['thumbnailUrl'] =
				project.thumbnail || 'https://cdn2.scratch.mit.edu/get_image/project/1_270x210.png';
		});
		return new Promise((resolve) => {
			setTimeout(() => {
				const ProjectList: ProjectType[] = [
					{
						id: proj[1]['id'],
						title: proj[1]['title'],
						author: proj[1]['author'],
						// IMPORTANT: Replace with actual project thumbnail URLs when ready
						// For now, these placeholders are more descriptive and visually varied
						thumbnailUrl: proj[1]['thumbnailUrl'] // Example Scratch-like placeholder
					},
					{
						id: 2,
						title: 'pang does a flip v2',
						author: 'pang',
						thumbnailUrl: 'https://cdn2.scratch.mit.edu/get_image/project/100000001_170x120.png'
					},
					{
						id: 3,
						title: '&1& 1.0',
						author: '1',
						thumbnailUrl: 'https://cdn2.scratch.mit.edu/get_image/project/100000002_170x120.png'
					},
					{
						id: 4,
						title: 'Ultimate Sandra Ve...',
						author: 'mira',
						thumbnailUrl: 'https://cdn2.scratch.mit.edu/get_image/project/100000003_170x120.png'
					},
					{
						id: 777,
						title: 'NYAN CAT DOGEING GAME',
						author: 'COYOTITDOG',
						thumbnailUrl: 'https://cdn2.scratch.mit.edu/get_image/project/100000004_170x120.png'
					},
					{
						id: 7476,
						title: 'pang does a flip v2',
						author: 'pang',
						thumbnailUrl: 'https://cdn2.scratch.mit.edu/get_image/project/100000005_170x120.png'
					},
					{
						id: 111,
						title: '&1& 1.0',
						author: '1',
						thumbnailUrl: 'https://cdn2.scratch.mit.edu/get_image/project/100000006_170x120.png'
					},
					{
						id: 123,
						title: 'Ultimate Sandra Ve...',
						author: 'mira',
						thumbnailUrl: 'https://cdn2.scratch.mit.edu/get_image/project/100000007_170x120.png'
					}
				];
				resolve(fakeProjects);
			}, 1500); // Fake 1.5 second delay to simulate network call
		});
	}

	onMount(async () => {
		try {
			projects = await fetchProjects();
			loading = false;
		} catch (err) {
			error = 'Failed to load projects.';
			loading = false;
			console.error(err);
		}
	});

	const skeletonCount = 5; // Number of skeleton cards to show during loading

	// Svelte action to scroll to start
	// This ensures the horizontal scrollable section always starts at the beginning
	function scrollToStart(node: HTMLElement) {
		// Ensure scroll behavior is smooth
		node.scroll({ left: 0, behavior: 'smooth' });
		return {
			update() {
				node.scroll({ left: 0, behavior: 'smooth' });
			}
		};
	}
</script>

<div
	class="border-border bg-background text-text dark:border-border-dark dark:bg-background-dark dark:text-text-dark mx-auto my-2 max-w-4xl rounded-lg border p-4 font-sans"
>
	<h2 class="mb-3 text-xl font-semibold">{title}</h2>

	{#if loading}
		<span class="sr-only">Loading...</span>
		<div class="relative flex gap-4 overflow-x-hidden pb-4" use:scrollToStart>
			{#each Array(skeletonCount) as _, i (i)}
				<div
					class="border-border bg-footer dark:border-border-dark dark:bg-footer-dark w-48 flex-shrink-0 animate-pulse overflow-hidden rounded-md border shadow-sm"
				>
					<div
						class="pointer-events-none m-2 mb-0 flex aspect-[4/3] items-center justify-center rounded bg-gray-200 text-sm text-gray-400 dark:bg-gray-700 dark:text-gray-500"
					>
						<Image />
					</div>
					<div class="px-3 py-2">
						<div
							class="mb-3 mt-1 h-5 w-3/4 rounded bg-gray-300 text-base font-medium dark:bg-gray-600"
						></div>
						<div class="my-1 h-3 w-1/2 rounded bg-gray-300 dark:bg-gray-600"></div>
					</div>
				</div>
			{/each}
			<div
				class="from-background dark:from-background-dark pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l to-transparent"
			></div>
		</div>
	{:else if error}
		<p class="py-4 text-center text-base text-red-500">{error}</p>
	{:else if projects.length > 0}
		<div class="hide-scrollbar flex gap-4 overflow-x-auto pb-4" use:scrollToStart>
			{#each projects as project (project.id)}
				<Project
					id={project.id}
					title={project.title}
					author={project.author}
					thumbnailUrl={project.thumbnailUrl}
				/>
			{/each}
		</div>
	{:else}
		<p class="py-4 text-center text-base">No projects available.</p>
	{/if}
</div>
