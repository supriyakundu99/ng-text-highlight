import { NgClass } from "@angular/common";
import { Component, HostListener } from "@angular/core";

@Component({
  selector: "app-header",
  imports: [NgClass],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  isScrolled = false;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }
}
