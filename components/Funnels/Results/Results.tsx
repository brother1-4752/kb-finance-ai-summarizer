import { BarLoader } from 'react-spinners'
import { Document, Page } from 'react-pdf'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import CustomSuspense from '@/components/Suspense/CustomSuspense'
import { LoaderContainer } from '../Generate/Generate'

import { FunnelProp } from '@/lib/types/funnelPropTypes'
import Link from 'next/link'

export default function Results({ useReportData, setStep }: FunnelProp) {
  const [reportData] = useReportData
  const router = useRouter()
  sessionStorage.setItem('reportData', JSON.stringify(reportData))
  console.dir(reportData)

  const isEddited = sessionStorage.getItem('isEddited')
  console.log(isEddited)
  console.log(typeof isEddited)

  return (
    <Background>
      <CustomSuspense
        fallback={
          <LoaderContainer>
            <h1 className="loader__title">요약 레포트 생성입니다...</h1>
            <BarLoader
              color="#045CF1"
              cssOverride={{}}
              height={15}
              speedMultiplier={1}
              width={500}
            />
          </LoaderContainer>
        }
        maxDuration={5000}>
        <ResultsContainer>
          <div className="reports__container">
            {/* <Document file={reportData?.originalPdfUrl}>
              <Page pageNumber={1} />
            </Document> */}

            <Document
              file={`./${
                isEddited === 'true' ? 'edittedAiSummary' : 'AiSummary'
              }.pdf`}>
              <Page pageNumber={1} />
            </Document>
            <div className="report__results">
              <button
                className="report__btn"
                onClick={() => router.push('/report')}>
                생성한 AI 요약보고서 정확도 통계
              </button>
              <Link
                className="download__btn"
                href={`./${
                  isEddited === 'true' ? 'edittedAiSummary' : 'AiSummary'
                }.pdf`}
                target="_blank">
                AI 요약본 레포트 다운로드
              </Link>
              <button className="edit__btn" onClick={() => setStep('edit')}>
                생성된 AI 레포트 수정하기
              </button>
            </div>
          </div>
        </ResultsContainer>
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

  background-image: url('/resultsLayout.jpg');
  background-size: cover;
`

const ResultsContainer = styled.div`
  width: 100vw;
  height: 100vh;

  /* margin-top: 100px; */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .reports__container {
    width: 80vw;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .reports__input {
      width: 500px;
      height: 90%;
      margin: 20px 20px 0 0;
      border: 1px solid black;
    }

    .report__results {
      height: 80vh;
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 130px;
      /* justify-content: center; */
    }
  }

  .download__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: 14px;
  }

  .edit__btn,
  .report__btn,
  .download__btn {
    width: 250px;
    height: 60px;
    border-radius: 10px;

    background-color: #045cf1;
    color: white;
    cursor: pointer;
    border: none;
    margin-top: 20px;

    &:hover {
      color: #045cf1;
      border: 1px solid #045cf1;
      background-color: white;
    }
  }

  .react-pdf__Page__canvas {
    display: none;
  }

  .react-pdf__Page__textContent {
    display: none;
  }
`
