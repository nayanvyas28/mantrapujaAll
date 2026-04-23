
async function testAPI() {
    console.log("Testing API for Aries...");
    try {
        const res = await fetch('http://localhost:3000/api/horoscope?sign=aries&period=daily');
        const data = await res.json();
        console.log("Status:", res.status);
        console.log("Data Content Snippet:", data.content ? data.content.substring(0, 100) : "NULL");
    } catch (e) {
        console.error("Fetch error:", e.message);
    }
}
testAPI();
