# API Test Automation

## Overview

This repository contains test automation scripts for testing the APIs of a system. The tests are written using TypeScript and executed with the help of the Jest testing framework.

## Prerequisites

1. **Node.js and npm**: Ensure that Node.js and npm (Node Package Manager) are installed on your machine. You can download them from [https://nodejs.org/](https://nodejs.org/).

2. **Dependencies Installation**: Run the following command in the project root to install the required dependencies:

    ```bash
    npm install
    ```

## Test Execution

To execute the tests, use the following command:

```bash
npm playwright test
```

To execute the tests, use the following command for API
```bash
npm run api-test
```

To execute the tests, use the following command for UI
```bash
npm run ui-test
```

To generate allure result
```bash
npx allure serve allure-results
```