# Air Quality Light

A SmartThings SmartApp that changes light color according to air quality data.

### AQI Table

| AQI | Air Pollution Level | Light |
|-|-|-|
| 0 - 50 | Good | Off |
| 51 - 100 | Moderate | Yellow |
| 101+ | Unhealthy | Red |

### Prerequisites

- A [Glitch](https://glitch.com/) account
- An [Air Quality Open Data Platform](https://aqicn.org/data-platform/token/) API token
- A [Samsung](https://account.samsung.com/membership/index.do) account and the SmartThings mobile application
- A [Developer Workspace](https://smartthings.developer.samsung.com/workspace/) account
- A SmartThings compatible color bulb

### Create the hosting service

1. Go to [Glitch](https://glitch.com/), select **New project**, select **Import from GitHub**, and enter **https://github.com/smartthings-aqi/air-quality-light** in the pop-up dialog.
1. In the newly created project, set the desire project name or custom domain.
1. Select the .env file, and set the value of WAQI_TOKEN to your WAQI API token.
1. Wait for the project the be built and deployed.

### Create the SmartApp

1. Go to [Developer Workspace](https://smartthings.developer.samsung.com/workspace/), create a new project, choose **Automation for the SmartThings App** as the project type, and give the project a name.
1. In the newly created project, select **Register App**.
1. In the **Hosting** tab, select **WebHook Endpoint**, and enter the Glitch project URL as the **Target URL**.
1. In **Name & Scope** tab, enter a name and a description for the app, and select r:devices:* and x:devices:* as required permissions.
1. In the **Advanced Settings** tab, select **Save**.

### Create the routine

1. In the SmartThings app, go to Automations, select the **+** sign, then select **Create routine**.
1. Select the **Discover** tab, scroll to the bottom, then select the SmartApp.
1. In **Location**, enter the coordinate to check for air quality in the format of LATITUDE,LONGITUDE, select a checking interval, select which light to change color, then select **Done**.