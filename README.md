# jakmall-test-rayhanendra

## Project Description

Created by Rayhanendra

## Project Approach and Ideas

- I use Vite as the build tool because it's fast and easy to setup
- I use Vue 3 because it's the latest version of Vue and it's faster than Vue 2
- I use Stylus because it's easy to use and it's similar to SCSS
- I use Pinia because it's the latest state management for Vue 3
- I use Cypress for E2E testing because it's easy to use and it's the most popular E2E testing tool for Vue
- I use Commitlint and Commitizen to standardize commit messages
- I use ESLint and Prettier for linting and formatting
- I use Husky to run linting and formatting before commiting

## Project Process

- First, setup the project with Vue 3, Stylus, Pinia, Vue Router, ESLint, Prettier, Husky, Commitlint, and Commitizen
- Then, setup the router, store, style, and base layout
- Then, add the checkout page and the stepper component
- Then, add the checkout form component with vee-validate for form state and add checkout summary
- Then, break down the checkout form component into smaller components
- Then, add payment page and implement router children for the checkout steps
- Then, persist the form state with store
- Then, fix some ui bugs
- Then, add filters
- Then, make the summary reactive
- Then, add finish page
- Then, improve ui, form flow, and adjustments
- Then, implement responsive ui
- Then, do some refactoring and fixes
- Finally, add E2E tests with Cypress

## Project Setup

### Install dependencies:

```sh
npm install
```

### Install Husky Git Hooks:

```sh
npm prepare
```

### Run Development Server:

```sh
npm run dev
```

### Build for Production:

```sh
npm run build
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e
```

or

```sh
npx cypress open
```

and then run the checkout test
