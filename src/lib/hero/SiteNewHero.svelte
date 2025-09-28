<script>
    import appleCatIllustration from './apple-cat-rankup.svg';
    import { Clapperboard, Sparkles, Info } from '@lucide/svelte';
</script>


<section class="flex flex-col md:flex-row items-center justify-between bg-blue-500 text-white font-bold py-16 px-4 md:px-[10%] overflow-hidden shadow-xl">
    <div class="w-full md:w-2/3 flex flex-col items-center md:items-start gap-8 text-center md:text-left">
        <h1 class="text-5xl md:text-6xl font-bold leading-tight">
            The new AmpMod is here!
        </h1>

        <div class="flex flex-wrap gap-4 justify-center md:justify-start mt-2">
            <a
                href="/editor"
                class="px-8 py-4 text-xl font-black rounded-2xl shadow-lg bg-orange-400 text-white hover:bg-orange-500 transition-colors duration-200 flex items-center gap-2"
                aria-label="Create an AmpMod project"
            >
                <Clapperboard /> Create a project
            </a>

            <a
                href="/join"
                class="px-8 py-4 text-xl font-bold rounded-2xl border-2 border-white bg-transparent text-white hover:border-yellow-400 hover:text-yellow-300 transition-colors duration-200 flex items-center gap-2"
                aria-label="Join AmpMod"
            >
                <Sparkles /> Join
            </a>

            <a
                href="/about"
                class="px-8 py-4 text-xl font-bold rounded-2xl border-2 border-white bg-transparent text-white hover:border-green-400 hover:text-green-300 transition-colors duration-200 flex items-center gap-2"
                aria-label="Learn more about AmpMod"
            >
                <Info /> About
            </a>
        </div>
    </div>

    <div class="relative mt-12 md:mt-0 flex-shrink-0 flex justify-center items-center">
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
