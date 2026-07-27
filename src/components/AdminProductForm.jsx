import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { assetUrl } from '../lib/assetUrl';

const AdminProductForm = ({ product, onSubmit, onCancel }) => {
  const isEditing = !!product;
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    image: '',
    images: [],
    description: '',
    tags: '',
    quantity: 0,
  });
  const [urlInput, setUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (product) {
      const productImages = product.images ? (Array.isArray(product.images) ? [...product.images] : [product.images]) : (product.image ? [product.image] : []);
      setFormData({
        title: product.title || '',
        price: product.price || '',
        image: product.image || productImages[0] || '',
        images: productImages,
        description: product.description || '',
        tags: product.tags ? product.tags.join(', ') : '',
        quantity: product.quantity || 0,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      setIsUploading(true);
      setUploadError(null);
      const newUrls = [];

      for (const file of files) {
        // Create a unique file name to prevent overwrites and handle special characters
        const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filePath = `product-images/${Date.now()}_${cleanFileName}`;

        // Upload to Supabase storage bucket named 'products'
        const { error } = await supabase.storage
          .from('products')
          .upload(filePath, file, { cacheControl: '3600', upsert: false });

        if (error) {
          throw error;
        }

        // Retrieve the public URL of the uploaded picture
        const { data: { publicUrl } } = supabase.storage
          .from('products')
          .getPublicUrl(filePath);

        newUrls.push(publicUrl);
      }

      setFormData((prev) => {
        const updatedImages = [...(prev.images || []), ...newUrls];
        return {
          ...prev,
          images: updatedImages,
          image: updatedImages[0] || '',
        };
      });
    } catch (err) {
      console.error('Error uploading picture to Supabase:', err);
      setUploadError(`Upload failed: ${err.message || 'Ensure a public storage bucket named "products" exists in Supabase.'}`);
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => {
      const updatedImages = prev.images.filter((_, idx) => idx !== indexToRemove);
      return {
        ...prev,
        images: updatedImages,
        image: updatedImages[0] || '',
      };
    });
  };

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    setFormData((prev) => {
      const updatedImages = [...(prev.images || []), urlInput.trim()];
      return {
        ...prev,
        images: updatedImages,
        image: updatedImages[0] || '',
      };
    });
    setUrlInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.images || formData.images.length === 0) {
      alert('Please attach at least one picture for this product.');
      return;
    }
    
    // Convert tags string to array
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');

    const submissionData = {
      ...product, // keep existing id if editing
      title: formData.title,
      price: formData.price,
      image: formData.images[0] || formData.image || '',
      images: formData.images,
      description: formData.description,
      tags: tagsArray,
      quantity: parseInt(formData.quantity, 10) || 0,
      materials: product?.materials || [], // Preserve materials if they exist
    };

    onSubmit(submissionData);
  };

  return (
    <div className="admin-modal" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div className="admin-modal-content" style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '550px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <h2 style={{ marginBottom: '1.5rem' }}>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Title</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Price (e.g. ₹1,299)</label>
            <input 
              type="text" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              required
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Product Pictures ({formData.images?.length || 0} added - 2 to 4 recommended)
            </label>
            
            {/* Display uploaded images thumbnails with remove buttons */}
            {(formData.images && formData.images.length > 0) && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                {formData.images.map((imgUrl, index) => (
                  <div key={index} style={{ position: 'relative', border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden', aspectRatio: '1', backgroundColor: '#f9f9f9' }}>
                    <img 
                      src={assetUrl(imgUrl)} 
                      alt={`Product thumb ${index + 1}`} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    {index === 0 && (
                      <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.65rem', textAlign: 'center', padding: '2px 0', fontWeight: 'bold' }}>
                        Primary
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        backgroundColor: 'rgba(239, 68, 68, 0.9)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '22px',
                        height: '22px',
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      }}
                      title="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Interactive Image Upload Box */}
            <div 
              style={{
                border: isHovering ? '2px dashed #111' : '2px dashed #ccc',
                borderRadius: '8px',
                padding: '1rem',
                textAlign: 'center',
                backgroundColor: isHovering ? '#f3f2ee' : '#faf9f7',
                marginBottom: '0.6rem',
                position: 'relative',
                cursor: isUploading ? 'wait' : 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => !isUploading && document.getElementById('imageUploadInput')?.click()}
            >
              <input 
                id="imageUploadInput"
                type="file" 
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                style={{ display: 'none' }}
              />
              
              {isUploading ? (
                <div style={{ padding: '0.75rem 0', color: '#a0785a', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <span>⏳</span> Uploading to Supabase Storage...
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem', padding: '0.25rem 0' }}>
                  <span style={{ fontSize: '1.6rem' }}>📤</span>
                  <span style={{ fontWeight: '600', color: '#111', fontSize: '0.9rem' }}>
                    Click to upload picture(s)
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#666' }}>
                    Select one or multiple images simultaneously (JPG, PNG, WEBP)
                  </span>
                </div>
              )}
            </div>

            {uploadError && (
              <div style={{ color: '#b91c1c', fontSize: '0.85rem', marginBottom: '0.6rem', padding: '0.6rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', lineHeight: 1.4 }}>
                ⚠️ {uploadError}
                <div style={{ fontSize: '0.75rem', color: '#7f1d1d', marginTop: '0.25rem' }}>
                  Tip: In your Supabase dashboard, go to Storage &rarr; Create a new public bucket named <b>products</b> and enable INSERT/SELECT permissions for users.
                </div>
              </div>
            )}

            <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>Or add picture URL directly:</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                value={urlInput} 
                onChange={(e) => setUrlInput(e.target.value)} 
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddUrl(); } }}
                placeholder="https://... or assets/images/..."
                style={{ flex: 1, padding: '0.65rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.9rem' }}
              />
              <button
                type="button"
                onClick={handleAddUrl}
                className="btn btn-outline"
                style={{ padding: '0 1rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
              >
                + Add URL
              </button>
            </div>
            {(formData.images?.length === 0 && !formData.image) && (
              <span style={{ color: '#e53e3e', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>
                * Please attach at least one picture for this product.
              </span>
            )}
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              required
              rows="3"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Tags (comma separated)</label>
            <input 
              type="text" 
              name="tags" 
              value={formData.tags} 
              onChange={handleChange} 
              placeholder="e.g. floral, mug, pink"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Quantity in Stock</label>
            <input 
              type="number" 
              name="quantity" 
              value={formData.quantity} 
              onChange={handleChange} 
              min="0"
              required
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button 
              type="button" 
              onClick={onCancel}
              className="btn btn-outline"
              style={{ flex: 1, padding: '0.75rem' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isUploading}
              className="btn btn-primary"
              style={{ flex: 1, padding: '0.75rem', backgroundColor: isUploading ? '#777' : '#111', color: 'white', border: 'none', borderRadius: '4px', cursor: isUploading ? 'not-allowed' : 'pointer' }}
            >
              {isUploading ? 'Uploading...' : isEditing ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
