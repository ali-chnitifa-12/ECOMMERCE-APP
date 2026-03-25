import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useCart } from "../context/CartContext";
import gsap from "gsap";
import ProductCard from "../components/ProductCard/ProductCard";
import { getProduct, getProducts } from "../services/productService";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(false);
    const [qty, setQty] = useState(1);

    const imgRef = useRef(null);
    const infoRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);
        setAdded(false);
        setQty(1);

        (async () => {
            try {
                const p = await getProduct(id);
                setProduct(p);

                // Fetch a few related (same name fragment or first products)
                const all = await getProducts();
                const list = Array.isArray(all) ? all : all?.data ?? [];
                setRelated(list.filter(x => String(x.id) !== String(id)).slice(0, 4));
            } catch {
                navigate("/products");
            } finally {
                setLoading(false);
            }
        })();
    }, [id, navigate]);

    // Animate when product is ready
    useEffect(() => {
        if (!product) return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
            tl.fromTo(imgRef.current,
                { opacity: 0, x: -60, rotate: -2 },
                { opacity: 1, x: 0, rotate: 0, duration: 1 }
            );
            tl.fromTo(infoRef.current,
                { opacity: 0, x: 60 },
                { opacity: 1, x: 0, duration: 1 }, "-=0.7"
            );
            tl.fromTo(".detail-meta",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.5"
            );
        });
        return () => ctx.revert();
    }, [product]);

    const handleAddToCart = () => {
        for (let i = 0; i < qty; i++) addToCart(product);
        setAdded(true);
        gsap.fromTo(".add-to-cart-btn",
            { scale: 0.93 },
            { scale: 1, duration: 0.6, ease: "elastic.out(1,0.5)" }
        );
        setTimeout(() => setAdded(false), 2000);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
                <p className="text-gray-400 text-sm font-medium">Loading product…</p>
            </div>
        </div>
    );

    if (!product) return null;

    const price = parseFloat(product.price ?? 0);

    return (
        <div className="min-h-screen pb-24" style={{ background: "linear-gradient(180deg,#f5f7ff 0%,#fff 400px)" }}>
            <div className="max-w-7xl mx-auto px-6 pt-32">

                {/* Breadcrumb */}
                <div className="detail-meta opacity-0 flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-widest mb-10">
                    <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/products" className="hover:text-indigo-600 transition-colors">Products</Link>
                    <span>/</span>
                    <span className="text-gray-700">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Image */}
                    <div
                        ref={imgRef}
                        className="opacity-0 sticky top-28 bg-white rounded-3xl overflow-hidden shadow-xl"
                        style={{ minHeight: 480, boxShadow: "0 30px 80px -20px rgba(99,102,241,0.25)" }}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-[480px] object-cover hover:scale-105 transition-transform duration-700 ease-out"
                            onError={e => { e.target.src = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&auto=format&fit=crop"; }}
                        />
                        {product.is_active === false && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="bg-white text-gray-900 font-black px-6 py-3 rounded-full text-sm uppercase tracking-widest">Unavailable</span>
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div ref={infoRef} className="opacity-0 space-y-8">

                        {/* Name + price */}
                        <div className="detail-meta">
                            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900 leading-tight mb-4">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-4 flex-wrap">
                                <span className="text-4xl font-black text-gray-900">${price.toFixed(2)}</span>
                                {product.stock > 0 ? (
                                    <span className={`text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${product.stock <= 10 ? "bg-amber-50 text-amber-600 border border-amber-200" : "bg-emerald-50 text-emerald-600 border border-emerald-200"}`}>
                                        {product.stock <= 10 ? `Only ${product.stock} left` : "In Stock"}
                                    </span>
                                ) : (
                                    <span className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-red-50 text-red-500 border border-red-200">Sold Out</span>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="detail-meta">
                            <p className="text-gray-500 text-lg leading-relaxed">{product.description}</p>
                        </div>

                        {/* Quantity */}
                        <div className="detail-meta">
                            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Quantity</p>
                            <div className="inline-flex items-center bg-gray-100 rounded-2xl overflow-hidden">
                                <button
                                    onClick={() => setQty(q => Math.max(1, q - 1))}
                                    className="w-12 h-12 flex items-center justify-center text-xl font-black text-gray-700 hover:bg-gray-200 transition-colors active:scale-90"
                                >−</button>
                                <span className="w-14 text-center font-black text-gray-900">{qty}</span>
                                <button
                                    onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                                    className="w-12 h-12 flex items-center justify-center text-xl font-black text-gray-700 hover:bg-gray-200 transition-colors active:scale-90"
                                >+</button>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="detail-meta flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className={`add-to-cart-btn flex-1 py-5 rounded-2xl font-black text-base tracking-wide shadow-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${added ? "bg-emerald-500 text-white" : "bg-black text-white hover:bg-indigo-600 hover:scale-[1.02]"
                                    }`}
                                style={{ boxShadow: added ? "0 10px 30px -8px rgb(16 185 129 / 0.4)" : "0 10px 30px -8px rgba(0,0,0,0.3)" }}
                            >
                                {added ? "✓ Added to Cart!" : `Add ${qty > 1 ? `${qty} ` : ""}to Cart`}
                            </button>
                            <button className="w-16 h-16 rounded-2xl border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </button>
                        </div>

                        {/* Guarantees */}
                        <div className="detail-meta grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { icon: "🚚", title: "Free Shipping", desc: "On orders over $100" },
                                { icon: "↩️", title: "Easy Returns", desc: "30-day return policy" },
                                { icon: "🔒", title: "Secure Checkout", desc: "SSL encrypted" },
                                { icon: "🏆", title: "Authentic", desc: "100% genuine product" },
                            ].map(g => (
                                <div key={g.title} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                    <span className="text-2xl">{g.icon}</span>
                                    <div>
                                        <p className="font-black text-gray-900 text-sm">{g.title}</p>
                                        <p className="text-xs text-gray-400">{g.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {related.length > 0 && (
                    <section className="mt-28">
                        <div className="mb-10">
                            <span className="text-indigo-500 font-black text-xs uppercase tracking-widest">You might also like</span>
                            <h2 className="text-4xl font-black tracking-tighter text-gray-900 mt-2">More Products</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
