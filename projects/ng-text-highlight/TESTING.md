# Testing ng-text-highlight

This document describes the testing setup and coverage for the ng-text-highlight library.

## Test Files

The following test files have been created:

### Component Tests
- `text-highlight.component.spec.ts` - Tests for the main TextHighlightComponent
  - Component creation and initialization
  - Input property handling
  - Text highlighting logic
  - Template rendering
  - Case sensitivity
  - Multiple keyword highlighting

### Service Tests
- `services/text-highlight.service.spec.ts` - Tests for the text highlighting service
  - Single and multiple match finding
  - Case sensitive/insensitive search
  - Overlapping matches
  - Special character handling
  - Edge cases (empty text, empty keywords)

### Module Tests
- `text-highlight.module.spec.ts` - Tests for the TextHighlightModule
  - Module creation
  - Component export verification

### Model Tests
- `models/models.spec.ts` - Tests for TypeScript interfaces
  - TextSegment interface validation
  - TextChunk interface validation

## Running Tests

### Prerequisites
- Node.js v18.19 or higher
- Angular CLI

### Commands

```bash
# Run all library tests
npm test -- --project=ng-text-highlight

# Run tests in watch mode
npm test -- --project=ng-text-highlight --watch

# Run tests with coverage
npm test -- --project=ng-text-highlight --code-coverage

# Run tests in headless mode (CI)
npm test -- --project=ng-text-highlight --watch=false --browsers=ChromeHeadless
```

## Test Coverage

The tests cover:

✅ **Component Functionality**
- Text highlighting with single/multiple keywords
- Case sensitive and insensitive search
- Custom CSS classes and inline styles
- Template rendering
- Input property validation

✅ **Service Logic**
- Text matching algorithms
- Regex pattern handling
- Chunk merging and filling
- Edge case handling

✅ **Module Integration**
- Standalone component usage
- Module-based usage

✅ **Type Safety**
- Interface compliance
- Model validation

## Test Structure

Each test file follows Angular testing best practices:
- Uses TestBed for component testing
- Includes setup and teardown
- Tests both positive and negative cases
- Covers edge cases and error conditions
- Uses descriptive test names and grouping

## Continuous Integration

The tests are designed to run in CI environments with:
- Headless Chrome browser
- No watch mode
- Coverage reporting
- Exit on completion
