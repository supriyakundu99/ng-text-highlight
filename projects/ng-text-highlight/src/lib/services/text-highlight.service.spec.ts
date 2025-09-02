import { findAllMatches } from './text-highlight.service';
import { TextChunk } from '../models/text-chunk';

describe('TextHighlightService', () => {
  describe('findAllMatches', () => {
    it('should find single match', () => {
      const result = findAllMatches({
        searchWords: ['test'],
        textToSearch: 'This is a test string',
        caseSensitive: false,
        autoEscape: true
      });

      expect(result).toEqual([
        { start: 0, end: 10, highlight: false },
        { start: 10, end: 14, highlight: true },
        { start: 14, end: 21, highlight: false }
      ]);
    });

    it('should find multiple matches', () => {
      const result = findAllMatches({
        searchWords: ['test', 'string'],
        textToSearch: 'This test is a test string',
        caseSensitive: false,
        autoEscape: true
      });

      expect(result).toEqual([
        { start: 0, end: 5, highlight: false },
        { start: 5, end: 9, highlight: true },
        { start: 9, end: 15, highlight: false },
        { start: 15, end: 19, highlight: true },
        { start: 19, end: 20, highlight: false },
        { start: 20, end: 26, highlight: true }
      ]);
    });

    it('should handle case sensitive search', () => {
      const result = findAllMatches({
        searchWords: ['Test'],
        textToSearch: 'This Test is a test',
        caseSensitive: true,
        autoEscape: true
      });

      expect(result).toEqual([
        { start: 0, end: 5, highlight: false },
        { start: 5, end: 9, highlight: true },
        { start: 9, end: 19, highlight: false }
      ]);
    });

    it('should handle case insensitive search', () => {
      const result = findAllMatches({
        searchWords: ['test'],
        textToSearch: 'This Test is a TEST',
        caseSensitive: false,
        autoEscape: true
      });

      expect(result).toEqual([
        { start: 0, end: 5, highlight: false },
        { start: 5, end: 9, highlight: true },
        { start: 9, end: 15, highlight: false },
        { start: 15, end: 19, highlight: true }
      ]);
    });

    it('should handle overlapping matches', () => {
      const result = findAllMatches({
        searchWords: ['test', 'testing'],
        textToSearch: 'testing',
        caseSensitive: false,
        autoEscape: true
      });

      expect(result).toEqual([
        { start: 0, end: 7, highlight: true }
      ]);
    });

    it('should handle empty search words', () => {
      const result = findAllMatches({
        searchWords: [],
        textToSearch: 'This is a test',
        caseSensitive: false,
        autoEscape: true
      });

      expect(result).toEqual([
        { start: 0, end: 14, highlight: false }
      ]);
    });

    it('should handle empty text', () => {
      const result = findAllMatches({
        searchWords: ['test'],
        textToSearch: '',
        caseSensitive: false,
        autoEscape: true
      });

      expect(result).toEqual([]);
    });

    it('should filter out empty search words', () => {
      const result = findAllMatches({
        searchWords: ['test', '', 'word'],
        textToSearch: 'test word',
        caseSensitive: false,
        autoEscape: true
      });

      expect(result).toEqual([
        { start: 0, end: 4, highlight: true },
        { start: 4, end: 5, highlight: false },
        { start: 5, end: 9, highlight: true }
      ]);
    });

    it('should handle special regex characters when autoEscape is true', () => {
      const result = findAllMatches({
        searchWords: ['test.'],
        textToSearch: 'test. and test',
        caseSensitive: false,
        autoEscape: true
      });

      expect(result).toEqual([
        { start: 0, end: 5, highlight: true },
        { start: 5, end: 14, highlight: false }
      ]);
    });

    it('should handle regex patterns when autoEscape is false', () => {
      const result = findAllMatches({
        searchWords: ['test.'],
        textToSearch: 'test. and testa',
        caseSensitive: false,
        autoEscape: false
      });

      // Should match both 'test.' and 'testa' because . is treated as regex wildcard
      expect(result.length).toBeGreaterThan(2);
    });

    it('should handle adjacent matches', () => {
      const result = findAllMatches({
        searchWords: ['ab', 'bc'],
        textToSearch: 'abc',
        caseSensitive: false,
        autoEscape: true
      });

      expect(result).toEqual([
        { start: 0, end: 3, highlight: true }
      ]);
    });

    it('should handle repeated patterns', () => {
      const result = findAllMatches({
        searchWords: ['a'],
        textToSearch: 'aaa',
        caseSensitive: false,
        autoEscape: true
      });

      expect(result).toEqual([
        { start: 0, end: 3, highlight: true }
      ]);
    });
  });
});
