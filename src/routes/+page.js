/** @type {import('./$types').PageLoad} */
export async function load({ fetch, url, depends }) {
  // Add a dependency on a custom key
  depends('app:damData');
  
  // Get filter parameters from URL
  const reportDate = url.searchParams.get('reportDate') || 'All';
  const province = url.searchParams.get('province') || 'All';
  
  // Fetch filters
  const filtersRes = await fetch('/api/filters');
  const { reportDates, provinces } = await filtersRes.json();
  
  // Default to most recent date if no reportDate is specified
  const defaultDate = reportDates.length > 0 ? reportDates[0] : 'All';
  const effectiveReportDate = reportDate === 'All' ? defaultDate : reportDate;
  
  // Fetch dam data with selected filters
  const params = new URLSearchParams({
    reportDate: reportDate,
    province: province
  });
  
  const dataRes = await fetch(`/api/data?${params}`);
  let damData = await dataRes.json();
  
  // Add error handling
  if (!Array.isArray(damData)) {
    console.error('Invalid data format received from API');
    damData = [];
  }
  
  return {
    reportDates,
    provinces,
    damData,
    selectedReportDate: reportDate,
    selectedProvince: province
  };
}