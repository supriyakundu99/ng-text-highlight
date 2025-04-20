import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import "zone.js";
import { FeatureComponent } from "./components/feature/feature.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { HeroComponent } from "./components/hero/hero.component";
import { StylesComponent } from "./components/styles/styles.component";
import { UsageComponent } from "./components/usage/usage.component";
import { DemoComponent } from "./components/demo/demo.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FeatureComponent,
    FooterComponent,
    HeaderComponent,
    HeroComponent,
    StylesComponent,
    UsageComponent,
    DemoComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
