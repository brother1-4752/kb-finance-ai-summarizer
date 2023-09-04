import { ChangeEvent } from 'react'
import styled from '@emotion/styled'

import { FunnelProp } from '@/lib/types/funnelPropTypes'

export default function Upload({ useReportData, setStep }: FunnelProp) {
  const [reportData, setReportData] = useReportData

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0].type === 'application/pdf') {
      if (reportData?.originalPdfUrl) {
        URL.revokeObjectURL(URL.createObjectURL(event.target.files?.[0]))
      }

      setReportData({
        originalPdfUrl: URL.createObjectURL(event.target.files?.[0]),
        pdfName: event.target.files?.[0].name
      })
      setStep('generate')
    } else {
      alert('PDF 파일만 업로드 가능합니다.')
    }
  }

  return (
    <Background>
      <MainForm>
        {/* <MainTitle>KB Finance AI Summarizer</MainTitle> */}
        <MainLabel htmlFor="pdf_file">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            opacity="0.85"
            height="5em"
            viewBox="0 0 640 512">
            <path
              d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
              fill="white"
            />
          </svg>
          <h1>요약할 PDF 파일을 업로드해주세요</h1>
          <p>
            🔎 원본 요약 레포트와 비교하며, AI 생성한 요약 레포트를 직접
            수정하여 성능을 높일 수 있습니다.
          </p>
        </MainLabel>

        <input
          id="pdf_file"
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </MainForm>
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

  background-image: url('/uploadLayout.jpg');
  background-size: cover;
  color: white;
`

const MainForm = styled.form`
  width: 70%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dashed black;
  background-color: #045cf1;
  cursor: pointer;

  border-radius: 15px;

  &:hover {
    opacity: 0.8;
  }
`

const MainTitle = styled.h1`
  font-size: 36px;
  border-bottom: 1px solid black;
  zoom: 1.2;
`

const MainLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  cursor: pointer;
  zoom: 1.2;

  svg {
    margin-bottom: 20px;
  }

  h1 {
    font-size: 36px;
    font-weight: 700;
    margin: 10px 0;
  }

  p {
    opacity: 0.7;
    font-size: 18px;
  }
`
