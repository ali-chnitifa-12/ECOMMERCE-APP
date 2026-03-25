
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
    const { getCartCount } = useCart();
    const navRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        gsap.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold font-display tracking-tight hover:opacity-80 transition-opacity">
                    LUXE.
                </Link>

                <div className="hidden md:flex items-center space-x-10 font-medium text-sm tracking-wide">
                    <Link to="/" className="hover:text-gray-500 transition-colors">HOME</Link>
                    <Link to="/products" className="hover:text-gray-500 transition-colors">SHOP</Link>
                    <Link to="/about" className="hover:text-gray-500 transition-colors">ABOUT</Link>
                    <Link to="/contact" className="hover:text-gray-500 transition-colors">CONTACT</Link>
                    <Link to="/login" className="hover:text-gray-500 transition-colors">LOGIN</Link>
                    <Link to="/register" className="hover:text-gray-500 transition-colors">REGISTER</Link>
                    <Link to="/admin" className="hover:text-gray-500 transition-colors font-bold text-red-500">ADMIN</Link>
                </div>

                <div className="flex items-center space-x-6">
                    <button className="hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>

                    <Link to="/cart" className="relative group hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full">
                            {getCartCount()}
                        </span>
                    </Link>

                    <Link to="/login" className="hover:scale-110 transition-transform hidden sm:block">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </Link>

                    <button className="md:hidden" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col space-y-4 md:hidden animate-fade-in shadow-xl">
                    <Link to="/" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>HOME</Link>
                    <Link to="/products" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>SHOP</Link>
                    <Link to="/about" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>ABOUT</Link>
                    <Link to="/contact" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>CONTACT</Link>
                    <Link to="/login" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>LOGIN</Link>
                    <Link to="/register" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>REGISTER</Link>
                    <Link to="/admin" className="text-lg font-bold text-red-500" onClick={() => setIsMenuOpen(false)}>ADMIN</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
