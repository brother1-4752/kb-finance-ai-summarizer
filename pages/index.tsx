import styled from '@emotion/styled'
import { useRouter } from 'next/router'

function Home() {
  const router = useRouter()

  const fetchPythonFeatures = () => {
    fetch('/')
  }

  return (
    <HomeContainer>
      <button onClick={() => router.push('/main')}>시 작 하 기</button>
      <button onClick={fetchPythonFeatures}>테스트</button>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;

  background-image: url('/mainBackgroundImage.jpg');
  background-size: cover;
  background-position: center;

  button {
    width: 200px;
    height: 60px;
    color: white;
    background-color: #045cf1;
    border: none;
    border-radius: 20px;
    position: fixed;
    left: 150px;
    bottom: 200px;

    font-size: 21px;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }

    &:nth-child(2) {
      left: 400px;
    }
  }
`

export default Home
