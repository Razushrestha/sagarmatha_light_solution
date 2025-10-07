'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProductItem } from '../data/products';

interface WishlistContextType {
  wishlist: Set<number>;
  wishlistItems: ProductItem[];
  toggleWishlist: (product: ProductItem) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [wishlistItems, setWishlistItems] = useState<ProductItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side before accessing localStorage
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    if (!isClient) return;
    
    try {
      const savedWishlist = localStorage.getItem('sagarmatha-wishlist');
      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist);
        setWishlist(new Set(parsed.ids || []));
        setWishlistItems(parsed.items || []);
      }
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
    }
  }, [isClient]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!isClient) return;
    
    try {
      const wishlistData = {
        ids: Array.from(wishlist),
        items: wishlistItems
      };
      localStorage.setItem('sagarmatha-wishlist', JSON.stringify(wishlistData));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [wishlist, wishlistItems, isClient]);

  const toggleWishlist = (product: ProductItem) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      const isRemoving = newWishlist.has(product.id);
      
      if (isRemoving) {
        newWishlist.delete(product.id);
        setWishlistItems(items => items.filter(item => item.id !== product.id));
      } else {
        newWishlist.add(product.id);
        setWishlistItems(items => [...items, product]);
      }
      
      return newWishlist;
    });
  };

  const isInWishlist = (productId: number): boolean => {
    return wishlist.has(productId);
  };

  const clearWishlist = () => {
    setWishlist(new Set());
    setWishlistItems([]);
  };

  const getWishlistCount = (): number => {
    return wishlist.size;
  };

  const value: WishlistContextType = {
    wishlist,
    wishlistItems,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};