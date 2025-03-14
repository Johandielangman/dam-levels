/**
 * Format a date string to a more readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export function formatDate(dateString) {
    if (dateString === 'All') return 'All Dates';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Get color based on percentage value
 * @param {number} percentage - Percentage value
 * @returns {string} Color hex code
 */
export function getColor(percentage) {
    // Convert to number if it's a string
    const value = Number(percentage);
    
    if (isNaN(value)) return '#cccccc'; // Default gray for invalid values
    
    if (value < 25) return '#e60000';        // Very low - red
    else if (value < 50) return '#ffaa02';   // Moderately low - orange
    else if (value < 75) return '#fffe03';   // Near normal - yellow
    else if (value < 90) return '#4de600';   // Moderately high - green
    else return '#0959df';                   // High - blue
}