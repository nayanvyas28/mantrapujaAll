
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

const cleanBlogContent = {
  introduction: "The chanting of chalisas, or hymns, is a powerful practice in Hindu tradition. One such revered chalisa is the Baglamukhi Chalisa, dedicated to Goddess Baglamukhi, who is believed to possess the power to protect and vanquish enemies.\n\nIn this blog post, we will explore the different phases of Baglamukhi Chalisa recitation and delve into the significance of each step. Throughout our journey, we will also touch upon the Bhairav Chalisa, a parallel hymn that complements the worship of Goddess Baglamukhi.",
  sections: [
    {
      heading: "Introduction to Bhairav Chalisa",
      content: "Before diving into the intricacies of Baglamukhi Chalisa, it is essential to introduce the Bhairav Chalisa. Lord Bhairav, an incarnation of Lord Shiva, is worshipped for his protective powers and ability to dispel negativity.\n\nJust as Baglamukhi is revered for her ability to defeat enemies, Bhairav's energy complements and strengthens the worship of the goddess. Incorporating the recitation of Bhairav Chalisa into your spiritual practice alongside Baglamukhi Chalisa can enhance the protective and transformative energies invoked during the rituals.",
      key_points: ["Bhairav as Protective Incarnation", "Complementary Energy to Baglamukhi", "Enhanced Transformative Rituals"]
    },
    {
      heading: "Phase 1: Preparation and Invocation",
      content: "The first phase of Baglamukhi Chalisa recitation involves preparing yourself both mentally and physically for the practice. Find a quiet and clean space where you can sit comfortably without distractions. Light a lamp or candle as a symbol of divine light and purity.\n\nBefore beginning the recitation, close your eyes and take a few deep breaths to center yourself. Invoke the presence of Goddess Baglamukhi and Lord Bhairav, setting your intention for the practice and seeking their blessings for protection and guidance.",
      key_points: ["Create a Sacred Space", "Mental Centering", "Divine Intent Setting"]
    },
    {
      heading: "Phase 2: Chanting the Chalisa",
      content: "Once you have set the intention and invoked the divine energies, it is time to start chanting the Baglamukhi Chalisa. The chalisa is a poetic composition of 40 verses that extol the virtues and powers of Goddess Baglamukhi.\n\nAs you recite each verse, focus on the meaning and symbolism behind the words, allowing them to resonate deeply within you. Chanting the chalisa with devotion and sincerity can create a powerful vibrational energy that reverberates within and around you, attracting the protective and transformative energies of the goddess.",
      key_points: ["40 Verses of Virtue", "Focus on Symbolism", "Vibrational Resonance"]
    },
    {
      heading: "Phase 3: Meditation and Reflection",
      content: "After completing the recitation of the chalisa, take a few moments to sit in silence and meditate. Allow the energy and vibrations created during the chanting to settle within you, facilitating a deeper connection with the divine forces invoked.\n\nReflect on the significance of Goddess Baglamukhi and Lord Bhairav in your life and the protection they offer against inner and outer enemies. Use this time to express gratitude for their presence and seek their continued blessings on your spiritual journey.",
      key_points: ["Sacred Silence", "Deep Connection", "Internal Reflection"]
    },
    {
      heading: "Phase 4: Offering and Conclusion",
      content: "To conclude the recitation of Baglamukhi Chalisa, offer a symbolic gesture of gratitude and devotion to the goddess. This can take the form of lighting incense, offering flowers, or performing aarti in honor of Goddess Baglamukhi and Lord Bhairav.\n\nAs you complete the ritual, express your heartfelt thanks to the divine energies for their protection and guidance. Carry the blessings of Baglamukhi and Bhairav with you throughout your day, knowing that they are watching over you and empowering you to face challenges with strength and courage.",
      key_points: ["Symbolic Gratitude", "Heartfelt Aarti", "Daily Empowerment"]
    }
  ],
  faq: [
    {
      question: "How many times should I recite Baglamukhi Chalisa?",
      answer: "While there is no fixed rule, chanting the chalisa 11 times or multiples of 11 is considered auspicious. You can adjust the number based on your time and dedication to the practice."
    },
    {
      question: "Can anyone recite Baglamukhi Chalisa?",
      answer: "Yes, anyone can recite Baglamukhi Chalisa, regardless of their background or beliefs. The practice is open to all who seek protection, guidance, and empowerment from the goddess."
    }
  ],
  conclusion: "The practice of reciting Baglamukhi Chalisa and Bhairav Chalisa can be a transformative experience, offering protection, guidance, and empowerment in your life. Embrace these sacred hymns as tools for spiritual growth and inner strength."
};

async function forceRepair() {
  const slug = 'how-to-master-baglamukhi-chalisa-recitation-phases';
  console.log(`Checking current DB state for: ${slug}`);
  
  const { data: current } = await supabase
    .from('Final_blog')
    .select('blog_content, content')
    .eq('slug', slug)
    .single();

  if (current) {
    console.log("Current Header in DB:", JSON.parse(typeof current.blog_content === 'string' ? current.blog_content : JSON.stringify(current.blog_content)).sections?.[0]?.heading);
  }

  console.log("Forcing update...");
  const { error } = await supabase
    .from('Final_blog')
    .update({ 
      blog_content: cleanBlogContent,
      content: cleanBlogContent
    })
    .eq('slug', slug);

  if (error) {
    console.error("❌ Error:", error);
  } else {
    console.log("✅ Success! Reading back to verify...");
    const { data: verified } = await supabase
        .from('Final_blog')
        .select('blog_content')
        .eq('slug', slug)
        .single();
    
    const parsed = typeof verified.blog_content === 'string' ? JSON.parse(verified.blog_content) : verified.blog_content;
    console.log("Verified First Section Heading:", parsed.sections?.[0]?.heading);
  }
}

forceRepair();
