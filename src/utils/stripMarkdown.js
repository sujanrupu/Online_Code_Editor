// stripMarkdown.js

/**
 * For formatting: Clean and extract only the raw code block if present.
 */
export function stripMarkdown(md) {
  if (!md) return "";

  // Extract content inside the first ``` code block if present
  const match = md.match(/```(?:\w+)?\n([\s\S]*?)```/);
  if (match) return match[1].trim();

  // Else fallback: remove markdown symbols
  return md
    .replace(/^#+\s?/gm, "") // remove headings
    .replace(/!\[.*?\]\(.*?\)/g, "") // remove images
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // remove links
    .replace(/[*_~`>]+/g, "") // remove markdown formatting
    .replace(/^- /gm, "• ") // convert - to bullet
    .trim();
}

/**
 * For improvement: Keep explanation but remove all markdown symbols.
 */
export function stripImprovementMarkdown(md) {
  if (!md) return "";

  return md
    .replace(/```[\s\S]*?```/g, (match) =>
      match.replace(/```[\w]*\n?/g, "").replace(/```/g, "")
    ) // strip ```language and closing ```
    .replace(/^#+\s?/gm, "") // remove headings like #, ##
    .replace(/!\[.*?\]\(.*?\)/g, "") // remove images
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // convert [text](url) to text
    .replace(/[*_~`>]+/g, "") // remove *, _, ~, `, >
    .replace(/^- /gm, "• ") // convert - to bullet
    .replace(/\n{3,}/g, "\n\n") // limit extra newlines
    .trim();
}
