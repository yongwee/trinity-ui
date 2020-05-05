# Trinity UI

Dashboard for STACS

---
## Requirements

- Node v12.x
- Yarn

---

## Install

```bash
git clone ssh://github.com/HASHSTACS-admin/trinity-ui.git
cd trinity-ui
yarn install
```

## Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
yarn dev
```

## Simple build for production

```bash
yarn build
```

## Lint the files

```bash
yarn lint
```

## Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

## Testing in development mode
- Update `host` and `loginHost` in `config.js` to point to production/mock API service.


## Development FAQ
Some additional development notes for smoother handover.

### I18n
#### Why use different i18n keys for the same string?
Some strings that are the same have different keys
e.g.
- viewTokenAmount: 'Amount'
- transferTokenAmount: 'Amount'

Why have a duplicate string under a different key instead of reusing it in different places?

This is because in certain languages, the same string can be translated differently based on its surrounding context.

#### Adding/using i18n strings
To add new strings (for English):
1. go to `src/i18n/en-us` (replace `en-us` with other locales for editing strings for other locales e.g. `src/i18n/zh-cn` for Chinese)
2. Add a new entry under the appropriate key.
  - e.g. For login input label displaying `'Username'`
    - `login: { usernameInputLabel: 'Username' }`

### Changing API's URL, adding new URI
URL to API service can be found in `src/config`.
Search for `const host =`.

New URI definitions can also be added underneath that line.

### Making AJAX requests
AJAX requests can be made with (axios)[https://github.com/axios/axios] e.g.
```
// GET request
this.$axios.get(URI.resourceA);

// POST request
const payload = { ... };
this.$axios.POST(URI.resourceB, payload);
```

All requests made with axios are async (non-blocking) and return Promises.

Note: You'll need to import the URI definitions from config to use predefined URIs
```
import { URI } from 'src/config';
```

### Adding a new page
To add a new page:
- create new page component under `src/pages`.

To add the route to the page:
1. Define i18n keys inside `src/i18n/en-us/index.js`.
  - For route name to be shown within navigation drawer, add a new entry under `routes`.
  - For route title to be shown on top of the page, add a new entry under a key correlating to the page e.g. `newPage: { title: 'New Page' }`

2. Define route config:
  - Go to `src/config.js`.
  - Add the new route under the `routes` map, supplying the following properties
    - `navBarTitleKey` — i18n key to page's label; to be shown in side navigation drawer (defined in step #1).
      - e.g. `routes.newPage`
    - `titleKey` — i18n key to page's title; to be shown on the top of the page itself (defined in step #1).
      - e.g. `newPage.title`
    - `name` (required) — route name; to be used for programmatic navigation.
3. Add route:
  - Go to `src/router/routes.js`.
  - Add a new entry under `routes.children` with the following properties:
    - `path` (required) — path to be used in the URI
    - `component` (required) — reference to page component
    - `name` (required) — reference to the route `name` property defined in `src/config.js`
    - `meta` — additional data for route
      - `titleKey` (required for most) — reference to the route `titleKey` property defined in `src/config.js`.
      - `breadcrumbs` — an array defining the breadcrumbs trail; shown on top of the page, above the page title.
      - `skipBeforeEachRouteGuard` — skip beforeEach route guard

### Navigating to a route
Use route name to navigate to a route, do **NOT** use its path. This is so that if we need to change the path, we do not have to hunt down all the instances where paths are used. Names are much less liable to be changed since they have no semantic meaning visually.

To navigate to a route, do something like this
```
import { routes } from 'src/config'; // only do this once for every component

const nameOfNextRoute = routes.somePage.name;
this.$router.push({ name: nameOfNextRoute });
```

## Additional Handover Notes
- Ensure that `roles` in `src/config.js` matches the role strings that server will return for the `/userInfo` endpoint.
  - Most of them are unused (as of 5/5/2020), the one of particular note is `counterParty` — it is used in the `feeadjustment` page.
