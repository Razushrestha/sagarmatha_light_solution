'use client'

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  Star,
  Heart,
  ShoppingCart,
  Plus,
  Minus,
  Shield,
  Truck,
  CheckCircle,
  ChevronRight
} from "lucide-react";
import { productCatalog } from "../../../data/products";

type Review = {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
};

const mockReviews: Review[] = [
  {
    id: 1,
    name: "Mike Johnson",
    rating: 5,
    date: "Jan 12, 2025",
    comment:
      "Outstanding build quality and torque. The battery easily lasts through a full day of site work."
  },
  {
    id: 2,
    name: "Sarah Wilson",
    rating: 4,
    date: "Dec 28, 2024",
    comment:
      "Very reliable and comfortable to use. I wish the kit included an extra bit set, but the drill itself is perfect."
  },
  {
    id: 3,
    name: "David Chen",
    rating: 5,
    date: "Nov 03, 2024",
    comment:
      "Powerful motor with smooth speed control. The LED ring light is a game changer when working in tight spaces."
  }
];

const formatCurrency = (value: number) => `₹${value.toLocaleString("en-IN")}`;

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < Math.round(rating) ? "text-primary fill-current" : "text-muted-ink opacity-30"
          }`}
        />
      ))}
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const productId = Number(params?.id);

  const product = useMemo(() => productCatalog.find(item => item.id === productId), [productId]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return productCatalog
      .filter(item => item.id !== product.id && item.category === product.category)
      .slice(0, 3);
  }, [product]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [productId]);

  useEffect(() => {
    if (!showToast) return;
    const timeout = window.setTimeout(() => setShowToast(false), 2200);
    return () => window.clearTimeout(timeout);
  }, [showToast]);

  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center text-center px-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-display font-semibold text-ink">Product not found</h1>
          <p className="text-muted-ink max-w-md">
            We couldn&apos;t find that item in our catalog. Browse the full collection to discover our latest tools and lighting solutions.
          </p>
          <button
            onClick={() => router.push("/shop")}
            className="inline-flex items-center gap-2 rounded-full bg-primary text-ink px-6 py-3 font-semibold shadow-cream hover:shadow-lg transition"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const stockLabel = product.inStock ? "In stock • Ready to ship" : "Currently unavailable";

  const toggleWishlist = () => setIsWishlisted(prev => !prev);

  const adjustQuantity = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const addToCart = () => {
    setCartCount(prev => prev + quantity);
    setShowToast(true);
  };

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="border-b border-cream bg-cream-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <nav className="flex items-center text-sm text-muted-ink gap-2">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-ink font-medium line-clamp-1">{product.name}</span>
          </nav>
          <div className="flex items-center gap-3 text-sm text-muted-ink">
            <CheckCircle className={`h-4 w-4 ${product.inStock ? "text-primary" : "text-muted-ink"}`} />
            <span>{stockLabel}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-12">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl bg-cream-surface border border-cream shadow-cream overflow-hidden">
              <Image
                src={gallery[selectedImageIndex]}
                alt={product.name}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {gallery.map((imageSrc, index) => (
                  <button
                    key={imageSrc}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square rounded-2xl border transition ${
                      selectedImageIndex === index
                        ? "border-primary shadow-cream"
                        : "border-cream hover:border-primary"
                    }`}
                  >
                    <Image
                      src={imageSrc}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      sizes="25vw"
                      className="object-cover rounded-2xl"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              {product.badge && (
                <span className="inline-flex items-center rounded-full bg-cream-highlight text-muted-ink px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em]">
                  {product.badge}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-display font-semibold leading-tight">{product.name}</h1>
              <p className="text-muted-ink text-sm md:text-base max-w-2xl">{product.description}</p>
              <div className="flex items-center gap-2 text-sm">
                <RatingStars rating={product.rating} />
                <span className="font-medium">{product.rating.toFixed(1)}</span>
                <span className="text-muted-ink">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="rounded-3xl border border-cream bg-cream-surface p-5 shadow-sm space-y-4">
              <div className="flex flex-wrap items-end gap-3">
                <span className="text-3xl md:text-4xl font-display font-semibold">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-muted-ink line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="rounded-full bg-primary text-ink px-3 py-1 text-xs font-semibold">
                    Save {product.discount}%
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 rounded-2xl border border-cream bg-cream px-4 py-3 text-sm">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Warranty</p>
                    <p className="text-muted-ink">2 Years manufacturer</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-cream bg-cream px-4 py-3 text-sm">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Fast Delivery</p>
                    <p className="text-muted-ink">3-5 business days</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-cream bg-cream px-4 py-3 text-sm">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Quality Check</p>
                    <p className="text-muted-ink">Certified components</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="inline-flex items-center rounded-full border border-cream bg-cream px-3 py-2">
                  <button
                    onClick={() => adjustQuantity(-1)}
                    className="p-2 text-muted-ink hover:text-ink transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => adjustQuantity(1)}
                    className="p-2 text-muted-ink hover:text-ink transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={addToCart}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-ink px-6 py-3 font-semibold shadow-cream hover:shadow-lg transition"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>

                <button
                  onClick={toggleWishlist}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 font-semibold transition ${
                    isWishlisted
                      ? "border-primary text-primary bg-cream-highlight"
                      : "border-cream text-muted-ink hover:border-primary hover:text-ink"
                  }`}
                >
                  <Heart className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} />
                  {isWishlisted ? "Saved to Wishlist" : "Save for Later"}
                </button>
              </div>

              {cartCount > 0 && (
                <p className="text-sm text-muted-ink">
                  You have <span className="font-semibold text-primary">{cartCount}</span> of this item in your cart.
                </p>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Key Features</h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {product.features.map(feature => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-ink">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display font-semibold">Customer Reviews</h2>
            <span className="text-sm text-muted-ink">{product.reviews} verified reviews</span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {mockReviews.map(review => (
              <div key={review.id} className="rounded-3xl border border-cream bg-cream-surface p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-xs text-muted-ink">{review.date}</p>
                  </div>
                  <RatingStars rating={review.rating} />
                </div>
                <p className="text-sm text-muted-ink">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-semibold">You might also like</h2>
              <Link href="/shop" className="text-sm font-semibold text-primary hover:text-primary/80">See all</Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedProducts.map(related => (
                <Link
                  key={related.id}
                  href={`/product/${related.id}`}
                  className="group rounded-3xl border border-cream bg-cream-surface shadow-sm transition hover:-translate-y-1 hover:shadow-cream"
                >
                  <div className="relative h-48 overflow-hidden rounded-t-3xl">
                    <Image
                      src={related.image}
                      alt={related.name}
                      fill
                      sizes="100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-ink">{related.brand}</p>
                    <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors">
                      {related.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold">{formatCurrency(related.price)}</span>
                      {related.originalPrice > related.price && (
                        <span className="text-muted-ink line-through">
                          {formatCurrency(related.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-ink">
                      <RatingStars rating={related.rating} />
                      <span>{related.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {showToast && (
        <div className="fixed bottom-6 right-6 rounded-2xl bg-primary text-ink px-5 py-3 shadow-cream">
          Added to cart successfully!
        </div>
      )}
    </div>
  );
}