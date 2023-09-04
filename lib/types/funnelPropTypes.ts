import { Dispatch, SetStateAction } from 'react'
import { ROUGE_L, generatedAiSummaryText } from '../apis/mockData'

export type ReportData = {
  originalPdfUrl: string | undefined
  aiSummaryText?: typeof generatedAiSummaryText
  pdfName?: string
  rouge?: typeof ROUGE_L
}

export type Step = 'upload' | 'generate' | 'results' | 'edit'

export type FunnelProp = {
  useReportData: [
    reportData: ReportData | undefined,
    setReportData: Dispatch<SetStateAction<ReportData | undefined>>
  ]
  setStep: Dispatch<SetStateAction<Step>>
}
