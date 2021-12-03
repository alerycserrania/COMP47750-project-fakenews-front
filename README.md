# Cloud Computing Project - Fake News - UI

## Requirements

- NodeJS 16+
- Yarn

## Installation

First install all dependencies:

```sh
yarn install
```

Then add this environment variable:

```sh
export REACT_APP_API_BASE_URL=# Base URL of your deployed backend (e.g. http://localhost:8000)
```

Finally, you can run the application in development mode:

```sh
yarn start
```

You can also choose to build the app for production to the build folder.
You'll need to set up a HTTP Server yourself to serve the files (with Apache 2 or Nginx)