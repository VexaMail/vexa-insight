/**
 * Same choice as `resolveInitialTheme`, as an inline script that runs before
 * first paint so a dark-theme operator never sees the light canvas flash.
 */
export const THEME_BOOTSTRAP_SCRIPT =
  "try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}"
