import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-text-highlighter',
    templateUrl: './text-highlighter.component.html',
    imports: [NgFor, NgIf],
    standalone: true
})
export class TextHighlighterComponent implements OnChanges {

  @Input() textToHighlight = '';
  @Input() searchKeywords!: Array<string>;

  subtexts!: Array<Subtext>;

  ngOnChanges(changes: SimpleChanges): void {
    this.prepareSubtexts();
  }

  prepareSubtexts(): void {
    this.subtexts = []
    if (!this.searchKeywords) {
      this.subtexts = [{
        text: this.textToHighlight,
        isMarked: false
      }];
      return;
    }

    const chunks = findAll({
      searchWords: this.searchKeywords,
      textToHighlight: this.textToHighlight,
      autoEscape: true
    });

    chunks.map((chunk: any) => {
      const { end, highlight, start } = chunk;
      const text = this.textToHighlight.substring(start, end);
      if (highlight) {
        this.subtexts.push({ text, isMarked: true });
      } else {
        this.subtexts.push({ text, isMarked: false });
      }
    });
  }

}

interface Subtext {
  text: string;
  isMarked: boolean;
}

// Code has been taken from: https://www.npmjs.com/package/highlight-words-core
interface Chunk {
  highlight: boolean;
  start: number;
  end: number;
}

const findAll = ({
  autoEscape,
  caseSensitive = false,
  findChunks = defaultFindChunks,
  sanitize,
  searchWords,
  textToHighlight
}: {
  autoEscape?: boolean,
  caseSensitive?: boolean,
  findChunks?: typeof defaultFindChunks,
  sanitize?: typeof defaultSanitize,
  searchWords: Array<string>,
  textToHighlight: string,
}): Array<Chunk> => (
  fillInChunks({
    chunksToHighlight: combineChunks({
      chunks: findChunks({
        autoEscape,
        caseSensitive,
        sanitize,
        searchWords,
        textToHighlight
      })
    }),
    totalLength: textToHighlight ? textToHighlight.length : 0
  })
)


const combineChunks = ({
  chunks
}: {
  chunks: Array<Chunk>,
}): Array<Chunk> => {
  chunks = chunks
    .sort((first, second) => first.start - second.start)
    .reduce((processedChunks: Array<Chunk>, nextChunk) => {
      if (processedChunks.length === 0) {
        return [nextChunk]
      } else {
        const prevChunk: Chunk | undefined = processedChunks.pop()
        if (nextChunk.start <= prevChunk!.end) {
          const endIndex = Math.max(prevChunk!.end, nextChunk.end)
          processedChunks.push({ highlight: false, start: prevChunk!.start, end: endIndex })
        } else {
          processedChunks.push(prevChunk!, nextChunk)
        }
        return processedChunks
      }
    }, [])

  return chunks
}

const defaultFindChunks = ({
  autoEscape,
  caseSensitive,
  sanitize = defaultSanitize,
  searchWords,
  textToHighlight
}: {
  autoEscape?: boolean,
  caseSensitive?: boolean,
  sanitize?: typeof defaultSanitize,
  searchWords: Array<string>,
  textToHighlight: string,
}): Array<Chunk> => {
  textToHighlight = sanitize(textToHighlight)

  return searchWords
    .filter(searchWord => searchWord)
    .reduce((chunks: Array<Chunk>, searchWord) => {
      searchWord = sanitize(searchWord)

      if (autoEscape) {
        searchWord = escapeRegExpFn(searchWord)
      }

      const regex = new RegExp(searchWord, caseSensitive ? 'g' : 'gi')

      let match
      while ((match = regex.exec(textToHighlight))) {
        let start = match.index
        let end = regex.lastIndex
        if (end > start) {
          chunks.push({ highlight: false, start, end })
        }
        if (match.index === regex.lastIndex) {
          regex.lastIndex++
        }
      }

      return chunks
    }, [])
}
const fillInChunks = ({
  chunksToHighlight,
  totalLength
}: {
  chunksToHighlight: Array<Chunk>,
  totalLength: number,
}): Array<Chunk> => {
  const allChunks: Array<Chunk> = []
  const append = (start: number, end: number, highlight: boolean) => {
    if (end - start > 0) {
      allChunks.push({
        start,
        end,
        highlight
      })
    }
  }

  if (chunksToHighlight.length === 0) {
    append(0, totalLength, false)
  } else {
    let lastIndex = 0
    chunksToHighlight.forEach((chunk) => {
      append(lastIndex, chunk.start, false)
      append(chunk.start, chunk.end, true)
      lastIndex = chunk.end
    })
    append(lastIndex, totalLength, false)
  }
  return allChunks
}

function defaultSanitize(string: string): string {
  return string
}

function escapeRegExpFn(string: string): string {
  return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
}