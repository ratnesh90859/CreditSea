"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLoan } from "../../contexts/LoanContext"
import Navbar from "../../components/Navbar"

const UserLoanApplication: React.FC = () => {
  const navigate = useNavigate()
  const { applyForLoan, loading } = useLoan()

  const [formData, setFormData] = useState({
    fullName: "",
    amount: "",
    tenure: "",
    employmentStatus: "",
    employmentAddress: "",
    reason: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      [name]: checked,
    })

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.amount.trim()) {
      newErrors.amount = "Loan amount is required"
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount"
    }

    if (!formData.tenure.trim()) {
      newErrors.tenure = "Loan tenure is required"
    } else if (isNaN(Number(formData.tenure)) || Number(formData.tenure) <= 0) {
      newErrors.tenure = "Please enter a valid tenure"
    }

    if (!formData.employmentStatus.trim()) {
      newErrors.employmentStatus = "Employment status is required"
    }

    if (!formData.employmentAddress.trim()) {
      newErrors.employmentAddress = "Employment address is required"
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Reason for loan is required"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      await applyForLoan({
        fullName: formData.fullName,
        amount: Number(formData.amount),
        tenure: Number(formData.tenure),
        employmentStatus: formData.employmentStatus,
        employmentAddress: formData.employmentAddress,
        reason: formData.reason,
      })

      navigate("/loans")
    } catch (error) {
      console.error("Error applying for loan:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-center mb-8">APPLY FOR A LOAN</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full name as it appears on bank account
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.fullName ? "border-red-500" : "border-gray-300"} rounded-md`}
                />
                {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  How much do you need?
                </label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.amount ? "border-red-500" : "border-gray-300"} rounded-md`}
                />
                {errors.amount && <p className="mt-1 text-xs text-red-500">{errors.amount}</p>}
              </div>

              <div>
                <label htmlFor="tenure" className="block text-sm font-medium text-gray-700 mb-1">
                  Loan tenure (in months)
                </label>
                <input
                  type="text"
                  id="tenure"
                  name="tenure"
                  value={formData.tenure}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.tenure ? "border-red-500" : "border-gray-300"} rounded-md`}
                />
                {errors.tenure && <p className="mt-1 text-xs text-red-500">{errors.tenure}</p>}
              </div>

              <div>
                <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-700 mb-1">
                  Employment status
                </label>
                <select
                  id="employmentStatus"
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.employmentStatus ? "border-red-500" : "border-gray-300"} rounded-md`}
                >
                  <option value="">Select status</option>
                  <option value="Employed">Employed</option>
                  <option value="Self-employed">Self-employed</option>
                  <option value="Unemployed">Unemployed</option>
                  <option value="Student">Student</option>
                  <option value="Retired">Retired</option>
                </select>
                {errors.employmentStatus && <p className="mt-1 text-xs text-red-500">{errors.employmentStatus}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="employmentAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Employment address
                </label>
                <input
                  type="text"
                  id="employmentAddress"
                  name="employmentAddress"
                  value={formData.employmentAddress}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.employmentAddress ? "border-red-500" : "border-gray-300"} rounded-md`}
                />
                {errors.employmentAddress && <p className="mt-1 text-xs text-red-500">{errors.employmentAddress}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for loan
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  rows={4}
                  value={formData.reason}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.reason ? "border-red-500" : "border-gray-300"} rounded-md`}
                ></textarea>
                {errors.reason && <p className="mt-1 text-xs text-red-500">{errors.reason}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleCheckboxChange}
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                    I have read the important information and accept that by completing this application I will be bound
                    by the terms and conditions of credit reporting agencies.
                  </label>
                </div>
                {errors.agreeToTerms && <p className="mt-1 text-xs text-red-500">{errors.agreeToTerms}</p>}
              </div>

              <div>
                <p className="text-sm text-gray-700">
                  Any personal and credit information provided may be disclosed from time to time to other lenders,
                  credit bureaus, credit reference or other reporting agencies.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-800 hover:bg-green-900 text-white px-8 py-2 rounded-md font-medium"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default UserLoanApplication

