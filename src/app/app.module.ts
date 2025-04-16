import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import "zone.js";
import { FormsModule } from "@angular/forms";
import { TextHighlighterComponent } from 'ng-text-highlighter';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, TextHighlighterComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
