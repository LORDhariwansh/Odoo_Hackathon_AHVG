import React from 'react'
import { Navigate } from 'react-router-dom'

interface AdminRouteProps {
  children: React.ReactNode
}

export function AdminRoute({ children }: AdminRouteProps) {
  const adminToken = localStorage.getItem('adminToken')

  if (!adminToken) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}