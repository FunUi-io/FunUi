export function isTouchDevice(): boolean {
  // Check for touch events
  const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Check for typical mobile user agents
  const isMobileAgent = /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);

  return hasTouchSupport && isMobileAgent;
}
