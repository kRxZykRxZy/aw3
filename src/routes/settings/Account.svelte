<script lang="ts">
	import { XCircle, AlertTriangle, Check, ArrowUp } from '@lucide/svelte';
</script>

<div class="linked-accounts">
	<h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Linked Accounts</h3>
	<ul class="m-0 flex list-none flex-col gap-2 p-0">
		<li
			class="flex items-center justify-between rounded-lg border border-gray-300 bg-gray-50 p-3 transition-colors duration-300 hover:bg-green-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-green-900/20"
		>
			<div class="flex flex-col">
				<span class="font-bold text-gray-800 dark:text-gray-200">Scratch</span>
				<span class="text-sm text-red-800"
					>Clicking "Link" will take you to an authentication service not owned by the Scratch
					Foundation.</span
				>
			</div>
			<a
				href="#"
				class="ml-1 cursor-pointer rounded-md bg-accent px-3 py-1.5 text-sm text-white no-underline transition-colors hover:bg-accent-secondary"
				>Link</a
			>
		</li>
		<li
			class="flex items-center justify-between rounded-lg border border-gray-300 bg-gray-50 p-3 transition-colors duration-300 hover:bg-green-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-green-900/20"
		>
			<span class="font-bold text-gray-800 dark:text-gray-200">Codeberg</span>
			<a
				href="#"
				class="cursor-pointer rounded-md bg-accent px-3 py-1.5 text-sm text-white no-underline transition-colors hover:bg-accent-secondary"
				>Link</a
			>
		</li>
		<li
			class="flex items-center justify-between rounded-lg border border-gray-300 bg-gray-50 p-3 transition-colors duration-300 hover:bg-green-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-green-900/20"
		>
			<span class="font-bold text-gray-800 dark:text-gray-200">GitHub</span>
			<a
				href="#"
				class="cursor-pointer rounded-md bg-accent px-3 py-1.5 text-sm text-white no-underline transition-colors hover:bg-accent-secondary"
				>Link</a
			>
		</li>
		<li
			class="flex items-center justify-between rounded-lg border border-gray-300 bg-gray-50 p-3 transition-colors duration-300 hover:bg-green-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-green-900/20"
		>
			<span class="font-bold text-gray-800 dark:text-gray-200">AmpMod Wiki</span>
			<a
				href="#"
				class="cursor-pointer rounded-md bg-accent px-3 py-1.5 text-sm text-white no-underline transition-colors hover:bg-accent-secondary"
				>Link</a
			>
		</li>
		<li
			class="flex items-center justify-between rounded-lg border border-gray-300 bg-gray-50 p-3 transition-colors duration-300 hover:bg-green-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-green-900/20"
		>
			<span class="font-bold text-gray-800 dark:text-gray-200">AmpMod Forums</span>
			<a
				href="#"
				class="cursor-pointer rounded-md bg-accent px-3 py-1.5 text-sm text-white no-underline transition-colors hover:bg-accent-secondary"
				>Link</a
			>
		</li>
	</ul>
</div>

<h3 class="mt-8 mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">Account Standing</h3>
<i class="text-sm text-gray-700 dark:text-gray-300">
	The AmpMod website is moderated to ensure that projects follow our
	<a href="/proj-guidelines" class="text-accent hover:underline">guidelines</a>. If you violate the
	guidelines, your account's reputation can be lowered.
</i>

<div class="mt-4 flex items-center justify-around gap-4 pb-8 text-center">
	<div class="flex flex-col items-center">
		<span class="text-5xl text-red-500">
			<XCircle size="1em" stroke-width="2" />
		</span>
		<span class="mt-1 text-gray-800 dark:text-gray-200">Banned</span>
	</div>
	<div class="flex flex-col items-center">
		<span class="text-5xl text-orange-400">
			<AlertTriangle size="1em" stroke-width="2" />
		</span>
		<span class="mt-1 text-gray-800 dark:text-gray-200">Limited</span>
	</div>
	<div class="relative flex flex-col items-center">
		<span class="text-5xl text-green-500">
			<Check size="1em" stroke-width="2" />
		</span>
		<span class="mt-1 text-gray-800 dark:text-gray-200">Full Access</span>
		<ArrowUp
			size="24"
			stroke-width="2"
			class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-gray-900 dark:text-gray-100"
		/>
	</div>
</div>

<p>Moderator warnings: <span class="text-original-accent">None</span></p>
