/**
 * Maps the API viewer's theme variables onto the console tokens, so the
 * reference uses the same navy surfaces, text, borders, accent and type as the
 * rest of the app. The variables resolve against the `.dark` class the
 * console's theme toggle sets on <html>, so the reference follows that toggle
 * even though the viewer keeps its own light/dark class. The doubled class
 * outranks the viewer's own single-class defaults.
 */
export const API_REFERENCE_CUSTOM_CSS = `
.light-mode.light-mode, .dark-mode.dark-mode {
  --scalar-background-1: hsl(var(--background));
  --scalar-background-2: hsl(var(--card));
  --scalar-background-3: hsl(var(--accent));
  --scalar-background-accent: hsl(var(--primary) / 0.12);
  --scalar-color-1: hsl(var(--foreground));
  --scalar-color-2: hsl(var(--muted-foreground));
  --scalar-color-3: hsl(var(--muted-foreground) / 0.8);
  --scalar-color-accent: hsl(var(--primary));
  --scalar-border-color: hsl(var(--border));
  --scalar-color-green: hsl(var(--success));
  --scalar-color-red: hsl(var(--danger));
  --scalar-color-yellow: hsl(var(--warning));
  --scalar-color-orange: hsl(var(--warning));
  --scalar-color-blue: hsl(var(--info));
  --scalar-color-purple: hsl(var(--chart-dkim));
  --scalar-button-1: hsl(var(--primary));
  --scalar-button-1-hover: hsl(var(--primary) / 0.9);
  --scalar-button-1-color: hsl(var(--primary-foreground));
  --scalar-link-color: hsl(var(--primary));
  --scalar-link-color-hover: hsl(var(--primary) / 0.85);
  --scalar-font: var(--font-sans);
  --scalar-font-code: var(--font-mono);
  --scalar-radius: var(--radius-sm);
  --scalar-radius-lg: var(--radius-md);
  --scalar-radius-xl: var(--radius-lg);
  --scalar-sidebar-background-1: hsl(var(--background));
  --scalar-sidebar-item-hover-background: hsl(var(--accent));
  --scalar-sidebar-item-active-background: hsl(var(--primary) / 0.12);
  --scalar-sidebar-color-active: hsl(var(--primary));
  --scalar-sidebar-search-background: hsl(var(--card));
  --scalar-sidebar-search-border-color: hsl(var(--border));
}
`
