import { fetchAstroData, prepareAstroRequestData } from './services/astrologyService';
import * as fs from 'fs';

async function testAstroService() {
    let out = "";
    const onboardingData = {
        name: 'John Doe',
        dob: '1993-03-12', // March 12 1993
        time: '14:15', // 2:15 PM
        place: 'Varanasi'
    };

    out += "Preparing Astro Data...\n";
    const requestData = prepareAstroRequestData(onboardingData);
    out += "Request Data: " + JSON.stringify(requestData) + "\n";

    out += "\nFetching astro_details...\n";
    const astroDetails = await fetchAstroData('astro_details', requestData);
    
    if (astroDetails) {
        out += "SUCCESS! astro_details keys: " + Object.keys(astroDetails).join(", ") + "\n";
        out += "Sign: " + astroDetails.sign + " Nakshatra: " + astroDetails.nakshatra + "\n";
    } else {
        out += "FAILED to fetch astro_details.\n";
    }
    
    fs.writeFileSync('astro_output.txt', out, 'utf8');
}

testAstroService();
