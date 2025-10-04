<script>
	// Assuming these imports are correctly configured for your SvelteKit project
	import { username } from '$stores/session';
	import { goto } from '$app/navigation';
	import { User, FolderOpen, FilePlus2 } from '@lucide/svelte'; // Corrected import for Lucide icons in Svelte
</script>

<div class="flex flex-col items-center p-5">
	<!--
        A placeholder logo/initials display.
        Styled with a dashed border and rounded corners.
        Includes dark mode styling for border and text color.
    -->
	<div
		class="mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-xl text-gray-500 dark:border-gray-600 dark:text-gray-400"
	>
		<span>AM</span>
	</div>

	<!--
        Greeting heading displaying the username from the Svelte store.
        Uses Tailwind classes for font size, weight, and margin.
        Includes dark mode styling for text color.
    -->
	<h1 class="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Hello, {$username}!</h1>

	<!--
        Container for the action buttons, using flexbox for horizontal layout and gap.
    -->
	<div class="flex gap-2.5">
		<!--
            Create button:
            - Flex column for icon and text.
            - Fixed width and height, border, and background.
            - Cursor pointer and active scale effect for interaction.
            - Specific rounded corners for the left-most button.
            - Dark mode styles: darker background, border, and text.
            - onClick handler to navigate to the create page.
        -->
		<button
			class="flex h-[70px] w-[70px] cursor-pointer flex-col items-center justify-center rounded-l-full rounded-r-md border border-gray-300 bg-gray-100 transition-transform duration-100
                   ease-in-out active:scale-95
                   dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
			on:click={() => goto('/editor')}
		>
			<span class="mb-1.5 text-2xl text-gray-700 dark:text-gray-200"><FilePlus2 /></span>
			<span class="text-xs text-gray-700 dark:text-gray-200">Create</span>
		</button>

		<!--
            My Stuff button:
            - Similar styling to the Create button.
            - Standard rounded corners as it's a middle button.
            - Dark mode styles applied.
            - onClick handler to navigate to the my-stuff page.
        -->
		<button
			class="flex h-[70px] w-[70px] cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-gray-100 transition-transform duration-100 ease-in-out
                   active:scale-95
                   dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
			on:click={() => goto('/my-stuff')}
		>
			<span class="mb-1.5 text-2xl text-gray-700 dark:text-gray-200"><FolderOpen /></span>
			<span class="text-xs text-gray-700 dark:text-gray-200">My Stuff</span>
		</button>

		<!--
            Profile button:
            - Similar styling to the other buttons.
            - Specific rounded corners for the right-most button.
            - Dark mode styles applied.
            - onClick handler to navigate to the profile page.
        -->
		<button
			class="flex h-[70px] w-[70px] cursor-pointer flex-col items-center justify-center rounded-l-md rounded-r-full border border-gray-300 bg-gray-100 transition-transform duration-100
                   ease-in-out active:scale-95
                   dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
			on:click={() => goto('/profile')}
		>
			<span class="mb-1.5 text-2xl text-gray-700 dark:text-gray-200"><User /></span>
			<span class="text-xs text-gray-700 dark:text-gray-200">Profile</span>
		</button>
	</div>
</div>
