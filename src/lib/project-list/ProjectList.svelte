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
		thumbnailUrl: string;
	}

	let projects: ProjectType[] = [];
	let loading = true;
	let error: string | null = null;

	async function fetchProjects(): Promise<ProjectType[]> {
		try {
			const res = await fetch('/internalapi/featured_projects');
			if (!res.ok) throw new Error('Network response was not ok');
			const data = await res.json();

			// Map API response to ProjectType, including fallback thumbnail
			return data.map((project: any) => ({
				id: project.id,
				title: project.title || 'Untitled Project',
				author: project.author || 'Unknown',
				thumbnailUrl:
					project.thumbnail ||
					'https://cdn2.scratch.mit.edu/get_image/project/1_270x210.png'
			}));
		} catch (err) {
			console.error(err);
			throw err;
		}
	}

	onMount(async () => {
		try {
			projects = await fetchProjects();
		} catch {
			error = 'Failed to load projects.';
		} finally {
			loading = false;
		}
	});

	const skeletonCount = 5;

	// Svelte action to scroll to start
	function scrollToStart(node: HTMLElement) {
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
