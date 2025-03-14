<script>
  import { Tabs, TabItem } from 'flowbite-svelte';
  import { MapPinAltSolid, TableColumnSolid } from 'flowbite-svelte-icons';
  import LeafletMap from '$lib/components/LeafletMap.svelte';
  import DataTable from '$lib/components/DataTable.svelte';
  import { formatDate } from '$lib/utils/helpers';
  import { page } from '$app/state';
  import { goto, invalidate } from '$app/navigation';
  import { onMount } from 'svelte';

  export let data;

  // Get URL parameters without using $ prefix
  let selectedReportDate = page.url.searchParams.get('reportDate') || 'All';
  let selectedProvince = page.url.searchParams.get('province') || 'All';
  let activeTab = 'map';

  $: reportDates = ['All', ...data.reportDates];
  $: provinces = ['All', ...data.provinces];
  
  // Set default date if coming in fresh
  onMount(() => {
    if (!selectedReportDate || selectedReportDate === 'All') {
      selectedReportDate = data.reportDates[0] || 'All';
      updateFilters();
    }
  });

  async function updateFilters() {
    const url = new URL(window.location);
    url.searchParams.set('reportDate', selectedReportDate);
    url.searchParams.set('province', selectedProvince);
    await goto(url, { replaceState: true });
    
    // Invalidate to refresh data
    await invalidate('app:damData');
  }

  function handleTabChange(event) {
    activeTab = event.detail;
  }
</script>

<svelte:head>
  <title>Dam Dash</title>
  <link rel="icon" href="/favicon.svg" />
</svelte:head>

<div class="container mx-auto p-4 bg-white rounded-2xl dark:bg-gray-900 dark:text-white">
  <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-400">South Africa Dam Dashboard 💧</h1>
  <h2 class="text-xl mb-2 text-gray-800 dark:text-gray-200">
    Report Date: <b>{selectedReportDate === 'All' ? 'All Dates' : formatDate(selectedReportDate)}</b> 📆
  </h2>

  {#if data.damData.length === 0}
    <div class="p-4 border rounded bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
      No data found for the selected filters. Try adjusting your selection.
    </div>
  {:else}
    <Tabs style="underline" on:change={handleTabChange} class="text-gray-800 dark:text-gray-300">
      <TabItem open>
        <div slot="title" class="flex items-center gap-2">
          <MapPinAltSolid size="md" />
          Map
        </div>
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Filters Sidebar -->
          <div class="w-64 md:w-64 mb-4 md:mb-0 order-2 md:order-1">
            <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Filters</h3>
              <div class="flex flex-col gap-4">
                <div class="flex flex-col">
                  <label for="reportDate" class="text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Report Date</label>
                  <select 
                    id="reportDate"
                    bind:value={selectedReportDate} 
                    class="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white"
                    on:change={updateFilters}
                  >
                    {#each reportDates as date}
                      <option value={date}>{date === 'All' ? 'All' : formatDate(date)}</option>
                    {/each}
                  </select>
                </div>
                
                <div class="flex flex-col">
                  <label for="province" class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Province</label>
                  <select 
                    id="province"
                    bind:value={selectedProvince} 
                    class="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white"
                    on:change={updateFilters}
                  >
                    {#each provinces as province}
                      <option value={province}>{province}</option>
                    {/each}
                  </select>
                </div>
              </div>
  
              <!-- Legend -->
              <div class="mt-6">
                <h3 class="text-md font-semibold mb-2 text-gray-800 dark:text-gray-300">Legend</h3>
                <div class="flex flex-col gap-2">
                  {#each [
                    { color: '#e60000', label: 'Very Low (0-25%)' },
                    { color: '#ffaa02', label: 'Moderately Low (25-50%)' },
                    { color: '#fffe03', label: 'Near Normal (50-75%)' },
                    { color: '#4de600', label: 'Moderately High (75-90%)' },
                    { color: '#0959df', label: 'High (90%+)' }
                  ] as item}
                    <div class="flex items-center gap-2">
                      <span class="inline-block w-4 h-4 rounded-full" style="background-color: {item.color}"></span>
                      <span class="text-sm text-gray-800 dark:text-gray-300">{item.label}</span>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </div>

          <!-- Map Content -->
          <div class="flex-1 order-1 md:order-2">
            {#if selectedReportDate === 'All'}
              <p class="text-sm text-yellow-600 dark:text-yellow-400 mt-2 mb-4 p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded">
                Please select a specific report date to view the map.
              </p>
            {:else}
              <div class="w-full">
                <LeafletMap data={data.damData} />
              </div>
            {/if}
          </div>
        </div>
      </TabItem>
      <TabItem>
        <div slot="title" class="flex items-center gap-2">
          <TableColumnSolid />
          Table
        </div>
        <DataTable data={data.damData} />
      </TabItem>
    </Tabs>
  {/if}
</div>

<style>
  :global(body) {
    font-family: Arial, sans-serif;
  }
</style>