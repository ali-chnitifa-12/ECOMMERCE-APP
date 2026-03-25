import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const Hero = () => {
    const heroRef = useRef(null);
    const tagRef = useRef(null);
    const titleRef = useRef(null);
    const subRef = useRef(null);
    const btnRef = useRef(null);
    const imgRef = useRef(null);
    const blob1Ref = useRef(null);
    const blob2Ref = useRef(null);
    const floatRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ── master timeline ─────────────────────────────────────────────
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            // blobs pulse in
            tl.fromTo([blob1Ref.current, blob2Ref.current],
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.6, stagger: 0.2, ease: "elastic.out(1,0.5)" }, 0
            );

            // tag pill drops in
            tl.fromTo(tagRef.current,
                { y: -30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 }, 0.3
            );

            // title chars split animation
            tl.fromTo(titleRef.current,
                { opacity: 0, y: 80, skewY: 4 },
                { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "expo.out" }, 0.4
            );

            tl.fromTo(subRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8 }, 0.8
            );

            tl.fromTo(btnRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.7)" }, 1.0
            );

            // image slides + reveals
            tl.fromTo(imgRef.current,
                { opacity: 0, x: 80, rotate: 4 },
                { opacity: 1, x: 0, rotate: 0, duration: 1.2, ease: "expo.out" }, 0.2
            );

            // floating badge
            tl.fromTo(floatRef.current,
                { opacity: 0, y: 30, scale: 0.8 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(2)" }, 1.1
            );

            // scroll indicator
            tl.fromTo(scrollRef.current,
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.6 }, 1.3
            );

            // ── continuous loops ────────────────────────────────────────────
            gsap.to(blob1Ref.current, {
                x: 40, y: -30, scale: 1.15,
                duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut"
            });
            gsap.to(blob2Ref.current, {
                x: -50, y: 40, scale: 0.9,
                duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut"
            });
            gsap.to(floatRef.current, {
                y: -14, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut"
            });
            gsap.to(scrollRef.current, {
                y: 6, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut"
            });

            // ── mousemove parallax on image ─────────────────────────────────
            const hero = heroRef.current;
            const onMove = (e) => {
                const { clientX, clientY, currentTarget } = e;
                const { width, height, left, top } = currentTarget.getBoundingClientRect();
                const rx = ((clientX - left) / width - 0.5) * 16;
                const ry = ((clientY - top) / height - 0.5) * -10;
                gsap.to(imgRef.current, {
                    rotateY: rx, rotateX: ry, duration: 0.6, ease: "power2.out"
                });
            };
            const onLeave = () => {
                gsap.to(imgRef.current, { rotateY: 0, rotateX: 0, duration: 1, ease: "elastic.out(1,0.5)" });
            };
            hero.addEventListener("mousemove", onMove);
            hero.addEventListener("mouseleave", onLeave);
            return () => {
                hero.removeEventListener("mousemove", onMove);
                hero.removeEventListener("mouseleave", onLeave);
            };
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#f0f4ff 0%,#faf0ff 50%,#fff0f7 100%)" }}
        >
            {/* Animated background blobs */}
            <div
                ref={blob1Ref}
                className="pointer-events-none absolute top-[-8%] right-[-6%] w-[560px] h-[560px] rounded-full blur-3xl opacity-0"
                style={{ background: "radial-gradient(circle,#c7d2fe,#a5b4fc 60%,transparent)" }}
            />
            <div
                ref={blob2Ref}
                className="pointer-events-none absolute bottom-[-10%] left-[-8%] w-[680px] h-[680px] rounded-full blur-3xl opacity-0"
                style={{ background: "radial-gradient(circle,#f0abfc,#c084fc 60%,transparent)" }}
            />

            {/* Grid content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-28">

                {/* Left — copy */}
                <div className="flex flex-col space-y-7">
                    <div ref={tagRef} className="opacity-0 flex items-center gap-2 w-fit">
                        <span className="inline-flex items-center gap-1.5 bg-black text-white text-xs font-bold px-4 py-2 rounded-full tracking-widest uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            New Collection 2026
                        </span>
                    </div>

                    <h1
                        ref={titleRef}
                        className="opacity-0 text-6xl md:text-[5.5rem] font-bold leading-[0.88] tracking-tighter text-gray-900"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        ELEVATE<br />
                        YOUR<br />
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: "linear-gradient(135deg,#6366f1,#a855f7,#ec4899)" }}
                        >
                            STYLE.
                        </span>
                    </h1>

                    <p ref={subRef} className="opacity-0 text-lg text-gray-500 max-w-md leading-relaxed">
                        Discover the rarest blend of fashion and technology — curated for those who refuse to settle for ordinary.
                    </p>

                    <div ref={btnRef} className="opacity-0 flex items-center gap-4 flex-wrap">
                        <Link
                            to="/products"
                            className="group relative inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full text-sm font-bold tracking-wide overflow-hidden transition-all hover:scale-105 active:scale-95"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="relative">SHOP NOW</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                        <Link
                            to="/about"
                            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors border-b border-transparent hover:border-gray-900 pb-0.5"
                        >
                            Our Story
                        </Link>
                    </div>

                    {/* Stats row */}
                    <div className="flex gap-8 pt-4">
                        {[["50k+", "Happy Customers"], ["200+", "Premium Items"], ["4.9★", "Avg Rating"]].map(([v, l]) => (
                            <div key={l}>
                                <p className="text-2xl font-black text-gray-900">{v}</p>
                                <p className="text-xs text-gray-400 font-medium mt-0.5">{l}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right — image */}
                <div
                    ref={imgRef}
                    className="relative h-[580px] w-full hidden md:block opacity-0"
                    style={{ perspective: "800px", transformStyle: "preserve-3d" }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=85&auto=format&fit=crop"
                        alt="Hero Fashion Model"
                        className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl"
                        style={{ boxShadow: "0 40px 100px -20px rgba(99,102,241,0.35)" }}
                    />

                    {/* Floating badge */}
                    <div
                        ref={floatRef}
                        className="opacity-0 absolute -bottom-6 -left-10 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-2xl max-w-[220px] border border-white/60"
                    >
                        <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Trending Now</span>
                        <p className="font-black text-gray-900 text-base mt-1">New Arrivals</p>
                        <p className="text-xs text-gray-400 mt-0.5">Summer 2026 Collection</p>
                    </div>

                    {/* Top badge */}
                    <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-xl text-white text-xs font-bold px-4 py-2 rounded-full">
                        ✦ Premium Quality
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div ref={scrollRef} className="opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Scroll</span>
                <div className="w-px h-10 bg-gradient-to-b from-gray-400 to-transparent" />
            </div>
        </section>
    );
};

export default Hero;
