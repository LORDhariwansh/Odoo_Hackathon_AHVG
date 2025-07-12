import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Calendar, 
  Eye, 
  Star,
  MessageCircle,
  Repeat,
  Coins,
  User,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

// Mock item data
const mockItem = {
  id: 1,
  title: "Vintage Denim Jacket",
  description: "This beautiful vintage denim jacket is in excellent condition and perfect for any casual outfit. Made from high-quality denim with classic styling that never goes out of fashion. Features include button closure, chest pockets, and a comfortable fit. Originally purchased from a premium brand, this jacket has been well-maintained and is ready for its next adventure.",
  images: [
    "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
    "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
    "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg"
  ],
  category: "Outerwear",
  size: "M",
  gender: "Unisex",
  condition: "Like New",
  tags: ["Vintage", "Casual", "Denim", "Classic"],
  points: 45,
  status: "Available",
  owner: {
    name: "Sarah M.",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    location: "New York, NY",
    rating: 4.8,
    totalSwaps: 23,
    joinedDate: "2023-06-15"
  },
  stats: {
    likes: 12,
    views: 89,
    shares: 3
  },
  createdAt: "2025-01-02",
  brand: "Levi's",
  originalPrice: "$89"
}

export function ItemDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [showSwapModal, setShowSwapModal] = useState(false)
  const [showRedeemModal, setShowRedeemModal] = useState(false)

  const userPoints = 100 // Mock user points
  const canAfford = userPoints >= mockItem.points

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === mockItem.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? mockItem.images.length - 1 : prev - 1
    )
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'New': return 'bg-emerald-100 text-emerald-800'
      case 'Like New': return 'bg-blue-100 text-blue-800'
      case 'Worn': return 'bg-amber-100 text-amber-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800'
      case 'Swapped': return 'bg-gray-100 text-gray-800'
      case 'Under Review': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Browse
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-xl overflow-hidden shadow-sm border border-stone-200">
              <div className="aspect-square relative">
                <img
                  src={mockItem.images[currentImageIndex]}
                  alt={mockItem.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                {mockItem.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {mockItem.images.length}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                      isLiked
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-gray-600 hover:bg-white'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:bg-white transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {mockItem.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {mockItem.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex
                        ? 'border-emerald-500'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${mockItem.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {mockItem.title}
                  </h1>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(mockItem.condition)}`}>
                      {mockItem.condition}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(mockItem.status)}`}>
                      {mockItem.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">
                    {mockItem.points} pts
                  </div>
                  <div className="text-sm text-gray-500">
                    Original: {mockItem.originalPrice}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {mockItem.stats.likes} likes
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {mockItem.stats.views} views
                </div>
                <div className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  {mockItem.stats.shares} shares
                </div>
              </div>
            </div>

            {/* Item Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
              <h3 className="font-semibold text-gray-900 mb-4">Item Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Category</span>
                  <p className="font-medium">{mockItem.category}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Size</span>
                  <p className="font-medium">{mockItem.size}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Gender</span>
                  <p className="font-medium">{mockItem.gender}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Brand</span>
                  <p className="font-medium">{mockItem.brand}</p>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-sm text-gray-500">Tags</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {mockItem.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-stone-100 text-stone-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
              <h3 className="font-semibold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {mockItem.description}
              </p>
            </div>

            {/* Owner Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
              <h3 className="font-semibold text-gray-900 mb-4">Owner Information</h3>
              <div className="flex items-center gap-4">
                <img
                  src={mockItem.owner.avatar}
                  alt={mockItem.owner.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{mockItem.owner.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{mockItem.owner.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                    <MapPin className="h-3 w-3" />
                    {mockItem.owner.location}
                  </div>
                  <div className="text-sm text-gray-500">
                    {mockItem.owner.totalSwaps} successful swaps
                  </div>
                </div>
                <button className="px-4 py-2 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            {user && mockItem.status === 'Available' && (
              <div className="space-y-3">
                <button
                  onClick={() => setShowSwapModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  <Repeat className="h-5 w-5" />
                  Request Swap
                </button>
                
                <button
                  onClick={() => setShowRedeemModal(true)}
                  disabled={!canAfford}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 font-semibold rounded-xl transition-colors ${
                    canAfford
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Coins className="h-5 w-5" />
                  Redeem with Points {!canAfford && `(Need ${mockItem.points - userPoints} more)`}
                </button>

                {user && (
                  <div className="text-center text-sm text-gray-500">
                    Your balance: {userPoints} points
                  </div>
                )}
              </div>
            )}

            {!user && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-800">
                  <Shield className="h-5 w-5" />
                  <span className="font-medium">Sign in required</span>
                </div>
                <p className="text-amber-700 mt-1">
                  Please sign in to request swaps or redeem items with points.
                </p>
                <Link
                  to="/login"
                  className="inline-block mt-3 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals would go here */}
    </div>
  )
}