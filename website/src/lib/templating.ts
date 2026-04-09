
/**
 * templating.ts
 * Utility for interpolating dynamic data into text content.
 * Supports syntax: {page.title}, {global.phone}, etc.
 */

export function interpolateString(template: string, data: any): string {
    if (!template || typeof template !== 'string') return template;

    // Matches {variable.path}
    return template.replace(/\{([a-zA-Z0-9_.]+)\}/g, (match, key) => {
        const path = key.trim().split('.');
        let value: any = data;

        for (const p of path) {
            if (value && typeof value === 'object' && p in value) {
                value = value[p];
            } else {
                return match; // Return original placeholder if path not found
            }
        }

        // Format dates if detected (rudimentary)
        if (value instanceof Date) {
            return value.toLocaleDateString();
        }

        return value !== undefined && value !== null ? String(value) : "";
    });
}

/**
 * Recursively interpolates values in an object or array.
 */
export function interpolateContent(content: any, data: any): any {
    if (typeof content === 'string') {
        return interpolateString(content, data);
    } else if (Array.isArray(content)) {
        return content.map(item => interpolateContent(item, data));
    } else if (typeof content === 'object' && content !== null) {
        const result: any = {};
        for (const key in content) {
            result[key] = interpolateContent(content[key], data);
        }
        return result;
    }
    return content;
}
