"use client"

import type React from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
//import { useAuth } from "../contexts/AuthContext"
import { useAuth } from "../contexts/AuthContext"
import { Home, CreditCard, PieChart, User, Bell, MessageSquare, MenuIcon, X } from "lucide-react"

interface NavbarProps {
  title?: string
}

const Navbar: React.FC<NavbarProps> = ({ title = "CREDIT APP" }) => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between">
      {/* Logo and Title */}
      <div className="flex items-center">
        <Link to="/" className="text-green-800 font-bold text-lg">
          {title}
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="lg:hidden text-gray-600 focus:outline-none" onClick={toggleMobileMenu}>
        {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
        {user?.role === "user" && (
          <>
            <Link
              to="/dashboard"
              className={`flex items-center space-x-1 ${isActive("/dashboard") ? "text-green-800 font-medium" : "text-gray-600"}`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              to="/loans"
              className={`flex items-center space-x-1 ${isActive("/loans") ? "text-green-800 font-medium" : "text-gray-600"}`}
            >
              <CreditCard size={18} />
              <span>Payments</span>
            </Link>
            <Link
              to="/budget"
              className={`flex items-center space-x-1 ${isActive("/budget") ? "text-green-800 font-medium" : "text-gray-600"}`}
            >
              <PieChart size={18} />
              <span>Budget</span>
            </Link>
            <Link
              to="/card"
              className={`flex items-center space-x-1 ${isActive("/card") ? "text-green-800 font-medium" : "text-gray-600"}`}
            >
              <CreditCard size={18} />
              <span>Card</span>
            </Link>
          </>
        )}
      </div>

      {/* User Actions */}
      <div className="hidden lg:flex items-center space-x-4">
        <button className="text-gray-600">
          <Bell size={20} />
        </button>
        <button className="text-gray-600">
          <MessageSquare size={20} />
        </button>
        <div className="relative">
          <button className="flex items-center space-x-1 text-gray-600">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <User size={16} />
              )}
            </div>
            <span>{user?.role === "admin" ? "Verifier" : "User"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-green-800 font-bold text-lg">{title}</h2>
            <button onClick={toggleMobileMenu}>
              <X size={24} />
            </button>
          </div>
          <div className="p-4 flex flex-col space-y-4">
            {user?.role === "user" && (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                  onClick={toggleMobileMenu}
                >
                  <Home size={20} />
                  <span>Home</span>
                </Link>
                <Link
                  to="/loans"
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                  onClick={toggleMobileMenu}
                >
                  <CreditCard size={20} />
                  <span>Payments</span>
                </Link>
                <Link
                  to="/budget"
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                  onClick={toggleMobileMenu}
                >
                  <PieChart size={20} />
                  <span>Budget</span>
                </Link>
                <Link
                  to="/card"
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                  onClick={toggleMobileMenu}
                >
                  <CreditCard size={20} />
                  <span>Card</span>
                </Link>
              </>
            )}
            <button
              onClick={() => {
                logout()
                toggleMobileMenu()
              }}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-red-500"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

