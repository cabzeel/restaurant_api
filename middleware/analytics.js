// analytics.js
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: './service-account-key.json',
});

async function runReport() {
  const [response] = await analyticsDataClient.runReport({
    property: 'properties/YOUR_PROPERTY_ID',
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }],
    dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
  });

  return response.rows.map(row => ({
    page: row.dimensionValues[0].value,
    views: row.metricValues[0].value,
  }));
}                                  