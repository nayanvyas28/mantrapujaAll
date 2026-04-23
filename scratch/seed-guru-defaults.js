const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://s1.mantrapuja.com';
const supabaseKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.BXBg0x_XqZXJIpNO3O0SwRlgyfRa1pg6A0hyngwEPro';

const supabase = createClient(supabaseUrl, supabaseKey);

const defaultTemplates = [
  {
    id: "temp_default_1",
    label_en: "Show my Kundali ☸️",
    label_hi: "मेरी कुंडली दिखाओ ☸️",
    prompt_en: "Show my Kundali",
    prompt_hi: "मेरी कुंडली दिखाओ",
    instruction_en: "Focus on analyzing the user's birth chart (Kundali). Provide deep astrological insights.",
    instruction_hi: "उपयोगकर्ता की जन्म कुंडली (Kundali) का विश्लेषण करने पर ध्यान दें। गहरे ज्योतिषीय अंतर्दृष्टि प्रदान करें।"
  },
  {
    id: "temp_default_2",
    label_en: "Career Advice 💼",
    label_hi: "करियर सलाह 💼",
    prompt_en: "Give me some spiritual career advice based on my stars.",
    prompt_hi: "मेरे सितारों के आधार पर मुझे कुछ आध्यात्मिक करियर सलाह दें।",
    instruction_en: "Provide career guidance and potential hurdles based on astrological signs. Keep it optimistic.",
    instruction_hi: "ज्योतिषीय संकेतों के आधार पर करियर मार्गदर्शन और संभावित बाधाएं प्रदान करें। इसे आशावादी रखें।"
  },
  {
    id: "temp_default_3",
    label_en: "Daily Quote ✨",
    label_hi: "आज का सुविचार ✨",
    prompt_en: "Give me a divine quote for today.",
    prompt_hi: "मुझे आज के लिए एक दैवीय सुविचार दें।",
    instruction_en: "Provide a very brief, inspiring, and divine spiritual quote or proverb.",
    instruction_hi: "एक बहुत ही संक्षिप्त, प्रेरक और दिव्य आध्यात्मिक उद्धरण या कहावत प्रदान करें।"
  },
  {
    id: "temp_default_4",
    label_en: "How it works? 🛡️",
    label_hi: "यह कैसे काम करता है? 🛡️",
    prompt_en: "How does Guru AI work?",
    prompt_hi: "गुरु एआई कैसे काम करता है?",
    instruction_en: "Explain that you are an AI assistant built on advanced Vedic knowledge, designed to help with astrology, kundali, and spiritual advice.",
    instruction_hi: "बताएं कि आप एक उन्नत वैदिक ज्ञान एआई हैं जो ज्योतिष, कुंडली और आध्यात्मिक सलाह में सहायता करते हैं।"
  }
];

async function seed() {
  console.log('Seeding default Guru AI templates...');
  
  const { error } = await supabase
    .from('settings')
    .upsert([
      { 
        key: 'guru_ai_templates', 
        value: JSON.stringify(defaultTemplates),
        updated_at: new Date().toISOString()
      }
    ], { onConflict: 'key' });

  if (error) {
    console.error('Error seeding templates:', error);
  } else {
    console.log('Successfully seeded default templates!');
  }
}

seed();
