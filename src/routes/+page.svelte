<script lang="ts">
	import Alert from '$components/alert/Alert.svelte';
	import Hero from '$components/hero/SiteNewHero.svelte';
	import Intro from '$components/intro/Intro.svelte';
	import ProjectList from '$components/project-list/ProjectList.svelte';
	import { isLoggedIn } from '$stores/session';
	import { Heart, Cat, TriangleAlert } from 'lucide';
	function isAprilFoolsDay(): boolean {
        const today = new Date();
        return today.getMonth() === 3 && today.getDate() === 1; // Month 3 is April (0-indexed)
    }
	function getYearsSince2025() {
	const currentYear = new Date().getFullYear();
	return currentYear - 2025;
	}
</script>

<svelte:head>
	<title>AmpMod - An advanced programming language</title>
</svelte:head>

<Alert
	id="please-contribute"
	button={{
		uri: 'https://codeberg.org/ampmod/dev-docs/wiki',
		text: 'Dev docs'
	}}
	icon={Heart}
	background="#855cd6"
>
	AmpMod is in your hands. We accept your contributions to help the project!
</Alert>

{#if $isLoggedIn}
	<div class="intro-layout">
		<div class="intro-section">
			<Intro />
		</div>
		<div class="news-placeholder"></div>
	</div>
{:else}
	<Hero />
{/if}
<ProjectList title="Featured projects" />
<ProjectList title="Top liked projects" />
<ProjectList title="Projects from #tag" />
<ProjectList title="Most recent projects" />

<style>
   .intro-layout {
	   display: flex;
	   gap: 20px;
	   max-width: 950px;
	   margin: auto;
	   align-items: center;
	   background-color: var(--background-color);
	   color: var(--text-color);
   }

   .intro-section {
	   flex: 1;
	   display: block;
   }

   .news-placeholder {
	   flex: 1;
	   padding: 6px 20px;
	   border: 1px solid #dcdcdc;
	   border-radius: 10px;
	   margin: 10px;
	   display: block;
	   height: 22em;
	   font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
   }
</style>
