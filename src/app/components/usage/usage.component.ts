import { AfterViewChecked, Component } from "@angular/core";
import { CodeExample } from "./usage.model";
import { NgClass, NgFor, NgIf } from "@angular/common";
import { HighlightService } from "src/app/services/highlight.service";

@Component({
  selector: "app-usage",
  imports: [NgIf, NgClass, NgFor],
  templateUrl: "./usage.component.html",
  styleUrl: "./usage.component.scss",
})
export class UsageComponent implements AfterViewChecked {
  tabs = ["Standalone Component", "Module Import"];
  activeTab = 0;

  standaloneExamples: CodeExample[] = [
    {
      title: "Import in Component",
      description:
        "Import TextHighlightComponent in your standalone component:",
      code: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextHighlightComponent } from 'ng-text-highlight';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [FormsModule, TextHighlightComponent],
  template: \`
    <div>
      <input [(ngModel)]="searchText" placeholder="Search...">
      <div *ngFor="let result of searchResults">
        <ng-text-highlight
          [fullText]="result.content"
          [keywords]="searchText.split(' ')"
          [highlightClass]="'highlight-blue'"
        ></ng-text-highlight>
      </div>
    </div>
  \`
})
export class SearchResultsComponent {
  searchText = '';
  searchResults = [
    { content: 'Angular is a platform for building web applications.' },
    { content: 'Text highlighting makes search results easier to scan.' }
  ];
}`,
      type: "typescript",
    },
    {
      title: "Basic Usage Example",
      description: "Simple example with a fixed list of keywords:",
      code: `<ng-text-highlight
  [fullText]="'This is an example of text highlighting in Angular applications.'"
  [keywords]="['text', 'highlighting', 'Angular']"
></ng-text-highlight>`,
      type: "html",
    },
    {
      title: "Custom Styling",
      description: "Apply custom inline styles to highlighted text:",
      code: `<ng-text-highlight
  [fullText]="longText"
  [keywords]="searchKeywords"
  [highlightStyle]="{ 
    'background-color': '#4285f4', 
    'color': 'white',
    'border-radius': '3px',
    'padding': '0 3px'
  }"
></ng-text-highlight>`,
      type: "html",
    },
  ];

  moduleExamples: CodeExample[] = [
    {
      title: "Import in Module",
      description: "Import TextHighlightModule in your Angular module:",
      code: `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TextHighlightModule } from 'ng-text-highlight';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    TextHighlightModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }`,
      type: "typescript",
    },
    {
      title: "Using in Component",
      description: "Use the component in your template:",
      code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
    <div>
      <h3>Search Results:</h3>
      <input [(ngModel)]="searchQuery" placeholder="Search terms...">
      
      <div *ngFor="let item of filteredItems">
        <h4>{{ item.title }}</h4>
        <ng-text-highlight
          [fullText]="item.description"
          [keywords]="searchQuery.split(' ')"
          [caseSensitive]="false"
          [highlightClass]="'highlight-green'"
        ></ng-text-highlight>
      </div>
    </div>
  \`
})
export class AppComponent {
  searchQuery = '';
  items = [
    { 
      title: 'Angular Development', 
      description: 'Learn about Angular components, services, and more.' 
    },
    { 
      title: 'Text Processing', 
      description: 'Techniques for efficient text processing in web apps.' 
    }
  ];
  
  get filteredItems() {
    if (!this.searchQuery.trim()) return this.items;
    
    const terms = this.searchQuery.toLowerCase().split(' ');
    return this.items.filter(item => {
      return terms.some(term => 
        item.title.toLowerCase().includes(term) || 
        item.description.toLowerCase().includes(term)
      );
    });
  }
}`,
      type: "typescript",
    },
    {
      title: "Case Sensitive Example",
      description: "Enable case-sensitive matching for specific use cases:",
      code: `<ng-text-highlight
  [fullText]="codeSnippet"
  [keywords]="['Class', 'function', 'return']"
  [caseSensitive]="true"
  [highlightClass]="'highlight-purple'"
></ng-text-highlight>`,
      type: "html",
    },
  ];

  highlighted = false;
  constructor(private highlightService: HighlightService) {}

  setActiveTab(index: number) {
    this.activeTab = index;
    setTimeout(() => {
      this.highlightService.highlightAll();
    });
  }

  ngAfterViewChecked() {
    if (!this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }
}
