import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// ---------------------------
// PWA: Service Worker & Background funktioner
// ---------------------------
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Registrera service worker
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) => {
        console.log("Service Worker registrerad:", reg);

        // Periodic Sync
        if ("periodicSync" in reg) {
          reg.periodicSync
            .register("fetch-latest-data", { minInterval: 24 * 60 * 60 * 1000 }) // 1 dag
            .then(() => console.log("Periodic Sync registrerad"))
            .catch(console.error);
        }

        // Background Sync
        reg.sync
          .register("sync-queued-actions")
          .then(() => console.log("Background Sync registrerad"))
          .catch(console.error);
      })
      .catch((err) => console.error("Service Worker registrering misslyckades:", err));
  });
}

// Push Notifications
if ("Notification" in window) {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Användaren tillåter push-notiser!");
      // Här kan du lägga till logik för att prenumerera med PushManager
    }
  });
}
