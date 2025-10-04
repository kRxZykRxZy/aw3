<script>
	import appleCatIllustration from './apple-cat-rankup.svg';
	import { Clapperboard, Sparkles, Info } from '@lucide/svelte';
</script>

<section
	class="flex flex-col items-center justify-between overflow-hidden bg-blue-500 px-4 py-16 font-bold text-white shadow-xl md:flex-row md:px-[10%]"
>
	<div
		class="flex w-full flex-col items-center gap-8 text-center md:w-2/3 md:items-start md:text-left"
	>
		<h1 class="text-5xl leading-tight font-bold md:text-6xl">The new AmpMod is here!</h1>

		<div class="mt-2 flex flex-wrap justify-center gap-4 md:justify-start">
			<a
				href="/editor"
				class="flex items-center gap-2 rounded-2xl bg-orange-400 px-8 py-4 text-xl font-black text-white shadow-lg transition-colors duration-200 hover:bg-orange-500"
				aria-label="Create an AmpMod project"
			>
				<Clapperboard /> Create a project
			</a>

			<a
				href="/join"
				class="flex items-center gap-2 rounded-2xl border-2 border-white bg-transparent px-8 py-4 text-xl font-bold text-white transition-colors duration-200 hover:border-yellow-400 hover:text-yellow-300"
				aria-label="Join AmpMod"
			>
				<Sparkles /> Join
			</a>

			<a
				href="/about"
				class="flex items-center gap-2 rounded-2xl border-2 border-white bg-transparent px-8 py-4 text-xl font-bold text-white transition-colors duration-200 hover:border-green-400 hover:text-green-300"
				aria-label="Learn more about AmpMod"
			>
				<Info /> About
			</a>
		</div>
	</div>

	<div class="relative mt-12 flex flex-shrink-0 items-center justify-center md:mt-0">
		<img
			src={appleCatIllustration}
			alt="Apple Cat dropping an array block into an input field"
			class="h-[200px] md:h-[260px]"
			draggable={false}
		/>
	</div>
</section>

<style>
	/* Removed playful float animation for a flatter, more serious look */
</style>
