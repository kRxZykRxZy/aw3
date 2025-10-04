<script lang="ts">
  import '../../app.css';
  import logoUrl from './logo.svg';
  import { isLoggedIn } from '$stores/session';
  import { Cat, Check, X } from '@lucide/svelte';
  import { SiScratch, SiCodeberg, SiGithub, SiMiraheze } from '@icons-pack/svelte-simple-icons';
  import { MessageSquareText } from '@lucide/svelte';

  // Form input variables
  let username: string = '';
  let password: string = '';
  let confirmPassword: string = '';
  let email: string = '';

  // Multi-step form control
  let step = 1;
  // Adjusted total steps
  const totalSteps = 4; // Now 4 steps: Social, Username, Password, Email/Terms

  // Modal for alerts
  let showModal: boolean = false;
  let modalMessage: string = '';

  /**
   * Displays a custom modal message instead of a native alert.
   * @param message The message to display in the modal.
   */
  function showMessageBox(message: string): void {
    modalMessage = message;
    showModal = true;
  }

  /**
   * Closes the custom modal message.
   */
  function closeMessageBox(): void {
    showModal = false;
    modalMessage = '';
  }

  /**
   * Moves to the next step in the form.
   * For step 1, clicking "Don't link" implicitly moves to step 2 (username).
   */
  function nextStep(): void {
    if (step < totalSteps) step += 1;
  }

  /**
   * Moves to the previous step in the form.
   */
  function prevStep(): void {
    if (step > 1) step -= 1;
  }

  // --- Validation functions (renamed/adjusted for new step order) ---

  /**
   * Checks if the user can proceed from step 2 (username validation).
   * @returns True if all username conditions are met, false otherwise.
   */
  function canProceedStep2Username(): boolean {
    return (
      isUsernameValidLength(username) &&
      doesUsernameContainValidChars(username) &&
      isUsernameNotTaken(username) &&
      isUsernameAppropriate(username)
    );
  }

  /**
   * Checks if the user can proceed from step 3 (password validation).
   * @returns True if all password conditions are met, false otherwise.
   */
  function canProceedStep3Password(): boolean {
    return (
      isPasswordValidLength(password) &&
      isPasswordNotCommon(password) &&
      password.toLowerCase() !== username.toLowerCase() && // Password not equal to username
      password === confirmPassword &&
      confirmPassword !== '' // Confirm password is not empty
    );
  }

  /**
   * Checks if the user can proceed from step 4 (terms agreement).
   * @returns True if terms are checked, false otherwise.
   */
  let termsChecked = false;
  function canProceedStep4Terms(): boolean {
    return termsChecked;
  }

  // List of common passwords for validation
  const commonPasswords: string[] = [
    '123456',
    'password',
    'secret',
    'dragon',
    'ampmod',
    'ultiblocks',
    'letmein',
    'qwerty',
    'abc123',
    'monkey',
    'iloveyou',
    '123456789',
    '12345678',
    'incorrect'
  ];

  /**
   * Validates username length.
   * @param name The username string.
   * @returns True if length is between 3 and 20 characters, inclusive.
   */
  function isUsernameValidLength(name: string): boolean {
    return name.length >= 3 && name.length <= 20;
  }

  /**
   * Validates username characters.
   * @param name The username string.
   * @returns True if it contains only letters, numbers, hyphens, and underscores, or is empty.
   */
  function doesUsernameContainValidChars(name: string): boolean {
    return /^[a-zA-Z0-9_-]+$/.test(name) || name == '';
  }

  /**
   * Checks if username is taken (placeholder).
   * @param name The username string.
   * @returns True if username is not 'ampelectrecuted' (mock check).
   */
  function isUsernameNotTaken(name: string): boolean {
    return name.toLowerCase() !== 'ampelectrecuted'; // Replace with actual backend check
  }

  /**
   * Checks if username is appropriate (placeholder).
   * @param name The username string.
   * @returns True if username does not contain 'badusername' (mock check).
   */
  function isUsernameAppropriate(name: string): boolean {
    return !name.toLowerCase().includes('badusername'); // Replace with actual backend check
  }

  /**
   * Validates password length.
   * @param pw The password string.
   * @returns True if length is at least 6 characters.
   */
  function isPasswordValidLength(pw: string): boolean {
    return pw.length >= 6;
  }

  /**
   * Checks if password is not common.
   * @param pw The password string.
   * @returns True if password is not in the common passwords list.
   */
  function isPasswordNotCommon(pw: string): boolean {
    return !commonPasswords.includes(pw);
  }

  /**
   * Handles the final join logic after all steps are validated.
   */
  async function handleJoin() {
    // Re-validate all steps to be safe, though step progression should handle this
    const isUsernameOkay =
      isUsernameValidLength(username) &&
      doesUsernameContainValidChars(username) &&
      isUsernameNotTaken(username) &&
      isUsernameAppropriate(username);
    const isPasswordOkay =
      isPasswordValidLength(password) &&
      isPasswordNotCommon(password) &&
      password.toLowerCase() !== username.toLowerCase();

    if (!isUsernameOkay) {
      showMessageBox('Username does not meet the requirements.');
      return;
    }

    if (!isPasswordOkay) {
      showMessageBox('Password does not meet the requirements.');
      return;
    }

    if (password !== confirmPassword) {
      showMessageBox('Passwords do not match!');
      return;
    }

    if (!termsChecked) {
      showMessageBox('You must agree to the Terms of Use and Privacy Policy.');
      return;
    }
    const res = await fetch(`/internalapi/join`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bio: 'Coming Soon', 
            country: 'NaN', 
            password: password,
            username: username, 
            email: email || null
        })
    });
    const data = await res.json();
    // Actual join logic would go here, e.g., sending data to a server
    showMessageBox(data.message || data.error);
    window.location.href = '/';
    // In a real app, you'd redirect or log the user in here
  }

  /**
   * Initiates login with Scratch by redirecting to an external authentication service.
   * NOTE: This existing function already uses a placeholder.
   */
  function loginWithScratch(): void {
    const redirectAfterAuth = btoa(window.location.href);

    const authUrl = `https://auth.itinerary.eu.org/auth/?redirect=${redirectAfterAuth}&name=AmpMod`;
    window.location.href = authUrl;
  }
  async function checkScratchLogin(privateCode: string): Promise<boolean> {
    try {
      const response = await fetch(`https://auth-api.itinerary.eu.org/auth/verifyToken/${privateCode}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error verifying Scratch login:', error);
      return false;
    }
  }

  

  /**
   * Generic function for social/external join methods.
   * In a real app, this would trigger specific OAuth flows.
   * @param serviceName Name of the service (e.g., 'GitHub', 'Codeberg').
   * @param redirectUrl Placeholder URL for the service's authentication.
   */
  function handleSocialJoin(serviceName: string, redirectUrl: string): void {
    console.log(`Attempting to join with ${serviceName}...`);
    // In a real application, you'd redirect to an OAuth provider's authorization page here.
    // Example: window.location.href = `https://oauth.example.com/authorize?client_id=...&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=...`;
    showMessageBox(`Joining with ${serviceName} (mock action).`);
    window.location.href = redirectUrl; // Redirect for demonstration
  }
</script>

<svelte:head>
  <title>Join AmpMod</title>
</svelte:head>
<div class="min-h-screen bg-accent">
  <div class="p-4">
    <a href="/" style="display: inline-block;">
      <img src={logoUrl} alt="AmpMod" class="h-8" />
    </a>
  </div>
  <div class="fixed bottom-4 left-4 z-40 text-white">
    <a href="/privacy" class="text-sm text-white underline transition">Privacy Policy</a> | <a href="/terms" class="text-sm text-white underline transition">Terms of Use</a> | <a href="/proj-guidelines" class="text-sm text-white underline transition">Project Guidelines</a>
  </div>
  <div
    class="max-w-xl mx-auto mt-4 p-8 border border-gray-300 dark:border-border-dark rounded-lg font-sans bg-background dark:bg-background-dark text-text dark:text-text-dark shadow-lg"
  >
    <h1 class="text-center text-2xl font-bold mb-6">Join AmpMod</h1>

    {#if step === 1}
      <p class="text-center mb-2">
        It's free and easy to sign up for an AmpMod account. Quickly join using one of these services, or choose "Don't link" to register an account manually.
      </p>
      <p class="text-center mb-4 text-sm">
        These services are not affiliated with AmpMod. Your username on AmpMod may be modified to follow our guidelines and technical limitations.
      </p>
    {:else if step === 2}
      <p class="text-center mb-4">
        Please choose a unique username for your AmpMod account.
      </p>
    {:else if step === 3}
      <p class="text-center mb-4">
        Please create a password for your account. Make sure it is secure and
        unique. Do not use your Scratch password here.
      </p>
    {:else if step === 4}
      <p class="text-center mb-4">
        An email is optional, but if you lose access to your account, you will not
        be able to recover it without an email.
      </p>
    {/if}

    {#if $isLoggedIn}
      <p class="text-center text-accent dark:text-accent-secondary">
        You already seem to be logged into AmpMod.
      </p>
    {:else}
      <form on:submit|preventDefault={handleJoin} class="flex flex-col gap-6">
        {#if step === 1}
          <div class="flex flex-col animate-fade-in">
            <div class="flex flex-col gap-3 mb-6">
              <button
                type="button"
                class="flex bg-[#855cd6] hover:bg-[#714eb6] border border-[#714eb6] text-white items-center align-middle p-4 rounded-xl cursor-pointer text-xl font-bold"
                on:click={loginWithScratch}
              >
                <SiScratch size={32} />
                <div class="flex-1 text-center">Join with Scratch</div>
              </button>

              <button
                type="button"
                class="flex bg-[#4793cc] hover:bg-[#3d7cae] border border-[#3d7cae] text-white items-center align-middle p-4 rounded-xl cursor-pointer text-xl font-bold"
                on:click={() => handleSocialJoin('Codeberg', 'https://codeberg.org/oauth-mock-ampmod')}
              >
                <SiCodeberg size={32} />
                <div class="flex-1 text-center">Join with Codeberg</div>
              </button>

              <button
                type="button"
                class="flex bg-black hover:bg-[#1a1a1a] border border-[#1a1a1a] text-white items-center align-middle p-4 rounded-xl cursor-pointer text-xl font-bold"
                on:click={() => handleSocialJoin('GitHub', 'https://github.com/oauth-mock-ampmod')}
              >
                <SiGithub size={32} />
                <div class="flex-1 text-center">Join with GitHub</div>
              </button>

              <button
                type="button"
                class="flex bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white items-center align-middle p-4 rounded-xl cursor-pointer text-xl font-bold"
                on:click={() => handleSocialJoin('AmpMod Forums', 'https://ampmod.flarum.cloud/oauth-mock-join')}
              >
                <MessageSquareText size={32} />
                <div class="flex-1 text-center">Join via Forums</div>
              </button>

              <button
                type="button"
                class="flex bg-[#e98a6f] hover:bg-[#d07860] border border-[#d07860] text-white items-center align-middle p-4 rounded-xl cursor-pointer text-xl font-bold"
                on:click={() => handleSocialJoin('Miraheze', 'https://ampmod.miraheze.org/wiki/Special:OAuth?action=authorize&client_id=your_client_id')}
              >
                <SiMiraheze size={32} />
                <div class="flex-1 text-center">Join with Miraheze (AmpMod Wiki)</div>
              </button>
            </div>
          </div>
        {/if}

        {#if step === 2}
          <div class="flex flex-col animate-fade-in">
            <label for="username" class="font-medium mb-2">
              Username (don't use your real name)
            </label>
            <input
              id="username"
              type="text"
              bind:value={username}
              required
              class="p-2 border border-gray-300 dark:border-border-dark rounded focus:outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-800 text-text dark:text-text-dark"
              autocomplete="username"
            />
            <p class="mt-1 text-gray-700 dark:text-gray-300">Must:</p>
            <ul class="mt-1 pl-4 text-gray-500 dark:text-gray-400 text-sm list-none">
              <li
                class:valid={isUsernameValidLength(username)}
                class="flex items-center gap-2"
              >
                {#if isUsernameValidLength(username)}<Check
                    color="#22c55e"
                    size={18}
                  />{:else}<X color="#ef4444" size={18} />{/if} Be 3-20 characters
                long
              </li>
              <li
                class:valid={doesUsernameContainValidChars(username)}
                class="flex items-center gap-2"
              >
                {#if doesUsernameContainValidChars(username)}<Check
                    color="#22c55e"
                    size={18}
                  />{:else}<X color="#ef4444" size={18} />{/if} Contain only
                letters, numbers, hyphens and underscores
              </li>
              <li
                class:valid={isUsernameNotTaken(username)}
                class="flex items-center gap-2"
              >
                {#if isUsernameNotTaken(username)}<Check
                    color="#22c55e"
                    size={18}
                  />{:else}<X color="#ef4444" size={18} />{/if} Not be taken
              </li>
              <li
                class:valid={isUsernameAppropriate(username)}
                class="flex items-center gap-2"
              >
                {#if isUsernameAppropriate(username)}<Check
                    color="#22c55e"
                    size={18}
                  />{:else}<X color="#ef4444" size={18} />{/if} Follow AmpMod guidelines
              </li>
            </ul>
          </div>
        {/if}

        {#if step === 3}
          <div class="flex flex-col animate-fade-in">
            <label for="password" class="font-medium mb-2">Password</label>
            <input
              id="password"
              type="password"
              bind:value={password}
              required
              class="p-2 border border-gray-300 dark:border-border-dark rounded focus:outline-none focus:ring-2 focus:ring-accent mb-2 bg-white dark:bg-gray-800 text-text dark:text-text-dark"
              autocomplete="new-password"
            />
            <label for="confirmPassword" class="font-medium mb-2"
              >Confirm Password</label
            >
            <input
              id="confirmPassword"
              type="password"
              bind:value={confirmPassword}
              required
              class="p-2 border border-gray-300 dark:border-border-dark rounded focus:outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-800 text-text dark:text-text-dark"
              autocomplete="new-password"
            />
            {#if password !== confirmPassword && confirmPassword}
              <p class="text-red-600 dark:text-red-400 mt-1 text-sm">
                ❌ Passwords do not match!
              </p>
            {/if}
            <p class="mt-1 text-gray-700 dark:text-gray-300">Must:</p>
            <ul
              class="mt-1 pl-4 text-gray-500 dark:text-gray-400 text-sm list-none"
            >
              <li
                class:valid={isPasswordValidLength(password)}
                class="flex items-center gap-2"
              >
                {#if isPasswordValidLength(password)}<Check
                    color="#22c55e"
                    size={18}
                  />{:else}<X color="#ef4444" size={18} />{/if} Be at least 6
                characters long
              </li>
              <li
                class:valid={isPasswordNotCommon(password)}
                class="flex items-center gap-2"
              >
                {#if isPasswordNotCommon(password)}<Check
                    color="#22c55e"
                    size={18}
                  />{:else}<X color="#ef4444" size={18} />{/if} Not be a common
                password
              </li>
              <li
                class:valid={password.toLowerCase() !== username.toLowerCase()}
                class="flex items-center gap-2"
              >
                {#if password.toLowerCase() !== username.toLowerCase()}<Check
                    color="#22c55e"
                    size={18}
                  />{:else}<X color="#ef4444" size={18} />{/if} Not be your
                username
              </li>
            </ul>
          </div>
        {/if}

        {#if step === 4}
          <div class="flex flex-col animate-fade-in">
            <label for="email" class="font-medium mb-2">Email (optional)</label>
            <input
              id="email"
              type="email"
              bind:value={email}
              class="p-2 border border-gray-300 dark:border-border-dark rounded focus:outline-none focus:ring-2 focus:ring-accent mb-2 bg-white dark:bg-gray-800 text-text dark:text-text-dark"
              autocomplete="email"
            />
            <div class="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="termscheck"
                bind:checked={termsChecked}
                required
                class="accent-accent"
              />
              <label for="termscheck" class="text-sm text-gray-700 dark:text-gray-300">
                I agree to AmpMod's
                <a href="/terms" target="_blank" class="underline text-accent"
                  >Terms of Use</a
                >
                and
                <a href="/privacy" target="_blank" class="underline text-accent"
                  >Privacy Policy</a
                >.
              </label>
            </div>
          </div>
        {/if}

        <div class="flex justify-between mt-6">
          <button
            type="button"
            class="py-2 px-4 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            on:click={prevStep}
            disabled={step === 1}
          >
            Back
          </button>
          {#if step < totalSteps}
            <button
              type="button"
              class="py-2 px-4 rounded-lg bg-accent text-white font-bold hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              on:click={() => {
                if (
                  // Only validate if user is actually entering data in that step
                  (step === 2 && canProceedStep2Username()) ||
                  (step === 3 && canProceedStep3Password()) ||
                  (step === 4 && canProceedStep4Terms()) ||
                  (step === 1) // For step 1, "Don't link" doesn't require validation
                )
                  nextStep();
              }}
              disabled={
                (step === 2 && !canProceedStep2Username() && username !== '') ||
                (step === 3 && !canProceedStep3Password()) ||
                (step === 4 && !canProceedStep4Terms())
              }
            >
              {#if step === 1}
                Don't link
              {:else}
                Next
              {/if}
            </button>
          {:else}
            <button
              type="submit"
              class="py-2 px-4 rounded-lg bg-accent text-white font-bold hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!canProceedStep4Terms()}
            >
              Join
            </button>
          {/if}
        </div>
      </form>

      <div class="mt-6 flex items-center justify-center gap-2">
        {#each Array(totalSteps) as _, i}
          <div
            class="h-2 w-8 rounded-full transition-all duration-300 {i + 1 <=
            step
              ? 'bg-accent'
              : 'bg-gray-200 dark:bg-gray-600'}"
          ></div>
        {/each}
      </div>
    {/if}
  </div>

  {#if showModal}
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white dark:bg-background-dark p-6 rounded-lg shadow-xl max-w-sm w-full text-center border border-gray-300 dark:border-border-dark text-text dark:text-text-dark"
      >
        <p class="mb-4 text-lg font-semibold">{modalMessage}</p>
        <button
          class="py-2 px-4 rounded-lg bg-accent text-white font-bold hover:bg-green-600 transition"
          on:click={closeMessageBox}
        >
          OK
        </button>
      </div>
    </div>
  {/if}
</div>
<style>
  ul li.valid {
    color: #22c55e; /* Tailwind's green-500 */
  }
  ul li.valid svg {
    color: #22c55e; /* Tailwind's green-500 */
  }
  ul li:not(.valid) {
    color: #ef4444; /* Tailwind's red-500 */
  }
  ul li:not(.valid) svg {
    color: #ef4444; /* Tailwind's red-500 */
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
