<script>
    import appleCatIllustration from './apple-cat-hero.svg';
    import { Clapperboard, Sparkles, Info } from '@lucide/svelte';
</script>

<section class="flex flex-col md:flex-row items-center justify-between bg-accent-secondary text-white font-bold py-12 px-4 md:px-[10%] shadow-xl">
    <div class="max-w-full md:max-w-[60%] flex flex-col gap-6">
        <h1 class="text-4xl md:text-5xl font-extrabold leading-tight">
            Program anything
        </h1>
        <p class="text-white/80 text-xl md:text-2xl italic">
            Low floor. Wide walls. <strong>No</strong> ceiling.
        </p>

        <div class="flex flex-wrap gap-4 mt-4">
            <a
                href="https://ampmod.codeberg.page"
                class="px-6 py-3 text-lg font-black rounded-xl shadow bg-white text-accent-secondary hover:bg-footer hover:text-green-800 transition-colors duration-200 flex items-center gap-2"
                aria-label="Try AmpMod"
            >
                <Clapperboard /> Try it out
            </a>

            <a
                href="/join"
                class="px-6 py-3 text-lg font-bold rounded-xl border border-white bg-transparent text-white hover:border-accent transition-colors duration-200 flex items-center gap-2"
                aria-label="Join AmpMod"
            >
                <Sparkles /> Join
            </a>

            <a
                href="/about"
                class="px-6 py-3 text-lg font-bold rounded-xl border border-white bg-transparent text-white hover:border-accent transition-colors duration-200 flex items-center gap-2"
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
            class="h-[180px] md:h-[220px] drop-shadow-xl"
            draggable={false}
        />
    </div>
</section>
