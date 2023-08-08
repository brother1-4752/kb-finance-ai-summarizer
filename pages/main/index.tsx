import styled from '@emotion/styled'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

type Inputs = {
  pdf_file: string
}

export type DataTypes = [string, string, string]
export type Props = {
  isDragging: boolean
}

const KeywordContainer = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: center;
`

const MainUploadContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const MainHeader = styled.header`
  width: 100%;
  height: 55px;

  background-color: #343a3f;
  color: white;

  display: flex;
  align-items: center;
  padding-left: 20px;
`

const MainForm = styled.form`
  width: 90%;

  border: 1px dashed black;
  border-radius: 15px;

  position: relative;
  display: flex;

  align-items: center;
  justify-content: space-evenly;
  margin: 30px 0;
`

const MainLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  cursor: pointer;

  h1 {
    font-size: 36px;
    font-weight: 700;

    margin: 30px 0;
  }

  p {
    opacity: 0.6;
  }
`

const MainInput = styled.input`
  display: none;
`

const MainCreateButton = styled.button`
  width: 200px;
  height: 50px;
  font-weight: 600;
  background-color: #ffbc00;
  border-radius: 15px;
  border: 0.5px solid black;
  margin-bottom: 20px;
`

const MainTable = styled.table`
  width: 90%;
`

const MainTableHead = styled.thead`
  line-height: 50px;

  background-color: #343a3f;
  color: white;
`

const MainTableBody = styled.tbody`
  line-height: 50px;
  tr {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  tr > td {
    text-align: center;
  }
`

export default function Main() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [tableList, setTableList] = useState<any[][]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    const files = event.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type === 'application/pdf') {
        uploadFile(file)
      } else {
        alert('PDF 파일만 업로드 가능합니다.')
      }
    }
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file.type === 'application/pdf') {
      uploadFile(file)
    } else {
      alert('PDF 파일만 업로드 가능합니다.')
    }
  }

  const uploadFile = (file) => {
    // 파일 업로드를 수행하는 로직을 구현
    // 이곳에서 파일을 서버로 보내거나, 필요한 작업을 수행합니다.
    console.log('업로드할 파일:', file)
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }
    const dataArr = [
      file.name.replace('.pdf', ''),
      file.lastModifiedDate.toLocaleString('ko-KR', options),
      URL.createObjectURL(file)
    ]
    setTableList((prevItems) => [...prevItems, dataArr])
  }

  const onSubmit = (data: any) => {
    if (data.pdf_file && data.pdf_file?.length > 0) {
      const reportTitle = data.pdf_file[0].name.replace('.pdf', '')
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }
      const createdAt = Date.now()

      const dataArr = [
        reportTitle,
        createdAt,
        URL.createObjectURL(data.pdf_file[0])
      ]

      setTableList((prevItems) => [...prevItems, dataArr])

      console.log('보고서 이름 : ', reportTitle)
      console.log('생성 일자 : ', createdAt)
      console.log('PDF 파일 :', URL.createObjectURL(data.pdf_file[0]))
    } else {
      console.log('pdf파일을 업로드하세요.')
    }
  }

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const fileTitle =  event.currentTarget.parentElement?.parentElement?.children[0].innerHTML
    console.log("tablelist: ",tableList[0][0])
    console.log("fileTitle: ", fileTitle)
    const isConfirmed = confirm(`${fileTitle}컨텐츠를 삭제하시겠습니까?`)
    if(isConfirmed){
      setTableList((prev) => prev.filter((el) => el[0] !== fileTitle))
      alert("삭제되었습니다.")
    }
  }

  return (
    <MainContainer>
      <MainHeader>
        <h1>KB Finance AI Summarizer</h1>
      </MainHeader>

      <MainForm onSubmit={handleSubmit(onSubmit)}>
        <MainUploadContainer
          style={{
            backgroundColor: `${isDragging ? 'rgba(0,0,0,0.1)' : 'white'}`,
            cursor: 'pointer'
          }}>
          <MainInput
            {...register('pdf_file')}
            id="pdf_file"
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
          />

          <MainLabel
            htmlFor="pdf_file"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              opacity="0.85"
              height="5em"
              viewBox="0 0 640 512">
              <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
            </svg>
            <h1>DROP PDF FILE HERE OR BROWSE</h1>
            <p>
              Drag and drop pdf files to this area for quick upload or use file
              explorer
            </p>
          </MainLabel>

          <MainCreateButton>요약레포트 생성하기</MainCreateButton>
        </MainUploadContainer>
      </MainForm>

      <MainTable>
        <MainTableHead>
          <tr>
            <th>리포트 이름</th>
            <th>생성 일자</th>
            <th>원본</th>
            <th>요약본</th>
            <th>수정본</th>
            <th></th>
          </tr>
        </MainTableHead>
        <MainTableBody>
          {tableList.map((el, index) => (
            <tr key={index}>
              <td>{el[0]}</td>
              <td>{el[1]}</td>
              <td>
                <button
                  onClick={() => {
                    if (el[2]) {
                      window.open(el[2], '_blank')
                    }
                  }}
                  disabled={!el[2]}>
                  원본
                </button>
              </td>
              <td>요약본</td>
              <td>수정</td>
              <td>
                <button onClick={handleDelete}>삭제</button>
              </td>
            </tr>
          ))}
        </MainTableBody>
      </MainTable>
    </MainContainer>
  )
}
