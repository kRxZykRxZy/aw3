<script lang="ts">
  import { theme } from '$stores/theme';
  import Banner from '$lib/banner/Banner.svelte';
  import LeftTabbed from '$lib/tabbed/LeftTabbed.svelte';
  import Profile from './Profile.svelte';
  import Account from './Account.svelte';
  import DangerZone from './Danger.svelte';
  import Theme from './Theme.svelte';
  import Access from './Accessibility.svelte';
  import { isLoggedIn } from '$stores/session';
  import { goto } from '$app/navigation';

  const tabs = [
    { label: 'Profile', content: Profile },
    { label: 'Appearance', content: Theme },
    { label: 'Accessibility', content: Access },
    { label: 'Account', content: Account },
    { label: 'Danger Zone', content: DangerZone }
  ];

  const loggedOutTabs = [
    { label: 'Appearance', content: Theme },
    { label: 'Accessibility', content: Access }
  ];
</script>

<svelte:head>
  <title>Settings - AmpMod</title>
</svelte:head>

<Banner text="Settings" subtext="Set preferences for this account." />

<div class="max-w-[1200px] mx-auto mt-10 p-8">
  {#if $isLoggedIn}
    <LeftTabbed {tabs} />
  {:else}
    <p class="mb-4">
      More settings are available for logged in users. Click "Log in" in the navbar to show these settings.
    </p>
    <LeftTabbed tabs={loggedOutTabs} />
  {/if}
</div>
