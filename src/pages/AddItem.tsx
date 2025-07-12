import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { motion } from 'framer-motion'
import { Upload, X, Plus, Coins, Info } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const schema = yup.object().shape({
  title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  category: yup.string().required('Category is required'),
  size: yup.string().required('Size is required'),
  gender: yup.string().required('Gender is required'),
  condition: yup.string().required('Condition is required'),
  brand: yup.string(),
  originalPrice: yup.string()
})

interface AddItemForm {
  title: string
  description: string
  category: string
  size: string
  gender: string
  condition: string
  brand?: string
  originalPrice?: string
}

const categories = [
  'T-Shirts', 'Shirts', 'Pants', 'Jeans', 'Dresses', 'Skirts', 
  'Sweaters', 'Hoodies', 'Jackets', 'Coats', 'Shoes', 'Accessories'
]

const sizes = {
  clothing: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  shoes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
  kids: ['2T', '3T', '4T', '5T', '6', '7', '8', '10', '12', '14', '16']
}

const genders = ['Men', 'Women', 'Unisex', 'Kids']
const conditions = [
  { value: 'new', label: 'New', points: 50, description: 'Brand new with tags' },
  { value: 'like-new', label: 'Like New', points: 40, description: 'Excellent condition, barely worn' },
  { value: 'worn', label: 'Worn', points: 25, description: 'Good condition with normal wear' }
]

export function AddItem() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [images, setImages] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [loading, setLoading] = useState(false)
  const [estimatedPoints, setEstimatedPoints] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<AddItemForm>({
    resolver: yupResolver(schema)
  })

  const watchedCondition = watch('condition')
  const watchedCategory = watch('category')

  React.useEffect(() => {
    const condition = conditions.find(c => c.value === watchedCondition)
    if (condition) {
      // Base points from condition
      let points = condition.points
      
      // Category multiplier
      if (['Jackets', 'Coats', 'Shoes'].includes(watchedCategory)) {
        points = Math.round(points * 1.2)
      } else if (['Accessories'].includes(watchedCategory)) {
        points = Math.round(points * 0.8)
      }
      
      setEstimatedPoints(points)
    }
  }, [watchedCondition, watchedCategory])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // In a real app, you would upload to a service like Cloudinary
      // For demo, we'll use placeholder URLs
      const newImages = Array.from(files).map((_, index) => 
        `https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400`
      )
      setImages(prev => [...prev, ...newImages].slice(0, 5)) // Max 5 images
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 5) {
      setTags(prev => [...prev, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove))
  }

  const onSubmit = async (data: AddItemForm) => {
    if (images.length === 0) {
      alert('Please add at least one image')
      return
    }

    setLoading(true)

    try {
      // In a real app, this would submit to your backend
      console.log('Submitting item:', {
        ...data,
        images,
        tags,
        estimatedPoints,
        ownerId: user?.id
      })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      navigate('/dashboard', { 
        state: { message: 'Item submitted for review! You\'ll be notified once it\'s approved.' }
      })
    } catch (error) {
      console.error('Error submitting item:', error)
    } finally {
      setLoading(false)
    }
  }

  const getSizeOptions = () => {
    if (['Shoes'].includes(watchedCategory)) return sizes.shoes
    if (watchedCategory === 'Kids') return sizes.kids
    return sizes.clothing
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              List New Item
            </h1>
            <p className="text-lg text-gray-600">
              Add your clothing item to the ReWear community and start earning points
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Image Upload */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Photos</h3>
              <p className="text-gray-600 mb-4">Add up to 5 high-quality photos of your item</p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                
                {images.length < 5 && (
                  <label className="border-2 border-dashed border-stone-300 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition-colors">
                    <Upload className="h-6 w-6 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Add Photo</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    {...register('title')}
                    type="text"
                    placeholder="e.g., Vintage Denim Jacket"
                    className={`w-full px-3 py-2 border ${
                      errors.title ? 'border-red-300' : 'border-stone-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    {...register('category')}
                    className={`w-full px-3 py-2 border ${
                      errors.category ? 'border-red-300' : 'border-stone-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size *
                  </label>
                  <select
                    {...register('size')}
                    className={`w-full px-3 py-2 border ${
                      errors.size ? 'border-red-300' : 'border-stone-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  >
                    <option value="">Select size</option>
                    {getSizeOptions().map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                  {errors.size && (
                    <p className="mt-1 text-sm text-red-600">{errors.size.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    {...register('gender')}
                    className={`w-full px-3 py-2 border ${
                      errors.gender ? 'border-red-300' : 'border-stone-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  >
                    <option value="">Select gender</option>
                    {genders.map(gender => (
                      <option key={gender} value={gender}>{gender}</option>
                    ))}
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand
                  </label>
                  <input
                    {...register('brand')}
                    type="text"
                    placeholder="e.g., Nike, Zara, H&M"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  {...register('description')}
                  rows={4}
                  placeholder="Describe the item's condition, style, fit, and any other relevant details..."
                  className={`w-full px-3 py-2 border ${
                    errors.description ? 'border-red-300' : 'border-stone-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>
            </div>

            {/* Condition & Points */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Condition & Value</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Condition *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {conditions.map(condition => (
                      <label
                        key={condition.value}
                        className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          watchedCondition === condition.value
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <input
                          {...register('condition')}
                          type="radio"
                          value={condition.value}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{condition.label}</span>
                          <span className="text-emerald-600 font-bold">{condition.points} pts</span>
                        </div>
                        <span className="text-sm text-gray-600">{condition.description}</span>
                      </label>
                    ))}
                  </div>
                  {errors.condition && (
                    <p className="mt-1 text-sm text-red-600">{errors.condition.message}</p>
                  )}
                </div>

                {estimatedPoints > 0 && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <Coins className="h-5 w-5 text-emerald-600" />
                      <span className="font-medium text-emerald-800">
                        Estimated Points: {estimatedPoints}
                      </span>
                    </div>
                    <p className="text-sm text-emerald-700 mt-1">
                      Final points may vary based on admin review
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <p className="text-gray-600 mb-4">Add tags to help others find your item (max 5)</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-emerald-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>

              {tags.length < 5 && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Add a tag (e.g., vintage, casual, summer)"
                    className="flex-1 px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-amber-800 font-medium">Review Process</p>
                  <p className="text-amber-700 text-sm">
                    Your item will be reviewed by our team within 24-48 hours. You'll receive an email 
                    notification once it's approved and live on the platform.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 px-6 py-3 border border-stone-300 text-gray-700 rounded-xl hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || images.length === 0}
                className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Submitting...' : 'Submit for Review'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}