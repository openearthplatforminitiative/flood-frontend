export const SITES_UPDATED_EVENT = 'sitesUpdated';

export const emitSitesUpdated = () => {
  const event = new CustomEvent(SITES_UPDATED_EVENT);
  window.dispatchEvent(event);
};
