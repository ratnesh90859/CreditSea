"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  LayoutDashboard,
  Users,
  FileText,
  Repeat,
  Settings,
  PiggyBank,
  DollarSign,
  BarChart,
  Briefcase,
  Calendar,
  LogOut,
} from "lucide-react";

const AdminSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/admin/dashboard" },
    { icon: <Users size={20} />, label: "Borrowers", path: "/admin/borrowers" },
    { icon: <FileText size={20} />, label: "Loans", path: "/admin/loans" },
    { icon: <Repeat size={20} />, label: "Repayments", path: "/admin/repayments" },
    { icon: <Settings size={20} />, label: "Settings", path: "/admin/settings" },
    // Add more menu items as needed
  ];

  return (
    <aside className="bg-green-900 text-white w-64 min-h-screen flex flex-col">
      {/* User Profile */}
      <div className="p-4 border-b border-green-800 flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center overflow-hidden">
          {user?.avatar ? (
            <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            user?.name.charAt(0)
          )}
        </div>
        <div>
          <p className="font-medium">{user?.name || "Admin"}</p>
          <p className="text-xs text-green-300">Admin</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-2 hover:bg-green-800 ${
                  isActive(item.path) ? "bg-green-800" : ""
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-green-800">
        <button onClick={logout} className="flex items-center space-x-3 text-green-300 hover:text-white w-full">
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
