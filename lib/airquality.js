const axios = require("axios").default;
const waqiUrl = "https://api.waqi.info/feed";
const waqiToken = process.env.WAQI_TOKEN;

module.exports = {
    getAqi: async function (location)
    {
        location = location.replace(",", ";")
        const url = `${waqiUrl}/geo:${location}/?token=${waqiToken}`;

        console.log(`Checking AQI for ${location}...`);
        const response = await axios.get(url).catch((error) => console.log(error));
        console.log(`AQI for ${location} is ${response.data.data.aqi}.`)
      
        return response.data.data.aqi;
    },
};
