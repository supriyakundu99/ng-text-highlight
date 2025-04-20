# ng-text-highlight

🔍 A lightweight Angular standalone component to highlight search keywords within a block of text.

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

| Input      | Type       | Description                                      |
| ---------- | ---------- | ------------------------------------------------ |
| `fullText` | `string`   | The main text where keywords will be highlighted |
| `keywords` | `string[]` | List of keywords to highlight                    |

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
