<script>
    export let data;

    // Define columns based on your actual data structure
    const columns = ['dam', 'province', 'river', 'full_storage_capacity', 'this_week', 'Change'];
    
    // Column display names for better readability
    const columnDisplayNames = {
        'dam': 'Dam Name',
        'province': 'Province',
        'river': 'River',
        'full_storage_capacity': 'FSC Million m³',
        'this_week': 'Pct Filled',
        'Change': 'Change'
    };

    $: sortedData = [...data].sort((a, b) => {
        // Check if province exists before using localeCompare
        if (a.province && b.province) {
            return a.province.localeCompare(b.province) || b.this_week - a.this_week;
        }
        // Fallback for missing province
        return b.this_week - a.this_week;
    });
</script>

<table class="w-full text-sm text-left text-gray-500">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
            {#each columns as column}
                <th class="px-6 py-3">{columnDisplayNames[column] || column}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each sortedData as row}
            <tr class="bg-white border-b">
                {#each columns as column}
                    <td class="px-6 py-4">
                        {#if column === 'full_storage_capacity'}
                            {row[column]?.toFixed(2) ?? ''}
                        {:else if column === 'this_week'}
                            {row[column]?.toFixed(1) ?? ''}%
                        {:else}
                            {row[column] ?? ''}
                        {/if}
                    </td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>
<p class="mt-2">Reporting {data.length} dams!</p>