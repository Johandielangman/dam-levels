<script>
    import { onMount, onDestroy, afterUpdate } from 'svelte';
    import { getColor } from '$lib/utils/helpers';

    export let data;

    let map;
    let mapContainer;
    let L;
    let markers = [];
    let mapInitialized = false;

    // Function to convert string coordinates to number array
    function parseLatLong(latLong) {
        // Handle string format like "[lat, long]"
        if (typeof latLong === 'string') {
            try {
                const parsed = JSON.parse(latLong.replace(/'/g, '"'));
                if (Array.isArray(parsed) && parsed.length === 2 && 
                    !isNaN(Number(parsed[0])) && !isNaN(Number(parsed[1]))) {
                    return [Number(parsed[0]), Number(parsed[1])];
                }
            } catch (e) {
                // If JSON parse fails, try comma split
                const parts = latLong.split(',').map(part => parseFloat(part.trim()));
                if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                    return parts;
                }
            }
        }
        // Handle array format
        else if (Array.isArray(latLong) && latLong.length === 2 && 
                !isNaN(Number(latLong[0])) && !isNaN(Number(latLong[1]))) {
            return [Number(latLong[0]), Number(latLong[1])];
        }
        return null;
    }

    async function initializeMap() {
        if (!mapContainer) return;
        
        // Dynamically import Leaflet only in the browser
        if (!L) {
            L = (await import('leaflet')).default;
            await import('leaflet/dist/leaflet.css');
        }

        // Initialize the map if not already done
        if (!map) {
            map = L.map(mapContainer).setView([-28, 24], 6);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            map.fitBounds([[-35, 16.5], [-22, 33]]);
            mapInitialized = true;
        }

        updateMarkers();
    }

    function updateMarkers() {
        if (!map || !L) return;
        
        // Clear existing markers
        markers.forEach(marker => marker.remove());
        markers = [];

        // Filter out data points without valid lat_long
        const validData = data.filter(d => {
            const coords = parseLatLong(d.lat_long);
            return coords !== null;
        });

        if (validData.length === 0) {
            console.warn('No valid data points found for map');
            return;
        }

        // Normalize marker sizes
        const minFsc = Math.min(...validData.map(d => d.full_storage_capacity || 0));
        const maxFsc = Math.max(...validData.map(d => d.full_storage_capacity || 0));
        const minSize = 6;
        const maxSize = 15;

        function getMarkerSize(fsc) {
            if (maxFsc === minFsc) return (minSize + maxSize) / 2;
            return minSize + (maxSize - minSize) * ((fsc - minFsc) / (maxFsc - minFsc));
        }

        // Add markers
        validData.forEach(dam => {
            const coords = parseLatLong(dam.lat_long);
            if (!coords) return;

            const marker = L.circleMarker(coords, {
                radius: getMarkerSize(dam.full_storage_capacity || 0),
                color: getColor(dam.this_week || 0),
                fillColor: getColor(dam.this_week || 0),
                fillOpacity: 0.8
            })
            .bindPopup(`<strong>${dam.dam || "Unknown"}</strong><br>
                       Level: ${dam.this_week?.toFixed(1) || 0}%<br>
                       Capacity: ${dam.full_storage_capacity?.toFixed(2) || 0} Million m³`)
            .addTo(map);
            
            markers.push(marker);
        });
    }

    onMount(initializeMap);

    afterUpdate(() => {
        if (mapInitialized) {
            updateMarkers();
        }
    });

    onDestroy(() => {
        if (map) {
            markers.forEach(marker => marker.remove());
            map.remove();
        }
    });
</script>

<div bind:this={mapContainer} class="h-96 w-full"></div>