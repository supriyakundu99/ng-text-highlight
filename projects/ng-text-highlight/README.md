# ng-text-highlight

🔍 A lightweight Angular standalone component to highlight search keywords within a block of text.

---

## 📦 Installation

```bash
npm install ng-text-highlight
```

---

## 🚀 Usage

You can use `TextHighlighterComponent` in **two ways**:

---

### ✅ Option 1: Import as a **Standalone Component**

If you're using Angular 14+ and prefer standalone components:

```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { TextHighlighterComponent } from 'ng-text-highlight';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, TextHighlighterComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

**Template Example:**

```html
<div>
  <h4>Highlighted Text:</h4>
  <ng-text-highlight
    [textToHighlight]="sampleText"
    [searchKeywords]="sampleSearchText.split(' ')">
  </ng-text-highlight>
</div>
```

---

### ✅ Option 2: Import via Module (`TextHighlighterModule`)

If you prefer using Angular modules:

```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { TextHighlighterModule } from 'ng-text-highlight';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, TextHighlighterModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

**Template Example:**

```html
<div>
  <h4>Highlighted Text:</h4>
  <ng-text-highlight
    [textToHighlight]="sampleText"
    [searchKeywords]="['Angular', 'text', 'highlight']">
  </ng-text-highlight>
</div>
```

---

## 🧠 Inputs

| Input             | Type       | Description                                      |
|-------------------|------------|--------------------------------------------------|
| `textToHighlight` | `string`   | The main text where keywords will be highlighted |
| `searchKeywords`  | `string[]` | List of keywords to highlight                    |

---

## 📄 License

MIT © [Supriya Kundu](https://github.com/supriyakundu99)

---

## ⭐ Support

Give this repo a ⭐ if you find it useful!
