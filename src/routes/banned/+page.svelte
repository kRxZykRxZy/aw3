<svelte:head>
  <title>Banned - AmpMod</title>
</svelte:head>
<script lang="ts">
    import { onMount } from 'svelte';
    import Spinner from '$lib/spinner/Spinner.svelte';
  
    let showAppealForm = false;
    let appealText = '';
    let appealStatus = '';
    let isSubmitting = false;
  
    let banType: any = '';
    let banReason: any = '';
    let showAppealButton = true;
    let fullyLoaded = false;
  
    onMount(() => {
      fullyLoaded = true;
      const urlParams = new window.URLSearchParams(window.location.search);
      banType = urlParams.get('type');
      banReason = urlParams.get('reason');
  
      if (banReason === 'csam') {
        showAppealButton = false;
        showAppealForm = false; // Ensure appeal form is also hidden
      } else if (banReason == 'banevasion') {
        showAppealButton = false;
        showAppealForm = false;
      } else if (banReason == 'selfharm') {
        showAppealButton = false;
        showAppealForm = false;
      } else if (banType && banType.includes('temporary')) {
        showAppealButton = false;
      } else if (banType && banType.includes('noappeal')) {
        showAppealButton = false;
      }
    });
  
    async function submitAppeal() {
      isSubmitting = true;
      appealStatus = 'Submitting appeal...';
  
      // Simulate an API call (replace with your actual API endpoint)
      const appealData = {
        reason: banReason,
        type: banType,
        explanation: appealText,
      };
      console.log('Appeal Data:', appealData);
      await new Promise(resolve => setTimeout(resolve, 2000));
  
      // In a real application, you would send the appealData to your server
      console.log('Appeal submitted:', appealText);
  
      // Simulate a successful appeal (replace with actual API response handling)
      const isAppealSuccessful = Math.random() < 0.5; // Simulate success/failure
  
      if (isAppealSuccessful) {
        appealStatus = 'Appeal submitted successfully. We will review it shortly.';
        showAppealForm = false;
        appealText = '';
      } else {
        appealStatus = 'Appeal submission failed. Please try again later.';
      }
  
      isSubmitting = false;
    }
  
    function getBanReasonDisplay() {
      switch (banReason) {
        case 'swearing':
          return 'inappropriate language';
        case 'spam':
          return 'spam';
        case 'forks':
          return 'posting projects that are not compatible with the official AmpMod editor';
        case 'csam':
          return 'posting content that is harmful to children';
        case 'banevasion':
          return 'using an alternate account to circumvent a ban on another account';
        case 'pii':
          return 'posting personally identifiable information (PII)';
        case 'selfharm':
          return 'expressing thoughts of self-harm';
        default:
          return 'breaking guidelines';
      }
    }
  
    function getBanTypeDisplay() {
      switch (banType) {
        case 'temporary':
          return 'temporary';
        case 'permanent':
          return 'permanent';
        case 'permanent-noappeal':
          return 'permanent with no option to appeal';
        case 'ip':
          return 'temporary (IP ban)';
        case 'ip-noappeal':
          return 'permanent (IP ban) with no option to appeal';
        default:
          return 'indefinite';
      }
    }
  </script>
  

  
  <div class="max-w-2xl mx-auto mt-16 rounded-xl text-base font-sans">
    {#if fullyLoaded}
      <h1 class="text-3xl font-bold text-red-600 mb-6">You have been banned from AmpMod.</h1>
      <p class="italic text-gray-600 dark:text-text-dark mb-2">Reason: {getBanReasonDisplay()}</p>
      {#if banType}
        <p class="italic dark:text-text-dark mb-4">This ban is {getBanTypeDisplay()}.</p>
      {/if}
      {#if banReason != 'csam'}
        <p class="mb-4">Please read the <a href="/proj-guidelines" class="underline text-accent">Project Uploading Guidelines</a>.</p>
      {/if}

      {#if showAppealButton && !banType.includes('temporary')}
        {#if !showAppealForm}
          <p class="mb-2">If you believe this is a mistake or that you have learned from your actions, you can appeal this ban.</p>
          <button class="px-4 py-2 bg-accent text-white rounded-md shadow hover:bg-accent-secondary transition" on:click={() => (showAppealForm = true)}>Appeal Ban</button>
        {/if}

        {#if showAppealForm}
          <div class="flex flex-col gap-2 mt-4">
            <p class="font-semibold">Keep in mind:</p>
            <ul class="list-disc pl-6 text-sm mb-2">
              <li>Be respectful and honest in your appeal. Being disrespectful may cause your ban to be unappealable.</li>
              <li>Don't play the "I was hacked" or "Someone told me to open the console" card unless you really have been hacked. We can tell.</li>
              <li>Please check the AmpMod website daily for updates on your appeal status, or your email if you provided one when registering or in your settings.</li>
              <li>If your ban was for posting content that endangers the life of any real-life person or animal, your appeal will be denied immediately and you will be IP banned.</li>
            </ul>
            <label for="appeal-text" class="font-bold">Explain why you believe this ban should be reconsidered:</label>
            <textarea id="appeal-text" bind:value={appealText} class="p-3 border border-gray-300 rounded-md text-base min-h-[100px] mb-2"></textarea>
            <div class="flex gap-2">
              <button on:click={submitAppeal} disabled={isSubmitting} class="px-4 py-2 bg-accent text-white rounded-md shadow hover:bg-accent-secondary transition disabled:opacity-60 disabled:cursor-not-allowed">
                {#if isSubmitting}
                  Submitting...
                {:else}
                  Submit Appeal
                {/if}
              </button>
              <button on:click={() => (showAppealForm = false)} class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow hover:bg-gray-400 transition">Cancel</button>
            </div>
            {#if appealStatus}
              <p class="mt-2 italic text-gray-500">{appealStatus}</p>
            {/if}
          </div>
        {/if}
      {/if}
      {#if banReason === 'csam'}
        <p class="font-bold text-red-800">Abusing children is a very serious crime. You have been reported to the Scratch Team, who will delete your Scratch account and report you to the relevant authorities. You will never be welcome back on AmpMod or Scratch.</p>
        <p class="font-bold text-red-800">Your IP address and any future IP addresses used to access AmpMod using this browser have been banned.</p>
        {:else if banReason == 'banevasion'}
        <p>Log in to your main account to learn more or to appeal the ban.</p>
        {:else if banReason == 'selfharm'}
        <p>This ban is to help with your mental health. <strong>Please consult a mental health resource.</strong> We care about your well-being and want to protect you. AmpMod provides a list of mental health resources available <a href="/banned/mental" data-sveltekit-preload-data="eager" class="underline text-blue-500">here</a>.</p>
      {/if}
    {:else}
      <Spinner />
      <p class="text-center mt-2">You have been banned from AmpMod. Please wait for more information.</p>
    {/if}
  </div>