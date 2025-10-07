'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingCart, CreditCard, Truck, Shield, Gift, Tag } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  inStock: boolean;
  category: string;
}

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export default function CartCheckout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentStep, setCurrentStep] = useState(1); // 1: Cart, 2: Shipping, 3: Payment
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [isLoading, setIsLoading] = useState(false);

  // Mock cart data
  useEffect(() => {
    const mockCartItems: CartItem[] = [
      {
        id: '1',
        name: 'DEWALT 20V MAX Cordless Drill Driver Kit',
        brand: 'DEWALT',
        price: 149.99,
        originalPrice: 199.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=200',
        inStock: true,
        category: 'Power Tools'
      },
      {
        id: '2',
        name: 'Milwaukee 18V Circular Saw',
        brand: 'Milwaukee',
        price: 179.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=200',
        inStock: true,
        category: 'Power Tools'
      },
      {
        id: '3',
        name: 'Bosch Professional Hammer Drill',
        brand: 'Bosch',
        price: 89.99,
        originalPrice: 119.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200',
        inStock: false,
        category: 'Power Tools'
      }
    ];
    setCartItems(mockCartItems);
  }, []);

  const shippingMethods: ShippingMethod[] = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: 'Free shipping on orders over $75',
      price: 0,
      estimatedDays: '5-7 business days'
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: 'Faster delivery',
      price: 15.99,
      estimatedDays: '2-3 business days'
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      description: 'Next business day delivery',
      price: 29.99,
      estimatedDays: '1 business day'
    }
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: '💳',
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '🅿️',
      description: 'Pay with your PayPal account'
    },
    {
      id: 'klarna',
      name: 'Klarna',
      icon: '🛍️',
      description: 'Buy now, pay later'
    },
    {
      id: 'apple',
      name: 'Apple Pay',
      icon: '🍎',
      description: 'Quick and secure payment'
    }
  ];

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    // Mock promo code logic
    if (promoCode.toLowerCase() === 'save10') {
      setPromoDiscount(0.1);
    } else if (promoCode.toLowerCase() === 'newuser') {
      setPromoDiscount(0.15);
    } else {
      alert('Invalid promo code');
      return;
    }
    alert('Promo code applied successfully!');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + ((item.originalPrice - item.price) * item.quantity);
    }
    return sum;
  }, 0);
  const promoSavings = subtotal * promoDiscount;
  const selectedShippingMethod = shippingMethods.find(method => method.id === selectedShipping);
  const shippingCost = selectedShippingMethod?.price || 0;
  const tax = (subtotal - promoSavings) * 0.08; // 8% tax
  const total = subtotal - promoSavings + shippingCost + tax;

  const proceedToCheckout = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Process payment
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        alert('Order placed successfully! 🎉');
        // In real app, redirect to order confirmation
      }, 2000);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (cartItems.length === 0 && currentStep === 1) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="w-full max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-cream-surface border border-cream shadow-cream mb-6">
            <ShoppingCart className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-ink mb-4">Your cart is feeling a little light</h1>
          <p className="text-base md:text-lg text-muted-ink mb-8 max-w-2xl mx-auto">
            Looks like you haven&#39;t added any tools yet. Explore our collections and keep your next project on track.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-primary text-ink font-semibold rounded-full shadow-cream hover:-translate-y-0.5 transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-40 border-b border-cream bg-cream-frost backdrop-blur">
        <div className="w-full max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {currentStep === 1 ? (
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-full border border-cream bg-cream-surface px-4 py-2 text-sm font-semibold text-muted-ink transition-all hover:text-ink hover:shadow-cream"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Shop
                </Link>
              ) : (
                <button
                  onClick={goBack}
                  className="inline-flex items-center gap-2 rounded-full border border-cream bg-cream-surface px-4 py-2 text-sm font-semibold text-muted-ink transition-all hover:text-ink hover:shadow-cream"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              )}
              <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-cream-highlight px-3 py-1 text-xs font-semibold text-muted-ink">
                Seamless checkout journey
              </span>
            </div>

            <div className="hidden md:flex items-center gap-4">
              {['Cart', 'Shipping', 'Payment'].map((step, index) => {
                const stepNumber = index + 1;
                const isCurrent = stepNumber === currentStep;
                const isComplete = stepNumber < currentStep;
                return (
                  <div key={step} className="flex items-center">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors ${
                        isCurrent
                          ? 'border-primary bg-primary text-ink shadow-cream'
                          : isComplete
                          ? 'border-primary bg-cream-highlight text-primary'
                          : 'border-cream bg-cream-surface text-muted-ink'
                      }`}
                    >
                      {stepNumber}
                    </div>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        isCurrent || isComplete ? 'text-ink' : 'text-muted-ink'
                      }`}
                    >
                      {step}
                    </span>
                    {index < 2 && (
                      <div
                        className={`mx-4 h-px w-10 ${isComplete ? 'bg-primary' : 'bg-cream'}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-muted-ink">Current total</p>
              <p className="text-2xl font-display font-bold text-ink">${total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="w-full max-w-7xl mx-auto px-4 pt-10">
        <div className="relative overflow-hidden rounded-3xl border border-cream bg-gradient-to-r from-[#f7e9d0] via-[#f1dab3] to-[#ebcb9c] px-6 py-10 md:px-10 shadow-cream">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-muted-ink">
              <Shield className="h-4 w-4 text-primary" />
              100% secure checkout
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-ink">
              Bring your project plan to life
            </h1>
            <p className="text-base md:text-lg text-muted-ink">
              Review your essential gear, pick the right delivery window, and confirm payment in just three guided steps.
            </p>
            <div className="flex flex-wrap gap-3 text-sm font-semibold text-muted-ink">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1">
                <Truck className="h-4 w-4 text-primary" />
                Fast delivery options
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1">
                <CreditCard className="h-4 w-4 text-primary" />
                Flexible payments
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1">
                <Gift className="h-4 w-4 text-primary" />
                Free returns for 30 days
              </span>
            </div>
          </div>
          <div className="pointer-events-none absolute -left-20 -top-16 h-56 w-56 rounded-full bg-white/40 blur-3xl" />
          <div className="pointer-events-none absolute -right-12 bottom-0 h-64 w-64 rounded-full bg-white/30 blur-3xl" />
        </div>
      </section>

      <main className="w-full max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {currentStep === 1 && (
              <section>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-ink">
                      Shopping Cart <span className="text-base font-normal text-muted-ink">({cartItems.length} items)</span>
                    </h2>
                    <p className="text-sm text-muted-ink md:text-base">
                      Update quantities, remove items, or save for later before proceeding.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-cream bg-cream-surface px-3 py-1 text-xs font-semibold text-muted-ink">
                    <ShoppingCart className="h-4 w-4 text-primary" />
                    Step 1 of 3
                  </div>
                </div>

                <div className="space-y-5">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-cream bg-cream-surface p-5 shadow-cream transition-transform hover:-translate-y-0.5"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-cream sm:h-24 sm:w-24">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="100vw"
                          />
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <h3 className="font-semibold text-ink">{item.name}</h3>
                              <p className="text-sm text-muted-ink">
                                {item.brand} • {item.category}
                              </p>
                              {!item.inStock && (
                                <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-ink">
                                  Out of stock — ships when available
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="inline-flex items-center gap-1 text-sm font-medium text-muted-ink transition-colors hover:text-primary"
                            >
                              <Trash2 className="h-4 w-4" />
                              Remove
                            </button>
                          </div>

                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="inline-flex items-center gap-2 rounded-full border border-cream bg-cream px-3 py-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cream-surface text-muted-ink transition-colors hover:bg-cream-highlight disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-cream-surface"
                                disabled={!item.inStock}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="min-w-[2rem] text-center font-semibold text-ink">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cream-surface text-muted-ink transition-colors hover:bg-cream-highlight disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-cream-surface"
                                disabled={!item.inStock}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <span className="text-lg font-display font-semibold text-ink">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                                {item.originalPrice && (
                                  <span className="text-sm text-muted-ink line-through">
                                    ${(item.originalPrice * item.quantity).toFixed(2)}
                                  </span>
                                )}
                              </div>
                              {item.originalPrice && (
                                <p className="text-xs font-semibold text-primary">
                                  You save ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-cream bg-cream-surface p-6 shadow-cream">
                  <h3 className="mb-4 flex items-center gap-2 font-semibold text-ink">
                    <Tag className="h-5 w-5 text-primary" />
                    Have a promo code?
                  </h3>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 rounded-full border border-cream bg-white px-4 py-3 text-ink placeholder-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-ink shadow-cream transition-all hover:-translate-y-0.5"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="mt-3 text-sm text-muted-ink">
                    Try SAVE10 for 10% off or NEWUSER for 15% off.
                  </p>
                </div>
              </section>
            )}

            {currentStep === 2 && (
              <section className="space-y-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-ink">Shipping Information</h2>
                    <p className="text-sm text-muted-ink md:text-base">
                      Tell us where to send your order and choose the delivery speed that suits you.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-cream bg-cream-surface px-3 py-1 text-xs font-semibold text-muted-ink">
                    <Truck className="h-4 w-4 text-primary" />
                    Step 2 of 3
                  </div>
                </div>

                <div className="rounded-2xl border border-cream bg-cream-surface p-6 shadow-cream">
                  <h3 className="mb-4 font-semibold text-ink">Delivery Address</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="rounded-xl border border-cream bg-white px-4 py-3 text-ink placeholder-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="rounded-xl border border-cream bg-white px-4 py-3 text-ink placeholder-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      placeholder="Street Address"
                      className="rounded-xl border border-cream bg-white px-4 py-3 text-ink placeholder-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary md:col-span-2"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      className="rounded-xl border border-cream bg-white px-4 py-3 text-ink placeholder-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      placeholder="State/Province"
                      className="rounded-xl border border-cream bg-white px-4 py-3 text-ink placeholder-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      placeholder="ZIP/Postal Code"
                      className="rounded-xl border border-cream bg-white px-4 py-3 text-ink placeholder-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      placeholder="Phone Number"
                      className="rounded-xl border border-cream bg-white px-4 py-3 text-ink placeholder-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-cream bg-cream-surface p-6 shadow-cream">
                  <h3 className="mb-4 font-semibold text-ink">Shipping Method</h3>
                  <div className="space-y-3">
                    {shippingMethods.map((method) => {
                      const isSelected = selectedShipping === method.id;
                      return (
                        <label
                          key={method.id}
                          className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-4 transition-all ${
                            isSelected
                              ? 'border-primary bg-cream-highlight shadow-cream'
                              : 'border-cream bg-cream-surface hover:border-primary'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shipping"
                              value={method.id}
                              checked={isSelected}
                              onChange={(e) => setSelectedShipping(e.target.value)}
                              className="sr-only"
                            />
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream-highlight text-primary">
                              <Truck className="h-4 w-4" />
                            </span>
                            <div>
                              <p className="font-semibold text-ink">{method.name}</p>
                              <p className="text-sm text-muted-ink">{method.description}</p>
                              <p className="text-sm text-muted-ink">{method.estimatedDays}</p>
                            </div>
                          </div>
                          <span className="font-semibold text-ink">
                            {method.price === 0 ? 'FREE' : `$${method.price.toFixed(2)}`}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {currentStep === 3 && (
              <section className="space-y-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-ink">Payment Information</h2>
                    <p className="text-sm text-muted-ink md:text-base">
                      Choose how you would like to pay and enter your secure payment details.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-cream bg-cream-surface px-3 py-1 text-xs font-semibold text-muted-ink">
                    <CreditCard className="h-4 w-4 text-primary" />
                    Step 3 of 3
                  </div>
                </div>

                <div className="rounded-2xl border border-cream bg-cream-surface p-6 shadow-cream">
                  <h3 className="mb-4 font-semibold text-ink">Payment Method</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {paymentMethods.map((method) => {
                      const isSelected = selectedPayment === method.id;
                      return (
                        <label
                          key={method.id}
                          className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-4 transition-all ${
                            isSelected
                              ? 'border-primary bg-cream-highlight shadow-cream'
                              : 'border-cream bg-cream-surface hover:border-primary'
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={isSelected}
                            onChange={(e) => setSelectedPayment(e.target.value)}
                            className="sr-only"
                          />
                          <span className="text-2xl">{method.icon}</span>
                          <div>
                            <p className="font-semibold text-ink">{method.name}</p>
                            <p className="text-sm text-muted-ink">{method.description}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {selectedPayment === 'card' && (
                  <div className="rounded-2xl border border-cream bg-cream-surface p-6 shadow-cream">
                    <h3 className="mb-4 font-semibold text-ink">Card Information</h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full rounded-xl border border-cream bg-white px-4 py-3 text-ink placeholder-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="rounded-xl border border-cream bg-white px-4 py-3 text-ink placeholder-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                          type="text"
                          placeholder="CVC"
                          className="rounded-xl border border-cream bg-white px-4 py-3 text-ink placeholder-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Cardholder Name"
                        className="w-full rounded-xl border border-cream bg-white px-4 py-3 text-ink placeholder-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                )}
              </section>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-6 rounded-3xl border border-cream bg-cream-surface p-6 shadow-cream">
              <div>
                <h3 className="text-xl font-display font-semibold text-ink">Order Summary</h3>
                <p className="text-sm text-muted-ink">
                  Totals update automatically as you move through checkout.
                </p>
              </div>

              <div className="space-y-3 text-sm text-muted-ink">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="text-ink">${subtotal.toFixed(2)}</span>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>Savings</span>
                    <span>- ${savings.toFixed(2)}</span>
                  </div>
                )}

                {promoSavings > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>Promo Discount</span>
                    <span>- ${promoSavings.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-ink">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="text-ink">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-cream pt-3 text-base font-semibold text-ink">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={proceedToCheckout}
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-base font-semibold text-ink shadow-cream transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-ink opacity-70"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    {currentStep === 1 && <span>Proceed to Shipping</span>}
                    {currentStep === 2 && <span>Proceed to Payment</span>}
                    {currentStep === 3 && (
                      <>
                        <CreditCard className="h-5 w-5" />
                        <span>Place Order</span>
                      </>
                    )}
                  </>
                )}
              </button>

              <div className="border-t border-cream pt-6">
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-muted-ink">
                  <div className="inline-flex items-center gap-1">
                    <Shield className="h-4 w-4 text-primary" />
                    Secure checkout
                  </div>
                  <div className="inline-flex items-center gap-1">
                    <Truck className="h-4 w-4 text-primary" />
                    Fast dispatch
                  </div>
                  <div className="inline-flex items-center gap-1">
                    <Gift className="h-4 w-4 text-primary" />
                    Free returns
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}