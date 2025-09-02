import { TextSegment } from './text-segment';
import { TextChunk } from './text-chunk';

describe('Models', () => {
  describe('TextSegment', () => {
    it('should create TextSegment with required properties', () => {
      const segment: TextSegment = {
        text: 'Hello world',
        isHighlighted: true
      };

      expect(segment.text).toBe('Hello world');
      expect(segment.isHighlighted).toBe(true);
    });

    it('should create TextSegment with unhighlighted text', () => {
      const segment: TextSegment = {
        text: 'Normal text',
        isHighlighted: false
      };

      expect(segment.text).toBe('Normal text');
      expect(segment.isHighlighted).toBe(false);
    });
  });

  describe('TextChunk', () => {
    it('should create TextChunk with required properties', () => {
      const chunk: TextChunk = {
        highlight: true,
        start: 0,
        end: 5
      };

      expect(chunk.highlight).toBe(true);
      expect(chunk.start).toBe(0);
      expect(chunk.end).toBe(5);
    });

    it('should create TextChunk for unhighlighted text', () => {
      const chunk: TextChunk = {
        highlight: false,
        start: 10,
        end: 20
      };

      expect(chunk.highlight).toBe(false);
      expect(chunk.start).toBe(10);
      expect(chunk.end).toBe(20);
    });
  });
});
