<script>
	import { browser } from '$app/environment';

	const funFacts = [
		'Accounts can be linked to not just Scratch, but also to Codeberg, GitHub, the Wiki, and the Forums.',
		'AmpMod is a community-driven project, with contributions from many Scratchers.',
		'All your costume are belong to us.',
		'The mascot of AmpMod is Apple Cat, which is a modification of the Apple sprite.',
		'In the editor, there are more fun facts while the project loads.',
		'Apple Cat is, suprisingly, not affiliated with Apple.',
		'AmpMod is based off TurboWarp, which gives it powerful performance enhancements.',
		'Studios will be available soon.',
		"'Clutters' will be available soon, which are groups of projects that play in order.",
		'We respect your privacy and do not collect any personal data.',
		'AmpMod is open source, and you can contribute to its development on Codeberg.',
		'The CIA does not know about AmpMod.',
		'Bad security advice: Do not watch YouTube and use AmpMod at the same time. It may result in you being hacked.'
	];
	let selectedFact = Math.floor(Math.random() * funFacts.length);
</script>

<footer class="mt-20 w-full bg-footer px-4 py-12 text-text dark:bg-footer-dark dark:text-text-dark">
	<div class="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-6">
		<nav aria-label="Community Links" class="space-y-4">
			<h4 class="text-primary-dark dark:text-primary-light text-lg font-semibold">Community</h4>
			<ul class="space-y-2 text-sm">
				<li>
					<a
						href="/"
						class="hover:text-accent-hover text-accent transition-colors"
						title="Go to the AmpMod homepage">Home</a
					>
				</li>
				<li>
					<a
						href="https://ampmod.flarum.cloud"
						class="hover:text-accent-hover text-accent transition-colors"
						title="Visit the AmpMod Discussion Forums">Discussion Forums</a
					>
				</li>
				<li>
					<a
						href="https://ampmod.flarum.cloud/blog"
						class="hover:text-accent-hover text-accent transition-colors"
						title="Read the AmpMod blog">Blog</a
					>
				</li>
				<li>
					<a
						href="https://ampmod.miraheze.org/"
						class="hover:text-accent-hover text-accent transition-colors"
						title="Visit the AmpMod Wiki">AmpMod Wiki</a
					>
				</li>
				<li>
					<span
						class="cursor-not-allowed text-gray-500"
						title="Statistics feature is not available yet">Statistics</span
					>
				</li>
			</ul>
		</nav>

		<nav aria-label="Resources Links" class="space-y-4">
			<h4 class="text-primary-dark dark:text-primary-light text-lg font-semibold">Resources</h4>
			<ul class="space-y-2 text-sm">
				<li>
					<a
						href="/about"
						class="hover:text-accent-hover text-accent transition-colors"
						title="Learn more about AmpMod">About</a
					>
				</li>
				<li>
					<a
						href="https://codeberg.org/AmpMod"
						class="hover:text-accent-hover text-accent transition-colors"
						title="View the AmpMod source code on Codeberg">Source Code</a
					>
				</li>
				<li>
					<a
						href="https://ampmod.codeberg.page/manual"
						class="hover:text-accent-hover text-accent transition-colors"
						title="Read the AmpMod manual">Manual</a
					>
				</li>
				<li>
					<a
						href="/faq"
						class="hover:text-accent-hover text-accent transition-colors"
						title="Read the AmpMod FAQ">FAQ</a
					>
				</li>
				<li>
					<a
						href="/mirrors"
						class="hover:text-accent-hover text-accent transition-colors"
						title="Find mirrors of the AmpMod editor">Mirrors</a
					>
				</li>
			</ul>
		</nav>

		<nav aria-label="Policy Links" class="space-y-4">
			<h4 class="text-primary-dark dark:text-primary-light text-lg font-semibold">Policy</h4>
			<ul class="space-y-2 text-sm">
				<li>
					<a
						href="/proj-guidelines"
						class="hover:text-accent-hover text-accent transition-colors"
						title="Read the AmpMod Project Guidelines">Project Guidelines</a
					>
				</li>
				<li>
					<a
						href="/terms"
						class="hover:text-accent-hover text-accent transition-colors"
						title="Read the AmpMod Terms of Use">Terms of Use</a
					>
				</li>
				<li>
					<a
						href="/privacy"
						class="hover:text-accent-hover text-accent transition-colors"
						title="Read the AmpMod Privacy Policy">Privacy Policy</a
					>
				</li>
			</ul>
		</nav>

		<div class="space-y-4">
			<h4 class="text-primary-dark dark:text-primary-light text-lg font-semibold">Donate</h4>
			<ul class="space-y-2 text-sm">
				<li>
					<a
						href="https://www.scratchfoundation.org/donate"
						class="hover:text-accent-hover text-accent transition-colors"
						title="Donate to the Scratch Foundation">Scratch Foundation</a
					>
				</li>
			</ul>
		</div>

		<div class="col-span-2 space-y-4 text-right md:col-span-2 md:col-start-5">
			<div class="space-y-2 text-sm">
				<p class="text-gray-400">
					AmpMod is not affiliated with Scratch, the Scratch Team, the Scratch Foundation, or the
					TurboWarp developers.
				</p>
				<p class="text-gray-500">
					&copy; {new Date().getFullYear()} AmpMod contributors; user-generated content licenced under
					CC-BY-SA 4.0.
				</p>
				<button
					type="button"
					data-cc="show-preferencesModal"
					class="hover:text-accent-hover cursor-pointer text-accent transition-colors"
					title="Manage your cookie preferences">Cookie Preferences</button
				>
				{#if browser}
					<p>
						{funFacts[selectedFact]}
						<button
							type="button"
							class="cursor-pointer text-accent"
							on:click={() => (selectedFact = Math.floor(Math.random() * funFacts.length))}
							aria-label="Show another fun fact"
						>
							more?
						</button>
					</p>
				{/if}
			</div>
		</div>
	</div>
</footer>
