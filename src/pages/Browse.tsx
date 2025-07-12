import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Grid, List, Star, MapPin, Eye, Heart, Shirt, Users, Baby, User } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

// Mock data for demonstration
const mockItems = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    description: "Classic blue denim jacket in excellent condition",
    images: ["https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg"],
    category: "Outerwear",
    size: "M",
    gender: "Unisex",
    condition: "Like New",
    tags: ["Vintage", "Casual", "Denim"],
    points: 45,
    owner: "Sarah M.",
    location: "New York, NY",
    likes: 12,
    views: 89,
    createdAt: "2025-01-02"
  },
  {
    id: 2,
    title: "Floral Summer Dress",
    description: "Beautiful floral print dress perfect for summer",
    images: ["https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg"],
    category: "Dresses",
    size: "S",
    gender: "Women",
    condition: "New",
    tags: ["Floral", "Summer", "Formal"],
    points: 35,
    owner: "Emma K.",
    location: "Los Angeles, CA",
    likes: 8,
    views: 67,
    createdAt: "2025-01-01"
  },
  {
    id: 3,
    title: "Classic White Sneakers",
    description: "Clean white sneakers, barely worn",
    images: ["https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"],
    category: "Footwear",
    size: "9",
    gender: "Men",
    condition: "Worn",
    tags: ["Casual", "Sports", "White"],
    points: 25,
    owner: "Mike R.",
    location: "Chicago, IL",
    likes: 15,
    views: 134,
    createdAt: "2024-12-30"
  },
  {
    id: 4,
    title: "Wool Blend Sweater",
    description: "Cozy wool blend sweater for cold weather",
    images: ["https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg"],
    category: "Knitwear",
    size: "L",
    gender: "Unisex",
    condition: "Like New",
    tags: ["Winter", "Warm", "Casual"],
    points: 40,
    owner: "Alex T.",
    location: "Seattle, WA",
    likes: 6,
    views: 45,
    createdAt: "2024-12-28"
  },
  {
    id: 5,
    title: "Designer Handbag",
    description: "Authentic designer handbag in pristine condition",
    images: ["https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg"],
    category: "Accessories",
    size: "One Size",
    gender: "Women",
    condition: "New",
    tags: ["Designer", "Luxury", "Formal"],
    points: 80,
    owner: "Jessica L.",
    location: "Miami, FL",
    likes: 23,
    views: 201,
    createdAt: "2024-12-25"
  },
  {
    id: 6,
    title: "Kids Rainbow T-Shirt",
    description: "Colorful rainbow t-shirt for kids",
    images: ["https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg"],
    category: "T-Shirts",
    size: "6Y",
    gender: "Kids",
    condition: "Worn",
    tags: ["Colorful", "Kids", "Casual"],
    points: 15,
    owner: "Maria S.",
    location: "Austin, TX",
    likes: 4,
    views: 28,
    createdAt: "2024-12-20"
  }
]

const categories = ["All", "Outerwear", "Dresses", "T-Shirts", "Knitwear", "Footwear", "Accessories"]
const sizes = ["All", "XS", "S", "M", "L", "XL", "XXL", "6Y", "8Y", "10Y", "12Y"]
const conditions = ["All", "New", "Like New", "Worn"]
const genders = ["All", "Men", "Women", "Unisex", "Kids"]
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
  { value: "points-high", label: "Highest Points" },
  { value: "points-low", label: "Lowest Points" }
]

export function Browse() {
  const { user } = useAuth()
  const [items, setItems] = useState(mockItems)
  const [filteredItems, setFilteredItems] = useState(mockItems)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSize, setSelectedSize] = useState('All')
  const [selectedCondition, setSelectedCondition] = useState('All')
  const [selectedGender, setSelectedGender] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [onlyAffordable, setOnlyAffordable] = useState(false)
  const [likedItems, setLikedItems] = useState<number[]>([])

  const userPoints = 100 // Mock user points

  useEffect(() => {
    let filtered = [...items]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // Size filter
    if (selectedSize !== 'All') {
      filtered = filtered.filter(item => item.size === selectedSize)
    }

    // Condition filter
    if (selectedCondition !== 'All') {
      filtered = filtered.filter(item => item.condition === selectedCondition)
    }

    // Gender filter
    if (selectedGender !== 'All') {
      filtered = filtered.filter(item => item.gender === selectedGender)
    }

    // Affordable filter
    if (onlyAffordable && user) {
      filtered = filtered.filter(item => item.points <= userPoints)
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'popular':
        filtered.sort((a, b) => (b.likes + b.views) - (a.likes + a.views))
        break
      case 'points-high':
        filtered.sort((a, b) => b.points - a.points)
        break
      case 'points-low':
        filtered.sort((a, b) => a.points - b.points)
        break
    }

    setFilteredItems(filtered)
  }, [items, searchTerm, selectedCategory, selectedSize, selectedCondition, selectedGender, sortBy, onlyAffordable, user])

  const toggleLike = (itemId: number) => {
    setLikedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case 'Men': return <User className="h-4 w-4" />
      case 'Women': return <Users className="h-4 w-4" />
      case 'Kids': return <Baby className="h-4 w-4" />
      default: return <Shirt className="h-4 w-4" />
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'New': return 'bg-emerald-100 text-emerald-800'
      case 'Like New': return 'bg-blue-100 text-blue-800'
      case 'Worn': return 'bg-amber-100 text-amber-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Browse Clothing Items
          </h1>
          <p className="text-lg text-gray-600">
            Discover amazing clothing pieces from our sustainable community
          </p>
        </div>

        {/* Search and Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search items, tags, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex bg-stone-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-stone-200'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-stone-200'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-stone-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Size Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {sizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>

                  {/* Condition Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                    <select
                      value={selectedCondition}
                      onChange={(e) => setSelectedCondition(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {conditions.map(condition => (
                        <option key={condition} value={condition}>{condition}</option>
                      ))}
                    </select>
                  </div>

                  {/* Gender Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {genders.map(gender => (
                        <option key={gender} value={gender}>{gender}</option>
                      ))}
                    </select>
                  </div>

                  {/* Affordable Toggle */}
                  {user && (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="affordable"
                        checked={onlyAffordable}
                        onChange={(e) => setOnlyAffordable(e.target.checked)}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <label htmlFor="affordable" className="ml-2 text-sm text-gray-700">
                        Only show items I can afford ({userPoints} points)
                      </label>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredItems.length} of {items.length} items
          </p>
        </div>

        {/* Items Grid/List */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
        }`}>
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`group bg-white rounded-xl shadow-sm border border-stone-200 hover:shadow-lg transition-all duration-300 overflow-hidden ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative overflow-hidden ${
                viewMode === 'list' ? 'w-48 h-32' : 'h-64'
              }`}>
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}>
                    {item.condition}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => toggleLike(item.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                      likedItems.includes(item.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-gray-600 hover:bg-white'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${likedItems.includes(item.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="bg-emerald-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                    {item.points} pts
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-500">
                    {getGenderIcon(item.gender)}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-gray-500">Size: {item.size}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{item.category}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{item.location}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-stone-100 text-stone-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {item.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {item.views}
                    </div>
                  </div>

                  <Link
                    to={`/item/${item.id}`}
                    className="flex items-center gap-1 px-3 py-1 bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-600 transition-colors"
                  >
                    <Eye className="h-3 w-3" />
                    View
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Shirt className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  )
}