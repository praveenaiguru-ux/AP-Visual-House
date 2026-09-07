export const siteConfig = {
  name: "AP Visual House",
  tagline: "Ideas. Made Visual.",
  description: "Premium creative visual services. From imagination to finished visuals.",
  whatsappNumber: "+919876543210", // Placeholder
  whatsappMessage: "Hi, I'm interested in starting a creative project.",
  email: "hello@apvisualhouse.com",
  currency: "₹",
  url: "https://apvisualhouse.com",
  socials: {
    instagram: "#",
    behance: "#"
  }
};

export const getWhatsAppLink = (message?: string) => {
  const text = message ? encodeURIComponent(message) : encodeURIComponent(siteConfig.whatsappMessage);
  return `https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`;
};
