"use client"

import type React from "react"
import { useState } from "react"
import { useLoan } from "../../contexts/LoanContext"
import AdminSidebar from "../../components/AdminSidebar"
import Navbar from "../../components/Navbar"
import { Search } from "lucide-react"

const AdminLoans: React.FC = () => {
  const { loans, updateLoanStatus, loading } = useLoan()
  const [searchTerm, setSearchTerm] = useState("")

  // Filter loans based on search term
  const filteredLoans = loans.filter(
    (loan) =>
      loan.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.amount.toString().includes(searchTerm) ||
      loan.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleStatusChange = async (loanId: string, status: "pending" | "verified" | "approved" | "rejected") => {
    try {
      await updateLoanStatus(loanId, status)
    } catch (error) {
      console.error("Error updating loan status:", error)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1">
        <Navbar title="CREDIT APP" />

        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold">Loans</h1>

            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search loans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Borrower
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loan Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Applied
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLoans.length > 0 ? (
                    filteredLoans.map((loan) => (
                      <tr key={loan.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                              {loan.userAvatar ? (
                                <img
                                  src={loan.userAvatar || "/placeholder.svg"}
                                  alt={loan.userName}
                                  className="h-10 w-10 object-cover"
                                />
                              ) : (
                                <div className="h-10 w-10 flex items-center justify-center bg-gray-300 text-gray-600 text-sm">
                                  {loan.userName.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{loan.fullName}</div>
                              <div className="text-sm text-gray-500">{loan.userName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${loan.amount.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">{loan.tenure} months</div>
                          <div className="text-sm text-gray-500">Reason: {loan.reason.substring(0, 20)}...</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{loan.employmentStatus}</div>
                          <div className="text-sm text-gray-500">{loan.employmentAddress.substring(0, 20)}...</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(loan.dateApplied).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(loan.dateApplied).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            {loan.status !== "verified" && (
                              <button
                                onClick={() => handleStatusChange(loan.id, "verified")}
                                disabled={loading}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Verify
                              </button>
                            )}
                            {loan.status !== "approved" && (
                              <button
                                onClick={() => handleStatusChange(loan.id, "approved")}
                                disabled={loading}
                                className="text-green-600 hover:text-green-900"
                              >
                                Approve
                              </button>
                            )}
                            {loan.status !== "rejected" && (
                              <button
                                onClick={() => handleStatusChange(loan.id, "rejected")}
                                disabled={loading}
                                className="text-red-600 hover:text-red-900"
                              >
                                Reject
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                        {searchTerm ? "No loans match your search criteria." : "No loans found in the system."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {filteredLoans.length > 0 && (
              <div className="px-6 py-3 flex justify-between items-center border-t">
                <div className="text-sm text-gray-500">
                  Showing {filteredLoans.length} of {loans.length} loans
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600">
                    Previous
                  </button>
                  <button className="px-3 py-1 bg-green-800 text-white rounded-md text-sm">Next</button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLoans

