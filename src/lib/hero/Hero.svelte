<script>
	import appleCatIllustration from './apple-cat-hero.svg';
	import { Clapperboard, Sparkles, Info } from '@lucide/svelte';
</script>

<section
	class="flex flex-col items-center justify-between bg-accent-secondary px-4 py-12 font-bold text-white shadow-xl md:flex-row md:px-[10%]"
>
	<div class="flex max-w-full flex-col gap-6 md:max-w-[60%]">
		<h1 class="text-4xl leading-tight font-extrabold md:text-5xl">Program anything</h1>
		<p class="text-xl text-white/80 italic md:text-2xl">
			Low floor. Wide walls. <strong>No</strong> ceiling.
		</p>

		<div class="mt-4 flex flex-wrap gap-4">
			<a
				href="https://ampmod.codeberg.page"
				class="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-lg font-black text-accent-secondary shadow transition-colors duration-200 hover:bg-footer hover:text-green-800"
				aria-label="Try AmpMod"
			>
				<Clapperboard /> Try it out
			</a>

			<a
				href="/join"
				class="flex items-center gap-2 rounded-xl border border-white bg-transparent px-6 py-3 text-lg font-bold text-white transition-colors duration-200 hover:border-accent"
				aria-label="Join AmpMod"
			>
				<Sparkles /> Join
			</a>

			<a
				href="/about"
				class="flex items-center gap-2 rounded-xl border border-white bg-transparent px-6 py-3 text-lg font-bold text-white transition-colors duration-200 hover:border-accent"
				aria-label="Learn more about AmpMod"
			>
				<Info /> About AmpMod
			</a>
		</div>
	</div>

	<div class="mt-10 flex-shrink-0 md:mt-0">
		<img
			src={appleCatIllustration}
			alt="Apple Cat dropping an array block into an input field"
			class="h-[180px] drop-shadow-xl md:h-[220px]"
			draggable={false}
		/>
	</div>
</section>
