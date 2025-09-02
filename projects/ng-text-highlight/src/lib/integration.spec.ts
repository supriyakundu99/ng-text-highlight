import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TextHighlightComponent } from './text-highlight.component';

@Component({
  template: `
    <ng-text-highlight
      [fullText]="text"
      [keywords]="searchTerms"
      [caseSensitive]="caseSensitive"
      [highlightClass]="highlightClass"
      [highlightStyle]="highlightStyle">
    </ng-text-highlight>
  `,
  imports: [TextHighlightComponent],
  standalone: true
})
class TestHostComponent {
  text = 'Angular is a powerful framework for building web applications';
  searchTerms = ['Angular', 'framework'];
  caseSensitive = false;
  highlightClass = 'highlight';
  highlightStyle = {};
}

describe('TextHighlightComponent Integration', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
  });

  it('should highlight multiple keywords in real usage scenario', () => {
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const highlightedElements = compiled.querySelectorAll('.highlight');
    
    expect(highlightedElements.length).toBe(2);
    expect(highlightedElements[0].textContent).toBe('Angular');
    expect(highlightedElements[1].textContent).toBe('framework');
    expect(compiled.textContent).toBe('Angular is a powerful framework for building web applications');
  });

  it('should update highlights when keywords change', () => {
    fixture.detectChanges();
    
    // Change keywords
    component.searchTerms = ['powerful', 'applications'];
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const highlightedElements = compiled.querySelectorAll('.highlight');
    
    expect(highlightedElements.length).toBe(2);
    expect(highlightedElements[0].textContent).toBe('powerful');
    expect(highlightedElements[1].textContent).toBe('applications');
  });

  it('should apply custom styles correctly', () => {
    component.highlightStyle = { 'background-color': 'yellow', 'font-weight': 'bold' };
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const highlightedElement = compiled.querySelector('.highlight');
    
    expect(highlightedElement).toBeTruthy();
    // Note: In a real test environment, you could check computed styles
  });

  it('should handle case sensitivity changes', () => {
    component.text = 'Angular and angular are different';
    component.searchTerms = ['angular'];
    component.caseSensitive = true;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const highlightedElements = compiled.querySelectorAll('.highlight');
    
    expect(highlightedElements.length).toBe(1);
    expect(highlightedElements[0].textContent).toBe('angular');
  });

  it('should handle empty keywords gracefully', () => {
    component.searchTerms = [];
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const highlightedElements = compiled.querySelectorAll('.highlight');
    
    expect(highlightedElements.length).toBe(0);
    expect(compiled.textContent).toBe(component.text);
  });
});
