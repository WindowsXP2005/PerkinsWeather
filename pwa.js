// Perkins Weather - PWA setup
// Registers the service worker and shows a small "Install App" button
// when the browser supports it (mainly Android/Chrome/Edge).

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((err) => {
      console.error("Service worker registration failed:", err);
    });
  });
}

let deferredInstallPrompt = null;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  const btn = document.getElementById("pw-install-btn");
  if (btn) btn.style.display = "inline-block";
});

function pwInstallApp() {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  deferredInstallPrompt.userChoice.finally(() => {
    deferredInstallPrompt = null;
    const btn = document.getElementById("pw-install-btn");
    if (btn) btn.style.display = "none";
  });
}

window.addEventListener("appinstalled", () => {
  const btn = document.getElementById("pw-install-btn");
  if (btn) btn.style.display = "none";
});
