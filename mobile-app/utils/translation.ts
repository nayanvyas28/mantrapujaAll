import i18next from "i18next";

/**
 * Helper to get localized field from a dynamic data object (from Supabase/API)
 * If the current language is Hindi, it looks for field_hi first.
 * If not found or not in Hindi, it falls back to the original field.
 * 
 * @param item The data object (e.g. Puja, Blog, Destination)
 * @param field The field name (e.g. 'name', 'title', 'description')
 * @returns The localized string or the original string
 */
export const getLocalized = (item: any, field: string): string => {
  if (!item) return "";
  
  const currentLang = i18next.language;
  
  // If language is Hindi, try to find the _hi version
  if (currentLang === "hi") {
    const hindiField = `${field}_hi`;
    if (item[hindiField] && typeof item[hindiField] === "string" && item[hindiField].trim() !== "") {
      return item[hindiField];
    }
  }
  
  // Fallback to original field or empty string
  return item[field] || "";
};
