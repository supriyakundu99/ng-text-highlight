import { TextChunk } from "../models/text-chunk";

/**
 * Finds all matching chunks of text based on the provided search words.
 * It processes the text using the provided options (e.g., case sensitivity, escaping).
 * @param autoEscape - Whether to escape special characters in search words.
 * @param caseSensitive - Whether the search should be case-sensitive.
 * @param findChunks - Custom function to find chunks (default is `defaultChunkFinder`).
 * @param sanitize - Function to sanitize the input text and search words.
 * @param searchWords - Array of keywords to search for in the text.
 * @param textToSearch - The main text where the search is performed.
 * @returns Array of `TextChunk` objects representing the highlighted and non-highlighted segments.
 */
export const findAllMatches = ({
  autoEscape,
  caseSensitive = false,
  findChunks = defaultChunkFinder,
  sanitize,
  searchWords,
  textToSearch,
}: {
  autoEscape?: boolean;
  caseSensitive?: boolean;
  findChunks?: typeof defaultChunkFinder;
  sanitize?: typeof defaultSanitize;
  searchWords: Array<string>;
  textToSearch: string;
}): Array<TextChunk> =>
  fillChunks({
    chunksToHighlight: mergeChunks({
      chunks: findChunks({
        autoEscape,
        caseSensitive,
        sanitize,
        searchWords,
        textToSearch,
      }),
    }),
    totalLength: textToSearch ? textToSearch.length : 0,
  });

/**
 * Merges overlapping or adjacent chunks into a single chunk.
 * Ensures that the chunks are non-overlapping and sorted.
 * @param chunks - Array of `TextChunk` objects to merge.
 * @returns Array of merged `TextChunk` objects.
 */
const mergeChunks = ({
  chunks,
}: {
  chunks: Array<TextChunk>;
}): Array<TextChunk> => {
  chunks = chunks
    .sort((first, second) => first.start - second.start)
    .reduce((mergedChunks: Array<TextChunk>, nextChunk) => {
      if (mergedChunks.length === 0) {
        return [nextChunk];
      } else {
        const previousChunk: TextChunk | undefined = mergedChunks.pop();
        if (nextChunk.start <= previousChunk!.end) {
          const endIndex = Math.max(previousChunk!.end, nextChunk.end);
          mergedChunks.push({
            highlight: false,
            start: previousChunk!.start,
            end: endIndex,
          });
        } else {
          mergedChunks.push(previousChunk!, nextChunk);
        }
        return mergedChunks;
      }
    }, []);

  return chunks;
};

/**
 * Finds chunks of text that match the search words.
 * Uses regular expressions to locate the matches in the text.
 * @param autoEscape - Whether to escape special characters in search words.
 * @param caseSensitive - Whether the search should be case-sensitive.
 * @param sanitize - Function to sanitize the input text and search words.
 * @param searchWords - Array of keywords to search for in the text.
 * @param textToSearch - The main text where the search is performed.
 * @returns Array of `TextChunk` objects representing the matching segments.
 */
const defaultChunkFinder = ({
  autoEscape,
  caseSensitive,
  sanitize = defaultSanitize,
  searchWords,
  textToSearch,
}: {
  autoEscape?: boolean;
  caseSensitive?: boolean;
  sanitize?: typeof defaultSanitize;
  searchWords: Array<string>;
  textToSearch: string;
}): Array<TextChunk> => {
  textToSearch = sanitize(textToSearch);
  return searchWords
    .filter((searchWord) => searchWord)
    .reduce((chunks: Array<TextChunk>, searchWord) => {
      searchWord = sanitize(searchWord);

      if (autoEscape) {
        searchWord = escapeRegExp(searchWord);
      }

      const regex = new RegExp(searchWord, caseSensitive ? "g" : "gi");

      let match;
      while ((match = regex.exec(textToSearch))) {
        let start = match.index;
        let end = regex.lastIndex;
        if (end > start) {
          chunks.push({ highlight: false, start, end });
        }
        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }
      }

      return chunks;
    }, []);
};

/**
 * Fills in the gaps between highlighted chunks to create a complete representation of the text.
 * Ensures that non-highlighted segments are included between highlighted ones.
 * @param chunksToHighlight - Array of `TextChunk` objects representing highlighted segments.
 * @param totalLength - Total length of the text being processed.
 * @returns Array of `TextChunk` objects representing the full text with highlighted and non-highlighted segments.
 */
const fillChunks = ({
  chunksToHighlight,
  totalLength,
}: {
  chunksToHighlight: Array<TextChunk>;
  totalLength: number;
}): Array<TextChunk> => {
  const allChunks: Array<TextChunk> = [];
  const appendChunk = (start: number, end: number, highlight: boolean) => {
    if (end - start > 0) {
      allChunks.push({
        start,
        end,
        highlight,
      });
    }
  };

  if (chunksToHighlight.length === 0) {
    appendChunk(0, totalLength, false);
  } else {
    let lastIndex = 0;
    chunksToHighlight.forEach((chunk) => {
      appendChunk(lastIndex, chunk.start, false);
      appendChunk(chunk.start, chunk.end, true);
      lastIndex = chunk.end;
    });
    appendChunk(lastIndex, totalLength, false);
  }
  return allChunks;
};

/**
 * Default sanitization function that returns the input string as-is.
 * Can be overridden to implement custom sanitization logic.
 * @param string - The input string to sanitize.
 * @returns The sanitized string.
 */
function defaultSanitize(string: string): string {
  return string;
}

/**
 * Escapes special characters in a string to make it safe for use in a regular expression.
 * @param string - The input string to escape.
 * @returns The escaped string.
 */
function escapeRegExp(string: string): string {
  return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
