/**
 * Performance Monitoring for React 19
 * Tracks render performance and web vitals
 */

export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export const logPerformance = (metric) => {
  console.log(`[Performance] ${metric.name}:`, metric.value);
};
 
// Docs: updated API reference for performanceMonitor

 
// Optimizing: performanceMonitor performance metrics

 
// Internal: verified component logic for performanceMonitor
