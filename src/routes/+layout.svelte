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
	let { children } = $props();

	// Reactive dark mode state with rune
	let darkMode = $state(
		browser 
			? localStorage.getItem('darkMode') === 'true' || 
			  window.matchMedia('(prefers-color-scheme: dark)').matches 
			: false
	);

	// Effect to sync dark mode with localStorage and document
	$effect(() => {
		if (browser) {
			localStorage.setItem('darkMode', darkMode.toString());
			document.documentElement.classList.toggle('dark', darkMode);
		}
	});

	function toggleDarkMode() {
		darkMode = !darkMode;
	}
	function initAnalytics () {
		// do something with segment.io or google analytics etc
	}
</script>

<svelte:head>
	<title>Dam Levels</title>
	<meta name="description" content="An amazing dam dashboard!" />
</svelte:head>

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
				<NavLi href="/">Home</NavLi>
				<NavLi href="/">About</NavLi>
				<NavLi href="/">Navbar</NavLi>
				<NavLi href="/">Pricing</NavLi>
				<NavLi href="/">Contact</NavLi>
			</NavUl>
		</Navbar>
	</div>
	
	{@render children()}
	<div class="mt-auto">
		<Footer>
			<div class="sm:flex sm:items-center sm:justify-between">
				<FooterCopyright href="/" by="Dam Levels™" year={2025} />
				<FooterLinkGroup ulClass="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
					<FooterLink href="/">Privacy Policy</FooterLink>
					<FooterLink href="/">Licensing</FooterLink>
					<FooterLink href="/">Contact</FooterLink>
				</FooterLinkGroup>
			</div>
		</Footer>
	</div>
</div>