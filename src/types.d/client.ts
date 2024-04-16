interface PaymentHistory {
  paymentDate: Date
  amount: number
}

export interface IClient {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string // Optional field
  address?: {
    street: string
    city: string
    state: string
    postalCode: string
  }
  avatarUrl?: string // Optional field
  createdAt: Date
  updatedAt: Date
  accountStatus: 'Active' | 'Suspended' | 'Closed'
  billingInformation: {
    paymentMethod: string
  }
  paymentHistory: PaymentHistory[]
  subscribedPlan: string
  notes?: string // Optional field
  lastPaymentDate?: Date // Optional field
  outstandingBalance: number
  paymentDueDate?: Date // Optional field
  isTrialActive: boolean
  trialStartDate?: Date
  oauth2: {
    provider: string
    id: string
  }
}
