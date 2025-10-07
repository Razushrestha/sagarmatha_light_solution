'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Clock, 
  BookOpen, 
  Video, 
  FileText, 
  Wrench,
  Lightbulb,
  TrendingUp,
  Tag,
  ArrowRight,
  Play,
  Download
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  publishDate: string;
  readTime: number;
  category: string;
  tags: string[];
  image: string;
  type: 'article' | 'video' | 'guide' | 'tutorial';
  featured?: boolean;
  views: number;
}

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
  color: string;
}

export default function BlogLearningHub() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  // Mock data
  useEffect(() => {
    const mockCategories: Category[] = [
      { id: 'tools', name: 'Power Tools', icon: Wrench, count: 24, color: 'bg-blue-600' },
      { id: 'safety', name: 'Safety Tips', icon: Lightbulb, count: 18, color: 'bg-red-600' },
      { id: 'projects', name: 'DIY Projects', icon: BookOpen, count: 32, color: 'bg-green-600' },
      { id: 'maintenance', name: 'Maintenance', icon: TrendingUp, count: 15, color: 'bg-purple-600' },
      { id: 'reviews', name: 'Product Reviews', icon: FileText, count: 28, color: 'bg-orange-600' }
    ];

    const mockPosts: BlogPost[] = [
      {
        id: '1',
        title: 'Complete Guide to Choosing the Right Drill for Your Project',
        excerpt: 'Whether you are a professional contractor or a weekend DIY enthusiast, selecting the right drill can make all the difference in your project success.',
        content: 'Full article content...',
        author: 'Mike Johnson',
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50',
        publishDate: '2024-01-20',
        readTime: 8,
        category: 'tools',
        tags: ['drill', 'power tools', 'guide', 'selection'],
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400',
        type: 'guide',
        featured: true,
        views: 2847
      },
      {
        id: '2',
        title: 'Essential Safety Gear Every Contractor Should Have',
        excerpt: 'Workplace safety is paramount in construction and electrical work. Here are the must-have safety items for any professional.',
        content: 'Full article content...',
        author: 'Sarah Wilson',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e90b0b?w=50',
        publishDate: '2024-01-18',
        readTime: 6,
        category: 'safety',
        tags: ['safety', 'PPE', 'construction', 'protection'],
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
        type: 'article',
        views: 1923
      },
      {
        id: '3',
        title: 'How to Build a Custom Tool Storage System',
        excerpt: 'Organize your workshop with this step-by-step tutorial on creating a custom tool storage solution that maximizes space and efficiency.',
        content: 'Full article content...',
        author: 'David Chen',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50',
        publishDate: '2024-01-15',
        readTime: 12,
        category: 'projects',
        tags: ['DIY', 'storage', 'organization', 'workshop'],
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        type: 'tutorial',
        views: 3521
      },
      {
        id: '4',
        title: 'Milwaukee M18 vs DeWalt 20V MAX: Ultimate Comparison',
        excerpt: 'An in-depth comparison of two leading cordless tool platforms to help you make an informed decision for your toolkit.',
        content: 'Full article content...',
        author: 'Alex Rodriguez',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50',
        publishDate: '2024-01-12',
        readTime: 15,
        category: 'reviews',
        tags: ['milwaukee', 'dewalt', 'comparison', 'cordless'],
        image: 'https://images.unsplash.com/photo-1609205291999-e6e744892062?w=400',
        type: 'video',
        featured: true,
        views: 4832
      },
      {
        id: '5',
        title: 'Maintaining Your Power Tools for Maximum Lifespan',
        excerpt: 'Proper maintenance can extend the life of your tools by years. Learn the essential maintenance tips from industry professionals.',
        content: 'Full article content...',
        author: 'Jennifer Lee',
        authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50',
        publishDate: '2024-01-10',
        readTime: 10,
        category: 'maintenance',
        tags: ['maintenance', 'care', 'longevity', 'tips'],
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400',
        type: 'article',
        views: 2156
      },
      {
        id: '6',
        title: 'Top 10 Electrical Tools Every Electrician Needs',
        excerpt: 'From multimeters to wire strippers, discover the essential tools that should be in every electrician professional toolkit.',
        content: 'Full article content...',
        author: 'Robert Taylor',
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50',
        publishDate: '2024-01-08',
        readTime: 7,
        category: 'tools',
        tags: ['electrical', 'tools', 'professional', 'essentials'],
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400',
        type: 'guide',
        views: 3847
      }
    ];

    setPosts(mockPosts);
    setCategories(mockCategories);
  }, []);

  const getTypeIcon = (type: BlogPost['type']) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'guide': return <BookOpen className="h-4 w-4" />;
      case 'tutorial': return <Wrench className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: BlogPost['type']) => {
    switch (type) {
      case 'video': return 'bg-red-600';
      case 'guide': return 'bg-blue-600';
      case 'tutorial': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesType = selectedType === 'all' || post.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.views - a.views;
      case 'oldest':
        return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
      default: // latest
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    }
  });

  const featuredPosts = posts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <header className="bg-dark-light border-b border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">SmartBuild Learning Hub</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Expand your knowledge with expert guides, tutorials, and industry insights
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <div key={post.id} className="bg-dark-light rounded-xl overflow-hidden group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getTypeColor(post.type)}`}>
                        <div className="flex items-center space-x-1">
                          {getTypeIcon(post.type)}
                          <span className="capitalize">{post.type}</span>
                        </div>
                      </span>
                    </div>
                    {post.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center">
                          <Play className="h-8 w-8 text-dark ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.publishDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime} min read
                      </span>
                      <span>{post.views.toLocaleString()} views</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img
                          src={post.authorAvatar}
                          alt={post.author}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm text-gray-400">{post.author}</span>
                      </div>
                      
                      <Link
                        href={`/blog/${post.id}`}
                        className="flex items-center text-primary hover:underline"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Search */}
              <div className="bg-dark-light rounded-lg p-6">
                <h3 className="font-semibold mb-4">Search Articles</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search topics, guides..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-dark-light rounded-lg p-6">
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-primary/20 text-primary'
                        : 'hover:bg-gray-700'
                    }`}
                  >
                    <span>All Categories</span>
                    <span className="text-sm">({posts.length})</span>
                  </button>
                  
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary/20 text-primary'
                          : 'hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${category.color}`} />
                        <span>{category.name}</span>
                      </div>
                      <span className="text-sm">({category.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Type Filter */}
              <div className="bg-dark-light rounded-lg p-6">
                <h3 className="font-semibold mb-4">Content Type</h3>
                <div className="space-y-2">
                  {['all', 'article', 'video', 'guide', 'tutorial'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`w-full flex items-center space-x-2 p-3 rounded-lg transition-colors capitalize ${
                        selectedType === type
                          ? 'bg-primary/20 text-primary'
                          : 'hover:bg-gray-700'
                      }`}
                    >
                      {type !== 'all' && getTypeIcon(type as BlogPost['type'])}
                      <span>{type === 'all' ? 'All Types' : type}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-lg p-6 border border-primary/30">
                <h3 className="font-semibold mb-2">Stay Updated</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Get the latest guides and tutorials delivered to your inbox
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                  />
                  <button className="w-full bg-primary hover:bg-primary-dark text-dark font-semibold py-2 px-4 rounded-lg transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters and Sort */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold">
                  {selectedCategory === 'all' ? 'All Articles' : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <span className="text-gray-400">({sortedPosts.length} articles)</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
              >
                <option value="latest">Latest First</option>
                <option value="popular">Most Popular</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            {/* Articles Grid */}
            {sortedPosts.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedPosts.map((post) => (
                  <article key={post.id} className="bg-dark-light rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getTypeColor(post.type)}`}>
                          <div className="flex items-center space-x-1">
                            {getTypeIcon(post.type)}
                            <span className="capitalize">{post.type}</span>
                          </div>
                        </span>
                      </div>
                      {post.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-primary/90 rounded-full flex items-center justify-center">
                            <Play className="h-6 w-6 text-dark ml-0.5" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-5">
                      <div className="flex items-center space-x-3 text-xs text-gray-400 mb-2">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(post.publishDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.readTime} min
                        </span>
                        <span>{post.views.toLocaleString()} views</span>
                      </div>
                      
                      <h3 className="font-bold mb-2 hover:text-primary transition-colors line-clamp-2">
                        <Link href={`/blog/${post.id}`}>
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-700 text-xs rounded text-gray-300">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img
                            src={post.authorAvatar}
                            alt={post.author}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-xs text-gray-400">{post.author}</span>
                        </div>
                        
                        <Link
                          href={`/blog/${post.id}`}
                          className="text-primary hover:underline text-sm font-semibold"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {sortedPosts.length >= 6 && (
              <div className="text-center mt-12">
                <button className="bg-primary hover:bg-primary-dark text-dark font-semibold py-3 px-8 rounded-lg transition-colors">
                  Load More Articles
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}