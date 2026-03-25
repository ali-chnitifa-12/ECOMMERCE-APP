import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SOCIALS = [
    { name: "Instagram", icon: "📸", href: "#" },
    { name: "Twitter", icon: "🐦", href: "#" },
    { name: "TikTok", icon: "🎵", href: "#" },
];

const Contact = () => {
    const heroRef = useRef(null);
    const cardRef = useRef(null);
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
            tl.fromTo(".contact-tag", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
            tl.fromTo(".contact-h1", { opacity: 0, y: 50, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 1 }, "-=0.3");
            tl.fromTo(".contact-sub", { opacity: 0 }, { opacity: 1, duration: 0.7 }, "-=0.5");
            tl.fromTo(cardRef.current,
                { opacity: 0, y: 60, scale: 0.96 },
                { opacity: 1, y: 0, scale: 1, duration: 1, ease: "expo.out" }, "-=0.4"
            );
            tl.fromTo(".contact-info-item",
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 }, "-=0.5"
            );
        }, heroRef);
        return () => ctx.revert();
    }, []);

    const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 1400)); // simulate send
        setLoading(false);
        setSent(true);
        gsap.fromTo(".success-msg",
            { opacity: 0, scale: 0.85, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.7)" }
        );
    };

    return (
        <div ref={heroRef} className="min-h-screen pb-24 overflow-hidden" style={{ background: "linear-gradient(180deg,#f5f7ff 0%,#fff 400px)" }}>
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="pt-32 pb-16 text-center">
                    <span className="contact-tag opacity-0 inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border border-indigo-100 mb-6">
                        💬 Talk to Us
                    </span>
                    <h1 className="contact-h1 opacity-0 text-6xl md:text-7xl font-black tracking-tighter text-gray-900 mb-5">
                        Get in <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#6366f1,#a855f7,#ec4899)" }}>Touch</span>
                    </h1>
                    <p className="contact-sub opacity-0 text-gray-400 max-w-xl mx-auto text-lg font-medium leading-relaxed">
                        Questions, feedback, or just want to say hello? We'd love to hear from you — our team responds within 24 hours.
                    </p>
                </div>

                {/* Main card */}
                <div ref={cardRef} className="opacity-0 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100" style={{ boxShadow: "0 40px 100px -20px rgba(99,102,241,0.15)" }}>
                    <div className="grid grid-cols-1 lg:grid-cols-5">

                        {/* Left info panel */}
                        <div
                            className="lg:col-span-2 p-12 flex flex-col justify-between relative overflow-hidden"
                            style={{ background: "linear-gradient(135deg,#1e1b4b,#4c1d95,#6d28d9)" }}
                        >
                            {/* BG decoration */}
                            <div className="pointer-events-none absolute top-[-60px] right-[-60px] w-[260px] h-[260px] rounded-full opacity-20" style={{ background: "radial-gradient(circle,#a78bfa,transparent)" }} />
                            <div className="pointer-events-none absolute bottom-[-40px] left-[-40px] w-[200px] h-[200px] rounded-full opacity-20" style={{ background: "radial-gradient(circle,#f472b6,transparent)" }} />

                            <div className="relative z-10">
                                <h2 className="text-3xl font-black text-white mb-4">Contact Info</h2>
                                <p className="text-purple-200 text-sm leading-relaxed mb-10">
                                    Fill out the form and we'll get back to you as soon as possible, usually within a business day.
                                </p>

                                <div className="space-y-6">
                                    {[
                                        { icon: "📧", label: "Email", val: "hello@fittrack.com" },
                                        { icon: "📞", label: "Phone", val: "+1 (555) 123-4567" },
                                        { icon: "📍", label: "Address", val: "123 Style Ave, New York, NY" },
                                        { icon: "🕐", label: "Hours", val: "Mon–Fri, 9AM–6PM EST" },
                                    ].map(item => (
                                        <div key={item.label} className="contact-info-item opacity-0 flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg flex-shrink-0">{item.icon}</div>
                                            <div>
                                                <p className="text-purple-300 text-xs font-black uppercase tracking-widest">{item.label}</p>
                                                <p className="text-white font-medium mt-0.5">{item.val}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Socials */}
                            <div className="relative z-10 mt-12">
                                <p className="text-purple-300 text-xs font-black uppercase tracking-widest mb-4">Follow us</p>
                                <div className="flex gap-3">
                                    {SOCIALS.map(s => (
                                        <a
                                            key={s.name}
                                            href={s.href}
                                            title={s.name}
                                            className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition-all hover:scale-110 active:scale-90"
                                        >
                                            {s.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right form */}
                        <div className="lg:col-span-3 p-12 flex items-center">
                            {sent ? (
                                <div className="success-msg opacity-0 w-full text-center py-12">
                                    <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6 text-4xl">✅</div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-3">Message Sent!</h3>
                                    <p className="text-gray-400">We'll get back to you at <strong>{form.email}</strong> within 24 hours.</p>
                                    <button
                                        onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                                        className="mt-8 px-8 py-3 bg-black text-white rounded-full font-bold text-sm hover:scale-105 transition-transform"
                                    >
                                        Send Another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="w-full space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                                            <input
                                                type="text" name="name" required
                                                value={form.name} onChange={handleChange}
                                                placeholder="Alex Morgan"
                                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                                            <input
                                                type="email" name="email" required
                                                value={form.email} onChange={handleChange}
                                                placeholder="alex@example.com"
                                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Subject</label>
                                        <input
                                            type="text" name="subject"
                                            value={form.subject} onChange={handleChange}
                                            placeholder="What's this about?"
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Message</label>
                                        <textarea
                                            name="message" rows={5} required
                                            value={form.message} onChange={handleChange}
                                            placeholder="Tell us what's on your mind…"
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-5 rounded-2xl font-black text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-3"
                                        style={{ background: "linear-gradient(135deg,#6366f1,#a855f7,#ec4899)", color: "white", boxShadow: "0 10px 30px -8px rgba(99,102,241,0.45)" }}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                                Sending…
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
