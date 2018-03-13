const SmartApp = require("@smartthings/smartapp");
const airQuality = require("./lib/airquality");

async function setColor(ctx)
{
    const aqi = await airQuality.getAqi(ctx.configStringValue("location").replace(" ", ""));

    if (aqi >= 100)
    {
        console.log(`Turning on the light and setting color to red...`);
        await ctx.api.devices.sendCommands(ctx.config.colorLight, [
            {
                capability: "switch",
                command: "on",
            },
            {
                capability: "switchLevel",
                command: "setLevel",
                arguments: [25],
            },
            {
                capability: "colorControl",
                command: "setColor",
                arguments: [
                    {
                        hue: 90,
                        saturation: 80,
                    },
                ],
            },
        ]);
    }
    else if (aqi >= 50)
    {
        console.log(`Turning on the light and setting color to yellow...`);
        await ctx.api.devices.sendCommands(ctx.config.colorLight, [
            {
                capability: "switch",
                command: "on",
            },
            {
                capability: "switchLevel",
                command: "setLevel",
                arguments: [25],
            },
            {
                capability: "colorControl",
                command: "setColor",
                arguments: [
                    {
                        hue: 15,
                        saturation: 85,
                    },
                ],
            },
        ]);
    }
    else
    {
        console.log(`Truning off the light...`);
        await ctx.api.devices.sendCommands(ctx.config.colorLight, [
            {
                capability: "switch",
                command: "off",
            },
        ]);
    }
}

module.exports = new SmartApp()
    .enableEventLogging() // Log and pretty-print all lifecycle events and responses
    .configureI18n() // Use files from locales directory for configuration page localization
    .page("mainPage", (context, page, configData) =>
    {
        page.section("airquality", (section) =>
        {
            section.textSetting("location").required(true);
            section
                .enumSetting("scheduleInterval")
                .options([
                    { id: "15", name: "15 minutes" },
                    { id: "30", name: "30 minutes" },
                    { id: "45", name: "45 minutes" },
                    { id: "60", name: "60 minutes" },
                ])
                .defaultValue("15");
        });
        page.section("lights", (section) =>
        {
            section
                .deviceSetting("colorLight")
                .capabilities(["colorControl", "switch", "switchLevel"])
                .permissions("rx")
                .required(true);
        });
    })
    .updated(async (ctx) =>
    {
        // clear any previous configuration
        await ctx.api.schedules.delete();

        // switch light on to initial color
        await setColor(ctx);

        // schedule future changes
        await ctx.api.schedules.schedule("aqiHandler", `0/${ctx.configStringValue("scheduleInterval")} * * * ? *`, "UTC");
    })
    .scheduledEventHandler("aqiHandler", setColor);
