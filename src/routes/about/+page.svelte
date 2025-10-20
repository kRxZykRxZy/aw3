<script>
	import blobLight from './blob-light.png';
	import blobDark from './blob-dark.png';
	import {
		LibraryBig,
		BookText,
		NotebookTabs,
		CodeIcon,
		MessagesSquare,
		Lightbulb,
		Newspaper,
		TriangleAlert
	} from '@lucide/svelte';
</script>

<svelte:head>
	<title>About AmpMod - An advanced programming language</title>
</svelte:head>

<div class="m-auto min-h-screen">
	<div>
		<header class="bg-accent-secondary px-6 py-10 text-white w-full text-center">
			<h1 class="mb-8 text-5xl font-black">Low floor. Wide walls. <em>No</em> ceiling.</h1>
			<p class="max-w-3xl text-xl mx-auto">
				AmpMod is a powerful block-based programming language built on Scratch 3.0 that takes away
				most of the limitations of block-based programming.
			</p>
			<div class="mt-8">
				<div
					class="rounded-t-xl border-gray-800 bg-gray-800 shadow-xl md:max-w-[768px] dark:border-gray-800 relative mx-auto max-w-[450px] border-[8px]"
				>
					<div class="rounded-lg bg-white dark:bg-gray-800 overflow-hidden">
						<img
							src={blobLight}
							alt="A screenshot of AmpMod's interface in light mode."
							class="mx-auto h-full w-full dark:hidden"
							draggable="false"
						/>
						<img
							src={blobDark}
							alt="A screenshot of AmpMod's interface in dark mode."
							class="mx-auto hidden h-full w-full dark:block"
							draggable="false"
						/>
					</div>
				</div>
				<div
					class="rounded-b-xl bg-gray-900 md:max-w-[900px] dark:bg-gray-700 relative mx-auto h-[12px] max-w-[550px]"
				>
					<div class="inset-x-0 top-0 absolute -mt-px flex justify-center">
						<div
							class="rounded-b-lg bg-gray-700 md:h-[4px] md:w-[80px] dark:bg-gray-800 h-[2px] w-[50px]"
						></div>
					</div>
				</div>
				<p class="mt-4 text-white/60">
					Project: <a href="https://scratch.mit.edu/projects/2639973" class="text-white"
						>"Blobules"</a
					> by angeliccharizard on Scratch; CC-BY-SA 2.0.
				</p>
			</div>
		</header>
	</div>

	<section class="px-6 py-16 container mx-auto">
		<div class="gap-8 md:grid-cols-3 grid grid-cols-1">
			<div class="rounded-lg bg-gray-100 p-6 shadow-lg dark:bg-gray-800">
				<h3 class="text-accent mb-4 text-xl font-black">Advanced</h3>
				<p class="text-gray-700 dark:text-gray-300">
					AmpMod includes arrays, which are first class lists you can nest inside of each other. In
					addition, AmpMod includes over 100 extensions for you to use in your projects.
				</p>
				<p class="font-bold text-gray-900 dark:text-white">
					AmpMod is more than a simple educational programming language.
				</p>
			</div>
			<div class="rounded-lg bg-gray-100 p-6 shadow-lg dark:bg-gray-800">
				<h3 class="text-accent mb-4 text-xl font-black">Open-source</h3>
				<p class="text-gray-700 dark:text-gray-300">
					AmpMod is entirely open-source under various licences, primarily the <a
						href="/gpl"
						class="text-accent font-bold underline">GNU General Public Licence 3.0</a
					>
					and <a href="/mpl" class="text-accent font-bold underline">Mozilla Public Licence 2.0</a>.
					It is free for both non-commercial and commercial use.
				</p>
				<p class="font-bold text-gray-900 dark:text-white">
					We don't just allow contributions, we encourage them.
				</p>
			</div>
			<div class="rounded-lg bg-gray-100 p-6 shadow-lg dark:bg-gray-800">
				<h3 class="text-accent mb-4 text-xl font-black">Community-ran</h3>
				<p class="text-gray-700 dark:text-gray-300">
					AmpMod is ran entirely by a group of Scratchers who want an opportunity to use more
					advanced programming features in their projects. We also implement suggestions from the
					community.
				</p>
				<p class="font-bold text-gray-900 dark:text-white">
					The future of AmpMod is in your own hands.
				</p>
			</div>
		</div>
	</section>

	<section class="py-16">
		<div class="px-6 container mx-auto text-center">
			<h2 class="text-accent mb-8 text-3xl font-bold">Need Help?</h2>
			<div class="gap-8 md:grid-cols-4 grid grid-cols-1">
				<div>
					<a
						class="bg-accent rounded-lg px-6 py-4 text-lg font-bold text-white hover:shadow-lg block transition-shadow"
						href="https://ampmod.codeberg.page/manual"
						target="_blank"
						rel="noopener noreferrer"
					>
						<BookText class="mr-2 inline-block" /> Read the Manual
					</a>
					<p class="mt-4 text-gray-700 dark:text-gray-300">
						The AmpMod manual is a comprehensive guide to using AmpMod, including tutorials, guides,
						and reference material.
					</p>
				</div>
				<div>
					<a
						class="bg-accent rounded-lg px-6 py-4 text-lg font-bold text-white hover:shadow-lg block transition-shadow"
						href="https://ampmod.miraheze.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						<LibraryBig class="mr-2 inline-block" /> Read the Wiki
					</a>
					<p class="mt-4 text-gray-700 dark:text-gray-300">
						The official AmpMod wiki includes guides, documentation, and other information for more
						experienced AmpModders.
					</p>
				</div>
				<div>
					<a
						class="bg-accent rounded-lg px-6 py-4 text-lg font-bold text-white hover:shadow-lg block transition-shadow"
						href="https://ampmod.flarum.cloud"
						target="_blank"
						rel="noopener noreferrer"
					>
						<MessagesSquare class="mr-2 inline-block" /> Join the Forums
					</a>
					<p class="mt-4 text-gray-700 dark:text-gray-300">
						Join our forums to discuss features, get help, and connect with other contributors and
						users.
					</p>
				</div>
				<div>
					<a
						class="bg-accent rounded-lg px-6 py-4 text-lg font-bold text-white hover:shadow-lg block transition-shadow"
						href="https://ampmod.flarum.cloud/blog"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Newspaper class="mr-2 inline-block" /> Read the Blog
					</a>
					<p class="mt-4 text-gray-700 dark:text-gray-300">
						The AmpMod Blog is a sub-section of the AmpMod forums ran by the forum's admins and
						newswriters.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="px-6 py-16 container mx-auto text-center">
		<h2 class="text-accent mb-8 text-3xl font-bold">Contribute to AmpMod!</h2>
		<div class="gap-8 md:grid-cols-3 grid grid-cols-1">
			<div>
				<a
					class="bg-accent rounded-lg px-6 py-4 text-lg font-bold text-white hover:shadow-lg block transition-shadow"
					href="https://ampmod.codeberg.page/manual/dev"
					target="_blank"
					rel="noopener noreferrer"
				>
					<NotebookTabs class="mr-2 inline-block" /> Read Dev Docs
				</a>
				<p class="mt-4 text-gray-700 dark:text-gray-300">
					If you want to contribute to AmpMod, create extensions, or create your own fork of AmpMod,
					read the developer documentation to find out more!
				</p>
			</div>
			<div>
				<a
					class="bg-accent rounded-lg px-6 py-4 text-lg font-bold text-white hover:shadow-lg block transition-shadow"
					href="https://codeberg.org/ampmod"
					target="_blank"
					rel="noopener noreferrer"
				>
					<CodeIcon class="mr-2 inline-block" /> Source Code
				</a>
				<p class="mt-4 text-gray-700 dark:text-gray-300">
					Browse the source code and submit pull requests on our Codeberg repositories. All
					contributions are welcome.
				</p>
			</div>
			<div>
				<a
					class="bg-accent rounded-lg px-6 py-4 text-lg font-bold text-white hover:shadow-lg block transition-shadow"
					href="https://ampmod.flarum.cloud/t/suggestions"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Lightbulb class="mr-2 inline-block" /> Suggest Features
				</a>
				<p class="mt-4 text-gray-700 dark:text-gray-300">
					Even if you don't know how to program in web technologies or use Git, you are welcome to
					make suggestions to improve AmpMod.
				</p>
			</div>
		</div>
	</section>
</div>
