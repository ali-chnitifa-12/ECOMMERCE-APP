import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product, index = 0 }) => {
    const cardRef = useRef(null);
    const imgRef = useRef(null);
    const glowRef = useRef(null);
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;

        // ── scroll reveal ──────────────────────────────────────────────────
        gsap.fromTo(el,
            { opacity: 0, y: 60, scale: 0.92 },
            {
                opacity: 1, y: 0, scale: 1,
                duration: 0.7,
                delay: (index % 4) * 0.08,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 92%",
                    toggleActions: "play none none none",
                }
            }
        );

        // ── tilt on hover ──────────────────────────────────────────────────
        const onMove = (e) => {
            const rect = el.getBoundingClientRect();
            const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
            const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
            gsap.to(el, { rotateX: rx, rotateY: ry, duration: 0.3, ease: "power2.out", transformPerspective: 800 });
            gsap.to(glowRef.current, { opacity: 0.6, duration: 0.3 });
        };
        const onLeave = () => {
            gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "elastic.out(1,0.6)" });
            gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        return () => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
        };
    }, [index]);

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
        setAdded(true);
        gsap.fromTo(e.currentTarget,
            { scale: 0.88 },
            { scale: 1, duration: 0.5, ease: "elastic.out(1,0.5)" }
        );
        setTimeout(() => setAdded(false), 1800);
    };

    const price = parseFloat(product.price ?? 0);

    return (
        <div
            ref={cardRef}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-md cursor-pointer"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
            {/* Glow overlay on hover */}
            <div
                ref={glowRef}
                className="pointer-events-none absolute inset-0 rounded-2xl z-10 opacity-0 transition-opacity"
                style={{ background: "radial-gradient(circle at 50% 50%,rgba(99,102,241,0.12),transparent 70%)", boxShadow: "inset 0 0 0 1.5px rgba(99,102,241,0.35)" }}
            />

            {/* Status badge */}
            {product.is_active === false && (
                <div className="absolute top-3 left-3 z-20 bg-black/70 text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm">
                    Unavailable
                </div>
            )}

            {/* Image */}
            <Link to={`/product/${product.id}`} className="block relative h-60 overflow-hidden bg-gray-100">
                <img
                    ref={imgRef}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=70&auto=format&fit=crop"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>

            {/* Info */}
            <div className="p-5">
                <Link to={`/product/${product.id}`}>
                    <h3 className="font-black text-gray-900 text-base leading-tight group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center justify-between mt-4">
                    <div>
                        <span className="text-xl font-black text-gray-900">${price.toFixed(2)}</span>
                        {product.stock !== undefined && (
                            <span className={`ml-2 text-[10px] font-bold uppercase tracking-wider ${product.stock > 10 ? "text-emerald-500" : product.stock > 0 ? "text-amber-500" : "text-red-400"}`}>
                                {product.stock > 0 ? `${product.stock} left` : "Sold out"}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed
                            ${added
                                ? "bg-emerald-500 text-white scale-105"
                                : "bg-black text-white hover:bg-indigo-600"
                            }`}
                    >
                        {added ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                                Added
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Add
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
