
const Filters = ({ categories, selectedCategory, onSelectCategory, priceRange, setPriceRange, maxPrice }) => {
    return (
        <div className="space-y-8 sticky top-24">
            <div>
                <h3 className="text-lg font-bold mb-4 font-display">Categories</h3>
                <ul className="space-y-2">
                    <li
                        onClick={() => onSelectCategory("All")}
                        className={`cursor-pointer text-sm transition-colors ${selectedCategory === "All" ? "font-bold text-black" : "text-gray-500 hover:text-black"}`}
                    >
                        All Products
                    </li>
                    {categories.map((category) => (
                        <li
                            key={category}
                            onClick={() => onSelectCategory(category)}
                            className={`cursor-pointer text-sm transition-colors ${selectedCategory === category ? "font-bold text-black" : "text-gray-500 hover:text-black"}`}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-lg font-bold mb-4 font-display">Price Range</h3>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span>$0</span>
                    <span>${priceRange}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
            </div>
        </div>
    )
}

export default Filters
