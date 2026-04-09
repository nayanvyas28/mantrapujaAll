import { SavedComponent } from "./contentService";

export const systemComponents: SavedComponent[] = [
    {
        id: "sys_hero_1",
        name: "Hero: Temple & Gradient",
        category: "Hero",
        content: `
            <section class="relative h-[600px] flex items-center justify-center overflow-hidden bg-orange-50 dark:bg-slate-900">
                <div class="absolute inset-0 z-0 opacity-20">
                    <img src="https://cdn.shopaccino.com/divine-rudraksha/products/navdurga-chaitra-navratri-puja-261228243841428_m.jpg?v=523" alt="Divine Temple Ritual" class="w-full h-full object-cover">
                </div>
                <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <h1 class="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 mb-6 font-serif">
                        Divine Blessings
                    </h1>
                    <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 font-light">
                        Experience authentic Vedic rituals performed by verified Pandits.
                    </p>
                    <a href="/pooja-services" class="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                        Book Now
                    </a>
                </div>
            </section>
        `
    },
    {
        id: "sys_features_1",
        name: "Features: 3 Columns",
        category: "Features",
        content: `
            <section class="py-20 bg-white dark:bg-slate-950">
                <div class="container mx-auto px-4">
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-orange-50 dark:bg-slate-900 p-8 rounded-2xl border border-orange-100 dark:border-slate-800 text-center hover:-translate-y-2 transition-transform">
                            <div class="text-4xl mb-4">🕉️</div>
                            <h3 class="text-xl font-bold mb-2 text-gray-800 dark:text-white">Verified Pandits</h3>
                            <p class="text-gray-600 dark:text-gray-400">Experienced priests from Kashi and Haridwar.</p>
                        </div>
                        <div class="bg-orange-50 dark:bg-slate-900 p-8 rounded-2xl border border-orange-100 dark:border-slate-800 text-center hover:-translate-y-2 transition-transform">
                            <div class="text-4xl mb-4">🔥</div>
                            <h3 class="text-xl font-bold mb-2 text-gray-800 dark:text-white">Authentic Vidhi</h3>
                            <p class="text-gray-600 dark:text-gray-400">Strict adherence to Vedic scriptures.</p>
                        </div>
                        <div class="bg-orange-50 dark:bg-slate-900 p-8 rounded-2xl border border-orange-100 dark:border-slate-800 text-center hover:-translate-y-2 transition-transform">
                            <div class="text-4xl mb-4">🌍</div>
                            <h3 class="text-xl font-bold mb-2 text-gray-800 dark:text-white">Global Access</h3>
                            <p class="text-gray-600 dark:text-gray-400">Book poojas from anywhere in the world.</p>
                        </div>
                    </div>
                </div>
            </section>
        `
    },
    {
        id: "sys_cta_1",
        name: "CTA: Orange Wave",
        category: "Call to Action",
        content: `
            <section class="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white relative overflow-hidden">
                <div class="container mx-auto px-4 text-center relative z-10">
                    <h2 class="text-4xl font-bold mb-6 font-serif">Ready to Connect with the Divine?</h2>
                    <p class="text-lg opacity-90 mb-8 max-w-2xl mx-auto">Book your personalized Pooja today and bring prosperity into your life.</p>
                    <a href="/contact" class="inline-block bg-white text-orange-600 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-orange-50 transition-colors">
                        Get Started
                    </a>
                </div>
                <div class="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            </section>
        `
    },
    {
        id: "sys_text_block_1",
        name: "Text: Simple Paragraph",
        category: "Content",
        content: `
            <div class="prose dark:prose-invert max-w-none p-6">
                <h2 class="text-3xl font-bold mb-4">About Mantra Pooja</h2>
                <p class="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                    We are dedicated to bringing authentic Vedic rituals to your doorstep. Our mission is to preserve the sanctity of ancient traditions while making them accessible to the modern world.
                </p>
            </div>
        `
    }
];
