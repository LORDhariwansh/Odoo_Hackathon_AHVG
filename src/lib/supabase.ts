import { createClient } from '@supabase/supabase-js'

// Use placeholder URLs that won't cause URL constructor errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          location: string | null
          points: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          location?: string | null
          points?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          location?: string | null
          points?: number
          created_at?: string
          updated_at?: string
        }
      }
      items: {
        Row: {
          id: string
          title: string
          description: string
          images: string[]
          category: string
          size: string
          gender: string
          condition: string
          tags: string[]
          status: 'pending' | 'approved' | 'rejected' | 'swapped'
          points_value: number
          owner_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          images: string[]
          category: string
          size: string
          gender: string
          condition: string
          tags: string[]
          status?: 'pending' | 'approved' | 'rejected' | 'swapped'
          points_value: number
          owner_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          images?: string[]
          category?: string
          size?: string
          gender?: string
          condition?: string
          tags?: string[]
          status?: 'pending' | 'approved' | 'rejected' | 'swapped'
          points_value?: number
          owner_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      swap_requests: {
        Row: {
          id: string
          from_user_id: string
          to_user_id: string
          item_given_id: string
          item_requested_id: string
          status: 'pending' | 'accepted' | 'rejected' | 'completed'
          message: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          from_user_id: string
          to_user_id: string
          item_given_id: string
          item_requested_id: string
          status?: 'pending' | 'accepted' | 'rejected' | 'completed'
          message?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          from_user_id?: string
          to_user_id?: string
          item_given_id?: string
          item_requested_id?: string
          status?: 'pending' | 'accepted' | 'rejected' | 'completed'
          message?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}