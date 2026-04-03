"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Twitter, Youtube, Loader2 } from "lucide-react";
import { getServingCities, ServingCity } from "@/lib/contentService";
import { useState, useEffect } from "react";

const Footer = () => {
    const pathname = usePathname();

    const [cities, setCities] = useState<ServingCity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCities() {
            try {
                const data = await getServingCities();
                setCities(data.filter(c => c.is_active));
            } catch (error) {
                console.error("Failed to fetch serving cities:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCities();
    }, []);

    // Hide Footer on Admin Pages
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    return (
        <footer className="relative bg-card border-t border-saffron/20 text-muted-foreground transition-colors duration-300 overflow-hidden">
            {/* Vedic Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ea580c' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                maskImage: 'linear-gradient(to bottom, black, transparent)'
            }}></div>

            <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 px-4">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block group">
                            <img
                                src="/logo.png"
                                alt="MantraPuja - Trusted Vedic Services"
                                className="h-24 w-auto group-hover:scale-105 transition-transform duration-300"
                            />
                        </Link>
                        <p className="text-sm leading-relaxed text-muted-foreground/80 font-light">
                            Your trusted partner for authentic Vedic Poojas and rituals. Connecting you with divine energy through experienced Pandits and sacred traditions.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { Icon: Facebook, href: "https://facebook.com" },
                                { Icon: Instagram, href: "https://instagram.com" },
                                { Icon: Twitter, href: "https://twitter.com" },
                                { Icon: Youtube, href: "https://youtube.com" }
                            ].map((social, idx) => (
                                <Link key={idx} href={social.href} className="w-12 h-12 rounded-full border border-saffron/20 flex items-center justify-center text-saffron hover:bg-saffron hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_-3px_rgba(249,115,22,0.5)]">
                                    <social.Icon size={24} strokeWidth={2.5} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg text-foreground mb-6 font-serif flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-saffron rounded-full"></span> Quick Links
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {['About Us', 'Pooja Services', 'Locations', 'Blog', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-saffron transition-colors hover:translate-x-1 inline-block duration-200 flex items-center gap-2 group">
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-saffron">›</span> {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-lg text-foreground mb-6 font-serif flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-saffron rounded-full"></span> Services
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {['Daily Pooja', 'Festival Pooja', 'Dosha Nivaran', 'Life Event Pooja'].map((item) => (
                                <li key={item}>
                                    <Link href={`/pooja-services?category=${encodeURIComponent(item)}`} className="hover:text-saffron transition-colors hover:translate-x-1 inline-block duration-200 flex items-center gap-2 group">
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-saffron">›</span> {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-lg text-foreground mb-6 font-serif flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-saffron rounded-full"></span> Contact Us
                        </h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-center gap-3 group">
                                <span className="w-8 h-8 rounded-full bg-saffron/10 flex items-center justify-center text-saffron group-hover:bg-saffron group-hover:text-white transition-colors duration-300">📞</span>
                                <a href="tel:+919876543210" className="hover:text-saffron transition-colors cursor-pointer">+91 98765 43210</a>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <span className="w-8 h-8 rounded-full bg-saffron/10 flex items-center justify-center text-saffron group-hover:bg-saffron group-hover:text-white transition-colors duration-300">✉️</span>
                                <a href="mailto:contact@mantrapuja.com" className="hover:text-saffron transition-colors cursor-pointer">contact@mantrapuja.com</a>
                            </li>
                            <li className="flex items-start gap-3 group">
                                <span className="w-8 h-8 rounded-full bg-saffron/10 flex items-center justify-center text-saffron group-hover:bg-saffron group-hover:text-white transition-colors duration-300 mt-1">📍</span>
                                <Link href="/locations/mahakaleshwar" className="hover:text-saffron transition-colors cursor-pointer leading-relaxed">Mahakal Marg, Ujjain,<br />Madhya Pradesh, India</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Spiritual Cities Section - Expanded */}
                <div className="mt-16 pt-8 border-t border-saffron/10 text-center">
                    <h5 className="text-saffron font-bold text-sm tracking-widest uppercase mb-6 opacity-80">Serving Devotees Across India</h5>
                    <div className="flex flex-wrap justify-center gap-x-2 gap-y-2 text-[10px] md:text-xs text-muted-foreground/60 leading-relaxed w-full px-4 mx-auto font-medium">
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="animate-spin text-saffron" size={12} />
                                <span>Refining Spiritual vortexes...</span>
                            </div>
                        ) : cities.length > 0 ? (
                            cities.map((city, i) => {
                                const slugMap: Record<string, string> = {
                                    "Varanasi": "kashi-vishwanath",
                                    "Ujjain": "mahakaleshwar",
                                    "Nashik": "trimbakeshwar",
                                    "Deoghar": "baidyanath",
                                    "Aurangabad": "grishneshwar",
                                    "Srisailam": "mallikarjuna",
                                    "Bodh Gaya": "gaya",
                                    "Prayagraj": "prayagraj",
                                    "Haridwar": "haridwar",
                                    "Badrinath": "badrinath",
                                    "Kedarnath": "kedarnath",
                                    "Somnath": "somnath",
                                    "Dwarka": "dwarka",
                                    "Puri": "puri",
                                    "Rameswaram": "rameswaram",
                                    "Tirupati": "tirupati",
                                    "Vaishno Devi": "vaishno-devi"
                                };
                                const slug = slugMap[city.name] || city.name.toLowerCase().replace(/\s+/g, '-');
                                return (
                                    <Link
                                        key={city.id}
                                        href={`/locations/${slug}`}
                                        className="hover:text-saffron transition-all hover:scale-110 active:scale-95 duration-200"
                                    >
                                        {city.name} {i < cities.length - 1 && <span className="opacity-30 mx-1">•</span>}
                                    </Link>
                                );
                            })
                        ) : (
                            [
                                "Varanasi", "Rishikesh", "Haridwar", "Ayodhya", "Mathura", "Vrindavan", "Dwarka", "Puri", "Rameswaram", "Tirupati",
                                "Ujjain", "Nashik", "Kedarnath", "Badrinath", "Somnath", "Shirdi", "Vaishno Devi", "Amarnath", "Bodh Gaya", "Sarnath"
                            ].map((city, i, arr) => {
                                const slugMap: Record<string, string> = {
                                    "Varanasi": "kashi-vishwanath",
                                    "Ujjain": "mahakaleshwar",
                                    "Nashik": "trimbakeshwar",
                                    "Deoghar": "baidyanath",
                                    "Aurangabad": "grishneshwar",
                                    "Srisailam": "mallikarjuna",
                                    "Bodh Gaya": "gaya",
                                    "Vaishno Devi": "vaishno-devi"
                                };
                                const slug = slugMap[city] || city.toLowerCase().replace(/\s+/g, '-');
                                return (
                                    <Link
                                        key={city}
                                        href={`/locations/${slug}`}
                                        className="hover:text-saffron transition-all hover:scale-110 active:scale-95 duration-200"
                                    >
                                        {city} {i < arr.length - 1 && <span className="opacity-30 mx-1">•</span>}
                                    </Link>
                                );
                            })
                        )}
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-saffron/10 text-center text-sm text-muted-foreground/60 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>&copy; {new Date().getFullYear()} <span className="text-saffron">Mantra Puja</span>. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy-policy" className="hover:text-saffron cursor-pointer transition-colors">Privacy Policy</Link>
                        <Link href="/terms-of-service" className="hover:text-saffron cursor-pointer transition-colors">Terms of Service</Link>
                        <Link href="/refund-policy" className="hover:text-saffron cursor-pointer transition-colors">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
