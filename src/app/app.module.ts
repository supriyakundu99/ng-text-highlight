import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import "zone.js";
import { FormsModule } from "@angular/forms";
import { TextHighlighterModule } from "./text-highlighter/text-highlighter.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, TextHighlighterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
