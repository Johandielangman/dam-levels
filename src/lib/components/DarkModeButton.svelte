<script>
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

    // 1) CREATE A DARK MODE STATE -- INITIAL MODE IS DARK MODE
    // 2 USE THE LOCAL STORAGE
    let darkMode = $state(
        browser
            ? localStorage.getItem('darkMode') !== null
            ? localStorage.getItem('darkMode') === 'true'
            : true
            : true
    );

    // 1) EFFECT WILL SUBSCRIBE TO STATE CHANGES
    // 2) ON CHANGE, UPDATE LOCAL STORAGE
    // 3) LOCAL STORAGE UPDATE WILL UPDATE TAILWINDS
    $effect(() => {
    if (browser) {
        localStorage.setItem('darkMode', darkMode.toString());
        document.documentElement.classList.toggle('dark', darkMode);
    }
    });

    // FUNCTION TO TOGGLE THE STATE
    function toggleDarkMode() {
        darkMode = !darkMode;
    }
</script>

<!-- =============== // BUTTON TO TOGGLE DARK MODE // ===============  -->

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