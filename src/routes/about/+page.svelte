<script>
    import blobLight from './blob-light.png';
    import blobDark from './blob-dark.png';
    import { LibraryBig, BookText, NotebookTabs, CodeIcon, MessagesSquare, Lightbulb, Newspaper, TriangleAlert } from '@lucide/svelte';
</script>

<svelte:head>
    <title>About AmpMod - An advanced programming language</title>
</svelte:head>

<div class="min-h-screen m-auto">
    <div>
        <header class="w-full px-6 py-10 text-center bg-accent-secondary text-white">
            <h1 class="text-5xl font-black mb-8">Low floor. Wide walls. <em>No</em> ceiling.</h1>
            <p class="text-xl max-w-3xl mx-auto">AmpMod is a powerful block-based programming language built on Scratch 3.0 that takes away most of the limitations of block-based programming.</p>
            <div class="mt-8">
                <div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl max-w-[450px] md:max-w-[768px] shadow-xl">
                    <div class="rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                        <img src={blobLight} alt="A screenshot of AmpMod's interface in light mode." class="mx-auto w-full h-full dark:hidden" draggable="false" />
                        <img src={blobDark} alt="A screenshot of AmpMod's interface in dark mode." class="mx-auto w-full h-full hidden dark:block" draggable="false" />
                    </div>
                </div>
                <div class="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl h-[12px] max-w-[550px] md:max-w-[900px]">
                    <div class="absolute inset-x-0 top-0 flex justify-center -mt-px">
                        <div class="h-[2px] w-[50px] md:h-[4px] md:w-[80px] bg-gray-700 dark:bg-gray-800 rounded-b-lg"></div>
                    </div>
                </div>
                <p class="text-white/60 mt-4">Project: <a href="https://scratch.mit.edu/projects/2639973" class="text-white">"Blobules"</a> by angeliccharizard on Scratch; CC-BY-SA 2.0.</p>
            </div>
        </header>
    </div>

    <section class="container mx-auto px-6 py-16">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-black text-accent mb-4">Advanced</h3>
                <p class="text-gray-700 dark:text-gray-300">AmpMod includes arrays, which are first class lists you can nest inside of each other. In addition, AmpMod includes over 100 extensions for you to use in your projects.</p>
                <p class="text-gray-900 dark:text-white font-bold">AmpMod is more than a simple educational programming language.</p>
            </div>
            <div class="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-black text-accent mb-4">Open-source</h3>
                <p class="text-gray-700 dark:text-gray-300">AmpMod is entirely open-source under various licences, primarily the <a href="/gpl" class="text-accent font-bold underline">GNU General Public Licence 3.0</a> and <a href="/mpl" class="text-accent font-bold underline">Mozilla Public Licence 2.0</a>. It is free for both non-commercial and commercial use.</p>
                <p class="text-gray-900 dark:text-white font-bold">We don't just allow contributions, we encourage them.</p>
            </div>
            <div class="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-black text-accent mb-4">Community-ran</h3>
                <p class="text-gray-700 dark:text-gray-300">AmpMod is ran entirely by a group of Scratchers who want an opportunity to use more advanced programming features in their projects. We also implement suggestions from the community.</p>
                <p class="text-gray-900 dark:text-white font-bold">The future of AmpMod is in your own hands.</p>
            </div>
        </div>
    </section>

    <section class="py-16">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-3xl font-bold text-accent mb-8">Need Help?</h2>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <a class="block bg-accent text-white font-bold text-lg rounded-lg px-6 py-4 transition-shadow hover:shadow-lg" href="https://ampmod.codeberg.page/manual" target="_blank" rel="noopener noreferrer">
                        <BookText class="inline-block mr-2" /> Read the Manual
                    </a>
                    <p class="mt-4 text-gray-700 dark:text-gray-300">The AmpMod manual is a comprehensive guide to using AmpMod, including tutorials, guides, and reference material.</p>
                </div>
                <div>
                    <a class="block bg-accent text-white font-bold text-lg rounded-lg px-6 py-4 transition-shadow hover:shadow-lg" href="https://ampmod.miraheze.org" target="_blank" rel="noopener noreferrer">
                        <LibraryBig class="inline-block mr-2" /> Read the Wiki
                    </a>
                    <p class="mt-4 text-gray-700 dark:text-gray-300">The official AmpMod wiki includes guides, documentation, and other information for more experienced AmpModders.</p>
                </div>
                <div>
                    <a class="block bg-accent text-white font-bold text-lg rounded-lg px-6 py-4 transition-shadow hover:shadow-lg" href="https://ampmod.flarum.cloud" target="_blank" rel="noopener noreferrer">
                        <MessagesSquare class="inline-block mr-2" /> Join the Forums
                    </a>
                    <p class="mt-4 text-gray-700 dark:text-gray-300">Join our forums to discuss features, get help, and connect with other contributors and users.</p>
                </div>
                <div>
                    <a class="block bg-accent text-white font-bold text-lg rounded-lg px-6 py-4 transition-shadow hover:shadow-lg" href="https://ampmod.flarum.cloud/blog" target="_blank" rel="noopener noreferrer">
                        <Newspaper class="inline-block mr-2" /> Read the Blog
                    </a>
                    <p class="mt-4 text-gray-700 dark:text-gray-300">The AmpMod Blog is a sub-section of the AmpMod forums ran by the forum's admins and newswriters.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="container mx-auto px-6 py-16 text-center">
        <h2 class="text-3xl font-bold text-accent mb-8">Contribute to AmpMod!</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <a class="block bg-accent text-white font-bold text-lg rounded-lg px-6 py-4 transition-shadow hover:shadow-lg" href="https://ampmod.codeberg.page/manual/dev" target="_blank" rel="noopener noreferrer">
                    <NotebookTabs class="inline-block mr-2" /> Read Dev Docs
                </a>
                <p class="mt-4 text-gray-700 dark:text-gray-300">If you want to contribute to AmpMod, create extensions, or create your own fork of AmpMod, read the developer documentation to find out more!</p>
            </div>
            <div>
                <a class="block bg-accent text-white font-bold text-lg rounded-lg px-6 py-4 transition-shadow hover:shadow-lg" href="https://codeberg.org/ampmod" target="_blank" rel="noopener noreferrer">
                    <CodeIcon class="inline-block mr-2" /> Source Code
                </a>
                <p class="mt-4 text-gray-700 dark:text-gray-300">Browse the source code and submit pull requests on our Codeberg repositories. All contributions are welcome.</p>
            </div>
            <div>
                <a class="block bg-accent text-white font-bold text-lg rounded-lg px-6 py-4 transition-shadow hover:shadow-lg" href="https://ampmod.flarum.cloud/t/suggestions" target="_blank" rel="noopener noreferrer">
                    <Lightbulb class="inline-block mr-2" /> Suggest Features
                </a>
                <p class="mt-4 text-gray-700 dark:text-gray-300">Even if you don't know how to program in web technologies or use Git, you are welcome to make suggestions to improve AmpMod.</p>
            </div>
        </div>
    </section>
</div>