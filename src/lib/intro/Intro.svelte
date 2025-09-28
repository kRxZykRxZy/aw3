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
    <div class="mb-5 w-[60px] h-[60px] border-2 border-dashed border-gray-300 flex justify-center items-center text-xl text-gray-500 rounded-md dark:border-gray-600 dark:text-gray-400">
        <span>AM</span>
    </div>

    <!--
        Greeting heading displaying the username from the Svelte store.
        Uses Tailwind classes for font size, weight, and margin.
        Includes dark mode styling for text color.
    -->
    <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Hello, {$username}!</h1>

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
            class="flex flex-col items-center justify-center w-[70px] h-[70px] border border-gray-300 bg-gray-100 cursor-pointer active:scale-95 transition-transform duration-100 ease-in-out
                   rounded-l-full rounded-r-md
                   dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            on:click={() => goto('/editor')}
        >
            <span class="text-2xl mb-1.5 text-gray-700 dark:text-gray-200"><FilePlus2 /></span>
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
            class="flex flex-col items-center justify-center w-[70px] h-[70px] border border-gray-300 bg-gray-100 cursor-pointer active:scale-95 transition-transform duration-100 ease-in-out
                   rounded-md
                   dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            on:click={() => goto('/my-stuff')}
        >
            <span class="text-2xl mb-1.5 text-gray-700 dark:text-gray-200"><FolderOpen /></span>
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
            class="flex flex-col items-center justify-center w-[70px] h-[70px] border border-gray-300 bg-gray-100 cursor-pointer active:scale-95 transition-transform duration-100 ease-in-out
                   rounded-r-full rounded-l-md
                   dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            on:click={() => goto('/profile')}
        >
            <span class="text-2xl mb-1.5 text-gray-700 dark:text-gray-200"><User /></span>
            <span class="text-xs text-gray-700 dark:text-gray-200">Profile</span>
        </button>
    </div>
</div>
