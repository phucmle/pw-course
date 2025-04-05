# Playwright Test Project

This repository contains automated tests using Playwright. Follow these instructions to set up and run the tests.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

### Run all tests

```bash
npm run test:all
```

### Run all tests in headed mode

```bash
npm run test:headed:all
```

### Run tests in UI mode

```bash
npm run test:ui
```

### Run a specific test file in debug mode

```bash
npm run test:debug example.spec.ts
```

### Run a specific test file in headed mode

```bash
npm run test:headed example.spec.ts
```

### Run cucumber tests

```bash
npm run test:cucumber
```

## Test Structure

```
├── tests/
│   ├── example.spec.ts
│   └── ...
├── playwright.config.ts
└── package.json
```

## Configuration

The project uses `playwright.config.ts` for test configuration. Key settings include:

- Browsers to test
- Timeout values
- Retry attempts
- Reporter settings

## Debugging Tips

1. Use the debug mode to step through tests:

```bash
npm run test:debug example.spec.ts
```

2. View test traces:

- Tests automatically capture traces on failure
- Find traces in `test-results/` directory

## Contributing

1. Create a new branch for your tests
2. Write tests following the existing patterns
3. Submit a pull request

## Useful Commands Reference

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all tests
npm run test:all

# Run specific test file in debug mode
npm run test:debug example.spec.ts

# Run tests in UI mode
npm run test:ui

# Generate test reports
npm run test:report
```

## Project Structure

```
project-root/
├── tests/                    # Test files directory
│   ├── e2e/                 # End-to-end tests
│   ├── api/                 # API tests
│   └── fixtures/            # Test fixtures
├── playwright.config.ts     # Playwright configuration
├── package.json            # Project dependencies and scripts
└── README.md              # Project documentation
```

## Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Test Examples](https://playwright.dev/docs/writing-tests)
