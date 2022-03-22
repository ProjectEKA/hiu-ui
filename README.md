This is a forked repo from project-eka, includes few ui-enchancements and session management.

## To run locally:

update src path in index.html as `/bundle.js`

### 1. using docker

To build a image, you can run:

### `docker build -t hiu-ui .`

To run the container, 

you can update docker-compose.development.yml environment variable if needed, you can run:

### `docker-compose -f docker-compose.development.yml up hiu-ui`

Note: BACKEND_BASE_URL, BASE_NAME are mandatory in docker-compose.development.yml

###2. using npm

In the project directory, you can run:

### `npm install`

Installs all the node modules added as part of the package.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


Note: if you want to run the webpack server on a different port (e.g. 9080) then modify the "webpack.dev.config.js" and add a different port
```
devServer: {
    port: 9080,
    ...
}
```

### `npm run test`

Launches the test runner in the interactive watch mode.


## Plugging in the reference HIU-UI to Local-HIU-Server

update src/Config.js. with the following contents

```
BACKEND_BASE_URL: 'http://localhost:8003',
BASE_NAME: '/hiu',
BACKEND_API_PATH: '/',
DICOM_VIEWER_PAGE: '/viewer/',
DICOM_SERVER_PATH: '/dicom-web',
TITLE: 'NCG'
```
The above should be self explanatory, essentially it says that the HIU-Service is running on http://localhost:8003

Add the following to the Config file for the specific timezone. The following is for IST TimeZone UTC+5:30

```aidl
TIMEZONE_OFFSET: '+05:30'
```

Note: If you haven't specify TimeZone, it will be UTC by default

If you are testing with the reference HIU-Service, and thats running locally on a different port, most likely Chrome will not allow you to make Http calls because of CORS restrictions. To do this, there are many ways - for example, use a proxy like HAProxy and put your HIU-UI and HIU-Server behind the proxy and route the calls appropriately. 

For development purpose, you can start chrome with disabled web security. 

```
open -na Google\ Chrome --args --disable-web-security --user-data-dir=$HOME/local-hiu-server
```
Note the above will start a new process of Chrome. Use this only for local testing and do not use this for accessing any public websites, and terminate this specific process as soon as you are done. 


The latest versions of Safari also allows you disable Cross-Origin Restrictions. Enable the developer menu from Preferences >> Advanced, and select "Disable Cross-Origin Restrictions" from the develop menu. Again be careful of browsing external and public websites, and uncheck the above option "Disable Cross-Orgin .. " as soon as you are done. 
