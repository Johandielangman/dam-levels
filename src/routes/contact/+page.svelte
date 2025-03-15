<script>
    // =============== // METADATA // ===============
    let pageTitle = "Contact Us!";
    let pageDescription = "Hey there! Want to contact us? Feel free to drop us an email at toast@happybread.net";
</script>
<!-- =============== // PAGE TITLE AND METADATA // ===============  -->

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
    <meta name="twitter:title" property="og:title" itemprop="name" content={pageTitle} />
    <meta name="twitter:description" property="og:description" itemprop="description" content={pageDescription} />
</svelte:head>

<div class="container mx-auto p-6 max-w-4xl bg-white rounded-2xl shadow-lg dark:bg-gray-900 dark:text-white transition-all duration-300">
    <h1 class="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">Contact Us</h1>
    <div class="space-y-6 text-gray-700 dark:text-gray-300">
        <p>
            Hey there! Thanks for stopping by. We’re thrilled to have you here, even though the site is still in its early days. If you’ve got any questions, spotted a bug, or have some cool ideas to make things even better, we’d love to hear from you!
        </p>
        <p>
            Feel free to drop us an email at <a href="mailto:toast@happybread.net" class="text-blue-500 hover:text-blue-600 dark:text-teal-400 dark:hover:text-teal-300 underline">toast@happybread.net</a>. We’re all about keeping things friendly and open, so don’t hesitate to reach out!
        </p>
        <p>
            Your feedback means the world to us as we work to improve and grow. Let’s make this site awesome together!
        </p>
    </div>
</div>