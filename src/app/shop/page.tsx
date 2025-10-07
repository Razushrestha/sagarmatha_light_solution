'use client'

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, Star, Grid, List, Heart, ShoppingCart } from "lucide-react";
import { productCatalog, ProductItem } from "../../data/products";

type CategoryId = 'all' | ProductItem['category'];
type SortValue = 'featured' | 'price-low-high' | 'price-high-low' | 'rating' | 'newest';

interface Filters {
  category: CategoryId;
  brands: string[];
  priceRange: [number, number];
  rating: number;
  power: string[];
  search: string;
}

const sortOptions: { value: SortValue; label: string }[] = [
  { value: 'featured', label: 'Featured Picks' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'newest', label: 'Newest Arrivals' }
];

const categoryPresets: { id: CategoryId; name: string; icon: string }[] = [
  { id: 'all', name: 'All Products', icon: '🛍️' },
  { id: 'tools', name: 'Power Tools', icon: '🛠️' },
  { id: 'electrical', name: 'Electrical', icon: '⚡' },
  { id: 'lighting', name: 'Lighting', icon: '💡' }
];

const createDefaultFilters = (): Filters => ({
  category: 'all',
  brands: [],
  priceRange: [0, 20000],
  rating: 0,
  power: [],
  search: ''
});

const badgeWeight = (item: ProductItem): number => {
  if (item.badge === 'Best Seller' || item.isBestSeller) return 3;
  if (item.badge === 'New' || item.isNew) return 2;
  if (item.discount > 0) return 1;
  return 0;
};

