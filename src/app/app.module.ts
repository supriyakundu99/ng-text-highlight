import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import "zone.js";
import { FormsModule } from "@angular/forms";
import { TextHighlightComponent } from 'ng-text-highlight';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, TextHighlightComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
