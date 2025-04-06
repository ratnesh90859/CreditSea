"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./AuthContext"

// Define loan types
export interface LoanApplication {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  fullName: string
  amount: number
  tenure: number
  employmentStatus: string
  employmentAddress: string
  reason: string
  status: "pending" | "verified" | "approved" | "rejected"
  dateApplied: string
  loanOfficer: {
    id: string
    name: string
    avatar?: string
  }
}

// Define loan context type
interface LoanContextType {
  loans: LoanApplication[]
  userLoans: LoanApplication[]
  applyForLoan: (
    loanData: Omit<
      LoanApplication,
      "id" | "userId" | "userName" | "userAvatar" | "status" | "dateApplied" | "loanOfficer"
    >,
  ) => Promise<void>
  updateLoanStatus: (loanId: string, status: "pending" | "verified" | "approved" | "rejected") => Promise<void>
  loading: boolean
  error: string | null
}

// Create context
const LoanContext = createContext<LoanContextType | undefined>(undefined)

// Loan provider props
interface LoanProviderProps {
  children: ReactNode
}

// Loan provider component
export const LoanProvider = ({ children }: LoanProviderProps) => {
  const { user } = useAuth()
  const [loans, setLoans] = useState<LoanApplication[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Filtered loans for current user
  const userLoans = loans.filter((loan) => loan.userId === user?.id)

  // Load loans from localStorage on initial render
  useEffect(() => {
    const storedLoans = localStorage.getItem("loans")
    if (storedLoans) {
      setLoans(JSON.parse(storedLoans))
    } else {
      // Initialize with sample data if empty
      const sampleLoans = generateSampleLoans()
      setLoans(sampleLoans)
      localStorage.setItem("loans", JSON.stringify(sampleLoans))
    }
    setLoading(false)
  }, [])

  // Apply for a new loan
  const applyForLoan = async (
    loanData: Omit<
      LoanApplication,
      "id" | "userId" | "userName" | "userAvatar" | "status" | "dateApplied" | "loanOfficer"
    >,
  ) => {
    if (!user) throw new Error("User must be logged in to apply for a loan")

    setLoading(true)
    setError(null)

    try {
      // Create new loan application
      const newLoan: LoanApplication = {
        id: Date.now().toString(),
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        status: "pending",
        dateApplied: new Date().toISOString(),
        loanOfficer: {
          id: "officer1",
          name: "John Okoh",
          avatar: "https://ui-avatars.com/api/?name=John+Okoh&background=random",
        },
        ...loanData,
      }

      // Add to loans array
      const updatedLoans = [...loans, newLoan]
      setLoans(updatedLoans)
      localStorage.setItem("loans", JSON.stringify(updatedLoans))
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Update loan status
  const updateLoanStatus = async (loanId: string, status: "pending" | "verified" | "approved" | "rejected") => {
    setLoading(true)
    setError(null)

    try {
      const updatedLoans = loans.map((loan) => (loan.id === loanId ? { ...loan, status } : loan))

      setLoans(updatedLoans)
      localStorage.setItem("loans", JSON.stringify(updatedLoans))
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Generate sample loans for initial data
  const generateSampleLoans = (): LoanApplication[] => {
    const dates = ["2021-06-09T10:30:00Z", "2021-06-07T14:15:00Z", "2021-06-07T09:45:00Z", "2021-05-27T11:20:00Z"]

    const statuses: ("pending" | "verified" | "approved" | "rejected")[] = [
      "pending",
      "verified",
      "rejected",
      "approved",
    ]

    return Array.from({ length: 4 }, (_, i) => ({
      id: `loan${i + 1}`,
      userId: "user1",
      userName: "Demo User",
      userAvatar: "https://ui-avatars.com/api/?name=Demo+User&background=random",
      fullName: "Demo User",
      amount: i === 0 ? 10000 : 100000,
      tenure: 12,
      employmentStatus: "Employed",
      employmentAddress: "123 Work Street, City",
      reason: "Personal expenses",
      status: statuses[i],
      dateApplied: dates[i],
      loanOfficer: {
        id: "officer1",
        name: "John Okoh",
        avatar: "https://ui-avatars.com/api/?name=John+Okoh&background=random",
      },
    }))
  }

  const value = {
    loans,
    userLoans,
    applyForLoan,
    updateLoanStatus,
    loading,
    error,
  }

  return <LoanContext.Provider value={value}>{children}</LoanContext.Provider>
}

// Custom hook to use loan context
export const useLoan = () => {
  const context = useContext(LoanContext)
  if (context === undefined) {
    throw new Error("useLoan must be used within a LoanProvider")
  }
  return context
}

