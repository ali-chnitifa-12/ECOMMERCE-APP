/**
 * Product Service (Local JSON Fallback)
 * ------------------------------------
 * This version of the service uses the local src/data/products.json file
 * to ensure products are displayed correctly even without a running backend.
 */

import productsData from "../data/products.json";

/**
 * Fetches all products from local JSON.
 * @returns {Promise<Array>}
 */
export const getProducts = async () => {
    // Simulate API delay for better UX (skeletons will show briefly)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(productsData);
        }, 500);
    });
};

/**
 * Fetches a single product by ID from local JSON.
 * @param {string|number} id 
 * @returns {Promise<Object>}
 */
export const getProduct = async (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = productsData.find(p => String(p.id) === String(id));
            if (product) {
                resolve(product);
            } else {
                reject(new Error("Product not found"));
            }
        }, 300);
    });
};

/**
 * Placeholder for createProduct (Local only - does not persist)
 */
export const createProduct = async (productData) => {
    console.log("Create product (local):", productData);
    return Promise.resolve({ ...productData, id: Date.now() });
};

/**
 * Placeholder for updateProduct (Local only - does not persist)
 */
export const updateProduct = async (id, productData) => {
    console.log(`Update product ${id} (local):`, productData);
    return Promise.resolve({ ...productData, id });
};

/**
 * Placeholder for deleteProduct (Local only - does not persist)
 */
export const deleteProduct = async (id) => {
    console.log(`Delete product ${id} (local)`);
    return Promise.resolve();
};
