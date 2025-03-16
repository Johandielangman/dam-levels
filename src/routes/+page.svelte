<script>
    // =============== // METADATA // ===============
    let pageTitle = "Dam Levels of SA";
    let pageDescription = "What's this thing about? This project is a little labor of love, built as a hobby to share useful info with anyone who’s curious about South Africa’s dams.";
    import { Button } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
</script>
<!-- =============== // PAGE TITLE AND METADATA // ===============  -->

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
    <meta name="twitter:title" property="og:title" itemprop="name" content={pageTitle} />
    <meta name="twitter:description" property="og:description" itemprop="description" content={pageDescription} />
</svelte:head>

<div class="container mx-auto p-6 max-w-4xl bg-white rounded-2xl shadow-lg dark:bg-gray-900 dark:text-white transition-all duration-300">
    <h1 class="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">Dam Levels of South Africa</h1>
    <div class="space-y-6 text-gray-700 dark:text-gray-300">
        <p>
            <strong>Welcome to the South African Dam Dashboard!</strong> This dashboard provides weekly updates on dam levels across South Africa, with data sourced from the <a href="https://www.dws.gov.za/hydrology/Weekly/Province.aspx" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-600 dark:text-teal-400 dark:hover:text-teal-300 underline">Department of Water and Sanitation</a>. The information is presented in both a handy table and an interactive map, making it easy to explore water levels across the country.
        </p>
        <p>
            This project is a little labor of love, built as a hobby to share useful info with anyone who’s curious about South Africa’s dams. I’m passionate about tinkering with data and creating something that’s both practical and fun to use. Hope you enjoy it as much as I enjoy working on it!
        </p>
        <div class="flex justify-center">
            <Button color="blue" pill onclick={() => goto('/dashboard')}>
                Go to Dashboard
            </Button>
        </div>
    </div>
</div>