<script>
	import appleCatIllustration from './apple-cat-hero.svg';
	import { Clapperboard, Sparkles, Info } from '@lucide/svelte';
</script>

<section
	class="bg-accent-secondary px-4 py-12 font-bold text-white shadow-xl md:flex-row md:px-[10%] flex flex-col items-center justify-between"
>
	<div class="gap-6 md:max-w-[60%] flex max-w-full flex-col">
		<h1 class="text-4xl font-extrabold leading-tight md:text-5xl">Program anything</h1>
		<p class="text-xl text-white/80 md:text-2xl italic">
			Low floor. Wide walls. <strong>No</strong> ceiling.
		</p>

		<div class="mt-4 gap-4 flex flex-wrap">
			<a
				href="https://ampmod.codeberg.page"
				class="text-accent-secondary hover:bg-footer gap-2 rounded-xl bg-white px-6 py-3 text-lg font-black shadow hover:text-green-800 flex items-center transition-colors duration-200"
				aria-label="Try AmpMod"
			>
				<Clapperboard /> Try it out
			</a>

			<a
				href="/join"
				class="hover:border-accent gap-2 rounded-xl border-white px-6 py-3 text-lg font-bold text-white flex items-center border bg-transparent transition-colors duration-200"
				aria-label="Join AmpMod"
			>
				<Sparkles /> Join
			</a>

			<a
				href="/about"
				class="hover:border-accent gap-2 rounded-xl border-white px-6 py-3 text-lg font-bold text-white flex items-center border bg-transparent transition-colors duration-200"
				aria-label="Learn more about AmpMod"
			>
				<Info /> About AmpMod
			</a>
		</div>
	</div>

	<div class="mt-10 md:mt-0 flex-shrink-0">
		<img
			src={appleCatIllustration}
			alt="Apple Cat dropping an array block into an input field"
			class="drop-shadow-xl md:h-[220px] h-[180px]"
			draggable={false}
		/>
	</div>
</section>
