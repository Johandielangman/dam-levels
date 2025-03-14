<script lang="ts">
	import { 
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterLink
	} from 'flowbite-svelte';
	import '../app.css';
	import { browser } from '$app/environment';
	import { UmamiAnalytics } from '@lukulent/svelte-umami';
    import { PUBLIC_UMAMI_SITE_ID } from '$env/static/public';
	import CookieBanner from '$lib/components/CookieBanner.svelte';


	let { children } = $props();


    // Initialize with localStorage value or true (dark mode) by default
    let darkMode = $state(
        browser 
            ? localStorage.getItem('darkMode') !== null 
                ? localStorage.getItem('darkMode') === 'true'
                : true
            : true
    );

    // Sync with localStorage and document whenever darkMode changes
    $effect(() => {
        if (browser) {
            localStorage.setItem('darkMode', darkMode.toString());
            document.documentElement.classList.toggle('dark', darkMode);
        }
    });

    function toggleDarkMode() {
        darkMode = !darkMode;
    }
</script>

<svelte:head>
	<title>Dam Levels</title>
	<meta name="description" content="An amazing dam dashboard!" />
</svelte:head>

<UmamiAnalytics
	websiteID={PUBLIC_UMAMI_SITE_ID}
	srcURL="https://cloud.umami.is/script.js"
	configuration={{
	'data-auto-track': true,
	'data-tag': 'dam_dash',
	'data-exclude-search': true,
	'data-cache': true
	}}
/>


<div class="min-h-screen flex flex-col p-5 bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
	<div class="pb-3">
		<Navbar rounded color="blue">
			<NavBrand href="/">
				{#if darkMode}
					<img src="/logo/logo-light.svg" class="me-3 h-7 sm:h-9" alt="Flowbite Logo" />
				{:else}
					<img src="/logo/logo-dark.svg" class="me-3 h-7 sm:h-9" alt="Flowbite Logo" />
				{/if}
				<span class="self-center whitespace-nowrap text-xl font-semibold text-gray-900 dark:text-white">Dam Levels</span>
			</NavBrand>
			<div class="flex md:order-2">
				<button 
					onclick={toggleDarkMode} 
					class="p-2"
					aria-label="Toggle Dark Mode"
				>
					{#if darkMode}
						🌙
					{:else}
						☀️
					{/if}
				</button>
				<NavHamburger />
			</div>
			<NavUl class="order-1">
				<NavLi href="/">Dashboard</NavLi>
				<NavLi href="/about">About</NavLi>
				<NavLi href="/contact">Contact</NavLi>
			</NavUl>
		</Navbar>
	</div>
	
	{@render children()}
	<div></div>
	<CookieBanner/>
	<div class="mt-auto">
		<Footer>
			<div class="sm:flex sm:items-center sm:justify-between">
				<FooterCopyright href="/" by="Dam Levels™" year={2025} />
				<FooterLinkGroup ulClass="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
					<FooterLink href="/policy">Privacy Policy</FooterLink>
				</FooterLinkGroup>
			</div>
		</Footer>
	</div>
</div>