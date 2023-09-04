import { BarLoader } from 'react-spinners'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import CustomSuspense from '@/components/Suspense/CustomSuspense'

import { FunnelProp } from '@/lib/types/funnelPropTypes'
import { LoaderContainer } from '@/components/Funnels/Generate/Generate'
import { generatedAiSummaryText } from '@/lib/apis/mockData'
import { ChangeEvent, MouseEvent, useState } from 'react'

export default function Edit({ useReportData, setStep }: FunnelProp) {
  const [reportData] = useReportData
  const router = useRouter()
  const [edittedData, setEdittedData] = useState('')

  sessionStorage.setItem('reportData', JSON.stringify(reportData))
  console.dir(reportData)

  const handleOnchangeEdit = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value)
  }

  const editSave = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.target)

    const isConfirmed = confirm(
      '수정사항을 저장하시겠습니까? 저장하면, 이전 요약본 파일이 업데이트됩니다.'
    )

    if (isConfirmed) {
      sessionStorage.setItem('edittedText', edittedData)
      sessionStorage.removeItem('isEddited')
      sessionStorage.setItem('isEddited', 'true')

      setStep('results')
    }
  }

  return (
    <Background>
      <CustomSuspense
        fallback={
          <LoaderContainer>
            <h1 className="loader__title">Edit모드 전환중입니다...</h1>
            <BarLoader
              color="#0e59ba"
              cssOverride={{}}
              height={15}
              speedMultiplier={1}
              width={500}
            />
          </LoaderContainer>
        }
        maxDuration={3000}>
        <ResultsContainer>
          <textarea
            className="edit__textarea"
            defaultValue={generatedAiSummaryText}
            rows={10}
            cols={100}
            onChange={handleOnchangeEdit}
          />
          <div className="button__wrapper">
            <button className="edit__btn" onClick={() => setStep('results')}>
              돌아가기
            </button>
            <button className="edit__btn" onClick={editSave}>
              수정사항 저장하기
            </button>
          </div>
        </ResultsContainer>
      </CustomSuspense>
    </Background>
  )
}

const Background = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: url('/editLayout.jpg');
  background-size: cover;
`

const ResultsContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin-top: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .button__wrapper {
    width: 80%;
    display: flex;
    justify-content: flex-end;

    button:first-child {
      margin-right: 20px;
    }
  }

  .edit__btn {
    width: 200px;
    height: 60px;
    border-radius: 10px;

    background-color: #045cf1;
    color: white;
    cursor: pointer;
    border: none;
    font-size: 16px;

    &:hover {
      color: #045cf1;
      border: 1px solid #045cf1;
      background-color: white;
    }
  }

  .edit__textarea {
    width: 80%;
    height: 60%;
    word-break: break-all;
    padding: 15px;
    border: 3px solid #045cf1;
    border-radius: 10px;
    margin-top: -100px;
    margin-bottom: 50px;
  }

  .react-pdf__Page__canvas {
    display: none;
  }

  .react-pdf__Page__textContent {
    display: none;
  }
`
