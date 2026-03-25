import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getProduct, createProduct, updateProduct } from "../../services/productService";

// Inline spinner icon
const Spinner = ({ className = "w-5 h-5" }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
);

// Display one or more validation messages for a field
const FieldError = ({ errors, field }) => {
    const msgs = errors?.[field];
    if (!msgs?.length) return null;
    return (
        <ul className="mt-1 space-y-0.5">
            {msgs.map((msg, i) => (
                <li key={i} className="text-red-500 text-xs font-medium ml-1">{msg}</li>
            ))}
        </ul>
    );
};

const INITIAL_FORM = {
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    is_active: true,
};

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState(INITIAL_FORM);
    const [fieldErrors, setFieldErrors] = useState({});   // Laravel validation errors per field
    const [globalError, setGlobalError] = useState(null); // 403 / generic errors
    const [fetching, setFetching] = useState(false);      // loading state when fetching product
    const [submitting, setSubmitting] = useState(false);  // loading state on form submit

    // Fetch product data when editing
    useEffect(() => {
        if (!isEdit) return;
        const fetchProduct = async () => {
            setFetching(true);
            setGlobalError(null);
            try {
                const product = await getProduct(id);
                setFormData({
                    name: product.name ?? "",
                    description: product.description ?? "",
                    price: product.price ?? "",
                    stock: product.stock ?? "",
                    image: product.image ?? "",
                    is_active: product.is_active ?? true,
                });
            } catch (err) {
                setGlobalError(
                    typeof err === "string" ? err : err?.message ?? "Could not load product."
                );
            } finally {
                setFetching(false);
            }
        };
        fetchProduct();
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        // Clear field error on change
        if (fieldErrors[name]) {
            setFieldErrors((prev) => { const next = { ...prev }; delete next[name]; return next; });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setFieldErrors({});
        setGlobalError(null);

        const payload = {
            ...formData,
            price: parseFloat(formData.price) || 0,
            stock: parseInt(formData.stock, 10) || 0,
        };

        try {
            if (isEdit) {
                await updateProduct(id, payload);
            } else {
                await createProduct(payload);
            }
            navigate("/admin/products");
        } catch (err) {
            // Laravel validation errors arrive as an object keyed by field
            if (err && typeof err === "object" && !err.message) {
                setFieldErrors(err);
            } else if (err?.response?.status === 403) {
                navigate("/admin");
                setGlobalError("You are not authorized to perform this action.");
            } else {
                setGlobalError(typeof err === "string" ? err : err?.message ?? "Something went wrong.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    // Loading spinner while fetching existing product for edit
    if (fetching) {
        return (
            <div className="max-w-3xl mx-auto flex flex-col items-center justify-center py-32 space-y-4 text-gray-400">
                <Spinner className="w-10 h-10" />
                <p className="text-sm font-medium">Loading product…</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <Link
                    to="/admin/products"
                    className="text-sm font-bold text-gray-500 hover:text-black flex items-center space-x-2 transition-colors mb-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3.75 12.75M3.75 12.75L10.5 6M3.75 12.75H21" />
                    </svg>
                    <span>Back to Products</span>
                </Link>
                <h1 className="text-3xl font-bold font-display">{isEdit ? "Edit Product" : "Add New Product"}</h1>
                <p className="text-gray-500 mt-1">
                    {isEdit ? `Modifying product ID: ${id}` : "Enter the details for the new product below."}
                </p>
            </div>

            {/* Global error banner */}
            {globalError && (
                <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                    <span>{globalError}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">

                {/* Name & Price row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700 ml-1">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="e.g. Nike Air Max 270"
                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:border-black transition-all outline-none ${fieldErrors.name ? "border-red-300 bg-red-50" : "border-transparent"}`}
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <FieldError errors={fieldErrors} field="name" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700 ml-1">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            required
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:border-black transition-all outline-none ${fieldErrors.price ? "border-red-300 bg-red-50" : "border-transparent"}`}
                            value={formData.price}
                            onChange={handleChange}
                        />
                        <FieldError errors={fieldErrors} field="price" />
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">Description</label>
                    <textarea
                        name="description"
                        placeholder="Tell us about this product…"
                        rows={4}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:border-black transition-all outline-none resize-none ${fieldErrors.description ? "border-red-300 bg-red-50" : "border-transparent"}`}
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <FieldError errors={fieldErrors} field="description" />
                </div>

                {/* Stock & Image URL row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700 ml-1">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            required
                            min="0"
                            step="1"
                            placeholder="0"
                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:border-black transition-all outline-none ${fieldErrors.stock ? "border-red-300 bg-red-50" : "border-transparent"}`}
                            value={formData.stock}
                            onChange={handleChange}
                        />
                        <FieldError errors={fieldErrors} field="stock" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700 ml-1">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            placeholder="https://example.com/image.jpg"
                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:border-black transition-all outline-none ${fieldErrors.image ? "border-red-300 bg-red-50" : "border-transparent"}`}
                            value={formData.image}
                            onChange={handleChange}
                        />
                        <FieldError errors={fieldErrors} field="image" />
                    </div>
                </div>

                {/* Image Preview */}
                {formData.image && (
                    <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Image Preview</p>
                        <img
                            src={formData.image}
                            alt="Preview"
                            className="h-40 w-auto rounded-lg mx-auto shadow-sm"
                            onError={(e) => { e.target.style.display = "none"; }}
                        />
                    </div>
                )}

                {/* is_active toggle */}
                <label className="flex items-center space-x-3 cursor-pointer group w-fit">
                    <div className="relative">
                        <input
                            type="checkbox"
                            name="is_active"
                            className="sr-only peer"
                            checked={formData.is_active}
                            onChange={handleChange}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-black transition-colors" />
                        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5" />
                    </div>
                    <span className="text-sm font-bold text-gray-700">
                        {formData.is_active ? "Active (visible in store)" : "Inactive (hidden from store)"}
                    </span>
                </label>

                {/* Submit / Cancel */}
                <div className="pt-4 flex items-center space-x-4">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-black text-white rounded-2xl font-bold hover:bg-black/90 transition-all shadow-lg active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                    >
                        {submitting && <Spinner className="w-4 h-4" />}
                        {submitting ? (isEdit ? "Saving…" : "Creating…") : (isEdit ? "Update Product" : "Create Product")}
                    </button>
                    <button
                        type="button"
                        disabled={submitting}
                        onClick={() => navigate("/admin/products")}
                        className="px-8 py-4 bg-white border border-gray-200 text-gray-500 rounded-2xl font-bold hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
