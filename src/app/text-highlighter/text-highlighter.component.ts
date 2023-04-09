import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { findAll } from 'highlight-words-core';

@Component({
  selector: 'app-text-highlighter',
  templateUrl: './text-highlighter.component.html',
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
      const {end, highlight, start} = chunk;
      const text = this.textToHighlight.substring(start, end);
      if(highlight){
        this.subtexts.push({text, isMarked: true});
      } else {
        this.subtexts.push({text, isMarked: false});
      }
    });
  }

}

interface Subtext {
  text: string;
  isMarked: boolean;
}