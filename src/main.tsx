import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { inject } from "@vercel/analytics";

inject();

createRoot(document.getElementById("root")!).render(<App />);

// ---------------------------
// PWA + Service Worker
// ---------------------------
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) => {
        console.log("Service Worker registrerad:", reg);
      })
      .catch((err) => console.error(err));
  });
}

// ---------------------------
// Push Notifications
// ---------------------------
if ("Notification" in window) {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Push notifications allowed");
    }
  });
}