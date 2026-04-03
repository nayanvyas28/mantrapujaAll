/**
 * Play Store Compliance Sanitizer
 * This utility dynamically replaces red-flag keywords with safe spiritual equivalents.
 */

const SAFE_REPLACEMENTS = [
  { regex: /100%/gi, replacement: 'traditionally' },
  { regex: /Guaranteed/gi, replacement: 'traditionally believed' },
  { regex: /Guarantee/gi, replacement: 'belief' },
  { regex: /Fixed/gi, replacement: 'Sacred' },
  { regex: /Sure!/gi, replacement: 'Auspiciously,' },
  { regex: /Sure/gi, replacement: 'Sacred' },
  { regex: /Cure/gi, replacement: 'Balance' },
  { regex: /Heal/gi, replacement: 'Peace' },
  { regex: /Medicine/gi, replacement: 'Spiritual Practice' },
  { regex: /Illness/gi, replacement: 'Imbalance' },
  { regex: /Disease/gi, replacement: 'Energy Blockage' },
  { regex: /Wealth/gi, replacement: 'Prosperity' },
  { regex: /Rich/gi, replacement: 'Abundance' },
  { regex: /Jackpot/gi, replacement: 'Success' },
  { regex: /Gambling/gi, replacement: 'Chance' },
  { regex: /Miracle/gi, replacement: 'Blessing' },
  { regex: /Magic/gi, replacement: 'Divine Energy' },
  { regex: /Instantly/gi, replacement: 'Sacredly' },
  // Hindi Replacements
  { regex: /पक्का/gi, replacement: 'मान्यता है' },
  { regex: /निश्चित/gi, replacement: 'शुभ' },
  { regex: /चमत्कार/gi, replacement: 'आशीर्वाद' },
  { regex: /तुरंत/gi, replacement: 'पवित्र' },
  { regex: /इलाज/gi, replacement: 'शांति' },
  { regex: /बीमारी/gi, replacement: 'असंतुलन' },
  { regex: /अमीर/gi, replacement: 'सौभाग्यशाली' },
  { regex: /धन/gi, replacement: 'समृद्धि' }
];

export function sanitizeText(text: string | null | undefined): string {
  if (!text || typeof text !== 'string') return text || '';
  let sanitized = text;
  SAFE_REPLACEMENTS.forEach((pair) => {
    sanitized = sanitized.replace(pair.regex, pair.replacement);
  });
  return sanitized;
}

/**
 * Sanitizes an object or array of objects recursively
 */
export function sanitizeData<T>(data: T): T {
  if (!data) return data;
  
  if (Array.isArray(data)) {
    return data.map(item => sanitizeData(item)) as any;
  }
  
  if (typeof data === 'object') {
    const sanitizedObj: any = {};
    for (const key in data) {
      const value = data[key];
      if (typeof value === 'string') {
        sanitizedObj[key] = sanitizeText(value);
      } else if (typeof value === 'object' && value !== null) {
        sanitizedObj[key] = sanitizeData(value);
      } else {
        sanitizedObj[key] = value;
      }
    }
    return sanitizedObj as T;
  }
  
  return data;
}
