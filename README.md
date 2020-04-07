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
- Set user role.
  - Set the mock role that you want to assume in `src/store/user/actions`.
  - Assign a new value to the `mockRole` variable.
- Run mock server.
  - Run a mock server that simulates the various API endpoints as the app makes actual requests.
- Update `host` in `config.js` to point to production/mock API service.
