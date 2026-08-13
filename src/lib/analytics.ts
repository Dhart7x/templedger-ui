declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const measurementId = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY;

export function initAnalytics(): void {
  if (!measurementId) {
    if (import.meta.env.PROD) {
      throw new Error("VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY is not configured");
    }
    console.warn("VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY is not configured; Google Analytics is disabled.");
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

export function trackPageView(path: string): void {
  if (!window.gtag || !measurementId) return;
  window.gtag("event", "page_view", { page_path: path });
}

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (!window.gtag || !measurementId) return;
  window.gtag("event", name, params ?? {});
}
