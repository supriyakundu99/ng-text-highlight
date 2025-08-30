# ng-text-highlight

<div align="center">
  <img src="https://github.com/supriyakundu99/ng-text-highlight/blob/main/src/assets/icon.svg" alt="ng-text-highlight logo" width="200">
</div>

🔍 A lightweight Angular standalone component to highlight search keywords within a block of text.

🌐 **Homepage**: [https://ng-text-highlight.web.app/](https://ng-text-highlight.web.app/)

[![npm version](https://badge.fury.io/js/ng-text-highlight.svg)](https://www.npmjs.com/package/ng-text-highlight)
[![Downloads](https://img.shields.io/npm/dm/ng-text-highlight.svg)](https://www.npmjs.com/package/ng-text-highlight)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Why Choose ng-text-highlight?

- **🎯 Perfect for Search Results**: Highlight search terms in search results, documentation, and content
- **⚡ Lightweight & Fast**: Minimal bundle size with optimal performance
- **🎨 Fully Customizable**: Custom CSS classes, inline styles, and prebuilt themes
- **🔧 Easy Integration**: Works with Angular 14+ as standalone component or module
- **📱 Mobile Friendly**: Responsive design that works on all devices
- **🔍 Smart Search**: Case-sensitive/insensitive search with multiple keyword support
- **♿ Accessible**: Built with accessibility best practices

## 🎯 Use Cases

- **Search Results**: Highlight search terms in search result pages
- **Documentation**: Highlight keywords in help articles and documentation
- **Content Filtering**: Visual feedback for filtered content
- **Code Editors**: Syntax highlighting and keyword emphasis
- **E-commerce**: Highlight product features and specifications
- **Educational Apps**: Emphasize important terms in learning materials

---

## 📦 Installation

```bash
npm install ng-text-highlight
```

---

## 🚀 Usage

You can use `TextHighlightComponent` in **two ways**:

---

### ✅ Option 1: Import as a **Standalone Component**

If you're using Angular 14+ and prefer standalone components:

```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { TextHighlightComponent } from "ng-text-highlight";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, TextHighlightComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

**Template Example:**

```html
<div>
  <h4>Highlighted Text:</h4>
  <ng-text-highlight
    [fullText]="sampleText"
    [keywords]="sampleSearchText.split(' ')"
  >
  </ng-text-highlight>
</div>
```

---

### ✅ Option 2: Import via Module (`TextHighlightModule`)

If you prefer using Angular modules:

```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { TextHighlightModule } from "ng-text-highlight";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, TextHighlightModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

**Template Example:**

```html
<div>
  <h4>Highlighted Text:</h4>
  <ng-text-highlight
    [fullText]="sampleText"
    [keywords]="['Angular', 'text', 'highlight']"
  >
  </ng-text-highlight>
</div>
```

---

## 🧠 Inputs

| Input            | Type                        | Description                                                                   |
| ---------------- | --------------------------- | ----------------------------------------------------------------------------- |
| `fullText`       | `string`                    | The main text where keywords will be highlighted                              |
| `keywords`       | `string[]`                  | List of keywords to highlight                                                 |
| `caseSensitive`  | `boolean`                   | Whether the search should be case-sensitive (default: `false`)                |
| `highlightClass` | `string`                    | Custom CSS class for highlighted text (default: `'highlight'`)                |
| `highlightStyle` | `{ [key: string]: string }` | Inline styles for highlighted text (e.g., `{ 'background-color': 'yellow' }`) |

---

## 🎨 Prebuilt Styles

The following prebuilt styles are available for quick use:

| Class Name         | Description                       |
| ------------------ | --------------------------------- |
| `highlight`        | Default yellow highlight          |
| `highlight-green`  | Light green highlight             |
| `highlight-blue`   | Light blue highlight              |
| `highlight-red`    | Red highlight with white text     |
| `highlight-purple` | Purple highlight with italic text |
| `highlight-orange` | Orange highlight                  |

**Example Usage:**

```html
<ng-text-highlight
  [fullText]="sampleText"
  [keywords]="['Angular', 'highlight']"
  [highlightClass]="'highlight-green'"
></ng-text-highlight>
```

---

## 🎨 Custom Inline Styles

You can also pass custom inline styles using the `highlightStyle` input:

**Example Usage:**

```html
<ng-text-highlight
  [fullText]="sampleText"
  [keywords]="['Angular', 'highlight']"
  [highlightStyle]="{ 'background-color': 'lightblue', 'color': 'black', 'font-weight': 'bold' }"
></ng-text-highlight>
```

---

## 📄 License

This package is licensed under the MIT License. See the [LICENSE](./projects/ng-text-highlight/LICENSE) file for details.

---

## 📸 Example Output

Below is an example of how the `ng-text-highlight` component highlights text:

![Highlighted Text Example](https://github.com/supriyakundu99/ng-text-highlight/blob/main/assets/Example.png)

---

## ⭐ Support

Give this repo a ⭐ if you find it useful!
