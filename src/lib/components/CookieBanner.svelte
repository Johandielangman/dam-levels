<script>
    import { onMount } from 'svelte';
  
    let consent = $state({
      essential: true,
      analytics: false,
      hasConsented: false
    });
  
    let showBanner = $state(false);
    let showSettings = $state(false);
  
    onMount(() => {
      const savedConsent = localStorage.getItem('cookieConsent');
      if (savedConsent) {
        consent = JSON.parse(savedConsent);
      } else {
        showBanner = true;
      }
  
      // Watch consent changes
      $effect(() => {
        if (consent.hasConsented) {
          localStorage.setItem('cookieConsent', JSON.stringify(consent));
          if (consent.analytics) {
            console.log("Init")
          }
        }
      });
    });
  
    function acceptAll() {
      consent = {
        essential: true,
        analytics: true,
        hasConsented: true
      };
      showBanner = false;
    }
  
    function rejectAll() {
      consent = {
        essential: true,
        analytics: false,
        hasConsented: true
      };
      showBanner = false;
    }
  
    function saveSettings() {
      consent = {
        ...consent,
        hasConsented: true
      };
      showBanner = false;
      showSettings = false;
    }
  </script>
  
  {#if showBanner}
    <div class="fixed bottom-0 left-0 right-0 z-100 bg-gray-900 text-white p-4 shadow-lg">
      <div class="max-w-4xl mx-auto">
        {#if !showSettings}
          <div class="flex flex-col md:flex-row items-center gap-4">
            <p class="flex-1 text-sm">
              Our website doesn't use any Cookies! Yay! 🎉 We have some basic analytics in the background. See our
              <a href="/privacy" class="underline hover:text-gray-300">Privacy Policy</a> 
              for more information.
            </p>
            <div class="flex gap-2">
              <!-- <button 
                onclick={() => showSettings = true}
                class="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-sm"
              >
                Customize
              </button>
              <button 
                onclick={rejectAll}
                class="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-sm"
              >
                Reject Optional
              </button> -->
              <button 
                onclick={acceptAll}
                class="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 text-sm"
              >
                Thanks!
              </button>
            </div>
          </div>
        {:else}
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Cookie Preferences</h3>
            
            <div class="space-y-2">
              <div class="flex items-start gap-2">
                <input 
                  type="checkbox" 
                  checked 
                  disabled 
                  class="mt-1"
                />
                <div>
                  <p class="font-medium">Essential Cookies</p>
                  <p class="text-sm text-gray-300">
                    Required for basic site functionality (always active)
                  </p>
                </div>
              </div>
  
              <div class="flex items-start gap-2">
                <input 
                  type="checkbox" 
                  bind:checked={consent.analytics}
                  class="mt-1"
                />
                <div>
                  <p class="font-medium">Analytics Cookies</p>
                  <p class="text-sm text-gray-300">
                    Used by Umami to collect anonymous usage statistics
                  </p>
                </div>
              </div>
            </div>
  
            <p class="text-sm text-gray-300">
              Learn more in our <a href="/privacy" class="underline hover:text-white">Privacy Policy</a>
            </p>
  
            <div class="flex gap-2 justify-end">
              <button 
                onclick={() => showSettings = false}
                class="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-sm"
              >
                Cancel
              </button>
              <button 
                onclick={saveSettings}
                class="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 text-sm"
              >
                Save Settings
              </button>
            </div>
          </div>
        {/if}
      </div>
    </div>
  {/if}