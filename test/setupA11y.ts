import '@testing-library/jest-dom/vitest'

// jsdom implements no layout engine, so these DOM APIs are simply absent.
// Radix popover-style primitives (Select, Popover, Tooltip) call them while
// opening, and without stubs the component throws before axe can audit the
// portalled content. Stubbing is safe here: axe checks roles, names, and
// relationships, none of which depend on real geometry.
if (typeof Reflect.get(Element.prototype, 'scrollIntoView') !== 'function') {
  Element.prototype.scrollIntoView = function scrollIntoView(): void {}
}
if (typeof Reflect.get(Element.prototype, 'hasPointerCapture') !== 'function') {
  Element.prototype.hasPointerCapture = function hasPointerCapture(): boolean {
    return false
  }
}
if (typeof Reflect.get(Element.prototype, 'setPointerCapture') !== 'function') {
  Element.prototype.setPointerCapture = function setPointerCapture(): void {}
}
if (
  typeof Reflect.get(Element.prototype, 'releasePointerCapture') !== 'function'
) {
  Element.prototype.releasePointerCapture =
    function releasePointerCapture(): void {}
}
if (typeof Reflect.get(globalThis, 'ResizeObserver') !== 'function') {
  globalThis.ResizeObserver = class ResizeObserver {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  }
}
