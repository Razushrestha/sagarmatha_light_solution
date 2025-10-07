'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, 
  Package, 
  Heart, 
  CreditCard, 
  MapPin, 
  Bell, 
  Settings, 
  LogOut,
  Star,
  Truck,
  Calendar,
  Award,
  TrendingUp,
  ShoppingBag,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  total: number;
  items: number;
  trackingNumber?: string;
}

interface WishlistItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  totalOrders: number;
  totalSpent: number;
  loyaltyPoints: number;
  membershipTier: string;
}

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Mock data
  useEffect(() => {
    const mockUser: UserProfile = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      memberSince: '2023-01-15',
      totalOrders: 24,
      totalSpent: 3247.85,
      loyaltyPoints: 1250,
      membershipTier: 'Gold'
    };

    const mockOrders: Order[] = [
      {
        id: 'ORD-2024-001',
        date: '2024-01-20',
        status: 'delivered',
        total: 299.99,
        items: 2,
        trackingNumber: 'TRK123456789'
      },
      {
        id: 'ORD-2024-002',
        date: '2024-01-18',
        status: 'shipped',
        total: 149.99,
        items: 1,
        trackingNumber: 'TRK987654321'
      },
      {
        id: 'ORD-2024-003',
        date: '2024-01-15',
        status: 'processing',
        total: 89.99,
        items: 3
      },
      {
        id: 'ORD-2024-004',
        date: '2024-01-10',
        status: 'cancelled',
        total: 199.99,
        items: 1
      }
    ];

    const mockWishlist: WishlistItem[] = [
      {
        id: '1',
        name: 'Milwaukee M18 Impact Driver',
        brand: 'Milwaukee',
        price: 179.99,
        originalPrice: 219.99,
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=200',
        inStock: true
      },
      {
        id: '2',
        name: 'Bosch Laser Level',
        brand: 'Bosch',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200',
        inStock: false
      },
      {
        id: '3',
        name: 'DeWalt Circular Saw',
        brand: 'DeWalt',
        price: 249.99,
        originalPrice: 299.99,
        image: 'https://images.unsplash.com/photo-1609205291999-e6e744892062?w=200',
        inStock: true
      }
    ];

    setUser(mockUser);
    setOrders(mockOrders);
    setWishlist(mockWishlist);
  }, []);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return 'text-green-400';
      case 'shipped': return 'text-blue-400';
      case 'processing': return 'text-yellow-400';
      case 'cancelled': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const removeFromWishlist = (id: string) => {
    setWishlist(items => items.filter(item => item.id !== id));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <header className="bg-dark-light border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-orange-500 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-dark" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
                <p className="text-gray-400">Manage your account and track your orders</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Member Since</p>
                <p className="font-semibold">{new Date(user.memberSince).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Membership</p>
                <p className="font-semibold text-primary">{user.membershipTier}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-dark-light rounded-lg p-6">
              <nav className="space-y-2">
                {[
                  { id: 'overview', icon: TrendingUp, label: 'Overview' },
                  { id: 'orders', icon: Package, label: 'My Orders' },
                  { id: 'wishlist', icon: Heart, label: 'Wishlist' },
                  { id: 'profile', icon: User, label: 'Profile' },
                  { id: 'addresses', icon: MapPin, label: 'Addresses' },
                  { id: 'payment', icon: CreditCard, label: 'Payment Methods' },
                  { id: 'notifications', icon: Bell, label: 'Notifications' },
                  { id: 'settings', icon: Settings, label: 'Settings' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-primary/20 text-primary'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
                
                <div className="pt-4 border-t border-gray-700">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600/20 hover:text-red-400 transition-colors">
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-dark-light rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Total Orders</p>
                        <p className="text-2xl font-bold text-primary">{user.totalOrders}</p>
                      </div>
                      <ShoppingBag className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  
                  <div className="bg-dark-light rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Total Spent</p>
                        <p className="text-2xl font-bold text-primary">${user.totalSpent.toFixed(2)}</p>
                      </div>
                      <CreditCard className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  
                  <div className="bg-dark-light rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Loyalty Points</p>
                        <p className="text-2xl font-bold text-primary">{user.loyaltyPoints}</p>
                      </div>
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  
                  <div className="bg-dark-light rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Wishlist Items</p>
                        <p className="text-2xl font-bold text-primary">{wishlist.length}</p>
                      </div>
                      <Heart className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-dark-light rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Recent Orders</h2>
                    <Link
                      href="#"
                      onClick={() => setActiveTab('orders')}
                      className="text-primary hover:underline"
                    >
                      View All
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-full bg-gray-700 ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                          </div>
                          <div>
                            <p className="font-semibold">{order.id}</p>
                            <p className="text-sm text-gray-400">{order.items} items • {new Date(order.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">${order.total.toFixed(2)}</p>
                          <p className={`text-sm capitalize ${getStatusColor(order.status)}`}>
                            {order.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-dark-light rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                      href="/shop"
                      className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <ShoppingBag className="h-6 w-6 text-primary" />
                      <span>Continue Shopping</span>
                    </Link>
                    
                    <button
                      onClick={() => setActiveTab('wishlist')}
                      className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Heart className="h-6 w-6 text-primary" />
                      <span>View Wishlist</span>
                    </button>
                    
                    <button
                      onClick={() => setActiveTab('profile')}
                      className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <User className="h-6 w-6 text-primary" />
                      <span>Edit Profile</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">My Orders</h2>
                
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-dark-light rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-full bg-gray-700 ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{order.id}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(order.date).toLocaleDateString()}
                              </span>
                              <span>{order.items} items</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-xl font-bold text-primary">${order.total.toFixed(2)}</p>
                          <p className={`text-sm capitalize font-semibold ${getStatusColor(order.status)}`}>
                            {order.status}
                          </p>
                        </div>
                      </div>
                      
                      {order.trackingNumber && (
                        <div className="bg-gray-800 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-400">Tracking Number</p>
                              <p className="font-mono text-primary">{order.trackingNumber}</p>
                            </div>
                            <button className="bg-primary hover:bg-primary-dark text-dark px-4 py-2 rounded-lg transition-colors">
                              Track Order
                            </button>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex space-x-4 mt-4">
                        <button className="flex-1 border border-gray-600 hover:border-primary text-white py-2 px-4 rounded-lg transition-colors">
                          View Details
                        </button>
                        {order.status === 'delivered' && (
                          <button className="flex-1 bg-primary hover:bg-primary-dark text-dark py-2 px-4 rounded-lg transition-colors">
                            Reorder
                          </button>
                        )}
                        {order.status === 'processing' && (
                          <button className="flex-1 border border-red-600 hover:bg-red-600/20 text-red-400 py-2 px-4 rounded-lg transition-colors">
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">My Wishlist</h2>
                  <p className="text-gray-400">{wishlist.length} items</p>
                </div>
                
                {wishlist.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-400 mb-6">Save items you love to buy them later</p>
                    <Link
                      href="/shop"
                      className="inline-flex items-center bg-primary hover:bg-primary-dark text-dark font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((item) => (
                      <div key={item.id} className="bg-dark-light rounded-lg p-4">
                        <div className="aspect-square bg-gray-800 rounded-lg mb-4 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm text-gray-400">{item.brand}</p>
                          <h3 className="font-semibold">{item.name}</h3>
                          
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-primary">${item.price}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${item.originalPrice}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {item.inStock ? (
                              <span className="text-sm text-green-400">✓ In Stock</span>
                            ) : (
                              <span className="text-sm text-red-400">Out of Stock</span>
                            )}
                          </div>
                          
                          <div className="flex space-x-2 pt-2">
                            <button
                              disabled={!item.inStock}
                              className="flex-1 bg-primary hover:bg-primary-dark text-dark py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Add to Cart
                            </button>
                            <button
                              onClick={() => removeFromWishlist(item.id)}
                              className="p-2 border border-gray-600 hover:border-red-400 hover:text-red-400 rounded-lg transition-colors"
                            >
                              <XCircle className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Profile Settings</h2>
                
                <div className="bg-dark-light rounded-lg p-6">
                  <div className="flex items-center space-x-6 mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-primary to-orange-500 rounded-full flex items-center justify-center">
                      <User className="h-10 w-10 text-dark" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{user.name}</h3>
                      <p className="text-gray-400">{user.email}</p>
                      <button className="text-primary hover:underline text-sm mt-1">
                        Change Profile Picture
                      </button>
                    </div>
                  </div>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue={user.phone}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="bg-primary hover:bg-primary-dark text-dark font-semibold py-2 px-6 rounded-lg transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        className="border border-gray-600 hover:border-gray-500 text-white py-2 px-6 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Placeholder for other tabs */}
            {!['overview', 'orders', 'wishlist', 'profile'].includes(activeTab) && (
              <div className="bg-dark-light rounded-lg p-12 text-center">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 capitalize">{activeTab}</h3>
                <p className="text-gray-400">This section is coming soon!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}