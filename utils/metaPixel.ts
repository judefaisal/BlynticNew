/**
 * Meta Pixel (Facebook Pixel) Helper for Blyntic
 * Supports standard Meta Pixel events and custom interaction tracking.
 */

declare global {
  interface Window {
    fbq?: ((...args: any[]) => void) & {
      callMethod?: (...args: any[]) => void;
      queue?: any[];
      loaded?: boolean;
      version?: string;
      push?: (...args: any[]) => void;
    };
    _fbq?: any;
  }
}

/**
 * Track a PageView event
 */
export const trackMetaPageView = () => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }
};

/**
 * Track Standard Lead Event (form submissions, consultation requests)
 */
export const trackMetaLead = (parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', parameters || { content_name: 'Consultation Form' });
  }
};

/**
 * Track Standard Contact Event (phone clicks, email clicks)
 */
export const trackMetaContact = (parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Contact', parameters || {});
  }
};

/**
 * Track Schedule / Appointment Booking Event
 */
export const trackMetaSchedule = (parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Schedule', parameters || {});
  }
};

/**
 * Track Custom Events
 */
export const trackMetaCustomEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, parameters || {});
  }
};
