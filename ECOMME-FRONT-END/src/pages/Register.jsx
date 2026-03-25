import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import gsap from "gsap";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const blob1Ref = useRef(null);
    const blob2Ref = useRef(null);

    // ── Crazy Entrance & Background Animations ──────────────────────
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Soft background mesh blobs
            gsap.to(blob1Ref.current, {
                x: "random(-100, 100)", y: "random(-100, 100)",
                duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut"
            });
            gsap.to(blob2Ref.current, {
                x: "random(80, -80)", y: "random(80, -80)",
                duration: 18, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5
            });

            // Card entrance - flip in from side
            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
            tl.fromTo(cardRef.current,
                { opacity: 0, x: 80, rotateY: -20, scale: 0.95 },
                { opacity: 1, x: 0, rotateY: 0, scale: 1, duration: 1.6 }
            );
            tl.fromTo(".reg-stagger",
                { opacity: 0, x: 40 },
                { opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: "back.out(1.4)" }, "-=1.2"
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // ── 3D Tilt Effect ──────────────────────────────────────────────
    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const tiltX = (y - 0.5) * 12;
        const tiltY = (x - 0.5) * -12;
        gsap.to(card, { rotateX: tiltX, rotateY: tiltY, duration: 0.5, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 1, ease: "elastic.out(1, 0.4)" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await register(name, email, password);
            gsap.to(cardRef.current, { scale: 1.05, opacity: 0, duration: 0.5 });
            setTimeout(() => navigate("/login"), 500);
        } catch (err) {
            setLoading(false);
            setError("Registration failed. Please check your details.");
            gsap.fromTo(cardRef.current, { x: -8 }, { x: 8, duration: 0.1, repeat: 4, yoyo: true });
        }
    };

    return (
        <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f8faff] pt-20">

            {/* ── Background Mesh ─────────────────────────────────────── */}
            <div className="absolute inset-0 z-0">
                <div ref={blob1Ref} className="absolute top-[15%] right-[10%] w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px]" />
                <div ref={blob2Ref} className="absolute bottom-[20%] left-[5%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px]" />
            </div>

            {/* ── Register Card ───────────────────────────────────────── */}
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative z-10 w-full max-w-[480px] px-10 py-12 rounded-[3rem] border border-white shadow-[0_32px_80px_-20px_rgba(0,0,0,0.08)] backdrop-blur-3xl bg-white/70 mx-4"
                style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
            >
                <div className="relative z-10 text-center mb-10">
                    <span className="reg-stagger inline-block text-[10px] font-black tracking-[0.4em] uppercase text-indigo-500 mb-4 px-4 py-1.5 rounded-full border border-indigo-100 bg-indigo-50">
                        Initiation Protocol
                    </span>
                    <h2 className="reg-stagger text-5xl font-black text-gray-900 tracking-tighter mb-4">Join Us</h2>
                    <p className="reg-stagger text-gray-400 font-medium">Create your premium digital identity.</p>
                </div>

                {error && (
                    <div className="reg-stagger bg-red-50 border border-red-100 text-red-500 p-4 rounded-2xl mb-8 text-sm text-center font-bold">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">

                    <div className="reg-stagger">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-2">Display Name</label>
                        <input
                            type="text" required
                            value={name} onChange={(e) => setName(e.target.value)}
                            className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl text-gray-900 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50/50 transition-all duration-300 shadow-sm"
                            placeholder="Alex Morgan"
                        />
                    </div>

                    <div className="reg-stagger">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-2">Signal Address</label>
                        <input
                            type="email" required
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl text-gray-900 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50/50 transition-all duration-300 shadow-sm"
                            placeholder="alex@nexus.com"
                        />
                    </div>

                    <div className="reg-stagger">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-2">Security Key</label>
                        <input
                            type="password" required
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl text-gray-900 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50/50 transition-all duration-300 shadow-sm"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="reg-stagger pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="relative group w-full py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] text-white overflow-hidden transition-all duration-500 disabled:opacity-50 shadow-xl"
                            style={{ boxShadow: "0 20px 40px -10px rgba(236,72,153,0.3)" }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 group-hover:scale-110 transition-transform duration-500" />
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Establish Link
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                        </svg>
                                    </>
                                )}
                            </span>
                        </button>
                    </div>
                </form>

                <div className="reg-stagger mt-10 text-center">
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        Already Identified?{" "}
                        <Link to="/login" className="text-pink-600 hover:text-pink-500 ml-1 transition-colors underline decoration-2 underline-offset-4">Authenticate</Link>
                    </p>
                </div>
            </div>

            {/* Geometric Decors */}
            <div className="absolute top-[10%] left-[10%] w-24 h-24 border border-indigo-50 rounded-full rotate-[15deg] pointer-events-none" />
            <div className="absolute bottom-[15%] right-[8%] w-40 h-40 border border-pink-50 rounded-[3rem] rotate-[45deg] pointer-events-none" />
        </div>
    );
};

export default Register;
