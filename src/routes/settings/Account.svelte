<script lang="ts">
    import { XCircle, AlertTriangle, Check, ArrowUp } from '@lucide/svelte';
</script>

<div class="linked-accounts">
    <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Linked Accounts</h3>
    <ul class="flex flex-col gap-2 p-0 m-0 list-none">
        <li class="flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 transition-colors duration-300 hover:bg-green-50 dark:hover:bg-green-900/20">
            <div class="flex flex-col">
                <span class="font-bold text-gray-800 dark:text-gray-200">Scratch</span>
                <span class="text-sm text-red-800">Clicking "Link" will take you to an authentication service not owned by the Scratch Foundation.</span>
            </div>
            <a href="#" class="px-3 py-1.5 text-sm text-white bg-accent rounded-md cursor-pointer no-underline hover:bg-accent-secondary transition-colors ml-1">Link</a>
        </li>
        <li class="flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 transition-colors duration-300 hover:bg-green-50 dark:hover:bg-green-900/20">
            <span class="font-bold text-gray-800 dark:text-gray-200">Codeberg</span>
            <a href="#" class="px-3 py-1.5 text-sm text-white bg-accent rounded-md cursor-pointer no-underline hover:bg-accent-secondary transition-colors">Link</a>
        </li>
        <li class="flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 transition-colors duration-300 hover:bg-green-50 dark:hover:bg-green-900/20">
            <span class="font-bold text-gray-800 dark:text-gray-200">GitHub</span>
            <a href="#" class="px-3 py-1.5 text-sm text-white bg-accent rounded-md cursor-pointer no-underline hover:bg-accent-secondary transition-colors">Link</a>
        </li>
        <li class="flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 transition-colors duration-300 hover:bg-green-50 dark:hover:bg-green-900/20">
            <span class="font-bold text-gray-800 dark:text-gray-200">AmpMod Wiki</span>
            <a href="#" class="px-3 py-1.5 text-sm text-white bg-accent rounded-md cursor-pointer no-underline hover:bg-accent-secondary transition-colors">Link</a>
        </li>
        <li class="flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 transition-colors duration-300 hover:bg-green-50 dark:hover:bg-green-900/20">
            <span class="font-bold text-gray-800 dark:text-gray-200">AmpMod Forums</span>
            <a href="#" class="px-3 py-1.5 text-sm text-white bg-accent rounded-md cursor-pointer no-underline hover:bg-accent-secondary transition-colors">Link</a>
        </li>
    </ul>
</div>

<h3 class="text-xl font-semibold mt-8 mb-2 text-gray-900 dark:text-gray-100">Account Standing</h3>
<i class="text-gray-700 dark:text-gray-300 text-sm">
    The AmpMod website is moderated to ensure that projects follow our
    <a href="/proj-guidelines" class="text-accent hover:underline">guidelines</a>.
    If you violate the guidelines, your account's reputation can be lowered.
</i>

<div class="mt-4 flex items-center justify-around gap-4 text-center pb-8">
    <div class="flex flex-col items-center">
        <span class="text-red-500 text-5xl">
            <XCircle size="1em" stroke-width="2" />
        </span>
        <span class="text-gray-800 dark:text-gray-200 mt-1">Banned</span>
    </div>
    <div class="flex flex-col items-center">
        <span class="text-orange-400 text-5xl">
            <AlertTriangle size="1em" stroke-width="2" />
        </span>
        <span class="text-gray-800 dark:text-gray-200 mt-1">Limited</span>
    </div>
    <div class="flex flex-col items-center relative">
        <span class="text-green-500 text-5xl">
            <Check size="1em" stroke-width="2" />
        </span>
        <span class="text-gray-800 dark:text-gray-200 mt-1">Full Access</span>
        <ArrowUp size="24" stroke-width="2" class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-gray-900 dark:text-gray-100" />
    </div>
</div>

<p>Moderator warnings: <span class="text-original-accent">None</span></p>
