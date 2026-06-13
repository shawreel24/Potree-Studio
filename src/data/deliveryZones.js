/**
 * Delivery zones from dispatch origin: Aizawl, Mizoram (796001)
 *
 * Zone Logic (by pincode prefix):
 *  - 796001–796099 → Local (Aizawl city) → ₹50
 *  - 796xxx (rest) → Mizoram → ₹80
 *  - 781xxx–799xxx → North-East India → ₹120
 *  - All other valid 6-digit pincodes → Rest of India → ₹180
 */

export const DELIVERY_ZONES = {
  LOCAL: {
    name: 'Local – Aizawl City',
    cost: 50,
    emoji: '🏠',
    description: 'Delivered within 1–2 days',
  },
  MIZORAM: {
    name: 'Within Mizoram',
    cost: 80,
    emoji: '📍',
    description: 'Delivered within 2–3 days',
  },
  NORTH_EAST: {
    name: 'North-East India',
    cost: 120,
    emoji: '🗺️',
    description: 'Delivered within 4–6 days',
  },
  REST_OF_INDIA: {
    name: 'Rest of India',
    cost: 180,
    emoji: '🇮🇳',
    description: 'Delivered within 7–10 days',
  },
};

/**
 * Returns the delivery zone object for a given pincode string.
 * Returns null if the pincode is invalid.
 */
export const getDeliveryZone = (pincode) => {
  const clean = String(pincode).trim();

  // Must be exactly 6 digits
  if (!/^\d{6}$/.test(clean)) return null;

  const num = parseInt(clean, 10);
  const prefix3 = parseInt(clean.slice(0, 3), 10); // first 3 digits
  const prefix2 = parseInt(clean.slice(0, 2), 10); // first 2 digits

  // Local: Aizawl city pincodes (796001 – 796099)
  if (num >= 796001 && num <= 796099) return DELIVERY_ZONES.LOCAL;

  // Rest of Mizoram (796xxx)
  if (prefix3 === 796) return DELIVERY_ZONES.MIZORAM;

  // North-East India states:
  // Assam: 781–788, Meghalaya: 793–794, Tripura: 799,
  // Nagaland: 797, Manipur: 795, Arunachal: 790–792, Sikkim: 737
  const neRanges = [
    [737, 737], // Sikkim
    [781, 788], // Assam
    [790, 795], // Arunachal + Manipur
    [797, 797], // Nagaland
    [793, 794], // Meghalaya
    [799, 799], // Tripura
  ];
  for (const [lo, hi] of neRanges) {
    if (prefix3 >= lo && prefix3 <= hi) return DELIVERY_ZONES.NORTH_EAST;
  }

  // Default → Rest of India
  return DELIVERY_ZONES.REST_OF_INDIA;
};
