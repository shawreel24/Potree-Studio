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
      setProducts(fallbackProducts);
    } else if (data && data.length > 0) {
      setProducts(data);
    } else if (data && data.length === 0) {
      // If table is empty, auto-populate it with fallback products
      console.log("Auto-populating Supabase products table...");
      const productsToInsert = fallbackProducts.map(({ id, ...rest }) => ({
        ...rest,
        quantity: 10, // Give them an initial stock of 10
      }));
      
      const { error: insertError } = await supabase
        .from('products')
        .insert(productsToInsert);
        
      if (!insertError) {
        // Fetch again to get the new UUIDs
        const { data: newData } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        if (newData) setProducts(newData);
      } else {
        console.error("Error populating products:", insertError);
        setProducts(fallbackProducts);
      }
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
      alert("Failed to add product.");
    } else if (data) {
      setProducts((prev) => [data[0], ...prev]);
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
      alert("Failed to update product.");
    } else if (data) {
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === id ? data[0] : p))
      );
    }
  };

  const deleteProduct = async (id) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    } else {
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
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
