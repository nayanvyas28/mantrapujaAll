const key = { user_id: "651550", api_key: "ak-36483fc8a7f94df8504faacc4db3a46cafb353bd" };
const birthData = {
    day: 23, month: 4, year: 1995, hour: 10, min: 30, lat: 28.6139, lon: 77.2090, tzone: 5.5
};

async function getChart() {
    const auth = `Basic ${Buffer.from(`${key.user_id}:${key.api_key}`).toString('base64')}`;
    try {
        const response = await fetch("https://json.astrologyapi.com/v1/horo_chart_image/D1", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth,
                'x-astrologyapi-key': key.api_key
            },
            body: JSON.stringify(birthData)
        });
        const data = await response.json();
        console.log("Full Response:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

getChart();
