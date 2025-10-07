'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { productCatalog } from '../data/products';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const bannerSlides = [
    {
      title: "Power Up Your Projects ",
      subtitle: "Professional Electric Tools & Hardware at Unbeatable Prices",
      cta: "Shop Now"
    },
    {
      title: "Smart Electrical Solutions ",
      subtitle: "Modern Switches, LED Lighting & Home Automation",
      cta: "Explore Smart Gear"
    },
    {
      title: "Professional Tool Arsenal ",
      subtitle: "Industry-Grade Equipment for Every Project",
      cta: "Browse Tools"
    }
  ];

  const searchSuggestions = [
    "LED Strip Lights", "Smart Switches", "Wire Strippers", "Electric Drill",
    "Circuit Breakers", "Extension Cords", "Light Fixtures", "Power Tools"
  ];

  const categories = [
    { 
      name: "Electrical", 
      icon: "⚡", 
      description: "Switches, Wires & Components",
      count: "2,500+ items"
    },
    { 
      name: "Lighting", 
      icon: "💡", 
      description: "LED, Smart & Traditional Lights",
      count: "1,800+ items"
    },
    { 
      name: "Hardware", 
      icon: "🔩", 
      description: "Screws, Bolts & Fasteners",
      count: "3,200+ items"
    },
    { 
      name: "Safety", 
      icon: "🦺", 
      description: "Protective Gear & Equipment",
      count: "450+ items"
    },
    { 
      name: "Plumbing", 
      icon: "🚰", 
      description: "Fittings, Pipes & Fixtures",
      count: "950+ items"
    },
    { 
      name: "Tools", 
      icon: "🛠️", 
      description: "Power & Hand Tools",
      count: "1,400+ items"
    }
  ];

  const trendingProducts = productCatalog
    .filter((product) => product.isBestSeller || product.badge || product.isNew)
    .slice(0, 15);

  const allProducts = productCatalog.slice(0, 20);

  const heroSparkPositions = useMemo(
    () => [
      { insetInlineStart: '8%', insetBlockStart: '18%', delay: '0s', duration: '2.8s' },
      { insetInlineStart: '16%', insetBlockStart: '62%', delay: '0.6s', duration: '3.2s' },
      { insetInlineStart: '28%', insetBlockStart: '35%', delay: '1s', duration: '2.4s' },
      { insetInlineStart: '40%', insetBlockStart: '12%', delay: '1.4s', duration: '3.6s' },
      { insetInlineStart: '52%', insetBlockStart: '58%', delay: '0.8s', duration: '3s' },
      { insetInlineStart: '63%', insetBlockStart: '24%', delay: '1.2s', duration: '2.6s' },
      { insetInlineStart: '72%', insetBlockStart: '68%', delay: '0.3s', duration: '3.4s' },
      { insetInlineStart: '84%', insetBlockStart: '32%', delay: '1.6s', duration: '2.2s' },
      { insetInlineStart: '12%', insetBlockStart: '82%', delay: '0.9s', duration: '3.1s' },
      { insetInlineStart: '47%', insetBlockStart: '76%', delay: '1.1s', duration: '2.9s' },
      { insetInlineStart: '70%', insetBlockStart: '10%', delay: '0.4s', duration: '3.3s' },
      { insetInlineStart: '90%', insetBlockStart: '55%', delay: '1.5s', duration: '2.7s' }
    ],
    []
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [bannerSlides.length]);

  return (
    <div className="min-h-screen bg-cream pb-24 md:pb-0 text-ink">
      {/* Top Navbar - Responsive Design */}
      <header className="sticky top-0 z-50">
        <div className="w-full max-w-7xl mx-auto px-4 pt-5 pb-4">
          <div className="flex items-center gap-4 rounded-full border border-cream bg-cream-surface/90 px-4 md:px-6 py-3 shadow-cream backdrop-blur-lg">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 md:w-12 md:h-12 bg-gradient-to-br from-[#f7e9d0] via-[#e7c69a] to-[#d4a064] rounded-2xl flex items-center justify-center shadow-sm ring-1 ring-white/30 group-hover:scale-105 transition-transform">
                <span className="text-ink font-bold text-lg md:text-xl">⚡</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl md:text-2xl font-display font-bold text-ink">SmartBuild Hub</h1>
                <p className="text-xs text-muted-ink">Power Up Your Projects</p>
              </div>
            </Link>

            {/* Search Bar - Hidden on mobile, shown on tablet+ */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for electrical tools, hardware, lighting..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(e.target.value.length > 0);
                  }}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="w-full px-6 py-2.5 pl-12 pr-6 bg-cream border border-transparent rounded-full text-ink placeholder-muted focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-muted-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                {/* Auto-suggest Dropdown */}
                {showSuggestions && searchQuery && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-cream-surface border border-cream rounded-2xl shadow-cream z-50">
                    {searchSuggestions
                      .filter(suggestion => suggestion.toLowerCase().includes(searchQuery.toLowerCase()))
                      .slice(0, 5)
                      .map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(suggestion);
                            setShowSuggestions(false);
                          }}
                          className="w-full px-4 py-3 text-left text-ink hover:bg-cream-highlight first:rounded-t-2xl last:rounded-b-2xl transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <svg className="w-4 h-4 text-muted-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span>{suggestion}</span>
                          </div>
                        </button>
                      ))
                    }
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Navigation Icons */}
            <div className="hidden md:flex items-center gap-2">
              <button className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream text-muted-ink hover:text-ink transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <Link
                href="/shop"
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-muted-ink hover:text-ink transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m4.5-5h6" />
                </svg>
                <span className="absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full bg-primary text-[11px] font-semibold text-ink shadow-sm">3</span>
              </Link>
              <button className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream text-muted-ink hover:text-ink transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream text-muted-ink hover:text-ink transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner with Soft Cream Glow */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f9efe2] via-[#f4e2cc] to-[#f1d8ba]"></div>
        <div className="absolute inset-0">
          {heroSparkPositions.map((spark, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                insetInlineStart: spark.insetInlineStart,
                insetBlockStart: spark.insetBlockStart,
                animationDelay: spark.delay,
                animationDuration: spark.duration
              }}
            >
              <div className="w-1 h-1 bg-primary rounded-full shadow-lg shadow-primary/40"></div>
            </div>
          ))}
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
            <div className="flex-1 text-center lg:text-left max-w-2xl">
              <div className="overflow-hidden">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ink mb-6 leading-tight animate-slideInLeft">
                  {bannerSlides[currentSlide].title}
                </h2>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-muted-ink mb-8 animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
                {bannerSlides[currentSlide].subtitle}
              </p>
              <Link 
                href="/shop"
                className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#d6af7f] via-[#c69563] to-[#b37c4a] text-ink font-semibold rounded-full shadow-sm hover:shadow-cream transition-all duration-300 transform hover:-translate-y-1 animate-slideInLeft"
                style={{ animationDelay: '0.4s' }}
              >
                {bannerSlides[currentSlide].cta}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="hidden lg:block flex-shrink-0">
              <div className="relative">
                <div className="w-80 h-80 xl:w-96 xl:h-96 bg-gradient-to-r from-[#f8e9d1] to-[#f3d8b4] rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-gradient-to-r from-[#f5e3c7] to-[#eed3ac] rounded-full animate-ping"></div>
                <div className="absolute inset-8 bg-gradient-to-r from-[#d7b17e] to-[#c79863] rounded-full flex items-center justify-center">
                  <span className="text-5xl xl:text-6xl animate-bounce">✨</span>
                </div>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-3 mt-8 md:mt-12">
            {bannerSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-primary shadow-lg shadow-primary/50' 
                    : 'bg-[#e3d6c7] hover:bg-[#d5c6b4]'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Categories - Responsive Grid */}
      <section className="py-12 md:py-20 bg-cream-soft">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-ink mb-4">
              Shop by Category
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-ink">
              Find everything you need for your electrical projects
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                href="/shop"
                className="bg-cream-surface border border-cream rounded-2xl p-4 md:p-6 text-center hover:border-primary hover:shadow-cream transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="text-3xl md:text-4xl xl:text-5xl mb-3 md:mb-4 text-primary group-hover:animate-bounce">
                  {category.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-ink mb-2">
                  {category.name}
                </h3>
                <p className="text-sm md:text-base text-muted-ink mb-3 md:mb-4">
                  {category.description}
                </p>
                <div className="text-primary font-semibold text-sm md:text-base">
                  {category.count}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products - Responsive Grid */}
      <section className="py-12 md:py-20">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 md:mb-16 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-ink mb-4">
                Trending Products 
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-ink">
                Most popular items chosen by professionals
              </p>
            </div>
            <Link 
              href="/shop"
              className="text-primary hover:text-secondary transition-colors font-semibold flex items-center"
            >
              View All Products
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
            {trendingProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="bg-cream-surface border border-cream rounded-2xl overflow-hidden hover:border-primary hover:shadow-cream transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(min-width: 1536px) 18vw, (min-width: 1280px) 20vw, (min-width: 1024px) 28vw, (min-width: 640px) 45vw, 90vw"
                    priority={false}
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-secondary text-ink text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                        {product.badge}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-bold text-ink mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex text-primary">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-muted-ink opacity-40'}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-muted-ink text-sm ml-2">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg md:text-xl font-bold text-primary">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-muted-ink opacity-70 line-through ml-2 text-sm">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-20 bg-cream-soft">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-ink mb-4">
              Shop by Category
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-ink max-w-3xl mx-auto">
              Find exactly what you need from our comprehensive selection of professional-grade supplies
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                href="/shop"
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-cream-surface to-cream border border-cream hover:border-primary/20 transition-all duration-300 hover:shadow-cream hover:-translate-y-1"
              >
                <div className="p-6 md:p-8 text-center">
                  <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-display font-semibold text-ink mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm md:text-base text-muted-ink mb-3">
                    {category.description}
                  </p>
                  <div className="text-xs md:text-sm text-primary font-semibold">
                    {category.count}
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Preview Section */}
      <section className="py-12 md:py-20">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 md:mb-16 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-ink mb-4">
                Featured Products
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-ink">
                Quality tools and equipment for every project
              </p>
            </div>
            <Link 
              href="/shop"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary via-[#c69563] to-[#b37c4a] text-ink font-semibold rounded-full shadow-sm hover:shadow-cream transition-all duration-300 transform hover:-translate-y-1"
            >
              Browse All Products
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
            {allProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group bg-cream-surface border border-cream rounded-3xl overflow-hidden hover:shadow-cream hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image || '/placeholder-product.jpg'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 25vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority={false}
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-secondary text-ink text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                        {product.badge}
                      </span>
                    </div>
                  )}
                  {product.discount > 0 && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-primary text-ink text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                        -{product.discount}%
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-bold text-ink mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex text-primary">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-muted-ink opacity-40'}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-muted-ink text-sm ml-2">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-lg md:text-xl font-bold text-primary">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-muted-ink opacity-70 line-through text-sm">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-ink">
                      {product.inStock ? (
                        <span className="text-green-600 font-semibold">In Stock</span>
                      ) : (
                        <span className="text-red-500 font-semibold">Out of Stock</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-12 md:mt-16">
            <div className="bg-gradient-to-r from-cream-surface to-cream-highlight rounded-3xl p-8 md:p-12 border border-cream">
              <h3 className="text-xl md:text-2xl font-display font-bold text-ink mb-4">
                Can't find what you're looking for?
              </h3>
              <p className="text-muted-ink mb-6 max-w-2xl mx-auto">
                Browse our complete catalog with advanced filters, detailed specifications, and professional recommendations.
              </p>
              <Link 
                href="/shop"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary via-[#c69563] to-[#b37c4a] text-ink font-semibold rounded-full shadow-sm hover:shadow-cream transition-all duration-300 transform hover:-translate-y-1"
              >
                Explore Complete Shop
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */
      <footer className="bg-cream-soft border-t border-cream mt-12 md:mt-20">
        <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#f4e3c1] via-[#e9cca0] to-[#d6ac78] rounded-xl flex items-center justify-center shadow-sm">
                  <span className="text-ink font-semibold">⚡</span>
                </div>
                <span className="text-xl font-display font-semibold text-ink">Sagarmatha Light Solution</span>
              </Link>
              <p className="text-sm md:text-base text-muted-ink leading-relaxed">
                Your trusted partner for premium electrical supplies, lighting solutions, and professional-grade hardware across the Kathmandu Valley and beyond.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-ink">Contact Us</h3>
              <ul className="space-y-3 text-sm md:text-base text-muted-ink">
                <li className="flex items-center space-x-3">
                  <span className="text-primary text-lg">✉️</span>
                  <a href="mailto:shrestharaj236@gmail.com" className="hover:text-primary transition-colors">
                    shrestharaj236@gmail.com
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-primary text-lg">📞</span>
                  <a href="tel:+9779813704683" className="hover:text-primary transition-colors">
                    +977 9813704683
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-ink">Visit Our Store</h3>
              <p className="text-sm md:text-base text-muted-ink leading-relaxed">
                Gaighat Bidhut Marga,<br />
                Kathmandu, Nepal
              </p>
              <a
                href="https://maps.app.goo.gl/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-primary hover:text-secondary transition-colors"
              >
                View on Map
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-ink">Quick Links</h3>
              <div className="grid grid-cols-2 gap-3 text-sm md:text-base text-muted-ink">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
                <Link href="/product/1" className="hover:text-primary transition-colors">Featured</Link>
                <a href="mailto:shrestharaj236@gmail.com" className="hover:text-primary transition-colors">Support</a>
              </div>
            </div>
          </div>

          <div className="border-t border-cream mt-12 pt-6 flex flex-col md:flex-row md:items-center md:justify-between text-sm text-muted-ink">
            <p>© {new Date().getFullYear()} Sagarmatha Light Solution. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link href="/shop" className="hover:text-primary transition-colors">Explore Products</Link>
              <a href="mailto:shrestharaj236@gmail.com" className="hover:text-primary transition-colors">Request a Quote</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation - Sticky */}
      <div className="fixed bottom-0 left-0 right-0 bg-cream-frost backdrop-blur-md border-t border-cream shadow-lg z-50 md:hidden">
        <div className="flex items-center justify-around py-3 px-2">
          <Link href="/" className="flex flex-col items-center space-y-1 text-primary min-w-0 flex-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs font-medium">Home</span>
          </Link>
          
          <Link href="/shop" className="flex flex-col items-center space-y-1 text-muted-ink min-w-0 flex-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-xs font-medium">Shop</span>
          </Link>
          
          <button className="flex flex-col items-center space-y-1 text-muted-ink min-w-0 flex-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="text-xs font-medium">Offers</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1 text-muted-ink relative min-w-0 flex-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m4.5-5h6" />
            </svg>
            <span className="absolute -top-1 -right-2 bg-secondary text-ink text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-sm">3</span>
            <span className="text-xs font-medium">Cart</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1 text-muted-ink min-w-0 flex-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
