import { Component } from "@angular/core";
import { StyleExample } from "./styles.model";
import { NgFor } from "@angular/common";
import { TextHighlightComponent } from "ng-text-highlight";

@Component({
  selector: "app-styles",
  imports: [NgFor, TextHighlightComponent],
  templateUrl: "./styles.component.html",
  styleUrl: "./styles.component.scss",
})
export class StylesComponent {
  sampleText = "This example shows the Angular text highlight style with customized appearance.";
  customCodeCopied = false;
  styleCopiedStates: boolean[] = [];

  stylingTips = [
    {
      icon: '🎯',
      title: 'Contrast Matters',
      description: 'Ensure sufficient color contrast between highlight background and text for readability.'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Test your highlight styles on mobile devices to ensure they remain visible and accessible.'
    },
    {
      icon: '🔧',
      title: 'CSS Variables',
      description: 'Use CSS custom properties to create consistent theming across your application.'
    },
    {
      icon: '⚡',
      title: 'Performance',
      description: 'Prefer CSS classes over inline styles for better performance with many highlights.'
    }
  ];

  styles: StyleExample[] = [
    {
      name: "Default (Yellow)",
      class: "highlight",
      description: "The default yellow highlight style, providing good contrast for most backgrounds.",
    },
    {
      name: "Green Highlight",
      class: "highlight-green",
      description: "A soft green highlight that works well for success-related or positive content.",
    },
    {
      name: "Blue Highlight",
      class: "highlight-blue",
      description: "A light blue highlight that's subtle and professional.",
    },
    {
      name: "Red Highlight",
      class: "highlight-red",
      description: "A bold red highlight with white text for maximum emphasis and attention.",
    },
    {
      name: "Purple Highlight",
      class: "highlight-purple",
      description: "A purple highlight with italic text styling for a unique appearance.",
    },
    {
      name: "Orange Highlight",
      class: "highlight-orange",
      description: "A warm orange highlight that stands out without being too harsh.",
    },
  ];

  customHtml = `<ng-text-highlight
  [fullText]="sampleText"
  [keywords]="['Angular', 'highlight']"
  [highlightStyle]="{ 
    'background-color': 'rgba(66, 133, 244, 0.3)', 
    'color': 'white', 
    'border-radius': '3px',
    'padding': '0 4px',
    'font-weight': 'bold',
    'box-shadow': '0 1px 2px rgba(0,0,0,0.2)'
  }"
></ng-text-highlight>`;

  customStyle = {
    "background-color": "rgba(66, 133, 244, 0.3)",
    color: "white",
    "border-radius": "3px",
    padding: "0 4px",
    "font-weight": "bold",
    "box-shadow": "0 1px 2px rgba(0,0,0,0.2)",
  };

  constructor() {
    this.styleCopiedStates = new Array(this.styles.length).fill(false);
  }

  getStyleColor(styleClass: string): string {
    const colorMap: { [key: string]: string } = {
      'highlight': '#FFEB3B',
      'highlight-green': '#4CAF50',
      'highlight-blue': '#2196F3',
      'highlight-red': '#F44336',
      'highlight-purple': '#9C27B0',
      'highlight-orange': '#FF9800'
    };
    return colorMap[styleClass] || '#FFEB3B';
  }

  copyStyleClass(styleClass: string) {
    navigator.clipboard.writeText(styleClass).then(() => {
      const index = this.styles.findIndex(s => s.class === styleClass);
      if (index !== -1) {
        this.styleCopiedStates[index] = true;
        setTimeout(() => {
          this.styleCopiedStates[index] = false;
        }, 2000);
      }
    });
  }

  getStyleCopyText(index: number): string {
    return this.styleCopiedStates[index] ? 'Copied!' : 'Copy';
  }

  copyCustomCode() {
    navigator.clipboard.writeText(this.customHtml).then(() => {
      this.customCodeCopied = true;
      setTimeout(() => {
        this.customCodeCopied = false;
      }, 2000);
    });
  }
}
