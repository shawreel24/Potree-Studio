import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { products as fallbackProducts } from '../data/products';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Supabase
  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching products from Supabase:", error);
      // Only fallback to hardcoded products if Supabase connection fails
      setProducts(fallbackProducts);
    } else {
      // Respect whatever Supabase returns, even if the user has deleted all products (empty array [])
      setProducts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (newProduct) => {
    const { data, error } = await supabase
      .from('products')
      .insert([newProduct])
      .select();

    if (error) {
      console.error("Error adding product:", error);
      const isMissingColumn = error.message && (error.message.includes('images') || error.message.includes('column') || error.message.includes('schema'));
      alert(`Failed to add product: ${error.message}${isMissingColumn ? '\n\nTip: To store multiple pictures in Supabase, add an "images" column (type: text[] or jsonb) to your "products" table in Supabase dashboard.' : ''}`);
      return false;
    } else if (data && data.length > 0) {
      setProducts((prev) => [data[0], ...prev]);
      return true;
    } else {
      alert("Failed to add product. Please check Supabase Row Level Security (RLS) INSERT policies.");
      return false;
    }
  };

  const updateProduct = async (updatedProduct) => {
    const { id, created_at, ...updateData } = updatedProduct;
    
    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      console.error("Error updating product:", error);
      const isMissingColumn = error.message && (error.message.includes('images') || error.message.includes('column') || error.message.includes('schema'));
      alert(`Failed to update product: ${error.message}${isMissingColumn ? '\n\nTip: To store multiple pictures in Supabase, add an "images" column (type: text[] or jsonb) to your "products" table in Supabase dashboard.' : ''}`);
      return false;
    } else if (data && data.length > 0) {
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === id ? data[0] : p))
      );
      return true;
    } else {
      alert("Product update failed in Supabase. Please check your Table Row Level Security (RLS) UPDATE policies.");
      return false;
    }
  };

  const deleteProduct = async (id) => {
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product: " + error.message);
      return false;
    } else if (data && data.length === 0) {
      console.error("No rows were deleted from Supabase. Likely blocked by Row Level Security (RLS) policies.");
      alert("Delete failed! Supabase rejected the deletion. Please enable DELETE permission in your Supabase Row Level Security (RLS) policies for the 'products' table.");
      // Re-fetch products to restore synchronization with database
      fetchProducts();
      return false;
    } else {
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
      return true;
    }
  };

  const value = {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    refreshProducts: fetchProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
