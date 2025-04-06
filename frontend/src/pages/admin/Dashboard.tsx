import type React from "react"
import { useLoan } from "../../contexts/LoanContext"
import AdminSidebar from "../../components/AdminSidebar"
import Navbar from "../../components/Navbar"
import { DollarSign, Users, FileText, PiggyBank, TrendingUp } from "lucide-react"

const AdminDashboard: React.FC = () => {
  const { loans } = useLoan()

  // Calculate statistics
  const totalLoans = loans.length
  const totalBorrowers = new Set(loans.map((loan) => loan.userId)).size
  const cashDisbursed = loans.filter((loan) => loan.status === "approved").reduce((sum, loan) => sum + loan.amount, 0)
  const savings = 450000 // Mock data
  const repaidLoans = 30 // Mock data
  const cashReceived = 1000000 // Mock data

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1">
        <Navbar title="CREDIT APP" />

        <main className="p-6">
          <div className="flex items-center mb-6">
            <h1 className="text-xl font-semibold">Dashboard - Loans</h1>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex">
                <div className="bg-green-800 p-4 flex items-center justify-center">
                  <FileText className="text-white" size={24} />
                </div>
                <div className="p-4">
                  <h3 className="text-4xl font-bold">{totalLoans}</h3>
                  <p className="text-gray-600 uppercase text-sm">LOANS</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex">
                <div className="bg-green-800 p-4 flex items-center justify-center">
                  <Users className="text-white" size={24} />
                </div>
                <div className="p-4">
                  <h3 className="text-4xl font-bold">{totalBorrowers}</h3>
                  <p className="text-gray-600 uppercase text-sm">BORROWERS</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex">
                <div className="bg-green-800 p-4 flex items-center justify-center">
                  <DollarSign className="text-white" size={24} />
                </div>
                <div className="p-4">
                  <h3 className="text-4xl font-bold">{cashDisbursed.toLocaleString()}</h3>
                  <p className="text-gray-600 uppercase text-sm">CASH DISBURSED</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex">
                <div className="bg-green-800 p-4 flex items-center justify-center">
                  <PiggyBank className="text-white" size={24} />
                </div>
                <div className="p-4">
                  <h3 className="text-4xl font-bold">{savings.toLocaleString()}</h3>
                  <p className="text-gray-600 uppercase text-sm">SAVINGS</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex">
                <div className="bg-green-800 p-4 flex items-center justify-center">
                  <Users className="text-white" size={24} />
                </div>
                <div className="p-4">
                  <h3 className="text-4xl font-bold">{repaidLoans}</h3>
                  <p className="text-gray-600 uppercase text-sm">REPAID LOANS</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex">
                <div className="bg-green-800 p-4 flex items-center justify-center">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div className="p-4">
                  <h3 className="text-4xl font-bold">{cashReceived.toLocaleString()}</h3>
                  <p className="text-gray-600 uppercase text-sm">CASH RECEIVED</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Applied Loans</h2>
              <div className="flex space-x-2">
                <button className="text-xs text-gray-500">Sort</button>
                <button className="text-xs text-gray-500">Filter</button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">User Recent Activity</p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User Recent Activity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden bg-gray-200">
                          <img
                            src="https://ui-avatars.com/api/?name=Tom+Cruise&background=random"
                            alt="Tom Cruise"
                            className="h-8 w-8 object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-gray-900">Contact Email not Linked</p>
                          <p className="text-xs text-gray-500">Updated 1 day ago</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Tom Cruise</div>
                      <div className="text-xs text-gray-500">on 24.05.2021</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">June 30, 2021</div>
                      <div className="text-xs text-gray-500">6:00 PM</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
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
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden bg-gray-200">
                          <img
                            src="https://ui-avatars.com/api/?name=Matt+Damon&background=random"
                            alt="Matt Damon"
                            className="h-8 w-8 object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-gray-900">Adding Images to Featured Posts</p>
                          <p className="text-xs text-gray-500">Updated 1 day ago</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Matt Damon</div>
                      <div className="text-xs text-gray-500">on 24.05.2021</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">June 30, 2021</div>
                      <div className="text-xs text-gray-500">6:00 PM</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
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
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden bg-gray-200">
                          <img
                            src="https://ui-avatars.com/api/?name=Robert+Downey&background=random"
                            alt="Robert Downey"
                            className="h-8 w-8 object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-gray-900">When will be charged this month?</p>
                          <p className="text-xs text-gray-500">Updated 1 day ago</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Robert Downey</div>
                      <div className="text-xs text-gray-500">on 24.05.2021</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">June 30, 2021</div>
                      <div className="text-xs text-gray-500">6:00 PM</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
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
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
              <div>Rows per page: 7</div>
              <div className="flex items-center space-x-2">
                <span>1-7 of 100</span>
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
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard

