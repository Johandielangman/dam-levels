<script>
  import { Tabs, TabItem } from 'flowbite-svelte';
  import { MapPinAltSolid, TableColumnSolid } from 'flowbite-svelte-icons';
  import LeafletMap from '$lib/components/LeafletMap.svelte';
  import DataTable from '$lib/components/DataTable.svelte';
  import { formatDate } from '$lib/utils/helpers';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { invalidate } from '$app/navigation';

  export let data;

  let selectedReportDate = $page.url.searchParams.get('reportDate') || 'All';
  let selectedProvince = $page.url.searchParams.get('province') || 'All';
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

<div class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-4">South Africa Dam Dashboard 💧</h1>
  <h2 class="text-xl mb-2">
    Report Date: <b>{selectedReportDate === 'All' ? 'All Dates' : formatDate(selectedReportDate)}</b> 📆
  </h2>
  <p class="text-sm text-gray-500 mb-4">
      Welcome to the South African Dam Dashboard! This dashboard provides weekly updates on dam levels across South Africa...
  </p>

  <!-- Filters -->
  <div class="mb-4 flex gap-4">
    <div class="flex flex-col">
      <label for="reportDate" class="text-sm font-medium text-gray-700 mb-1">Report Date</label>
      <select 
        id="reportDate"
        bind:value={selectedReportDate} 
        class="border p-2 rounded"
        on:change={updateFilters}
      >
        {#each reportDates as date}
          <option value={date}>{date === 'All' ? 'All' : formatDate(date)}</option>
        {/each}
      </select>
    </div>
    
    <div class="flex flex-col">
      <label for="province" class="text-sm font-medium text-gray-700 mb-1">Province</label>
      <select 
        id="province"
        bind:value={selectedProvince} 
        class="border p-2 rounded"
        on:change={updateFilters}
      >
        {#each provinces as province}
          <option value={province}>{province}</option>
        {/each}
      </select>
    </div>
  </div>
  
  {#if data.damData.length === 0}
    <div class="p-4 border rounded bg-yellow-50 text-yellow-800">
      No data found for the selected filters. Try adjusting your selection.
    </div>
  {:else}
    <Tabs tabStyle="underline" on:change={handleTabChange}>
      <TabItem open>
        <div slot="title" class="flex items-center gap-2">
          <MapPinAltSolid size="md" />
          Map
        </div>
        {#if selectedReportDate === 'All'}
          <p class="text-sm text-yellow-600 mt-2 mb-4 p-2 bg-yellow-50 rounded">
            Please select a specific report date to view the map.
          </p>
        {:else}
          <LeafletMap data={data.damData} />
        {/if}
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

  <!-- Legend -->
  <div class="mt-4">
    <h3 class="text-lg font-semibold">Legend</h3>
    <div class="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
      {#each [
        { color: '#e60000', label: 'Very Low (0-25%)' },
        { color: '#ffaa02', label: 'Moderately Low (25-50%)' },
        { color: '#fffe03', label: 'Near Normal (50-75%)' },
        { color: '#4de600', label: 'Moderately High (75-90%)' },
        { color: '#0959df', label: 'High (90%+)' }
      ] as item}
        <div class="flex items-center gap-2">
          <span class="inline-block w-4 h-4 rounded-full" style="background-color: {item.color}"></span>
          <span class="text-sm">{item.label}</span>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  :global(body) {
    font-family: Arial, sans-serif;
  }
</style>