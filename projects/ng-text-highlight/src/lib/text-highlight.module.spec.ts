import { TestBed } from '@angular/core/testing';
import { TextHighlightModule } from './text-highlight.module';
import { TextHighlightComponent } from './text-highlight.component';

describe('TextHighlightModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextHighlightModule]
    }).compileComponents();
  });

  it('should create module', () => {
    const module = new TextHighlightModule();
    expect(module).toBeTruthy();
  });

  it('should export TextHighlightComponent', () => {
    const fixture = TestBed.createComponent(TextHighlightComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
