import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import "zone.js";
import { TextHighlighterComponent } from "./text-highlighter/text-highlighter.component";
import { FormsModule, NgModel } from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, TextHighlighterComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
