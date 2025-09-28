<script>
  import { browser } from '$app/environment';

  const funFacts = [
    "Accounts can be linked to not just Scratch, but also to Codeberg, GitHub, the Wiki, and the Forums.",
    "AmpMod is a community-driven project, with contributions from many Scratchers.",
    "All your costume are belong to us.",
    "The mascot of AmpMod is Apple Cat, which is a modification of the Apple sprite.",
    "In the editor, there are more fun facts while the project loads.",
    "Apple Cat is, suprisingly, not affiliated with Apple.",
    "AmpMod is based off TurboWarp, which gives it powerful performance enhancements.",
    "Studios will be available soon.",
    "'Clutters' will be available soon, which are groups of projects that play in order.",
    "We respect your privacy and do not collect any personal data.",
    "AmpMod is open source, and you can contribute to its development on Codeberg.",
    "The CIA does not know about AmpMod.",
    "Bad security advice: Do not watch YouTube and use AmpMod at the same time. It may result in you being hacked.",
  ];
  let selectedFact = Math.floor(Math.random() * funFacts.length);
</script>

<footer class="w-full bg-footer text-text dark:bg-footer-dark dark:text-text-dark py-12 px-4 mt-20">
  <div class="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-12 gap-x-8">
    <nav aria-label="Community Links" class="space-y-4">
      <h4 class="font-semibold text-lg text-primary-dark dark:text-primary-light">Community</h4>
      <ul class="space-y-2 text-sm">
        <li><a href="/" class="text-accent hover:text-accent-hover transition-colors" title="Go to the AmpMod homepage">Home</a></li>
        <li><a href="https://ampmod.flarum.cloud" class="text-accent hover:text-accent-hover transition-colors" title="Visit the AmpMod Discussion Forums">Discussion Forums</a></li>
        <li><a href="https://ampmod.flarum.cloud/blog" class="text-accent hover:text-accent-hover transition-colors" title="Read the AmpMod blog">Blog</a></li>
        <li><a href="https://ampmod.miraheze.org/" class="text-accent hover:text-accent-hover transition-colors" title="Visit the AmpMod Wiki">AmpMod Wiki</a></li>
        <li><span class="text-gray-500 cursor-not-allowed" title="Statistics feature is not available yet">Statistics</span></li>
      </ul>
    </nav>

    <nav aria-label="Resources Links" class="space-y-4">
      <h4 class="font-semibold text-lg text-primary-dark dark:text-primary-light">Resources</h4>
      <ul class="space-y-2 text-sm">
        <li><a href="/about" class="text-accent hover:text-accent-hover transition-colors" title="Learn more about AmpMod">About</a></li>
        <li><a href="https://codeberg.org/AmpMod" class="text-accent hover:text-accent-hover transition-colors" title="View the AmpMod source code on Codeberg">Source Code</a></li>
        <li><a href="https://ampmod.codeberg.page/manual" class="text-accent hover:text-accent-hover transition-colors" title="Read the AmpMod manual">Manual</a></li>
        <li><a href="/faq" class="text-accent hover:text-accent-hover transition-colors" title="Read the AmpMod FAQ">FAQ</a></li>
        <li><a href="/mirrors" class="text-accent hover:text-accent-hover transition-colors" title="Find mirrors of the AmpMod editor">Mirrors</a></li>
      </ul>
    </nav>

    <nav aria-label="Policy Links" class="space-y-4">
      <h4 class="font-semibold text-lg text-primary-dark dark:text-primary-light">Policy</h4>
      <ul class="space-y-2 text-sm">
        <li><a href="/proj-guidelines" class="text-accent hover:text-accent-hover transition-colors" title="Read the AmpMod Project Guidelines">Project Guidelines</a></li>
        <li><a href="/terms" class="text-accent hover:text-accent-hover transition-colors" title="Read the AmpMod Terms of Use">Terms of Use</a></li>
        <li><a href="/privacy" class="text-accent hover:text-accent-hover transition-colors" title="Read the AmpMod Privacy Policy">Privacy Policy</a></li>
      </ul>
    </nav>

    <div class="space-y-4">
      <h4 class="font-semibold text-lg text-primary-dark dark:text-primary-light">Donate</h4>
      <ul class="space-y-2 text-sm">
        <li><a href="https://www.scratchfoundation.org/donate" class="text-accent hover:text-accent-hover transition-colors" title="Donate to the Scratch Foundation">Scratch Foundation</a></li>
      </ul>
    </div>
    
    <div class="space-y-4 col-span-2 md:col-span-2 md:col-start-5 text-right">
      <div class="space-y-2 text-sm">
        <p class="text-gray-400">
          AmpMod is not affiliated with Scratch, the Scratch Team, the Scratch Foundation, or the TurboWarp developers.
        </p>
        <p class="text-gray-500">
          &copy; {new Date().getFullYear()} AmpMod contributors; user-generated content licenced under CC-BY-SA 4.0.
        </p>
        <button type="button" data-cc="show-preferencesModal" class="cursor-pointer text-accent hover:text-accent-hover transition-colors" title="Manage your cookie preferences">Cookie Preferences</button>
        {#if browser}
          <p>{funFacts[selectedFact]} <button
            type="button"
            class="cursor-pointer text-accent"
            on:click={() => selectedFact = Math.floor(Math.random() * funFacts.length)}
            aria-label="Show another fun fact"
          >
          more?
          </button></p>
        {/if}
      </div>
    </div>
  </div>
</footer>