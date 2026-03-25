import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "../components/Hero/Hero";
import ProductCard from "../components/ProductCard/ProductCard";
import { getProducts } from "../services/productService";

gsap.registerPlugin(ScrollTrigger);

// ── Marquee ticker ──────────────────────────────────────────────────────────
const TICKER_ITEMS = ["NEW ARRIVALS", "FREE SHIPPING OVER $100", "SUMMER 2026", "PREMIUM QUALITY", "EXCLUSIVE DROPS", "LIMITED EDITIONS", "WORLDWIDE DELIVERY"];
const Marquee = () => {
    const trackRef = useRef(null);
    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        const anim = gsap.to(el, { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
        return () => anim.kill();
    }, []);
    const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
    return (
        <div className="overflow-hidden bg-black text-white py-3.5 select-none">
            <div ref={trackRef} className="flex whitespace-nowrap" style={{ width: "max-content" }}>
                {items.map((t, i) => (
                    <span key={i} className="inline-flex items-center gap-4 mx-5 text-xs font-bold uppercase tracking-[0.2em]">
                        {t}
                        <span className="text-indigo-400">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

// ── Section heading component ───────────────────────────────────────────────
const SectionHeading = ({ eyebrow, title, right }) => (
    <div className="flex justify-between items-end mb-12">
        <div>
            <span className="text-indigo-500 font-black tracking-widest uppercase text-xs">{eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 mt-2">{title}</h2>
        </div>
        {right}
    </div>
);

// ── Category cards ──────────────────────────────────────────────────────────
const CATEGORIES = [
    { name: "Sneakers", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80&auto=format&fit=crop", color: "#6366f1" },
    { name: "Electronics", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80&auto=format&fit=crop", color: "#a855f7" },
    { name: "Clothing", img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80&auto=format&fit=crop", color: "#ec4899" },
    { name: "Accessories", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80&auto=format&fit=crop", color: "#f59e0b" },
    { name: "Beauty", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80&auto=format&fit=crop", color: "#10b981" },
];

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const featuredRef = useRef(null);
    const catSectionRef = useRef(null);
    const promoBgRef = useRef(null);
    const promoTextRef = useRef(null);
    const promoStatsRef = useRef(null);

    // ── Fetch products from API ─────────────────────────────────────────────
    useEffect(() => {
        (async () => {
            try {
                const data = await getProducts();
                const list = Array.isArray(data) ? data : data?.data ?? [];
                setProducts(list);
            } catch (err) {
                setError(typeof err === "string" ? err : err?.message ?? "Failed to load products.");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // ── GSAP scroll animations ──────────────────────────────────────────────
    useEffect(() => {
        const ctx = gsap.context(() => {

            // Featured heading reveal
            if (featuredRef.current) {
                gsap.fromTo(featuredRef.current.querySelector(".section-heading"),
                    { opacity: 0, x: -40 },
                    {
                        opacity: 1, x: 0, duration: 0.8, ease: "expo.out",
                        scrollTrigger: { trigger: featuredRef.current, start: "top 80%" }
                    }
                );
            }

            // Category cards — staggered scale-in from below
            if (catSectionRef.current) {
                gsap.fromTo(catSectionRef.current.querySelectorAll(".cat-card"),
                    { opacity: 0, y: 50, scale: 0.9 },
                    {
                        opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: "expo.out",
                        scrollTrigger: { trigger: catSectionRef.current, start: "top 78%" }
                    }
                );
            }

            // Promo section — parallax + text fly-in
            if (promoBgRef.current) {
                gsap.to(promoBgRef.current, {
                    backgroundPositionY: "30%",
                    ease: "none",
                    scrollTrigger: { trigger: promoBgRef.current, start: "top bottom", end: "bottom top", scrub: true }
                });
            }
            if (promoTextRef.current) {
                gsap.fromTo(promoTextRef.current,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1, y: 0, duration: 1, ease: "expo.out",
                        scrollTrigger: { trigger: promoTextRef.current, start: "top 80%" }
                    }
                );
            }
            if (promoStatsRef.current) {
                gsap.fromTo(promoStatsRef.current.querySelectorAll(".stat-item"),
                    { opacity: 0, scale: 0.8, y: 30 },
                    {
                        opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "back.out(1.7)",
                        scrollTrigger: { trigger: promoStatsRef.current, start: "top 82%" }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, [products.length]);

    // Show first 12 products on home, rest paginated on /products
    const featured = products.slice(0, 12);

    return (
        <div className="pb-20">
            <Hero />

            {/* ── Marquee ticker ────────────────────────────────────────── */}
            <Marquee />

            {/* ── Featured Products ─────────────────────────────────────── */}
            <section ref={featuredRef} className="max-w-7xl mx-auto px-6 py-24">
                <div className="section-heading opacity-0">
                    <SectionHeading
                        eyebrow="Handpicked for you"
                        title="Featured Products"
                        right={
                            <Link to="/products" className="hidden md:flex items-center gap-2 text-sm font-black text-gray-400 hover:text-indigo-600 transition-colors group">
                                View All
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        }
                    />
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                                <div className="h-60 bg-gradient-to-br from-gray-100 to-gray-200" />
                                <div className="p-5 space-y-3">
                                    <div className="h-4 bg-gray-100 rounded-full w-3/4" />
                                    <div className="h-4 bg-gray-100 rounded-full w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-sm font-medium">{error}</p>
                        <Link to="/products" className="mt-4 inline-block text-indigo-600 font-bold text-sm underline">Try viewing all products</Link>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {featured.map((product, i) => (
                                <ProductCard key={product.id} product={product} index={i} />
                            ))}
                        </div>

                        {products.length === 0 && (
                            <div className="text-center py-20 text-gray-400 text-sm">
                                No products yet. <Link to="/admin/products" className="text-indigo-600 font-bold underline">Add some from admin →</Link>
                            </div>
                        )}

                        <div className="mt-14 text-center">
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full font-bold text-sm tracking-wide hover:scale-105 transition-transform active:scale-95 group"
                                style={{ boxShadow: "0 10px 40px -10px rgba(99,102,241,0.5)" }}
                            >
                                Explore All {products.length > 0 && `${products.length} `}Products
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </div>
                    </>
                )}
            </section>

            {/* ── Categories ─────────────────────────────────────────────── */}
            <section ref={catSectionRef} className="max-w-7xl mx-auto px-6 pb-24">
                <SectionHeading eyebrow="Browse by type" title="Shop by Category" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.name}
                            to={`/products?category=${cat.name}`}
                            className="cat-card group opacity-0 relative rounded-2xl overflow-hidden h-48 flex items-end p-5"
                            style={{ boxShadow: `0 8px 32px -8px ${cat.color}55` }}
                        >
                            <img
                                src={cat.img}
                                alt={cat.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div
                                className="absolute inset-0 opacity-70 transition-opacity duration-300 group-hover:opacity-80"
                                style={{ background: `linear-gradient(to top, ${cat.color}ee 0%, transparent 60%)` }}
                            />
                            <span className="relative z-10 text-white font-black text-sm uppercase tracking-widest drop-shadow-lg group-hover:tracking-[0.25em] transition-all duration-300">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ── Promo / Brand Strip ─────────────────────────────────────── */}
            <section
                ref={promoBgRef}
                className="relative py-32 overflow-hidden"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=2000&q=80&auto=format&fit=crop')",
                    backgroundSize: "cover",
                    backgroundPosition: "center 0%",
                }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-[2px]" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    <div ref={promoTextRef} className="opacity-0 text-white">
                        <span className="text-indigo-400 text-xs font-black uppercase tracking-[0.3em]">Why choose us</span>
                        <h2 className="text-5xl md:text-6xl font-black leading-[0.9] tracking-tighter mt-4 mb-6">
                            Redefine<br />
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#818cf8,#c084fc,#f472b6)" }}>
                                Your Everyday.
                            </span>
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed max-w-md mb-8">
                            The perfect blend of style, comfort and innovation — curated for the modern aesthete who demands more.
                        </p>
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-black text-sm hover:scale-105 transition-transform active:scale-95"
                        >
                            Explore Collection
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </div>

                    <div ref={promoStatsRef} className="grid grid-cols-2 gap-5">
                        {[
                            ["50k+", "Happy Customers", "😊"],
                            ["200+", "Premium Products", "📦"],
                            ["24/7", "Live Support", "💬"],
                            ["100%", "Secure Payment", "🔒"],
                        ].map(([v, l, icon]) => (
                            <div
                                key={l}
                                className="stat-item opacity-0 bg-white/8 backdrop-blur-xl p-7 rounded-2xl border border-white/10 hover:bg-white/14 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                            >
                                <span className="text-2xl mb-3 block">{icon}</span>
                                <span className="text-3xl font-black text-white block leading-none">{v}</span>
                                <span className="text-gray-400 text-xs font-bold mt-1.5 block uppercase tracking-wider">{l}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Trust badges ───────────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { icon: "🚀", title: "Express Delivery", desc: "Ships in 1-2 business days" },
                        { icon: "↩️", title: "Easy Returns", desc: "30-day hassle-free returns" },
                        { icon: "🛡️", title: "Buyer Protection", desc: "100% secure transactions" },
                        { icon: "🏆", title: "Authenticity Guaranteed", desc: "Every item is verified genuine" },
                    ].map((t) => (
                        <div
                            key={t.title}
                            className="group flex flex-col items-center text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <span className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">{t.icon}</span>
                            <p className="font-black text-gray-900 text-sm">{t.title}</p>
                            <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">{t.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
