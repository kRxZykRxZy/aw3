<script lang="ts">
    import { onMount } from 'svelte';
    import Project from "$lib/project/Project.svelte";
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

    async function fetchProjects(): Promise<ProjectType[]> {
        // In a real application, you would replace this with an actual API call
        // For demonstration, we use a Promise with setTimeout to simulate network latency
        return new Promise((resolve) => {
            setTimeout(() => {
                const fakeProjects: ProjectType[] = [
                    {
                        id: 1,
                        title: 'NYAN CAT DOGEING GAME',
                        author: 'COYOTITDOG',
                        // IMPORTANT: Replace with actual project thumbnail URLs when ready
                        // For now, these placeholders are more descriptive and visually varied
                        thumbnailUrl: 'https://cdn2.scratch.mit.edu/get_image/project/3_270x210.png', // Example Scratch-like placeholder
                    },
                    {
                        id: 2,
                        title: 'pang does a flip v2',
                        author: 'pang',
                        thumbnailUrl: 'https://cdn2.scratch.mit.edu/get_image/project/100000001_170x120.png',
                    },
                    {
                        id: 3,
                        title: '&1& 1.0',
                        author: '1',
                        thumbnailUrl: 'https://cdn2.scratch.mit.edu/get_image/project/100000002_170x120.png',
                    },
                    {
                        id: 4,
                        title: 'Ultimate Sandra Ve...',
                        author: 'mira',
                        thumbnailUrl: 'https://cdn2.scratch.mit.edu/get_image/project/100000003_170x120.png',
                    },
                    {
                        id: 777,
                        title: 'NYAN CAT DOGEING GAME',
                        author: 'COYOTITDOG',
                        thumbnailUrl: 'https://cdn2.scratch.mit.edu/get_image/project/100000004_170x120.png',
                    },
                    {
                        id: 7476,
                        title: 'pang does a flip v2',
                        author: 'pang',
                        thumbnailUrl: 'https://cdn2.scratch.mit.edu/get_image/project/100000005_170x120.png',
                    },
                    {
                        id: 111,
                        title: '&1& 1.0',
                        author: '1',
                        thumbnailUrl: 'https://cdn2.scratch.mit.edu/get_image/project/100000006_170x120.png',
                    },
                    {
                        id: 123,
                        title: 'Ultimate Sandra Ve...',
                        author: 'mira',
                        thumbnailUrl: 'https://cdn2.scratch.mit.edu/get_image/project/100000007_170x120.png',
                    },
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

<div class="bg-background text-text dark:bg-background-dark dark:text-text-dark p-4 rounded-lg border border-border dark:border-border-dark font-sans mx-auto my-2 max-w-4xl">
    <h2 class="text-xl font-semibold mb-3">{title}</h2>

    {#if loading}
        <span class="sr-only">Loading...</span>
        <div class="relative flex gap-4 overflow-x-hidden pb-4" use:scrollToStart>
            {#each Array(skeletonCount) as _, i (i)}
                <div class="bg-footer dark:bg-footer-dark rounded-md overflow-hidden border border-border dark:border-border-dark w-48 flex-shrink-0 shadow-sm animate-pulse">
                    <div class="aspect-[4/3] bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm pointer-events-none m-2 mb-0 rounded">
                        <Image />
                    </div>
                    <div class="px-3 py-2">
                        <div class="font-medium mb-3 text-base h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mt-1"></div>
                        <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2 my-1"></div>
                    </div>
                </div>
            {/each}
            <div class="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background dark:from-background-dark to-transparent pointer-events-none"></div>
        </div>

    {:else if error}
        <p class="text-red-500 text-base text-center py-4">{error}</p>

    {:else if projects.length > 0}
        <div class="flex gap-4 overflow-x-auto pb-4 hide-scrollbar" use:scrollToStart>
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
        <p class="text-base text-center py-4">No projects available.</p>
    {/if}
</div>
