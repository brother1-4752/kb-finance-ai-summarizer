import styled from '@emotion/styled'
import { useEffect, useState } from 'react'

import Generate from '@/components/Funnels/Generate/Generate'
import Upload from '@/components/Funnels/Upload/Upload'
import Results from '@/components/Funnels/Results/Results'

import { ReportData, Step } from '@/lib/types/funnelPropTypes'
import Edit from '@/components/Funnels/Edit/Edit'

function App() {
  //useState빈칸으로 두기보다, null이라도 채워넣기
  const [reportData, setReportData] = useState<ReportData>()
  const [step, setStep] = useState<Step>('upload')

  return (
    <AppContainer>
      {step === 'upload' && (
        <Upload useReportData={[reportData, setReportData]} setStep={setStep} />
      )}
      {step === 'generate' && (
        <Generate
          useReportData={[reportData, setReportData]}
          setStep={setStep}
        />
      )}
      {step === 'results' && (
        <Results
          useReportData={[reportData, setReportData]}
          setStep={setStep}
        />
      )}
      {step === 'edit' && (
        <Edit useReportData={[reportData, setReportData]} setStep={setStep} />
      )}
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
