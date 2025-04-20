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
  sampleText =
    "This example shows the Angular text highlight style with customized appearance.";

  styles: StyleExample[] = [
    {
      name: "Default (Yellow)",
      class: "highlight",
      description:
        "The default yellow highlight style, providing good contrast for most backgrounds.",
    },
    {
      name: "Green Highlight",
      class: "highlight-green",
      description:
        "A soft green highlight that works well for success-related or positive content.",
    },
    {
      name: "Blue Highlight",
      class: "highlight-blue",
      description: `'A light blue highlight that's subtle and professional.`,
    },
    {
      name: "Red Highlight",
      class: "highlight-red",
      description:
        "A bold red highlight with white text for maximum emphasis and attention.",
    },
    {
      name: "Purple Highlight",
      class: "highlight-purple",
      description:
        "A purple highlight with italic text styling for a unique appearance.",
    },
    {
      name: "Orange Highlight",
      class: "highlight-orange",
      description:
        "A warm orange highlight that stands out without being too harsh.",
    },
  ];

  customHtml = `<ng-text-highlight
  [fullText]="sampleText"
  [keywords]="['Angular', 'highlight']"
  [highlightStyle]="{ 
    'background-color': 'lightblue', 
    'color': 'black', 
    'font-weight': 'bold' 
  }"
></ng-text-highlight>
  `;
  customStyle = {
    "background-color": "rgba(66, 133, 244, 0.3)",
    color: "white",
    "border-radius": "3px",
    padding: "0 4px",
    "font-weight": "bold",
    "box-shadow": "0 1px 2px rgba(0,0,0,0.2)",
  };
}
