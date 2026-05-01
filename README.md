# Voyage Privé Playwright BDD Tests

## Apart from the given technical stack, I have added below additional features for maintainability and scaling:

- **Fixtures** provide reusable objects like `loginPage` and `loginUsers`, keeping step definitions clean and avoiding shared mutable state.
- **dotenv** keeps environment-specific values outside the test code, so the same tests can run locally, in CI, or against another environment.
- **Cross-browser projects** in the Playwright config give confidence that core user journeys work in Chromium, Firefox, and WebKit.

The project can scale by keeping the same separation of responsibilities:

- Add one feature file per user journey or business area under `tests/features`.
- Add focused step definition files under `tests/steps`, grouped by feature or domain.
- Add one page object per screen or reusable component under `tests/pages`.
- Keep test data in `tests/data` and load environment-specific values through `.env` or CI secrets.
- Extend `tests/fixtures/test.ts` with shared pages, API clients, authenticated states, or domain helpers as the suite grows.
- Split Playwright projects by browser, device, locale, role, or environment when wider coverage is needed.
- Use CI retries, traces, screenshots, videos, and reports to debug failures without making local test code more complex.

This project is a Playwright test automation setup that uses `playwright-bdd` to run Gherkin feature files with the Playwright test runner.

The current suite tests Sauce Demo login behavior:

- Successful login with a valid user
- Failed login with an invalid user
- Execution across Chromium, Firefox, and WebKit

## Tech Stack

- Node.js
- npm
- Playwright
- Playwright-BDD
- TypeScript
- Gherkin
- dotenv 

## Project Structure

```text
.
├── .env.example
├── package.json
├── playwright.config.ts
├── tests
│   ├── data
│   │   └── login.data.ts
│   ├── features
│   │   └── login.feature
│   ├── fixtures
│   │   └── test.ts
│   ├── pages
│   │   └── login.page.ts
│   └── steps
│       └── login.steps.ts
└── README.md
```

## Important Concepts

### Feature File

The feature file is written in Gherkin and describes the business behavior in plain language.

Location:

```text
tests/features/login.feature
```

### Step Definitions

Step definitions connect each Gherkin step to Playwright code.

Location:

```text
tests/steps/login.steps.ts
```

### Page Object

The page object stores selectors, actions, and assertions for the login flow.

Location:

```text
tests/pages/login.page.ts
```

This keeps selectors out of step definitions and makes the tests easier to maintain.

### Test Data

Login test data is stored in one file.

Location:

```text
tests/data/login.data.ts
```

This avoids hard-coded credentials inside step definitions.

### Fixtures

Fixtures provide reusable objects to tests and steps.

Location:

```text
tests/fixtures/test.ts
```

The custom fixture currently provides:

- `loginPage`
- `loginUsers`

This removes the need for shared variables in step files.

## Prerequisites

Install these before running the project:

- Node.js 18 or newer
- npm

Check your versions:

```bash
node --version
npm --version
```

## Install The Project

From the project root, install dependencies:

```bash
npm install
```

Install Playwright browser binaries:

```bash
npx playwright install
```

## Environment Setup

Create a local `.env` file from the example:

```bash
cp .env.example .env
```

Add your own local values:

```env
BASE_URL=https://your-application-url.example/
STANDARD_USER=your_valid_username
INVALID_USER=your_invalid_username
SAUCE_PASSWORD=your_password
```

The `.env` file is ignored by git so local values do not get committed. Keep real credentials only in your local `.env` file or CI secrets.

## Run Tests

Run the full suite:

```bash
npm test
```

This command does two things:

1. Generates Playwright test files from Gherkin features with `bddgen`
2. Runs the generated tests with Playwright

Run only Chromium:

```bash
npm test -- --project=chromium
```

Run only Firefox:

```bash
npm test -- --project=firefox
```

Run only WebKit:

```bash
npm test -- --project=webkit
```

List tests without running browsers:

```bash
npm test -- --list
```

## View The HTML Report

After a test run, open the report:

```bash
npx playwright show-report
```

## Generated Files

`playwright-bdd` generates test files in:

```text
.features-gen/
```

That folder is ignored by git because it is generated from the feature files.

## How The Login Test Works

Flow:

1. `login.feature` describes the scenario.
2. `login.steps.ts` maps the scenario text to code.
3. `test.ts` provides the `loginPage` and `loginUsers` fixtures.
4. `login.data.ts` reads users from `.env`.
5. `login.page.ts` performs login actions and assertions.
6. Playwright runs the generated tests in each configured browser.

## Add A New Scenario

1. Add a new scenario to a `.feature` file in `tests/features`.
2. Add matching step definitions in `tests/steps`.
3. Put reusable selectors/actions in a page object under `tests/pages`.
4. Put reusable data in `tests/data`.
5. Run:

```bash
npm test
```

## Troubleshooting

### Tests are not discovered

Run:

```bash
npm test -- --list
```

If the scenario is missing, check:

- The feature file is under `tests/features`
- The step text exactly matches the feature text
- The fixture file is included in `playwright.config.ts`

### Browser binaries are missing

Run:

```bash
npx playwright install
```

### Environment values are not loading

Check that `.env` exists in the project root and contains:

```env
BASE_URL=https://your-application-url.example/
STANDARD_USER=your_valid_username
INVALID_USER=your_invalid_username
SAUCE_PASSWORD=your_password
```

### HTML report is stale

Delete the old report folder or run tests again:

```bash
npm test
```

## Current Test Result

The full suite was verified successfully:

```text
6 passed
```
