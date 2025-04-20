import { Component } from "@angular/core";

@Component({
  selector: "app-hero",
  imports: [],
  templateUrl: "./hero.component.html",
  styleUrl: "./hero.component.scss",
})
export class HeroComponent {
  copied = false;

  copyCommand() {
    navigator.clipboard.writeText("npm install ng-text-highlight");
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }
}
