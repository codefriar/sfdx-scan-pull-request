# sfdx-scan-pull-request

Runs Salesforce Code Analyzer (v5) on a pull request and generates in-line comments or check-run annotations with the findings.

![Example](images/sfdx-scan-pull-request.png)

## Breaking Changes in v2.0

**Version 2.0 introduces breaking changes** to align with Salesforce Code Analyzer v5's config-based approach:

- **REQUIRED**: You must now provide a Code Analyzer configuration YAML file via the `code-analyzer-config` input
- **DEPRECATED**: The following inputs have been removed:
  - `engine` - Configure engines in your Code Analyzer config file
  - `pmdconfig` - Configure PMD rules in your Code Analyzer config file
  - `eslintconfig` - Configure ESLint in your Code Analyzer config file
  - `eslint-env` - Configure ESLint environment in your Code Analyzer config file
  - `tsconfig` - Configure TypeScript in your Code Analyzer config file
  - `category` - Configure rule categories in your Code Analyzer config file
  - `custom-pmd-rules` - Register custom rules in your Code Analyzer config file
  - `run-flow-scanner` - Flow scanner runs by default in Code Analyzer v5
  - `target` - The action now scans all files and filters results to changed lines only

## Inputs

### `code-analyzer-config` (REQUIRED)

Path to the Salesforce Code Analyzer configuration YAML file. This file defines which engines to run, which rules to apply, and what files to scan.

Example config file (`code-analyzer.yml`):

```yaml
engines:
  - name: pmd
    rules:
      - category: Best Practices
      - category: Security
  - name: eslint-lwc
  - name: retire-js

targets:
  - "force-app/main/default/**/*.cls"
  - "force-app/main/default/**/*.trigger"
  - "force-app/main/default/**/*.js"
```

For complete configuration options, see the [Salesforce Code Analyzer documentation](https://forcedotcom.github.io/sfdx-scanner/).

### `sarif-output-file`

Path where the SARIF output file will be generated. Defaults to `sfca-results.sarif`.

### `severity-threshold`

Integer threshold value which will throw an error when violations of specific severity (or more severe) are detected.

### `strictly-enforced-rules`

A JSON string which defines the rules which will be strictly enforced regardless of their priority. Enforced rules are identified by their engine, category, and rule name.

Example:

```json
[{ "engine": "pmd", "category": "Performance", "rule": "AvoidDebugStatements" }]
```

### `report-mode`

Details which way to report issues back to GitHub, can be either:

- `check-runs` - Shows findings as annotations on the PR (default)
- `comments` - Shows findings as comments

### `delete-resolved-comments`

When set to true, will delete resolved comments from a PR. Defaults to `false`. Will do nothing unless `report-mode` is set to `comments`.

### `max-number-of-comments`

Maximum number of comments to post before switching to an artifact. Defaults to `100`.

### `rate-limit-wait-time`

Time to wait (in milliseconds) before retrying after hitting the rate limit. Defaults to `60000` (1 minute).

### `rate-limit-retry-count`

Number of times to retry after hitting the rate limit. Defaults to `5`.

### `comment-batch-size`

Number of comments to post in a single batch. Defaults to `15`.

### `debug`

Set `true` to enable debug mode. Defaults to `false`.

### `export-sarif`

Set `true` to export the scan results in SARIF format to GitHub Code Scanning. Defaults to `false`.

## Example Usage

### Basic Example

```yaml
name: Static Analysis
on:
  pull_request:
    types: [opened, reopened, synchronize]
  workflow_dispatch:

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Setup Java 11
        uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '11'

      - name: Install Salesforce CLI and Code Analyzer
        run: |
          npm install @salesforce/cli -g
          sf plugins install code-analyzer

      - name: Run Salesforce Code Analyzer
        uses: mitchspano/sfdx-scan-pull-request@v2
        with:
          code-analyzer-config: '.github/code-analyzer.yml'
          severity-threshold: 3
          report-mode: 'check-runs'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Advanced Example with SARIF Export

```yaml
name: Static Analysis
on:
  pull_request:
    types: [opened, reopened, synchronize]

jobs:
  analyze:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
      security-events: write
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Setup Java 11
        uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '11'

      - name: Install Salesforce CLI and Code Analyzer
        run: |
          npm install @salesforce/cli -g
          sf plugins install code-analyzer

      - name: Run Salesforce Code Analyzer
        uses: mitchspano/sfdx-scan-pull-request@v2
        with:
          code-analyzer-config: '.github/code-analyzer.yml'
          sarif-output-file: 'scan-results.sarif'
          severity-threshold: 2
          strictly-enforced-rules: '[{ "engine": "pmd", "category": "Security", "rule": "ApexCRUDViolation" }]'
          report-mode: 'comments'
          delete-resolved-comments: 'true'
          export-sarif: 'true'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**Important Notes:**
- Code Analyzer v5 requires Java 11 or later for the PMD engine
- The action scans all files defined in your config, then filters results to only show violations in changed lines
- Flow scanner runs automatically in Code Analyzer v5 (no need to enable it separately)

## Sample Code Analyzer Configuration

Here's a comprehensive example of a Code Analyzer configuration file:

```yaml
# .github/code-analyzer.yml
engines:
  - name: pmd
    rules:
      - category: Best Practices
      - category: Code Style
      - category: Design
      - category: Documentation
      - category: Error Prone
      - category: Performance
      - category: Security

  - name: eslint-lwc

  - name: eslint
    config: .eslintrc.json

  - name: retire-js

  - name: cpd

targets:
  - "force-app/main/default/**/*.cls"
  - "force-app/main/default/**/*.trigger"
  - "force-app/main/default/**/*.js"
  - "force-app/main/default/**/*.html"
  - "force-app/main/default/**/*.xml"

exclude:
  - "**/node_modules/**"
  - "**/__tests__/**"
```

For more configuration options, refer to the [Salesforce Code Analyzer documentation](https://forcedotcom.github.io/sfdx-scanner/).

## Migration Guide from v1.x

If you're upgrading from v1.x, follow these steps:

1. **Create a Code Analyzer config file** (e.g., `.github/code-analyzer.yml`)
2. **Migrate your engine settings**:
   - Old: `engine: 'pmd,eslint,eslint-lwc'`
   - New: Define engines in your config file (see example above)
3. **Migrate PMD rules**:
   - Old: `pmdconfig: 'pmd-ruleset.xml'`
   - New: Reference your PMD ruleset in the config file or define rules inline
4. **Migrate ESLint config**:
   - Old: `eslintconfig: '.eslintrc.json'`
   - New: Reference in config file: `config: .eslintrc.json` under the eslint engine
5. **Update your workflow**:
   - Replace old inputs with `code-analyzer-config: '.github/code-analyzer.yml'`
   - Remove deprecated inputs (`engine`, `pmdconfig`, `eslintconfig`, `target`, etc.)

## Making Modifications

To make modifications to this project, be sure to run the following command before raising a pull request:

```bash
npm run build
```

This will use [ncc](https://github.com/vercel/ncc) to bundle the contents of the project and `node_modules` into the `dist` folder.

For more information regarding the inclusion of these static versioned dependencies and the necessity of the `build` command, check out this [documentation](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action#commit-tag-and-push-your-action-to-github).
