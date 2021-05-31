## Building automatically using GitHub actions

This repository has two workflows to build the project:

- **Release:** Automatically builds, releases and deploys when a new tag is pushed
  1. The project is compiled for production
  2. A new release gets posted in the GitHub repository, using contents of `latest-version-changelog.md` as release body and a zip of build results as an attachment
  3. The build compiled project is pushed to `gh-pages` branch
- **Production build:** A manual workflow that just builds and uploads an artifact build results. It can be run by repo admins from workflow page and the use of test dc and TdLib update and query logs can be configured.

These workflows use GitHub secrets `API_ID` and `API_HASH`, which should be obtained from my.telegram.org for forks.

## Creating config file

The config file contains Telegram API credentials and some options.  
It is needed to compile DIBgram, but is automatically created in build workflows.

1. Obtain your API credentials from my.telegram.org
2. Create file `src/dibgram/TdWeb/config.js` and use this template to create the config file:

    ```js
    export function getCredentials() {
        return {
            api_id: <API ID here>,
            api_hash: '<API Hash here>'
        };
    }

    export function getConfig() {
        return {
            use_test_dc: <true or false>,
            log: {
                log_updates: <true or false>,
                log_queries: <true or false>
            }
        };
    }
    ```

    **`api_id`**: API ID from my.telegram.org  
    **`api_hash`**: API Hash from my.telegram.org

    **`use_test_dc`**: `true` if you want to use Telegram test DCs, `false` if you want to use production ones (recommended `false`)

    **`log_updates`**: `true` if you want updates received from TdLib to be shown in developer tools console, otherwise `false` (recommended `false`)
    **`log_queries`**: `true` if you want updates received from TdLib to be shown in developer tools console, otherwise `false` (recommended `false`)

## Running app in test mode

You can run the app in test mode which is faster and better suited for development, and automatically re-compiles and updates when source code files change.

1. Clone DIBgram repository

   ```sh
   git clone github.com/Mammad900/DIBgram.git
   cd DIBgram
   ```

2. [Obtain API ID and API hash, and create `config.js`](#creating-config-file)
3. Install all dependencies

   ```sh
   npm install
   ```

4. Run app

   ```sh
   npm start
   ```

## Building for production

You can create an optimized build of DIBgram, for use in production.

1. Clone DIBgram repository

   ```sh
   git clone github.com/Mammad900/DIBgram.git
   cd DIBgram
   ```

2. [Obtain API ID and API hash, and create `config.js`](#creating-config-file)
3. Install all dependencies

   ```sh
   npm install
   ```

4. Build

   ```sh
   npm run build
   ```
