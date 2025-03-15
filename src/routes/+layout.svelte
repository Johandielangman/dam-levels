<script lang="ts">
	// ~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~
	//      /\_/\
	//     ( o.o )
	//      > ^ <
	//
	// Author: Johan Hanekom
	// Date: March 2025
	//
	// ~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~

	// =============== // SVELTE IMPORTS // ===============

	import { browser } from '$app/environment';
	import { PUBLIC_UMAMI_SITE_ID } from '$env/static/public';

	// =============== // THIRD PARTY IMPORTS // ===============

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
	import { UmamiAnalytics } from '@lukulent/svelte-umami';

	// =============== // CUSTOM COMPONENT IMPORTS // ===============

	import CookieBanner from '$lib/components/CookieBanner.svelte';
	import DarkModeButton from '$lib/components/DarkModeButton.svelte'
	import AdUnit from '$lib/components/AdUnit.svelte';

	// =============== // STATIC IMPORTS // ===============

	import '../app.css';


	// =============== // PROPS // ===============

	let { children } = $props();

</script>

<!-- =============== // PAGE TITLE AND METADATA // ===============  -->

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
				<img 
				src="/logo/logo-light.svg" 
				class="mr-3 h-7 sm:h-9" 
				alt="Flowbite Logo Light" 
				/>
				<span class="self-center whitespace-nowrap text-xl font-semibold text-gray-900 dark:text-white">
					Dam Levels
				</span>
			</NavBrand>
			<div class="flex md:order-2">
				<DarkModeButton/>
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

	<CookieBanner/>
	<AdUnit/>

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