<script>
    import { page } from '$app/state';
    import { goto } from '$app/navigation';
    
    // Get the error status
    const status = page.status || 500;
    const message = page.error?.message || '';
    
    function goHome() {
      goto('/');
    }
    
    function refreshPage() {
      window.location.reload();
    }
    
    // Define different error types
    const errorTypes = {
      404: {
        title: "Page Not Found",
        emoji: "💧",
        message: "Oops! Looks like this water source has dried up.",
        color: "blue"
      },
      500: {
        title: "Server Error",
        emoji: "🌊",
        message: "Oh no! Our dam has sprung a leak. Our engineers are working to fix it.",
        color: "red"
      },
      default: {
        title: "Something Went Wrong",
        emoji: "🚧",
        message: "We're experiencing technical difficulties. Please try again later.",
        color: "yellow"
      }
    };
    
    // Get error content based on status code
    const errorContent = errorTypes[status] || errorTypes.default;
  </script>
  
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
    <div class="text-center max-w-md">
      <h1 class="text-6xl font-bold text-{errorContent.color}-600 dark:text-{errorContent.color}-400">{status}</h1>
      <div class="mt-4 text-9xl">{errorContent.emoji}</div>
      <h2 class="mt-4 text-3xl font-semibold text-gray-800 dark:text-gray-200">{errorContent.title}</h2>
      <p class="mt-2 text-gray-600 dark:text-gray-400">{errorContent.message}</p>
      {#if message}
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-500">{message}</p>
      {/if}
      <div class="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          on:click={refreshPage}
          class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors duration-300 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Try Again
        </button>
        <button 
          on:click={goHome}
          class="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg shadow-md transition-colors duration-300 dark:bg-gray-700 dark:hover:bg-gray-800"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  </div>