const EVENT_TO = "AW-11083927345/yTHYCP_x0MobELGenaUp";

export function trackWhatsappConversion() {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: EVENT_TO,
    });
  }
}

