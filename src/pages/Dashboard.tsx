import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  MapPin, 
  Mail, 
  Calendar, 
  Coins, 
  Shirt, 
  Repeat, 
  TrendingUp,
  Plus,
  Eye,
  Heart,
  MessageCircle,
  Settings,
  Award,
  Leaf
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

// Mock data
const userStats = {
  points: 245,
  itemsListed: 12,
  swapsCompleted: 8,
  itemsSwapped: 15,
  co2Saved: 23.5, // kg
  waterSaved: 1250 // liters
}

const recentItems = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
    status: "Available",
    points: 45,
    likes: 12,
    views: 89
  },
  {
    id: 2,
    title: "Floral Summer Dress",
    image: "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg",
    status: "Swapped",
    points: 35,
    likes: 8,
    views: 67
  },
  {
    id: 3,
    title: "Classic White Sneakers",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
    status: "Available",
    points: 25,
    likes: 15,
    views: 134
  }
]

const recentActivity = [
  {
    id: 1,
    type: "swap_completed",
    title: "Swap completed with Emma K.",
    description: "You received: Floral Summer Dress",
    time: "2 hours ago",
    icon: Repeat,
    color: "text-green-600"
  },
  {
    id: 2,
    type: "item_liked",
    title: "Your item received a like",
    description: "Vintage Denim Jacket was liked by Mike R.",
    time: "5 hours ago",
    icon: Heart,
    color: "text-red-500"
  },
  {
    id: 3,
    type: "points_earned",
    title: "Points earned",
    description: "You earned 35 points from a successful swap",
    time: "1 day ago",
    icon: Coins,
    color: "text-amber-500"
  },
  {
    id: 4,
    type: "message",
    title: "New message",
    description: "Sarah M. sent you a swap request",
    time: "2 days ago",
    icon: MessageCircle,
    color: "text-blue-500"
  }
]

export function Dashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'items' | 'activity' | 'profile'>('overview')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800'
      case 'Swapped': return 'bg-gray-100 text-gray-800'
      case 'Pending': return 'bg-amber-100 text-amber-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.email?.split('@')[0]}!
          </h1>
          <p className="text-lg text-gray-600">
            Manage your sustainable fashion journey
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-stone-200">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'items', label: 'My Items', icon: Shirt },
              { id: 'activity', label: 'Activity', icon: Calendar },
              { id: 'profile', label: 'Profile', icon: User }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Points Balance</p>
                    <p className="text-3xl font-bold text-emerald-600">{userStats.points}</p>
                  </div>
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <Coins className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Items Listed</p>
                    <p className="text-3xl font-bold text-blue-600">{userStats.itemsListed}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Shirt className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Swaps Completed</p>
                    <p className="text-3xl font-bold text-purple-600">{userStats.swapsCompleted}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Repeat className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">CO₂ Saved</p>
                    <p className="text-3xl font-bold text-green-600">{userStats.co2Saved}kg</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/add-item"
                  className="flex items-center gap-3 p-4 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Plus className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">List New Item</p>
                    <p className="text-sm text-gray-600">Add clothing to exchange</p>
                  </div>
                </Link>

                <Link
                  to="/browse"
                  className="flex items-center gap-3 p-4 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Eye className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Browse Items</p>
                    <p className="text-sm text-gray-600">Find items to swap</p>
                  </div>
                </Link>

                <button className="flex items-center gap-3 p-4 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Messages</p>
                    <p className="text-sm text-gray-600">Check swap requests</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Your Environmental Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{userStats.co2Saved}kg</div>
                  <div className="text-emerald-100">CO₂ Emissions Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{userStats.waterSaved}L</div>
                  <div className="text-emerald-100">Water Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{userStats.itemsSwapped}</div>
                  <div className="text-emerald-100">Items Given New Life</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.slice(0, 4).map(activity => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-stone-50 rounded-lg transition-colors">
                    <div className={`p-2 rounded-lg bg-gray-100`}>
                      <activity.icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Items Tab */}
        {activeTab === 'items' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Items</h2>
              <Link
                to="/add-item"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add New Item
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentItems.map(item => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-emerald-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                        {item.points} pts
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {item.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {item.views}
                        </div>
                      </div>
                      <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Activity History</h2>
            
            <div className="bg-white rounded-xl shadow-sm border border-stone-200">
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 border border-stone-200 rounded-lg">
                      <div className={`p-3 rounded-lg bg-gray-100`}>
                        <activity.icon className={`h-5 w-5 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-1">{activity.title}</p>
                        <p className="text-gray-600 mb-2">{activity.description}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
            
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{user?.email?.split('@')[0]}</h3>
                  <p className="text-gray-600">{user?.email}</p>
                  <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mt-1">
                    Change Profile Picture
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.email?.split('@')[0]}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="City, State"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  rows={4}
                  placeholder="Tell others about yourself and your style preferences..."
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="mt-6 flex justify-end">
                <button className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}