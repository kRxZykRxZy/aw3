<script lang="ts">
  import '../../app.css';
  import logoUrl from './logo.svg';
  import { isLoggedIn } from '$stores/session';
  import { Check, X, MessageSquareText } from '@lucide/svelte';
  import { SiScratch, SiCodeberg, SiGithub, SiMiraheze } from '@icons-pack/svelte-simple-icons';
  import { PUBLIC_BACKEND_API } from '$env/static/public';

  let username: string = '';
  let password: string = '';
  let confirmPassword: string = '';
  let email: string = '';
  let termsChecked: boolean = false;

  let step = 1;
  const totalSteps = 4;

  let showModal = false;
  let modalMessage = '';

  function showMessageBox(message: string) {
    modalMessage = message;
    showModal = true;
  }

  function closeMessageBox() {
    showModal = false;
    modalMessage = '';
  }

  function nextStep() {
    if (step < totalSteps) step += 1;
  }

  function prevStep() {
    if (step > 1) step -= 1;
  }

  function isUsernameValidLength(name: string) {
    return name.length >= 3 && name.length <= 20;
  }

  function doesUsernameContainValidChars(name: string) {
    return /^[a-zA-Z0-9_-]+$/.test(name) || name === '';
  }

  function isUsernameNotTaken(name: string) {
    return name.toLowerCase() !== 'ampelectrecuted';
  }

  function isUsernameAppropriate(name: string) {
    return !name.toLowerCase().includes('badusername');
  }

  const commonPasswords = [
    '123456','password','secret','dragon','ampmod','ultiblocks','letmein','qwerty','abc123','monkey','iloveyou','123456789','12345678','incorrect'
  ];

  function isPasswordValidLength(pw: string) {
    return pw.length >= 6;
  }

  function isPasswordNotCommon(pw: string) {
    return !commonPasswords.includes(pw);
  }

  async function handleJoin() {
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

    try {
      const res = await fetch(`${PUBLIC_BACKEND_API}/users/${encodeURIComponent(username)}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, email: email || null })
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || `Signup failed (${res.status})`);
      }

      showMessageBox('✅ Account created successfully!');
    } catch (err: any) {
      showMessageBox(`❌ Signup failed: ${err.message}`);
    }
  }
</script>

<svelte:head>
  <title>Join AmpMod</title>
</svelte:head>

<div class="min-h-screen bg-accent">
  <div class="p-4">
    <a href="/" style="display: inline-block;"><img src={logoUrl} alt="AmpMod" class="h-8" /></a>
  </div>

  <div class="max-w-xl mx-auto mt-4 p-8 border border-gray-300 rounded-lg bg-background shadow-lg">
    <h1 class="text-center text-2xl font-bold mb-6">Join AmpMod</h1>

    {#if $isLoggedIn}
      <p class="text-center text-accent">You are already logged in.</p>
    {:else}
      <form on:submit|preventDefault={handleJoin} class="flex flex-col gap-6">
        <!-- Your form steps and UI here -->
      </form>
    {/if}

    {#if showModal}
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
          <p class="mb-4 text-lg font-semibold">{modalMessage}</p>
          <button class="py-2 px-4 rounded-lg bg-accent text-white font-bold" on:click={closeMessageBox}>OK</button>
        </div>
      </div>
    {/if}
  </div>
</div>
