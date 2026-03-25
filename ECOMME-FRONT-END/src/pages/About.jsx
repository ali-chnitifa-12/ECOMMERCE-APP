import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
    { name: "Alex Morgan", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&auto=format&fit=crop&faces&facepad=2&crop=faces" },
    { name: "Sarah Chen", role: "Head of Design", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop&faces&facepad=2&crop=faces" },
    { name: "James Okafor", role: "Head of Engineering", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop&faces&facepad=2&crop=faces" },
];

const VALUES = [
    { icon: "🌿", title: "Sustainability", desc: "Ethical sourcing, eco-certified materials, carbon-neutral shipping on every order." },
    { icon: "✦", title: "Premium Quality", desc: "Every item rigorously curated. We partner only with craftsmen who share our obsession." },
    { icon: "🤝", title: "Community", desc: "Built with and for our community. Your feedback shapes every new collection drop." },
    { icon: "🚀", title: "Innovation", desc: "We bridge the gap between timeless design and cutting-edge technology." },
];

const TIMELINE = [
    { year: "2023", title: "The Beginning", desc: "Started as a small design studio in New York with one mission: redefine everyday luxury." },
    { year: "2024", title: "First Collection", desc: "Debut drop sold out in 48 hours — proving the world was ready for something different." },
    { year: "2025", title: "Global Expansion", desc: "Opened flagship stores in London, Paris, and Tokyo to universal acclaim." },
    { year: "2026", title: "Innovation Award", desc: "Recognised for sustainable practices and boundary-pushing design at the Global Fashion Summit." },
];

const About = () => {
    const heroRef = useRef(null);
    const valuesRef = useRef(null);
    const timelineRef = useRef(null);
    const teamRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Hero section
            gsap.fromTo(".about-hero-tag", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" });
            gsap.fromTo(".about-hero-h1", { opacity: 0, y: 60, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "expo.out", delay: 0.15 });
            gsap.fromTo(".about-hero-sub", { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.35 });
            gsap.fromTo(".about-hero-img", { opacity: 0, scale: 1.06, rotate: 2 }, { opacity: 1, scale: 1, rotate: 0, duration: 1.2, ease: "expo.out", delay: 0.25 });
            gsap.fromTo(".about-hero-story", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 1, ease: "expo.out", delay: 0.4 });

            // Values cards
            if (valuesRef.current) {
                gsap.fromTo(valuesRef.current.querySelectorAll(".value-card"),
                    { opacity: 0, y: 50, scale: 0.92 },
                    {
                        opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: "expo.out",
                        scrollTrigger: { trigger: valuesRef.current, start: "top 80%" }
                    }
                );
            }

            // Timeline
            if (timelineRef.current) {
                gsap.fromTo(timelineRef.current.querySelectorAll(".tl-item"),
                    { opacity: 0, x: -40 },
                    {
                        opacity: 1, x: 0, duration: 0.7, stagger: 0.15, ease: "expo.out",
                        scrollTrigger: { trigger: timelineRef.current, start: "top 78%" }
                    }
                );
                gsap.fromTo(".tl-line",
                    { scaleY: 0, transformOrigin: "top center" },
                    {
                        scaleY: 1, duration: 1.5, ease: "expo.out",
                        scrollTrigger: { trigger: timelineRef.current, start: "top 80%" }
                    }
                );
            }

            // Team
            if (teamRef.current) {
                gsap.fromTo(teamRef.current.querySelectorAll(".team-card"),
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "expo.out",
                        scrollTrigger: { trigger: teamRef.current, start: "top 80%" }
                    }
                );
            }

            // CTA
            if (ctaRef.current) {
                gsap.fromTo(ctaRef.current,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0, duration: 0.8, ease: "expo.out",
                        scrollTrigger: { trigger: ctaRef.current, start: "top 86%" }
                    }
                );
            }

        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen pb-24 overflow-hidden" style={{ background: "linear-gradient(180deg,#f5f7ff 0%,#fff 400px)" }}>
            <div className="max-w-7xl mx-auto px-6">

                {/* ── Hero ─────────────────────────────────────────────── */}
                <div ref={heroRef} className="pt-32 pb-20">
                    <div className="text-center mb-16">
                        <span className="about-hero-tag opacity-0 inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border border-indigo-100 mb-6">
                            ✦ Who We Are
                        </span>
                        <h1 className="about-hero-h1 opacity-0 text-6xl md:text-8xl font-black tracking-tighter text-gray-900 mb-6">
                            Our <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#6366f1,#a855f7,#ec4899)" }}>Story</span>
                        </h1>
                        <p className="about-hero-sub opacity-0 text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
                            Born from a passion for design and quality. It's not just a brand — it's a lifestyle, a statement, and a relentless commitment to excellence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="about-hero-img opacity-0 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
                            style={{ boxShadow: "0 40px 100px -20px rgba(99,102,241,0.3)" }}>
                            <img
                                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=85&auto=format&fit=crop"
                                alt="About FitTrack"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <div className="absolute bottom-8 left-8 text-white">
                                <p className="text-xs font-black uppercase tracking-widest text-indigo-300 mb-1">Founded</p>
                                <p className="text-3xl font-black">2023</p>
                            </div>
                        </div>
                        <div className="about-hero-story opacity-0 space-y-6">
                            <h2 className="text-3xl font-black tracking-tighter text-gray-900">
                                Crafting the Future of Fashion & Tech
                            </h2>
                            <p className="text-gray-500 text-lg leading-relaxed">
                                We started with a simple mission: to create products that inspire and elevate everyday life. We believe in sustainable practices, ethical sourcing, and timeless design that outlasts trends.
                            </p>
                            <p className="text-gray-500 text-lg leading-relaxed">
                                Our team of designers and artisans work tirelessly to bring you collections that blend modern aesthetics with traditional craftsmanship. Every stitch, every detail is carefully considered.
                            </p>
                            <div className="flex gap-8 pt-4">
                                {[["50k+", "Customers"], ["200+", "Products"], ["30+", "Countries"]].map(([v, l]) => (
                                    <div key={l}>
                                        <p className="text-3xl font-black text-gray-900">{v}</p>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{l}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Values ───────────────────────────────────────────── */}
                <section ref={valuesRef} className="py-20">
                    <div className="text-center mb-14">
                        <span className="text-indigo-500 font-black text-xs uppercase tracking-widest">What drives us</span>
                        <h2 className="text-4xl font-black tracking-tighter text-gray-900 mt-2">Our Core Values</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {VALUES.map((v) => (
                            <div key={v.title} className="value-card opacity-0 group p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-default">
                                <span className="text-4xl mb-5 block group-hover:scale-125 transition-transform duration-300">{v.icon}</span>
                                <h3 className="font-black text-gray-900 text-lg mb-2">{v.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Timeline ─────────────────────────────────────────── */}
                <section ref={timelineRef} className="py-20 max-w-3xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-indigo-500 font-black text-xs uppercase tracking-widest">How we got here</span>
                        <h2 className="text-4xl font-black tracking-tighter text-gray-900 mt-2">Our Journey</h2>
                    </div>
                    <div className="relative pl-12 ml-4 border-l-0">
                        {/* animated line */}
                        <div className="tl-line absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 origin-top" />

                        <div className="space-y-14">
                            {TIMELINE.map((t, i) => (
                                <div key={t.year} className="tl-item opacity-0 relative">
                                    <span className="absolute -left-[52px] top-1 w-6 h-6 rounded-full border-4 border-white shadow-md"
                                        style={{ background: `linear-gradient(135deg,#6366f1,#a855f7)` }} />
                                    <span className="inline-block text-xs font-black uppercase tracking-widest text-indigo-500 mb-1">{t.year}</span>
                                    <h3 className="text-2xl font-black text-gray-900 mb-2">{t.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{t.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Team ─────────────────────────────────────────────── */}
                <section ref={teamRef} className="py-20">
                    <div className="text-center mb-14">
                        <span className="text-indigo-500 font-black text-xs uppercase tracking-widest">The people behind it</span>
                        <h2 className="text-4xl font-black tracking-tighter text-gray-900 mt-2">Meet the Team</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
                        {TEAM.map(m => (
                            <div key={m.name} className="team-card opacity-0 group text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                                <img
                                    src={m.img}
                                    alt={m.name}
                                    className="w-24 h-24 rounded-2xl object-cover mx-auto mb-5 group-hover:scale-110 transition-transform duration-500"
                                />
                                <p className="font-black text-gray-900">{m.name}</p>
                                <p className="text-xs text-indigo-500 font-bold uppercase tracking-widest mt-1">{m.role}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── CTA ──────────────────────────────────────────────── */}
                <div ref={ctaRef} className="opacity-0 my-10 relative py-20 px-10 rounded-3xl text-center overflow-hidden"
                    style={{ background: "linear-gradient(135deg,#1e1b4b,#4c1d95,#7c3aed)" }}>
                    <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 30% 50%,rgba(139,92,246,0.3),transparent 60%),radial-gradient(circle at 70% 50%,rgba(236,72,153,0.2),transparent 55%)" }} />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">Ready to Elevate Your Style?</h2>
                        <p className="text-purple-200 max-w-xl mx-auto mb-8 font-medium">Join 50,000+ customers who've already discovered what makes us different.</p>
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 bg-white text-gray-900 px-10 py-4 rounded-full font-black text-sm hover:scale-105 transition-transform active:scale-95"
                        >
                            Shop Now
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
