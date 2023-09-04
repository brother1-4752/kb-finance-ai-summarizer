import CustomSuspense from '@/components/Suspense/CustomSuspense'
import { ROUGE_L, generatedAiSummaryText } from '@/lib/apis/mockData'
import { FunnelProp } from '@/lib/types/funnelPropTypes'
import styled from '@emotion/styled'
import { MouseEvent } from 'react'
import { BarLoader } from 'react-spinners'

export default function Generate({ useReportData, setStep }: FunnelProp) {
  const [reportData, setReportData] = useReportData

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setReportData((prev) => {
      return {
        originalPdfUrl: prev?.originalPdfUrl,
        pdfName: prev?.pdfName,
        aiSummaryText: generatedAiSummaryText,
        rouge: ROUGE_L
      }
    })
    sessionStorage.setItem('isEddited', 'false')
    setStep('results')
  }
  return (
    <Background>
      <CustomSuspense
        fallback={
          <LoaderContainer>
            <h1 className="loader__title">pdf파일을 업로드 중입니다...</h1>
            <BarLoader
              color="#045CF1"
              cssOverride={{}}
              height={15}
              speedMultiplier={1}
              width={500}
            />
          </LoaderContainer>
        }
        maxDuration={3000}>
        <GenerateOuter>
          <GenerateInner>
            <div className="uploaded-file__container">
              <span>
                <svg
                  width="20"
                  height="12"
                  viewBox="0 0 25 16"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19.1 15.5V12.0385H15.5V10.3077H19.1V6.84615H20.9V10.3077H24.5V12.0385H20.9V15.5H19.1ZM11.6 12.0385H6.5C4.84 12.0385 3.425 11.476 2.255 10.351C1.085 9.22596 0.5 7.86538 0.5 6.26923C0.5 4.67308 1.085 3.3125 2.255 2.1875C3.425 1.0625 4.84 0.5 6.5 0.5H11.6V2.23077H6.5C5.33334 2.23077 4.34167 2.62274 3.52499 3.40668C2.70833 4.19061 2.3 5.14253 2.3 6.26245C2.3 7.38236 2.70833 8.33654 3.52499 9.125C4.34167 9.91346 5.33334 10.3077 6.5 10.3077H11.6V12.0385ZM7.85 7.13462V5.40385H17.15V7.13462H7.85ZM24.5 6.26923H22.7C22.7 5.15385 22.2917 4.20192 21.475 3.41346C20.6583 2.625 19.6667 2.23077 18.5 2.23077H13.4V0.5H18.5C20.16 0.5 21.575 1.0625 22.745 2.1875C23.915 3.3125 24.5 4.67308 24.5 6.26923Z"
                    fill="white"
                  />
                </svg>
                {reportData && reportData?.pdfName?.replace('.pdf', '')}
              </span>
            </div>
            <MainCreateButton onClick={handleClick}>Generate</MainCreateButton>
          </GenerateInner>
        </GenerateOuter>
      </CustomSuspense>
    </Background>
  )
}

const Background = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: url('/generateLayout.jpg');
  background-size: cover;
`

export const LoaderContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  zoom: 1.5;

  .loader__title {
    margin-bottom: 15px;
  }
`

const GenerateOuter = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  zoom: 2;
`

const GenerateInner = styled.div`
  width: 40vw;
  height: 150px;
  border-radius: 15px;
  padding: 50px;
  position: relative;

  background-color: #045cf1;
  font-size: 12px;

  .uploaded-file__container {
    display: flex;
    align-items: center;
    height: 100%;
    zoom: 1.2;
    color: white;

    h1 {
      width: 120px;

      padding: 10px;
      background-color: white;
      border-radius: 10px;

      margin-bottom: 15px;
    }
  }

  svg {
    margin-right: 5px;
  }
`

const MainCreateButton = styled.button`
  width: 120px;
  height: 35px;
  border-radius: 10px;

  background-color: white;
  cursor: pointer;
  border: none;
  position: absolute;
  right: 15px;
  bottom: 15px;

  &:hover {
    color: #045cf1;
  }
`
