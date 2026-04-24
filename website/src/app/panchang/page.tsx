import PanchangSection from '@/components/home/PanchangSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Today\'s Panchang - Vedic Daily Calendar | Mantra Puja',
  description: 'Get accurate daily Vedic Panchang including Tithi, Nakshatra, Yoga, Karana, and auspicious/inauspicious timings for your location.',
};

export default function PanchangPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      

      <PanchangSection />

      <section className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-6">Understanding the Five Pillars of Panchang</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-orange-100 dark:bg-orange-950/30 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold">1</div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white mb-1">Tithi (The Lunar Day)</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">Represents the distance between the Sun and the Moon. It's crucial for determining festivals and rituals.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-orange-100 dark:bg-orange-950/30 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold">2</div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white mb-1">Nakshatra (The Lunar Mansion)</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">The 27 divisions of the sky through which the Moon passes. Each has its own distinct energy and influence.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-orange-100 dark:bg-orange-950/30 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold">3</div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white mb-1">Yoga</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">Calculated by the longitudinal positions of the Sun and Moon, signifying the health and longevity of a person.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-orange-100 dark:bg-orange-950/30 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold">4</div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white mb-1">Karana</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">Half of a Tithi. There are 11 Karanas in Vedic astrology, each affecting the day's outcomes.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-orange-100 dark:bg-orange-950/30 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold">5</div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white mb-1">Vaar (Day of the Week)</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">Ruled by seven planets, determining the overall nature and suitability of activities for the day.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[3rem] border border-zinc-100 dark:border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[80px] -mr-32 -mt-32" />
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Auspicious vs Inauspicious Timings</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                Vedic astrology emphasizes performing activities at the right time. <strong>Abhijit Muhurat</strong> is considered one of the most auspicious times of the day, suitable for any positive endeavor. 
                Conversely, periods like <strong>Rahu Kaal</strong> and <strong>Yama Gandam</strong> are generally avoided for starting something new or performing important ceremonies.
              </p>
              <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Abhijit Muhurat</span>
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-black rounded-full">VERY GOOD</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Amrit Kaal</span>
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-black rounded-full">EXCELLENT</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Rahu Kaal</span>
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-black rounded-full">AVOID</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
