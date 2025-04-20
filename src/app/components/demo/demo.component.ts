import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TextHighlightComponent } from "ng-text-highlight";

@Component({
  selector: "app-demo",
  imports: [TextHighlightComponent, FormsModule],
  templateUrl: "./demo.component.html",
  styleUrl: "./demo.component.scss",
})
export class DemoComponent {
  sampleText = `ng-text-highlight is a lightweight Angular component that makes it easy to highlight keywords within text. It supports case-sensitive matching, custom styling, and works with both Angular modules and standalone components. You can customize the highlight appearance using CSS classes or inline styles. The package is designed to be simple yet powerful, perfect for search results, documentation, or any text that needs emphasis on specific terms.`;

  keywordsInput = "Angular component highlight";
  keywords: string[] = [];
  caseSensitive = false;
  selectedHighlightClass = "highlight";

  ngOnInit() {
    this.updateKeywords();
  }

  updateKeywords() {
    this.keywords = this.keywordsInput
      .split(" ")
      .filter((keyword) => keyword.trim() !== "");
  }
}
