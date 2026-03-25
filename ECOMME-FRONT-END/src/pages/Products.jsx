import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getProducts } from "../services/productService";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["All", "Sneakers", "Electronics", "Clothing", "Accessories", "Beauty"];

const Products = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCat, setSelectedCat] = useState("All");
    const [priceRange, setPriceRange] = useState(3000);
    const [sort, setSort] = useState("default");

    const headerRef = useRef(null);
    const gridRef = useRef(null);

    // Read category from URL param (e.g. from Home category cards)
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const cat = params.get("category");
        if (cat && CATEGORIES.includes(cat)) setSelectedCat(cat);
    }, [location.search]);

    useEffect(() => {
        (async () => {
            try {
                const data = await getProducts();
                setProducts(Array.isArray(data) ? data : data?.data ?? []);
            } catch (err) {
                setError(typeof err === "string" ? err : err?.message ?? "Failed to load.");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Animate header on mount
    useEffect(() => {
        if (!headerRef.current) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(".header-eyebrow", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" });
            gsap.fromTo(".header-title", { opacity: 0, y: 40, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: "expo.out", delay: 0.1 });
            gsap.fromTo(".header-sub", { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.3 });
        }, headerRef);
        return () => ctx.revert();
    }, []);

    const maxPrice = products.reduce((m, p) => Math.max(m, parseFloat(p.price ?? 0)), 0) || 3000;

    const filtered = products
        .filter(p => selectedCat === "All" || p.category === selectedCat)
        .filter(p => parseFloat(p.price ?? 0) <= priceRange)
        .filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (sort === "price-asc") return parseFloat(a.price) - parseFloat(b.price);
            if (sort === "price-desc") return parseFloat(b.price) - parseFloat(a.price);
            if (sort === "name") return a.name.localeCompare(b.name);
            return 0;
        });

    return (
        <div className="min-h-screen pb-24" style={{ background: "linear-gradient(180deg,#f5f7ff 0%,#ffffff 300px)" }}>

            {/* ── Animated Header ──────────────────────────────────────── */}
            <div ref={headerRef} className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
                {/* decorative blur blobs */}
                <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-3xl opacity-30"
                    style={{ background: "radial-gradient(circle,#c7d2fe,#f0abfc 60%,transparent)" }} />
                <span className="header-eyebrow opacity-0 inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border border-indigo-100 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Shop Collection
                </span>
                <h1 className="header-title opacity-0 text-5xl md:text-7xl font-black tracking-tighter text-gray-900 mb-5">
                    All Products
                </h1>
                <p className="header-sub opacity-0 text-gray-400 max-w-xl mx-auto font-medium leading-relaxed">
                    Explore our curated selection of premium products — quality meets design in every single piece.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {/* ── Filter Bar ─────────────────────────────────────────── */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">

                    {/* Search */}
                    <div className="relative w-full md:w-72">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                        />
                    </div>

                    {/* Category pills */}
                    <div className="flex gap-2 flex-wrap justify-center">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCat(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-200 ${selectedCat === cat
                                    ? "bg-black text-white shadow-md"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Sort + Price */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                        <select
                            value={sort}
                            onChange={e => setSort(e.target.value)}
                            className="text-sm font-bold bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 focus:outline-none focus:border-indigo-400 cursor-pointer"
                        >
                            <option value="default">Sort: Default</option>
                            <option value="price-asc">Price: Low → High</option>
                            <option value="price-desc">Price: High → Low</option>
                            <option value="name">Name A–Z</option>
                        </select>
                    </div>
                </div>

                {/* Price slider */}
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Max Price</span>
                    <input
                        type="range"
                        min={0} max={Math.ceil(maxPrice / 100) * 100 || 3000}
                        value={priceRange}
                        onChange={e => setPriceRange(Number(e.target.value))}
                        className="flex-1 accent-indigo-600 cursor-pointer"
                    />
                    <span className="text-sm font-black text-indigo-600 whitespace-nowrap w-20 text-right">${priceRange.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
                </div>

                {/* ── Grid ────────────────────────────────────────────────── */}
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
                    <div className="text-center py-20 text-gray-400 font-medium">{error}</div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-24">
                        <div className="text-6xl mb-4">🔍</div>
                        <p className="text-xl font-black text-gray-400">No products found</p>
                        <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
                        <button
                            onClick={() => { setSelectedCat("All"); setPriceRange(3000); setSearchQuery(""); setSort("default"); }}
                            className="mt-6 px-6 py-3 bg-black text-white rounded-full text-sm font-bold hover:scale-105 transition-transform"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filtered.map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
