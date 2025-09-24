<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
	<div class="w-full max-w-md rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 dark:shadow-none">
		<h1 class="mb-6 text-center text-2xl font-semibold text-gray-800 dark:text-gray-100">
			Login or Register
		</h1>

		<form method="post" action="?/login" use:enhance class="space-y-5">
			<div>
				<label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
					Username
				</label>
				<input
					id="username"
					name="username"
					required
					class="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
				/>
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
					Password
				</label>
				<input
					id="password"
					type="password"
					name="password"
					required
					class="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
				/>
			</div>

			<div class="flex justify-between">
				<button
					type="submit"
					class="w-[48%] rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
				>
					Login
				</button>
				<button
					type="submit"
					formaction="?/register"
					class="w-[48%] rounded-md bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
				>
					Register
				</button>
			</div>
		</form>

		{#if form?.message}
			<p class="mt-4 text-center text-sm text-red-500">{form.message}</p>
		{/if}
	</div>
</div>
