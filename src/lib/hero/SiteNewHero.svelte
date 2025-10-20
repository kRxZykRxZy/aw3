<script>
	import appleCatIllustration from './apple-cat-rankup.svg';
	import { Clapperboard, Sparkles, Info } from '@lucide/svelte';
</script>

<section
	class="bg-blue-500 px-4 py-16 font-bold text-white shadow-xl md:flex-row md:px-[10%] flex flex-col items-center justify-between overflow-hidden"
>
	<div
		class="gap-8 md:w-2/3 md:items-start md:text-left flex w-full flex-col items-center text-center"
	>
		<h1 class="text-5xl font-bold leading-tight md:text-6xl">The new AmpMod is here!</h1>

		<div class="mt-2 gap-4 md:justify-start flex flex-wrap justify-center">
			<a
				href="/editor"
				class="gap-2 rounded-2xl bg-orange-400 px-8 py-4 text-xl font-black text-white shadow-lg hover:bg-orange-500 flex items-center transition-colors duration-200"
				aria-label="Create an AmpMod project"
			>
				<Clapperboard /> Create a project
			</a>

			<a
				href="/join"
				class="gap-2 rounded-2xl border-white px-8 py-4 text-xl font-bold text-white hover:border-yellow-400 hover:text-yellow-300 flex items-center border-2 bg-transparent transition-colors duration-200"
				aria-label="Join AmpMod"
			>
				<Sparkles /> Join
			</a>

			<a
				href="/about"
				class="gap-2 rounded-2xl border-white px-8 py-4 text-xl font-bold text-white hover:border-green-400 hover:text-green-300 flex items-center border-2 bg-transparent transition-colors duration-200"
				aria-label="Learn more about AmpMod"
			>
				<Info /> About
			</a>
		</div>
	</div>

	<div class="mt-12 md:mt-0 relative flex flex-shrink-0 items-center justify-center">
		<img
			src={appleCatIllustration}
			alt="Apple Cat dropping an array block into an input field"
			class="md:h-[260px] h-[200px]"
			draggable={false}
		/>
	</div>
</section>

<style>
	/* Removed playful float animation for a flatter, more serious look */
</style>
