export function useAnalytics() {
  const trackEvent = (eventName: string, eventParams?: Record<string, string | number | boolean>) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", eventName, eventParams);
    }
  };

  return { trackEvent };
}
