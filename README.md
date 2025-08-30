# Air Quality Light

A SmartThings SmartApp that changes light color according to air quality data.

### AQI Table

| AQI | Air Pollution Level | Light |
|-|-|-|
| 0 - 50 | Good | Off |
| 51 - 100 | Moderate | Yellow |
| 101+ | Unhealthy | Red |

### Prerequisites

- A [Render](https://render.com/) account
- An [Air Quality Open Data Platform](https://aqicn.org/data-platform/token/) API token
- A [Samsung](https://account.samsung.com/membership/index.do) account and the SmartThings mobile application
- A [Developer Workspace](https://developer.smartthings.com/workspace/) account
- A SmartThings compatible color bulb

### Create the hosting service

1. Go to [Render Dashboard](https://dashboard.render.com/), then select **Add new** > **Web Service**.
1. Select **Public Git Repository**, enter **https://github.com/smartthings-aqi/air-quality-light**, then select **Connect**.
1. In the newly created project, add an environment variable named `WAQI_TOKEN` and set its value to your WAQI token, and configure the rest of the settings as needed.
1. Select **Deploy Web Service** and wait for the project the be built and deployed.

### Create the SmartApp

1. Go to [Developer Workspace](https://developer.smartthings.com/workspace/), create a new project, choose **Automation for the SmartThings App** as the project type, and give the project a name.
1. In the newly created project, select **Register App**.
1. In the **Hosting** tab, select **WebHook Endpoint**, and enter the Render project URL as the **Target URL**.
1. In **Name & Scope** tab, enter a name and a description for the app, and select r:devices:* and x:devices:* as required permissions.
1. In the **Advanced Settings** tab, select **Save**.

### Verify and deploy the SmartApp

1. Go to [Render Dashboard](https://dashboard.render.com/), then navigate to the web service previously created.
1. Navigate to **Monitor** > **Logs**, then look for an log entry similar to `SmartThings confirmation URL is ***`.
1. Submit a GET requeat to the confirmation URL to verify the SmartApp.
1. Go to [Developer Workspace](https://developer.smartthings.com/workspace/), then navigate to the Automation previously created.
1. In **Overview**, Select **Deploy to test**.

### Create the routine

1. In the SmartThings app, go to **Routines**.
1. Select the **Discover** tab, scroll to the bottom, then select the SmartApp.
1. In **Location**, enter the coordinate to check for air quality in the format of LATITUDE,LONGITUDE, select a checking interval, select which light to change color, then select **Done**.