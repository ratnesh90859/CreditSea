"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useLoan } from "../../contexts/LoanContext"
import Navbar from "../../components/Navbar"
import { DollarSign, Search } from "lucide-react"

const UserLoans: React.FC = () => {
  const { user } = useAuth()
  const { userLoans } = useLoan()
  const [searchTerm, setSearchTerm] = useState("")

  // Calculate total balance (in a real app, this would come from an API)
  const balance = 0.0

  // Filter loans based on search term
  const filteredLoans = userLoans.filter(
    (loan) =>
      loan.loanOfficer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.amount.toString().includes(searchTerm) ||
      loan.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-green-100 p-2 rounded-md mr-3">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500">BALANCE</p>
                <h2 className="text-3xl font-bold text-green-600">{balance.toFixed(1)}</h2>
              </div>
            </div>

            <Link
              to="/apply-loan"
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Get A Loan
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6">
            <button className="bg-gray-100 hover:bg-gray-200 py-3 rounded-md text-center">Borrow Cash</button>
            <button className="bg-gray-100 hover:bg-gray-200 py-3 rounded-md text-center">Transact</button>
            <button className="bg-gray-100 hover:bg-gray-200 py-3 rounded-md text-center">Deposit Cash</button>
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search for loans"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Applied Loans</h3>
              <div className="flex space-x-2">
                <button className="text-xs text-gray-500">Sort</button>
                <button className="text-xs text-gray-500">Filter</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loan Officer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Applied
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLoans.length > 0 ? (
                    filteredLoans.map((loan) => (
                      <tr key={loan.id}>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden bg-gray-200">
                              {loan.loanOfficer.avatar ? (
                                <img
                                  src={loan.loanOfficer.avatar || "/placeholder.svg"}
                                  alt={loan.loanOfficer.name}
                                  className="h-8 w-8 object-cover"
                                />
                              ) : (
                                <div className="h-8 w-8 flex items-center justify-center bg-gray-300 text-gray-600 text-xs">
                                  {loan.loanOfficer.name.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{loan.loanOfficer.name}</p>
                              <p className="text-xs text-gray-500">Loan Officer</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{loan.amount.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">USD</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(loan.dateApplied).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(loan.dateApplied).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${
                              loan.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : loan.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : loan.status === "verified"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-gray-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-4 text-center text-sm text-gray-500">
                        {searchTerm
                          ? "No loans match your search criteria."
                          : "No loans applied yet. Apply for a loan to get started."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {filteredLoans.length > 0 && (
              <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                <div>Rows per page: 7</div>
                <div className="flex items-center space-x-2">
                  <span>
                    1-{filteredLoans.length} of {filteredLoans.length}
                  </span>
                  <button className="p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default UserLoans

