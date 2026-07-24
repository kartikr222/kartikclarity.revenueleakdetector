import { createContext, useContext, useState, ReactNode } from 'react'
import { DiagnosisResult, DiagnosisInput } from '@/types'

interface DiagnosisContextType {
  result: DiagnosisResult | null
  setResult: (result: DiagnosisResult | null) => void
  input: DiagnosisInput | null
  setInput: (input: DiagnosisInput | null) => void
}

const DiagnosisContext = createContext<DiagnosisContextType | undefined>(undefined)

export function DiagnosisProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<DiagnosisResult | null>(null)
  const [input, setInput] = useState<DiagnosisInput | null>(null)

  return (
    <DiagnosisContext.Provider value={{ result, setResult, input, setInput }}>
      {children}
    </DiagnosisContext.Provider>
  )
}

export function useDiagnosis() {
  const context = useContext(DiagnosisContext)
  if (context === undefined) {
    throw new Error('useDiagnosis must be used within a DiagnosisProvider')
  }
  return context
}
