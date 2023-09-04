import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { useState } from 'react'

type ReportProps = {
  rouge: string
}

type GridFrameData = {
  xFr: string
  yFr: string
  zFr: string
}

export default function Report() {
  const rougeList = ['rouge1', 'rouge2', 'rougeL']
  const [gridFrameData, setGridFrameData] = useState<GridFrameData>()
  const router = useRouter()

  return (
    <Background>
      <BackButton disabled onClick={() => router.push('/main?back=results')}>
        <svg
          width="63"
          height="29"
          viewBox="0 0 63 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.7162 27.93L0.389536 15.4504C-0.129845 14.925 -0.129845 14.0763 0.389536 13.5496L12.7162 1.07002C13.466 0.309995 14.6858 0.309995 15.4369 1.07002C16.1867 1.83004 16.1867 3.06353 15.4369 3.82355L4.89217 14.5007L15.4369 25.1751C16.1867 25.9365 16.1867 27.17 15.4369 27.93C14.6858 28.69 13.466 28.69 12.7162 27.93Z"
            fill="#007AFF"
          />
        </svg>
      </BackButton>
      <header>
        <h1>ROUGE를 통한 유사도 평가</h1>
        <p>
          ROUGE는 자동 요약 및 자동 번역 평가를 위한 메트릭 중 하나로,
          <br />
          자동 생성된 텍스트 요약이나 번역이 원본 텍스트와 얼마나 유사한지를
          측정하기 위해 사용됩니다. 요약 및 번역 결과의 품질을 평가하기 위한
          정량적인 지표입니다.
        </p>
      </header>
      <RougeContainer>
        {rougeList.map((rouge, index) => (
          <Rouge key={index} rouge={rouge}></Rouge>
        ))}
      </RougeContainer>
    </Background>
  )
}

const BackButton = styled.button`
  width: 60px;
  height: 50px;
  position: fixed;
  top: 10px;
  left: 20px;
  border: none;
  border-radius: 8px;
  background: none
`

const Background = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  header {
    background-color: #045cf1;
    color: white;
    margin-top: 50px;
    padding: 30px;
    border-radius: 10px;

    h1 {
      font-size: 30px;
      margin-bottom: 15px;
    }

    p {
      font-size: 15px;
      line-height: 20px;
    }
  }
`

const RougeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  //TODO: Click Event에 따라 크기 조절하기
  grid-template-columns: 1.5fr 2fr 1.2fr;
`

const Rouge = styled.div<ReportProps>`
  width: 100%;
  height: 70vh;
  background-position: center;

  background-image: url(${({ rouge }) => `/${rouge}.jpg`});
  background-size: contain;
  background-repeat: no-repeat;
`
