import '@testing-library/jest-dom/vitest'

// jsdom implements no layout engine, so these DOM APIs are simply absent.
// Radix popover-style primitives (Select, Popover, Tooltip) call them while
// opening, and without stubs the component throws before axe can audit the
// portalled content. Stubbing is safe here: axe checks roles, names, and
// relationships, none of which depend on real geometry.
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function scrollIntoView(): void {}
}
if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = function hasPointerCapture(): boolean {
    return false
  }
}
if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = function setPointerCapture(): void {}
}
if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture =
    function releasePointerCapture(): void {}
}
if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class ResizeObserver {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  }
}
