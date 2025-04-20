import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import "zone.js";
import { FormsModule } from "@angular/forms";
import { TextHighlightComponent } from "ng-text-highlight";
import { FeatureComponent } from "./components/feature/feature.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { HeroComponent } from "./components/hero/hero.component";
import { StylesComponent } from "./components/styles/styles.component";
import { UsageComponent } from "./components/usage/usage.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    TextHighlightComponent,
    FeatureComponent,
    FooterComponent,
    HeaderComponent,
    HeroComponent,
    StylesComponent,
    UsageComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
