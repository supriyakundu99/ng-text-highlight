import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-hero",
  imports: [],
  templateUrl: "./hero.component.html",
  styleUrl: "./hero.component.scss",
})
export class HeroComponent implements OnInit, OnDestroy {
  copied = false;
  badgeText = '';
  private fullBadgeText = 'Angular 19+ Compatible';
  private typingInterval: any;

  exampleCode = `<ng-text-highlight
  [fullText]="text"
  [keywords]="keywords"
  [highlightClass]="'highlight-blue'"
></ng-text-highlight>
  `;

  ngOnInit() {
    this.startTypingEffect();
  }

  ngOnDestroy() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
  }

  private startTypingEffect() {
    let index = 0;
    let isTyping = true;
    let pauseCount = 0;
    let targetBackspaceIndex = 0;
    
    this.typingInterval = setInterval(() => {
      if (isTyping) {
        if (index <= this.fullBadgeText.length) {
          this.badgeText = this.fullBadgeText.substring(0, index) + '<span class="typing-cursor">|</span>';
          index++;
        } else {
          pauseCount++;
          if (pauseCount > 30) { // Pause for ~3 seconds
            isTyping = false;
            pauseCount = 0;
            // Set random target for partial backspacing (keep some characters)
            const backspaceAmount = Math.floor(Math.random() * 8) + 5; // Delete 5-12 characters
            targetBackspaceIndex = Math.max(0, this.fullBadgeText.length - backspaceAmount);
          }
        }
      } else {
        if (index > targetBackspaceIndex) {
          // Random backspace with occasional pauses
          if (Math.random() > 0.8) {
            // 20% chance to pause while backspacing
            return;
          }
          index--;
          this.badgeText = this.fullBadgeText.substring(0, index) + '<span class="typing-cursor">|</span>';
        } else {
          pauseCount++;
          if (pauseCount > 5) { // Short pause before retyping
            isTyping = true;
            pauseCount = 0;
          }
        }
      }
    }, Math.random() * 100 + 50); // 50-150ms random typing speed
  }

  copyCommand() {
    navigator.clipboard.writeText("npm install ng-text-highlight");
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }
}
