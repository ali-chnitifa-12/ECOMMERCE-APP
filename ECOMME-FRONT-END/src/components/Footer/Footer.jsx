
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-20 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold font-display">LUXE.</h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                        Redefining modern luxury through exceptional design and craftsmanship.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-lg font-medium">SHOP</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li className="hover:text-white cursor-pointer transition-colors">New Arrivals</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Best Sellers</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Accessories</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Sale</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-lg font-medium">SUPPORT</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
                        <li className="hover:text-white cursor-pointer transition-colors">FAQs</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Shipping & Returns</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-lg font-medium">STAY UPDATED</h4>
                    <p className="text-sm text-gray-400">Subscribe for exclusive offers and updates.</p>
                    <form className="flex">
                        <input type="email" placeholder="Your email" className="bg-gray-800 text-white px-4 py-2 text-sm focus:outline-none w-full" />
                        <button className="bg-white text-black px-6 py-2 text-sm font-medium hover:bg-gray-200 transition-colors">JOIN</button>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <p>&copy; 2026 LUXE. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Pinterest</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
