import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { TextHighlightComponent } from './text-highlight.component';

describe('TextHighlightComponent', () => {
  let component: TextHighlightComponent;
  let fixture: ComponentFixture<TextHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextHighlightComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TextHighlightComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should call generateHighlightedSegments when inputs change', () => {
      spyOn(component, 'generateHighlightedSegments');
      component.ngOnChanges({});
      expect(component.generateHighlightedSegments).toHaveBeenCalled();
    });
  });

  describe('generateHighlightedSegments', () => {
    it('should create unhighlighted segment when no keywords provided', () => {
      component.fullText = 'Hello world';
      component.keywords = [];
      component.generateHighlightedSegments();

      expect(component.highlightedSegments).toEqual([{
        text: 'Hello world',
        isHighlighted: false
      }]);
    });

    it('should create unhighlighted segment when keywords is undefined', () => {
      component.fullText = 'Hello world';
      component.keywords = undefined as any;
      component.generateHighlightedSegments();

      expect(component.highlightedSegments).toEqual([{
        text: 'Hello world',
        isHighlighted: false
      }]);
    });

    it('should highlight single keyword', () => {
      component.fullText = 'Hello world';
      component.keywords = ['world'];
      component.generateHighlightedSegments();

      expect(component.highlightedSegments).toEqual([
        { text: 'Hello ', isHighlighted: false },
        { text: 'world', isHighlighted: true }
      ]);
    });

    it('should highlight multiple keywords', () => {
      component.fullText = 'Hello beautiful world';
      component.keywords = ['Hello', 'world'];
      component.generateHighlightedSegments();

      expect(component.highlightedSegments).toEqual([
        { text: 'Hello', isHighlighted: true },
        { text: ' beautiful ', isHighlighted: false },
        { text: 'world', isHighlighted: true }
      ]);
    });

    it('should handle case insensitive search by default', () => {
      component.fullText = 'Hello World';
      component.keywords = ['hello', 'WORLD'];
      component.caseSensitive = false;
      component.generateHighlightedSegments();

      expect(component.highlightedSegments).toEqual([
        { text: 'Hello', isHighlighted: true },
        { text: ' ', isHighlighted: false },
        { text: 'World', isHighlighted: true }
      ]);
    });

    it('should handle case sensitive search', () => {
      component.fullText = 'Hello World';
      component.keywords = ['hello', 'World'];
      component.caseSensitive = true;
      component.generateHighlightedSegments();

      expect(component.highlightedSegments).toEqual([
        { text: 'Hello ', isHighlighted: false },
        { text: 'World', isHighlighted: true }
      ]);
    });

    it('should handle overlapping keywords', () => {
      component.fullText = 'testing test';
      component.keywords = ['test', 'testing'];
      component.generateHighlightedSegments();

      expect(component.highlightedSegments).toEqual([
        { text: 'testing', isHighlighted: true },
        { text: ' ', isHighlighted: false },
        { text: 'test', isHighlighted: true }
      ]);
    });

    it('should handle empty text', () => {
      component.fullText = '';
      component.keywords = ['test'];
      component.generateHighlightedSegments();

      expect(component.highlightedSegments).toEqual([]);
    });
  });

  describe('template rendering', () => {
    it('should render highlighted and normal text correctly', () => {
      component.fullText = 'Hello world';
      component.keywords = ['world'];
      component.highlightClass = 'custom-highlight';
      component.generateHighlightedSegments();
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const highlightedSpan = compiled.querySelector('.custom-highlight');
      
      expect(highlightedSpan).toBeTruthy();
      expect(highlightedSpan.textContent).toBe('world');
      expect(compiled.textContent).toBe('Hello world');
    });

    it('should apply custom styles', () => {
      component.fullText = 'Hello world';
      component.keywords = ['world'];
      component.highlightStyle = { 'background-color': 'yellow', 'color': 'red' };
      component.generateHighlightedSegments();
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const highlightedSpan = compiled.querySelector('span[ng-reflect-ng-style]');
      
      expect(highlightedSpan).toBeTruthy();
    });
  });

  describe('input properties', () => {
    it('should have default values', () => {
      expect(component.fullText).toBe('');
      expect(component.caseSensitive).toBe(false);
      expect(component.highlightClass).toBe('highlight');
      expect(component.highlightStyle).toEqual({});
    });

    it('should accept custom highlight class', () => {
      component.highlightClass = 'my-custom-class';
      expect(component.highlightClass).toBe('my-custom-class');
    });

    it('should accept custom highlight styles', () => {
      const customStyles = { 'font-weight': 'bold', 'color': 'blue' };
      component.highlightStyle = customStyles;
      expect(component.highlightStyle).toEqual(customStyles);
    });
  });
});
