'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2, ArrowLeft, Star, Filter, Grid, List, SortAsc, Check, X, Package, Clock, Zap } from 'lucide-react';
import { useWishlist } from '../../contexts/WishlistContext';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function WishlistPage() {
  const { wishlistItems, toggleWishlist, clearWishlist, getWishlistCount } = useWishlist();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating' | 'dateAdded'>('dateAdded');
  const [filterBy, setFilterBy] = useState<'all' | 'inStock' | 'onSale'>('all');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [animatingItems, setAnimatingItems] = useState<number[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Toast notification system
  const showToast = (message: string, type: Toast['type'] = 'info') => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  // Add remove animation
  const handleRemoveFromWishlist = (product: any) => {
    setAnimatingItems(prev => [...prev, product.id]);
    
    setTimeout(() => {
      toggleWishlist(product);
      setAnimatingItems(prev => prev.filter(id => id !== product.id));
      setSelectedItems(prev => prev.filter(id => id !== product.id));
      showToast(`${product.name} removed from wishlist`, 'success');
    }, 300);
  };

  // Bulk actions
  const toggleItemSelection = (productId: number) => {
    setSelectedItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const selectAllItems = () => {
    if (selectedItems.length === filteredAndSortedItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredAndSortedItems.map(item => item.id));
    }
  };

  const removeSelectedItems = () => {
    const itemsToRemove = wishlistItems.filter(item => selectedItems.includes(item.id));
    itemsToRemove.forEach(item => toggleWishlist(item));
    setSelectedItems([]);
    showToast(`${itemsToRemove.length} items removed from wishlist`, 'success');
  };

  // Mock add to cart function
  const addToCart = (productId: number) => {
    const product = wishlistItems.find(item => item.id === productId);
    if (product) {
      showToast(`${product.name} added to cart!`, 'success');
    }
  };

  // Filter and sort items
  const filteredAndSortedItems = wishlistItems
    .filter(item => {
      if (filterBy === 'inStock') return item.inStock;
      if (filterBy === 'onSale') return item.discount > 0;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'dateAdded':
        default:
          return b.id - a.id; // Assuming higher ID = more recent
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-yellow-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-lg shadow-lg backdrop-blur-md border transform transition-all duration-500 animate-slide-in-right ${
              toast.type === 'success' 
                ? 'bg-green-500/90 border-green-400 text-white'
                : toast.type === 'error'
                ? 'bg-red-500/90 border-red-400 text-white'
                : 'bg-blue-500/90 border-blue-400 text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === 'success' && <Check className="h-5 w-5" />}
              {toast.type === 'error' && <X className="h-5 w-5" />}
              <span className="font-medium">{toast.message}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/" 
              className="p-3 rounded-full bg-white/40 backdrop-blur-md border border-white/30 hover:bg-white/60 transition-all duration-300 hover:scale-110 group"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                My Wishlist
              </h1>
              <p className="text-gray-600 mt-2">
                {getWishlistCount()} {getWishlistCount() === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
          </div>

          {/* Control Bar */}
          {wishlistItems.length > 0 && (
            <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl p-6 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* View Mode & Sort Controls */}
                <div className="flex items-center gap-4">
                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-white/60 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        viewMode === 'grid'
                          ? 'bg-blue-500 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-white/80'
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        viewMode === 'list'
                          ? 'bg-blue-500 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-white/80'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                      className="appearance-none bg-white/60 border border-white/40 rounded-xl px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="dateAdded">Recently Added</option>
                      <option value="name">Name A-Z</option>
                      <option value="price">Price Low-High</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                    <SortAsc className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                  </div>

                  {/* Filter Dropdown */}
                  <div className="relative">
                    <select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value as typeof filterBy)}
                      className="appearance-none bg-white/60 border border-white/40 rounded-xl px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="all">All Items</option>
                      <option value="inStock">In Stock</option>
                      <option value="onSale">On Sale</option>
                    </select>
                    <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                {/* Bulk Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={selectAllItems}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-300 text-blue-700 rounded-xl hover:bg-blue-500/30 transition-colors"
                  >
                    <Check className="h-4 w-4" />
                    {selectedItems.length === filteredAndSortedItems.length ? 'Deselect All' : 'Select All'}
                  </button>
                  
                  {selectedItems.length > 0 && (
                    <>
                      <span className="text-sm text-gray-600 bg-white/60 px-3 py-2 rounded-lg">
                        {selectedItems.length} selected
                      </span>
                      <button
                        onClick={removeSelectedItems}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-300 text-red-700 rounded-xl hover:bg-red-500/30 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove Selected
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wishlist Content */}
        {wishlistItems.length === 0 ? (
          /* Enhanced Empty State */
          <div className="text-center py-20">
            <div className="relative">
              {/* Floating Hearts Animation */}
              <div className="floating-hearts">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="floating-heart"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 4}s`,
                      fontSize: `${1 + Math.random()}rem`
                    }}
                  >
                    💖
                  </div>
                ))}
              </div>

              <div className="relative z-10 max-w-md mx-auto">
                <div className="w-32 h-32 mx-auto mb-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 animate-heart-pulse"></div>
                  <div className="absolute inset-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Heart className="h-12 w-12 text-white animate-float" />
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Wishlist is Empty</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Start building your perfect collection! Save items you love for later and never lose track of what catches your eye.
                </p>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-xl p-4 text-center hover:bg-white/60 transition-all duration-300 hover:scale-105">
                    <Heart className="h-8 w-8 text-pink-500 mx-auto mb-2 animate-sparkle" />
                    <h3 className="font-semibold text-gray-800 mb-1">Save Favorites</h3>
                    <p className="text-sm text-gray-600">Click the heart on any product</p>
                  </div>
                  <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-xl p-4 text-center hover:bg-white/60 transition-all duration-300 hover:scale-105">
                    <Package className="h-8 w-8 text-blue-500 mx-auto mb-2 animate-sparkle" style={{ animationDelay: '0.5s' }} />
                    <h3 className="font-semibold text-gray-800 mb-1">Track Items</h3>
                    <p className="text-sm text-gray-600">Monitor price changes</p>
                  </div>
                  <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-xl p-4 text-center hover:bg-white/60 transition-all duration-300 hover:scale-105">
                    <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2 animate-sparkle" style={{ animationDelay: '1s' }} />
                    <h3 className="font-semibold text-gray-800 mb-1">Quick Buy</h3>
                    <p className="text-sm text-gray-600">Add to cart instantly</p>
                  </div>
                </div>

                <Link
                  href="/shop"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-custom-bounce"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Start Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Enhanced Wishlist Grid */
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
              : 'space-y-4'
          } transition-all duration-300`}>
            {filteredAndSortedItems.map((product, index) => (
              <div 
                key={product.id} 
                className={`group relative transform transition-all duration-500 hover:scale-105 ${
                  animatingItems.includes(product.id) ? 'animate-pulse scale-110' : ''
                }`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {viewMode === 'grid' ? (
                  /* Grid View */
                  <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:bg-white/50">
                    {/* Selection Checkbox */}
                    <div className="absolute top-3 left-3 z-10">
                      <button
                        onClick={() => toggleItemSelection(product.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          selectedItems.includes(product.id)
                            ? 'bg-blue-500 border-blue-500 scale-110'
                            : 'bg-white/60 border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        {selectedItems.includes(product.id) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </button>
                    </div>

                    <Link href={`/product/${product.id}`}>
                      <div className="relative overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        
                        {/* Enhanced Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Badges */}
                        <div className="absolute top-3 right-3 space-y-2">
                          {product.discount > 0 && (
                            <span className="block bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                              -{product.discount}%
                            </span>
                          )}
                          {product.badge && (
                            <span className="block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                              {product.badge}
                            </span>
                          )}
                          {!product.inStock && (
                            <span className="block bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                              Out of Stock
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>

                    <div className="p-5">
                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 text-lg">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Enhanced Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 transition-colors duration-300 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 font-medium">
                          ({product.rating})
                        </span>
                      </div>

                      {/* Enhanced Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-bold text-primary">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.price < product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        {product.discount > 0 && (
                          <span className="text-sm font-semibold text-green-600">
                            Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      {/* Enhanced Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRemoveFromWishlist(product)}
                          className="p-3 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 hover:from-red-100 hover:to-pink-100 transition-all duration-300 hover:scale-110 hover:rotate-3 group/btn"
                        >
                          <Heart className="h-5 w-5 fill-current group-hover/btn:animate-bounce" />
                        </button>
                        <button
                          onClick={() => addToCart(product.id)}
                          disabled={!product.inStock}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                            product.inStock
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <ShoppingCart className={`h-5 w-5 ${product.inStock ? 'animate-bounce' : ''}`} />
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* List View */
                  <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center p-6 gap-6">
                      {/* Selection Checkbox */}
                      <button
                        onClick={() => toggleItemSelection(product.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          selectedItems.includes(product.id)
                            ? 'bg-blue-500 border-blue-500'
                            : 'bg-white/60 border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        {selectedItems.includes(product.id) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </button>

                      {/* Product Image */}
                      <Link href={`/product/${product.id}`}>
                        <div className="relative">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={120}
                            height={120}
                            className="w-24 h-24 object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                          />
                          {product.discount > 0 && (
                            <div className="absolute -top-2 -right-2">
                              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                -{product.discount}%
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1">
                        <Link href={`/product/${product.id}`}>
                          <h3 className="font-semibold text-lg text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-primary">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            {product.price < product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{product.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {product.inStock ? (
                            <span className="text-sm text-green-600 font-medium">✓ In Stock</span>
                          ) : (
                            <span className="text-sm text-red-600 font-medium">✗ Out of Stock</span>
                          )}
                          {product.badge && (
                            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {product.badge}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleRemoveFromWishlist(product)}
                          className="p-2 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        >
                          <Heart className="h-4 w-4 fill-current" />
                        </button>
                        <button
                          onClick={() => addToCart(product.id)}
                          disabled={!product.inStock}
                          className={`flex items-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors ${
                            product.inStock
                              ? 'bg-primary text-ink hover:bg-opacity-90'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Continue Shopping */}
        {wishlistItems.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        )}
      </div>

      {/* Enhanced Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(5deg);
          }
          50% {
            transform: translateY(-20px) rotate(-5deg);
          }
          75% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes heartPulse {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.2) rotate(5deg);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }

        @keyframes floatUp {
          0% {
            opacity: 0;
            transform: translateY(100vh) rotate(0deg);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) rotate(360deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.5s ease-out forwards;
        }

        .animate-heart-pulse {
          animation: heartPulse 1.5s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }

        .animate-custom-bounce {
          animation: bounce 1s ease-in-out;
        }

        .floating-hearts {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .floating-heart {
          position: absolute;
          color: #ff6b9d;
          font-size: 1.5rem;
          animation: floatUp 4s linear infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          40%, 43% {
            transform: translate3d(0, -8px, 0) scale(1.1);
          }
          70% {
            transform: translate3d(0, -4px, 0) scale(1.05);
          }
          90% {
            transform: translate3d(0, -2px, 0) scale(1.02);
          }
        }
      `}</style>
    </div>
  );
}