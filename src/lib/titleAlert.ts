// Lightweight tab-title alert used to flag new messages/orders while the tab
// is hidden. Restores the original title when the user comes back to the tab.

let alertActive = false;
let snapshot: string | null = null;
let visibilityInstalled = false;

function installVisibilityHandler() {
  if (visibilityInstalled || typeof document === "undefined") return;
  visibilityInstalled = true;
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) clearTitleAlert();
  });
}

export function setTitleAlert(text: string) {
  if (typeof document === "undefined") return;
  installVisibilityHandler();
  // Don't alter visible tabs — user is already looking.
  if (!document.hidden) return;
  if (!alertActive) snapshot = document.title;
  document.title = text;
  alertActive = true;
}

export function clearTitleAlert() {
  if (typeof document === "undefined") return;
  if (!alertActive) return;
  if (snapshot !== null) document.title = snapshot;
  alertActive = false;
  snapshot = null;
}
