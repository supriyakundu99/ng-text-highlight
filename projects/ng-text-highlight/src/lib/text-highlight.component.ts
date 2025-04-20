import { NgClass, NgFor, NgIf, NgStyle } from "@angular/common";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { TextSegment } from "./models/text-segment";
import { findAllMatches } from "./services/text-highlight.service";
import { TextChunk } from "./models/text-chunk";

/**
 * TextHighlightComponent
 * A standalone Angular component that highlights specified keywords within a block of text.
 */
@Component({
  selector: "ng-text-highlight",
  templateUrl: "./text-highlight.component.html",
  styleUrls: ["./text-highlight.component.scss"],
  imports: [NgFor, NgIf, NgClass, NgStyle],
  standalone: true,
})
export class TextHighlightComponent implements OnChanges {
  /**
   * The main text where keywords will be highlighted.
   */
  @Input() fullText = "";

  /**
   * List of keywords to highlight in the text.
   */
  @Input() keywords!: Array<string>;

  /**
   * Whether the search should be case-sensitive.
   */
  @Input() caseSensitive: boolean = false;

  /**
   * Custom CSS class for highlighted text.
   */
  @Input() highlightClass: string = "highlight";

  /**
   * Inline styles for highlighted text.
   */
  @Input() highlightStyle: { [key: string]: string } = {};

  /**
   * Array of text segments, each representing a portion of the text
   * with information about whether it is highlighted.
   */
  highlightedSegments!: Array<TextSegment>;

  /**
   * Lifecycle hook that is triggered when any data-bound property changes.
   * Calls the method to generate highlighted segments.
   * @param changes - The changes to the input properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.generateHighlightedSegments();
  }

  /**
   * Generates the highlighted segments of the text based on the provided keywords.
   * If no keywords are provided, the entire text is treated as unhighlighted.
   */
  generateHighlightedSegments(): void {
    this.highlightedSegments = [];
    if (!this.keywords || this.keywords.length === 0) {
      this.highlightedSegments = [
        {
          text: this.fullText,
          isHighlighted: false,
        },
      ];
      return;
    }

    // Find all matching chunks in the text
    const textChunks = findAllMatches({
      searchWords: this.keywords,
      textToSearch: this.fullText,
      autoEscape: true,
      caseSensitive: this.caseSensitive,
    });

    // Map chunks to highlighted segments
    textChunks.forEach((chunk: TextChunk) => {
      const { end, highlight, start } = chunk;
      const segmentText = this.fullText.substring(start, end);
      this.highlightedSegments.push({
        text: segmentText,
        isHighlighted: highlight,
      });
    });
  }
}
