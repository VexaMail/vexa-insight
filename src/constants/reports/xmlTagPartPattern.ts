/** Matches, inside a tag: an attribute pair, a bare name, or punctuation. */
export const xmlTagPartPattern =
  /([A-Z_][\w.:-]*)\s*=\s*("[^"]*"|'[^']*')|([A-Z_][\w.:-]*)|([^\sA-Z_]+)/gi
