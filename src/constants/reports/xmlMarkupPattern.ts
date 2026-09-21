/** Matches an XML comment or a tag, including one truncated at end of line. */
export const xmlMarkupPattern = /<!--[\s\S]*?-->|<[^>]*>?/g
