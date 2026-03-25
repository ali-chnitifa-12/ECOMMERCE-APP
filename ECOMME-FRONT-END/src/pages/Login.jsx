import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import gsap from "gsap";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const blob1Ref = useRef(null);
    const blob2Ref = useRef(null);
    const blob3Ref = useRef(null);

    // ── Crazy Entrance & Background Animations ──────────────────────
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background mesh blobs floating - softer for light mode
            gsap.to(blob1Ref.current, {
                x: "random(-80, 80)", y: "random(-80, 80)",
                duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut"
            });
            gsap.to(blob2Ref.current, {
                x: "random(-100, 100)", y: "random(-100, 100)",
                duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1
            });
            gsap.to(blob3Ref.current, {
                x: "random(-90, 90)", y: "random(-90, 90)",
                duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2
            });

            // Card entrance
            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
            tl.fromTo(cardRef.current,
                { opacity: 0, scale: 0.9, y: 80, rotateX: 10 },
                { opacity: 1, scale: 1, y: 0, rotateX: 0, duration: 1.4 }
            );
            tl.fromTo(".auth-stagger",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=1"
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // ── 3D Tilt Effect on Mouse Move ───────────────────────────────
    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
            rotateX: 0, rotateY: 0, duration: 0.8, ease: "elastic.out(1, 0.5)"
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await login(email, password);
            gsap.to(cardRef.current, { scale: 1.02, duration: 0.3, ease: "power2.out" });

            setTimeout(() => {
                if (data.user.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            }, 400);

        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || "Login failed. Please check credentials.");
            gsap.fromTo(cardRef.current,
                { x: -8 },
                { x: 8, duration: 0.1, repeat: 4, yoyo: true, ease: "linear", onComplete: () => gsap.set(cardRef.current, { x: 0 }) }
            );
        }
    };

    return (
        <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f8faff] pt-20">

            {/* ── Soft Mesh Background ────────────────────────────────── */}
            <div className="absolute inset-0 z-0">
                <div ref={blob1Ref} className="absolute top-[5%] left-[10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" />
                <div ref={blob2Ref} className="absolute bottom-[5%] right-[5%] w-[700px] h-[700px] bg-purple-500/10 rounded-full blur-[140px]" />
                <div ref={blob3Ref} className="absolute top-[35%] left-[45%] w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[100px]" />
            </div>

            {/* ── Login Card ─────────────────────────────────────────── */}
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative z-10 w-full max-w-[450px] px-10 py-12 rounded-[2.5rem] border border-white shadow-[0_32px_80px_-20px_rgba(0,0,0,0.08)] backdrop-blur-[16px] bg-white/70 mx-4"
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
                <div className="relative z-10 text-center mb-10">
                    <div className="auth-stagger inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 mb-6 mx-auto">
                        <span className="text-3xl">✦</span>
                    </div>
                    <h2 className="auth-stagger text-4xl font-black text-gray-900 tracking-tighter mb-3">Welcome Back</h2>
                    <p className="auth-stagger text-gray-400 font-medium">Premium access to your curated lifestyle.</p>
                </div>

                {error && (
                    <div className="auth-stagger bg-red-50 border border-red-100 text-red-500 p-4 rounded-2xl mb-6 text-sm font-bold text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="auth-stagger">
                        <label className="block text-xs font-black text-indigo-500 uppercase tracking-[0.2em] mb-3 ml-1">Identity Signal</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-300 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50/50 transition-all duration-300 shadow-sm"
                            placeholder="name@nexus.com"
                        />
                    </div>

                    <div className="auth-stagger">
                        <div className="flex justify-between items-center mb-3 ml-1">
                            <label className="block text-xs font-black text-indigo-500 uppercase tracking-[0.2em]">Security Key</label>
                            <Link to="#" className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">Recover</Link>
                        </div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-300 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50/50 transition-all duration-300 shadow-sm"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="auth-stagger pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="relative group w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.25em] text-white overflow-hidden transition-all duration-300 disabled:opacity-50 shadow-xl"
                            style={{ boxShadow: "0 20px 40px -10px rgba(99,102,241,0.4)" }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_100%] group-hover:bg-[100%_0%] transition-all duration-700" />
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Authorize Access
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                        </svg>
                                    </>
                                )}
                            </span>
                        </button>
                    </div>
                </form>

                <div className="auth-stagger mt-10 text-center">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                        Not a member?{" "}
                        <Link to="/register" className="text-indigo-600 hover:text-indigo-500 ml-1 transition-colors underline underline-offset-4 decoration-2">Initiate Enrollment</Link>
                    </p>
                </div>
            </div>

            {/* Geometric Decors */}
            <div className="absolute top-20 right-20 w-32 h-32 border border-gray-100 rounded-full animate-pulse-slow pointer-events-none" />
            <div className="absolute bottom-40 left-20 w-16 h-16 border border-indigo-100 rounded-xl rotate-45 animate-bounce-slow pointer-events-none" />
        </div>
    );
};

export default Login;