export default function ShopPage() {
  const products = productCatalog;
  const [selectedFilters, setSelectedFilters] = useState<Filters>(() => createDefaultFilters());
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortValue>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [cartItems, setCartItems] = useState<ProductItem[]>([]);

  const categories = useMemo(
    () =>
      categoryPresets.map(category => ({
        ...category,
        count:
          category.id === 'all'
            ? products.length
            : products.filter(product => product.category === category.id).length
      })),
    [products]
  );

  const brands = useMemo(
    () => Array.from(new Set(products.map(product => product.brand))).sort((a, b) => a.localeCompare(b)),
    [products]
  );

  const powerRatings = useMemo(() => {
    const unique = new Set<string>();
    products.forEach(product => {
      if (product.power) {
        unique.add(product.power);
      }
    });
    return Array.from(unique).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (selectedFilters.category !== 'all' && product.category !== selectedFilters.category) {
        return false;
      }

      if (selectedFilters.brands.length > 0 && !selectedFilters.brands.includes(product.brand)) {
        return false;
      }

      if (
        product.price < selectedFilters.priceRange[0] ||
        product.price > selectedFilters.priceRange[1]
      ) {
        return false;
      }

      if (selectedFilters.rating > 0 && product.rating < selectedFilters.rating) {
        return false;
      }

      if (selectedFilters.power.length > 0 && !selectedFilters.power.includes(product.power)) {
        return false;
      }

      if (selectedFilters.search.trim()) {
        const query = selectedFilters.search.toLowerCase();
        const haystack = `${product.name} ${product.brand} ${product.category}`.toLowerCase();
        if (!haystack.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedFilters]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortBy) {
      case 'price-low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sorted.sort((a, b) => b.id - a.id);
        break;
      default:
        sorted.sort((a, b) => {
          const weightDiff = badgeWeight(b) - badgeWeight(a);
          if (weightDiff !== 0) return weightDiff;
          if (b.rating !== a.rating) return b.rating - a.rating;
          return b.reviews - a.reviews;
        });
    }

    return sorted;
  }, [filteredProducts, sortBy]);

  const clearAllFilters = () => setSelectedFilters(createDefaultFilters());

  const addToCart = (product: ProductItem) => {
    setCartItems(prev => [...prev, product]);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Modern Glassmorphism Navbar */}
      <header className="sticky top-0 z-50">
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-blue-50/90 to-purple-50/80 backdrop-blur-xl border-b border-white/20"></div>
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
            
            {/* Logo/Brand */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <span className="text-white font-bold text-base sm:text-lg">⚡</span>
              </div>
              <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300 hidden xs:block">Shop</span>
            </Link>

            {/* Search Bar - Mobile Optimized */}
            <div className="flex-1 max-w-2xl">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl sm:rounded-2xl blur-sm group-focus-within:blur-none transition-all duration-300"></div>
                <div className="relative bg-white/40 backdrop-blur-md border border-white/30 rounded-xl sm:rounded-2xl shadow-lg">
                  <Search className="absolute left-3 sm:left-4 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-blue-500/70" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={selectedFilters.search}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-2.5 sm:py-3.5 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-sm font-medium"
                  />
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Mobile Optimized */}
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
              {/* Wishlist Button */}
              <button className="group relative hidden sm:flex">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-lg sm:rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                <div className="relative flex items-center gap-2 bg-white/30 backdrop-blur-md border border-white/30 rounded-lg sm:rounded-xl px-2 sm:px-4 py-2 sm:py-2.5 hover:bg-white/40 transition-all duration-300 shadow-lg">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500 group-hover:scale-110 transition-transform duration-300" />
                  <span className="hidden md:block text-sm font-medium text-gray-700">Wishlist</span>
                </div>
              </button>

              {/* Cart Button */}
              <Link href="/cart" className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                <div className="relative flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl px-5 py-2.5 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg group-hover:shadow-emerald-500/25 group-hover:-translate-y-0.5">
                  <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="hidden sm:block text-sm font-semibold">Cart</span>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">3</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content with Gradient Background */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-8">
          {/* Page Title with Gradient */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-2">
              Shop All Products
            </h1>
            <p className="text-gray-600 text-lg">Discover amazing tools and equipment for your projects</p>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
              <div className="relative flex items-center gap-2 bg-white/40 backdrop-blur-md border border-white/30 rounded-xl px-4 py-2.5 hover:bg-white/50 transition-all duration-300 shadow-lg">
                <Filter className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Filters</span>
              </div>
            </button>
            
            <div className="flex items-center gap-4 ml-auto">
              <span className="text-sm text-gray-600 font-medium">
                Showing {sortedProducts.length} of {products.length} products
              </span>
              
              <div className="flex items-center bg-white/40 backdrop-blur-md border border-white/30 rounded-xl p-1 shadow-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-white/50'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-white/50'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-sm group-focus-within:blur-none transition-all duration-300"></div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortValue)}
                  className="relative bg-white/40 backdrop-blur-md border border-white/30 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 focus:outline-none shadow-lg appearance-none cursor-pointer hover:bg-white/50 transition-all duration-300"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <div className={`flex flex-col gap-8 lg:flex-row`}>
          <div className={`w-full max-w-sm flex-shrink-0 transition-all duration-300 ${showFilters ? 'block' : 'hidden lg:block'} lg:w-80`}>
            <div className="sticky top-24 space-y-7 rounded-3xl border border-cream bg-cream-surface p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-display font-semibold text-ink">Filters</h2>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-muted-ink transition-colors hover:text-primary"
                >
                  Clear All
                </button>
              </div>

              <div>
                <h3 className="mb-3 flex items-center text-base font-semibold text-ink">
                  <span>Categories</span>
                </h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedFilters(prev => ({ ...prev, category: category.id }))}
                      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-2.5 transition-colors ${
                        selectedFilters.category === category.id
                          ? 'border-primary/70 bg-primary font-semibold text-ink shadow-sm'
                          : 'border-cream bg-cream-surface text-muted-ink hover:border-primary hover:text-ink'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{category.icon}</span>
                        <span className="text-sm md:text-base">{category.name}</span>
                      </div>
                      <span className="text-xs text-muted-ink opacity-70">({category.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-base font-semibold text-ink">Brands</h3>
                <div className="max-h-48 space-y-2.5 overflow-y-auto pr-1">
                  {brands.map(brand => (
                    <label
                      key={brand}
                      className="group flex cursor-pointer items-center space-x-3 rounded-2xl p-2.5 transition-colors hover:bg-cream-highlight"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters.brands.includes(brand)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFilters(prev => ({
                              ...prev,
                              brands: [...prev.brands, brand]
                            }));
                          } else {
                            setSelectedFilters(prev => ({
                              ...prev,
                              brands: prev.brands.filter(b => b !== brand)
                            }));
                          }
                        }}
                        className="h-5 w-5 rounded border-cream bg-cream text-primary focus:ring-2 focus:ring-primary"
                      />
                      <span className="text-sm text-muted-ink transition-colors group-hover:text-ink">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-base font-semibold text-ink">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={selectedFilters.priceRange[0]}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        setSelectedFilters(prev => ({
                          ...prev,
                          priceRange: [Number.isNaN(value) ? 0 : value, prev.priceRange[1]]
                        }));
                      }}
                      className="w-full rounded-2xl border border-cream bg-cream px-4 py-2 text-ink placeholder-muted focus:border-primary focus:ring-2 focus:ring-primary"
                    />
                    <span className="font-medium text-muted-ink">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={selectedFilters.priceRange[1]}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        setSelectedFilters(prev => ({
                          ...prev,
                          priceRange: [prev.priceRange[0], Number.isNaN(value) ? 20000 : value]
                        }));
                      }}
                      className="w-full rounded-2xl border border-cream bg-cream px-4 py-2 text-ink placeholder-muted focus:border-primary focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="text-sm text-muted-ink">
                    ₹{selectedFilters.priceRange[0].toLocaleString()} - ₹{selectedFilters.priceRange[1].toLocaleString()}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-base font-semibold text-ink">Minimum Rating</h3>
                <div className="space-y-2.5">
                  {[4, 3, 2, 1].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setSelectedFilters(prev => ({ ...prev, rating }))}
                      className={`flex w-full items-center space-x-3 rounded-2xl border px-4 py-2.5 transition-colors ${
                        selectedFilters.rating === rating
                          ? 'border-primary bg-primary text-ink'
                          : 'border-cream bg-cream-surface text-muted-ink hover:border-primary hover:text-ink'
                      }`}
                    >
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < rating ? 'text-primary fill-current' : 'text-muted-ink opacity-30'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm">&amp; up</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-base font-semibold text-ink">Power Rating</h3>
                <div className="space-y-2.5">
                  {powerRatings.map(power => (
                    <label
                      key={power}
                      className="group flex cursor-pointer items-center space-x-3 rounded-2xl p-2.5 transition-colors hover:bg-cream-highlight"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters.power.includes(power)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFilters(prev => ({
                              ...prev,
                              power: [...prev.power, power]
                            }));
                          } else {
                            setSelectedFilters(prev => ({
                              ...prev,
                              power: prev.power.filter(p => p !== power)
                            }));
                          }
                        }}
                        className="h-5 w-5 rounded border-cream bg-cream text-primary focus:ring-2 focus:ring-primary"
                      />
                      <span className="text-sm text-muted-ink transition-colors group-hover:text-ink">{power}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={clearAllFilters}
                className="w-full rounded-2xl bg-secondary py-2.5 font-semibold text-ink shadow-sm transition-all duration-200 hover:bg-primary hover:shadow-cream"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            {viewMode === 'list' ? (
              <div className="space-y-4">
                {sortedProducts.map(product => (
                  <div
                    key={product.id}
                    className="group relative flex flex-col gap-4 rounded-3xl border border-cream bg-cream-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-cream md:flex-row"
                  >
                    <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-cream-highlight md:h-36 md:w-56">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(min-width: 768px) 224px, 100vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-4xl">🔧</div>
                      )}
                      {product.badge && (
                        <div className="absolute left-3 top-3 rounded-full bg-cream px-3 py-1 text-xs font-semibold text-ink shadow-sm">
                          {product.badge}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col justify-between gap-4">
                      <div>
                        <div className="text-xs uppercase tracking-[0.22em] text-muted-ink">{product.brand}</div>
                        <Link href={`/product/${product.id}`}>
                          <h3 className="mt-1 text-xl font-semibold text-ink transition-colors hover:text-primary">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="mt-2 text-sm text-muted-ink">{product.description}</p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-semibold text-ink">₹{product.price.toLocaleString()}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-muted-ink line-through">₹{product.originalPrice.toLocaleString()}</span>
                          )}
                          {product.discount > 0 && (
                            <span className="rounded-full bg-cream-highlight px-3 py-1 text-xs font-semibold text-primary">
                              Save {product.discount}%
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                          className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
                            product.inStock
                              ? 'bg-primary text-ink hover:shadow-cream'
                              : 'cursor-not-allowed border border-cream bg-cream text-muted-ink'
                          }`}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.map(product => (
                  <div
                    key={product.id}
                    className="group relative overflow-hidden rounded-3xl border border-cream bg-cream-surface transition-all duration-300 hover:-translate-y-2 hover:shadow-cream"
                  >
                    {product.badge && (
                      <div className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm ${
                        product.badge === 'Best Seller'
                          ? 'bg-[#fce3ac] text-ink'
                          : product.badge === 'New'
                          ? 'bg-[#d4f4dd] text-ink'
                          : product.badge === 'Premium'
                          ? 'bg-[#e8dcff] text-ink'
                          : product.badge === 'Smart'
                          ? 'bg-[#d5e8ff] text-ink'
                          : 'bg-[#e9f7f0] text-ink'
                      }`}>
                        {product.badge}
                      </div>
                    )}

                    {product.discount > 0 && (
                      <div className="absolute right-3 top-3 z-10 rounded-full bg-[#f8d3c8] px-2.5 py-1 text-[11px] font-semibold text-ink shadow-sm">
                        -{product.discount}%
                      </div>
                    )}

                    <div className="relative h-48 w-full overflow-hidden bg-cream-highlight">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="100vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-4xl">🔧</div>
                      )}

                      <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="rounded-full bg-primary px-4 py-2 font-semibold text-ink shadow-sm hover:shadow-cream"
                        >
                          Quick View
                        </button>
                      </div>

                      {!product.inStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/45">
                          <span className="rounded-full bg-secondary px-4 py-2 font-semibold text-ink shadow-sm">Out of Stock</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 px-4 pb-5 pt-4">
                      <div className="text-xs uppercase tracking-[0.22em] text-muted-ink">{product.brand}</div>
                      <Link href={`/product/${product.id}`}>
                        <h3 className="cursor-pointer text-lg font-semibold leading-snug text-ink transition-colors hover:text-primary">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-[#f2b275]'
                                  : 'text-muted-ink opacity-30'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-muted-ink">({product.reviews})</span>
                      </div>

                      <div className="text-sm text-muted-ink">{product.power}</div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-semibold text-ink">₹{product.price.toLocaleString()}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-muted-ink line-through">₹{product.originalPrice.toLocaleString()}</span>
                          )}
                        </div>
                        {product.discount > 0 && (
                          <span className="rounded-full bg-cream-highlight px-2 py-1 text-xs font-semibold text-primary">
                            Save {product.discount}%
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className={`w-full rounded-full py-3 font-semibold transition ${
                          product.inStock
                            ? 'bg-primary text-ink hover:shadow-cream'
                            : 'cursor-not-allowed border border-cream bg-cream text-muted-ink'
                        }`}
                      >
                        {product.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {sortedProducts.length === 0 && (
              <div className="rounded-3xl border border-cream bg-cream-surface py-12 text-center">
                <div className="mb-3 text-5xl">🔍</div>
                <h3 className="mb-1 text-xl font-semibold text-ink">No products found</h3>
                <p className="text-muted-ink">Try adjusting your filters or search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink bg-opacity-40 backdrop-blur-sm">
          <div className="mx-4 max-w-6xl rounded-3xl border border-cream bg-white p-0 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-cream px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
                <h2 className="ml-4 text-xl font-bold tracking-tight text-ink">Product Details</h2>
              </div>
              <button
                onClick={() => setQuickViewProduct(null)}
                className="rounded-full p-2 text-ink transition hover:bg-cream"
              >
                ✕
              </button>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Product Image Section */}
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-cream to-cream-surface">
                    {quickViewProduct.image ? (
                      <Image
                        src={quickViewProduct.image}
                        alt={quickViewProduct.name}
                        width={600}
                        height={400}
                        className="h-80 w-full object-cover transition-transform duration-300 hover:scale-105 md:h-96"
                      />
                    ) : (
                      <div className="flex h-80 w-full items-center justify-center text-6xl md:h-96">🔧</div>
                    )}
                  </div>
                  
                  {/* Gallery Thumbnails */}
                  <div className="flex gap-3">
                    {[1, 2, 3, 4].map((thumb) => (
                      <div key={thumb} className="h-16 w-16 overflow-hidden rounded-xl bg-cream opacity-60 transition hover:opacity-100">
                        {quickViewProduct.image ? (
                          <Image
                            src={quickViewProduct.image}
                            alt={`View ${thumb}`}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xl">🔧</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Details Section */}
                <div className="space-y-6">
                  {/* Brand & Name */}
                  <div>
                    <div className="mb-2 text-sm font-medium text-secondary-ink opacity-80">
                      {quickViewProduct.brand}
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight text-ink">
                      {quickViewProduct.name}
                    </h3>
                  </div>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={`text-xl ${
                            i < Math.floor(quickViewProduct.rating) ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-secondary-ink">
                      {quickViewProduct.rating}/5.0 • {quickViewProduct.reviews || '1,247'} reviews
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="rounded-2xl bg-gradient-to-r from-cream to-cream-surface p-4">
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold text-ink">
                        ₹{quickViewProduct.price.toLocaleString()}
                      </span>
                      {quickViewProduct.originalPrice && quickViewProduct.originalPrice > quickViewProduct.price && (
                        <>
                          <span className="text-lg text-secondary-ink line-through">
                            ₹{quickViewProduct.originalPrice.toLocaleString()}
                          </span>
                          <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                            {Math.round(((quickViewProduct.originalPrice - quickViewProduct.price) / quickViewProduct.originalPrice) * 100)}% OFF
                          </span>
                        </>
                      )}
                      {quickViewProduct.discount > 0 && (
                        <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                          -{quickViewProduct.discount}% OFF
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-secondary-ink">
                      Inclusive of all taxes • Free shipping on orders above ₹500
                    </p>
                  </div>

                  {/* Product Information Tabs */}
                  <div className="space-y-4">
                    {/* Specifications */}
                    <div className="rounded-xl border border-cream bg-cream-surface p-4">
                      <h4 className="mb-3 flex items-center gap-2 font-semibold text-ink">
                        <span className="text-lg">⚡</span>
                        Power Specifications
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-secondary-ink">Wattage:</span>
                          <span className="font-medium text-ink">{quickViewProduct.power || '20W'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-ink">Voltage:</span>
                          <span className="font-medium text-ink">220-240V</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-ink">Frequency:</span>
                          <span className="font-medium text-ink">50Hz</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-ink">Energy Rating:</span>
                          <span className="font-medium text-ink">5⭐</span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    {quickViewProduct.features && (
                      <div className="rounded-xl border border-cream bg-cream-surface p-4">
                        <h4 className="mb-3 flex items-center gap-2 font-semibold text-ink">
                          <span className="text-lg">✨</span>
                          Key Features
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {quickViewProduct.features.slice(0, 4).map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3 text-sm">
                              <span className="mt-0.5 h-2 w-2 rounded-full bg-green-500"></span>
                              <span className="text-secondary-ink">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Additional Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl border border-cream bg-cream-surface p-3 text-center">
                        <div className="text-lg">🚚</div>
                        <div className="text-xs font-medium text-ink">Free Delivery</div>
                        <div className="text-xs text-secondary-ink">2-3 days</div>
                      </div>
                      <div className="rounded-xl border border-cream bg-cream-surface p-3 text-center">
                        <div className="text-lg">🔧</div>
                        <div className="text-xs font-medium text-ink">Installation</div>
                        <div className="text-xs text-secondary-ink">Available</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => {
                        addToCart(quickViewProduct);
                        setQuickViewProduct(null);
                      }}
                      disabled={!quickViewProduct.inStock}
                      className={`flex-1 rounded-full py-4 text-base font-semibold transition ${
                        quickViewProduct.inStock
                          ? 'bg-primary text-ink hover:shadow-lg hover:shadow-primary/30'
                          : 'cursor-not-allowed border border-cream bg-cream text-muted-ink'
                      }`}
                    >
                      {quickViewProduct.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
                    </button>
                    <button className="rounded-full border-2 border-primary bg-white p-4 text-primary transition hover:bg-primary hover:text-ink">
                      ♡
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="flex items-center justify-center gap-6 pt-4 text-xs text-secondary-ink">
                    <div className="flex items-center gap-1">
                      <span>🛡️</span>
                      <span>2 Year Warranty</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>↩️</span>
                      <span>Easy Returns</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>✅</span>
                      <span>Genuine Product</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40 rounded-2xl border border-cream bg-primary px-5 py-4 text-ink shadow-cream">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🛒</div>
            <div>
              <div className="font-semibold tracking-tight">{cartItems.length} items in cart</div>
              <div className="text-sm text-ink opacity-90">
                ₹{cartItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
              </div>
            </div>
            <Link
              href="/cart"
              className="ml-2 inline-flex items-center gap-1 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-[#2c2014]"
            >
              View Cart
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}