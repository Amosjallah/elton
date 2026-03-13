'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { usePageTitle } from '@/hooks/usePageTitle';
import AnimatedSection from '@/components/AnimatedSection';

interface Product {
  id: string;
  name: string;
  price: number;
  slug: string;
  image_url?: string;
  product_images?: { url: string }[];
}

interface BulkItem extends Product {
  quantity: number;
}

export default function BulkPurchasePage() {
  usePageTitle('Bulk Purchase');
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<BulkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*, product_images(*)')
        .eq('status', 'active');
      
      if (data) {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addItem = (product: Product) => {
    const existing = selectedItems.find(item => item.id === product.id);
    if (existing) {
      setSelectedItems(selectedItems.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setSelectedItems([...selectedItems, { ...product, quantity: 10 }]); // Starting at 10 for bulk
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setSelectedItems(selectedItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) return;

    setIsSubmitting(true);
    // In a real app, we would send this to an API/database
    // For now, we simulate success
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setSelectedItems([]);
      setFormState({ name: '', email: '', phone: '', message: '' });
    }, 1500);
  };

  const totalAmount = selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Bulk Stationery Orders</h1>
          <p className="text-xl text-gray-600">Stocking up your office or school? Select your items below for a wholesale quote from The Stationery Clinic.</p>
        </AnimatedSection>

        {submitted ? (
          <AnimatedSection className="bg-white p-12 rounded-3xl shadow-xl text-center border border-green-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
              <i className="ri-checkbox-circle-line text-4xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Sent Successfully!</h2>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your interest. The Stationery Clinic team will review your bulk order request and contact you within 24 hours with a wholesale quote.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="bg-blue-700 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition-all"
            >
              Start New Request
            </button>
          </AnimatedSection>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Left: Product Selection */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="relative mb-6">
                  <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Search products for bulk purchase..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {loading ? (
                    [...Array(4)].map((_, i) => (
                      <div key={i} className="h-24 bg-gray-50 rounded-xl animate-pulse"></div>
                    ))
                  ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div key={product.id} className="group flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer" onClick={() => addItem(product)}>
                        <div className="w-16 h-16 rounded-lg overflow-hidden relative bg-gray-100 flex-shrink-0">
                          <Image
                            src={product.product_images?.[0]?.url || product.image_url || '/profile-logistics-logo.jpg'}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{product.name}</h3>
                          <p className="text-blue-700 font-bold text-xs">GH₵ {product.price.toLocaleString()}</p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <i className="ri-add-circle-line text-blue-600 text-2xl"></i>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12 text-gray-500">
                      No products found matching your search.
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Items List */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <i className="ri-list-check text-blue-600"></i>
                  Items in your Request
                </h3>

                {selectedItems.length > 0 ? (
                  <div className="space-y-4">
                    {selectedItems.map((item) => (
                      <div key={item.id} className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="w-12 h-12 rounded overflow-hidden relative bg-white">
                          <Image
                            src={item.product_images?.[0]?.url || item.image_url || '/profile-logistics-logo.jpg'}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-grow min-w-[150px]">
                          <span className="font-bold text-gray-900">{item.name}</span>
                          <span className="block text-xs text-gray-500">Unit Price: GH₵ {item.price}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white px-3 py-1 rounded-full border border-gray-200">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-500 hover:text-blue-600 transition-colors">
                            <i className="ri-subtract-line"></i>
                          </button>
                          <input 
                            type="number" 
                            className="w-12 text-center font-bold bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (!isNaN(val)) updateQuantity(item.id, val - item.quantity);
                            }}
                          />
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-500 hover:text-blue-600 transition-colors">
                            <i className="ri-add-line"></i>
                          </button>
                        </div>
                        <div className="text-right min-w-[100px]">
                          <span className="block font-bold text-gray-900">GH₵ {(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 transition-colors ml-2">
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    ))}
                    
                    <div className="pt-6 border-t border-gray-100 flex justify-between items-center px-4">
                      <span className="text-lg font-bold text-gray-900">Total Estimated Value:</span>
                      <span className="text-2xl font-serif font-bold text-blue-700">GH₵ {totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
                    <i className="ri-shopping-basket-line text-4xl block mb-2 opacity-20"></i>
                    Start by selecting items from the search above.
                  </div>
                )}
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-28">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Inquiry Details</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                      placeholder="Enter your name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Work Email</label>
                    <input
                      required
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                      placeholder="email@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                    <input
                      required
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                      placeholder="024 XXX XXXX"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Special Requirements</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium resize-none"
                      placeholder="Tell us more about your office/school needs or specific brands you are looking for..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={selectedItems.length === 0 || isSubmitting}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
                      selectedItems.length === 0 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                      : 'bg-blue-700 text-white hover:bg-blue-800 hover:shadow-blue-200 active:scale-95 translate-y-0 active:translate-y-1'
                    } flex items-center justify-center gap-3`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        Request Bulk Quote
                        <i className="ri-send-plane-fill"></i>
                      </>
                    )}
                  </button>
                </form>

                <p className="mt-6 text-center text-xs text-gray-400">
                  <i className="ri-shield-check-line mr-1"></i>
                  Your data is protected and will only be used by our sales team.
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
