import styled from "@emotion/styled";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  pdf_file: string,
};

const DummyRankKeyword = ["키워드1", "키워드2", "키워드3", "키워드4", "키워드5", "키워드6", "키워드7", "키워드8", "키워드9", "키워드10", "키워드11", "키워드12", "키워드13", "키워드14", "키워드15"]
let myString = "";

const KeywordContainer = styled.div`
    margin: 30px 0;
    display: flex;
    justify-content: center;
`

const MainUploadContainer = styled.div`
    display: flex;
    justify-content: center;
`

const KeywordList = styled.div`
`

const KeywordTextarea = styled.textarea`
    width: 100%;
    height: 100px;
    margin: 30px 0;
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

    background-color: #343A3F;
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

const MainTable = styled.table`
    width: 90%;
`

const MainTableHead = styled.thead`
    line-height: 50px;

    background-color: #343A3F;
    color: white;
`

const MainTableBody = styled.tbody`
    line-height: 50px;
    tr {
        border-bottom: 1px solid rgba(0,0,0,0.2);
    }

    tr > td{
        text-align: center;
    }
`

const MainCreateButton = styled.button`
    width: 100%;
    background-color : black;
    color: white;
`

export default function Main(){
    const {register, handleSubmit, watch, formState: { errors }} = useForm();
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    const onSubmit = (data:any) => {
        console.log(data);
        const reportTitle = data.pdf_file[0].name.replace('.pdf', '');
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          };
        const createdAt = data.pdf_file[0].lastModifiedDate.toLocaleString('ko-KR', options);

        setFileUrl(URL.createObjectURL(data.pdf_file[0]));

        
        console.log("보고서 이름 : ", reportTitle);
        console.log("생성 일자 : ", createdAt);
        console.log("PDF 파일 :", fileUrl)
    };

    const handlePdf = () => {
        if(fileUrl){
            window.open(fileUrl, '_blank');
        }
    }

    return <MainContainer>
        <MainHeader>
            <h1>KB Finance AI Summarizer</h1>
        </MainHeader>

        <MainForm onSubmit={handleSubmit(onSubmit)}>

            <MainUploadContainer>
                <MainLabel htmlFor="pdf_file"><svg xmlns="http://www.w3.org/2000/svg" opacity="0.85" height="5em" viewBox="0 0 640 512"><path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"/></svg><h1>DROP PDF FILE HERE OR BROWSE</h1><p>Drag and drop pdf files to this area for quick upload or use file explorer</p></MainLabel>
                
                <MainInput {...register("pdf_file")} id="pdf_file" type="file" accept=".pdf"/>
                <button>생성</button>
                <button onClick={handlePdf} disabled={!fileUrl}>pdf 원본</button>
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
                    <th></th>
                </tr>
            </MainTableHead>
            <MainTableBody>
                <tr>
                    <td>예시0</td>
                    <td>23.8.5</td>
                    <td>원본</td>
                    <td>요약본</td>
                    <td>수정본</td>
                    <td>수정</td>
                    <td>삭제</td>
                </tr>
                <tr>
                    <td>예시1</td>
                    <td>23.8.5</td>
                    <td>원본</td>
                    <td>요약본</td>
                    <td>수정본</td>
                    <td>수정</td>
                    <td>삭제</td>
                </tr>
                <tr>
                    <td>예시2</td>
                    <td>23.8.5</td>
                    <td>원본</td>
                    <td>요약본</td>
                    <td>수정본</td>
                    <td>수정</td>
                    <td>삭제</td>
                </tr>
                <tr>
                    <td>예시3</td>
                    <td>23.8.5</td>
                    <td>원본</td>
                    <td>요약본</td>
                    <td>수정본</td>
                    <td>수정</td>
                    <td>삭제</td>
                </tr>
                <tr>
                    <td>예시4</td>
                    <td>23.8.5</td>
                    <td>원본</td>
                    <td>요약본</td>
                    <td>수정본</td>
                    <td>수정</td>
                    <td>삭제</td>
                </tr>
            </MainTableBody>
        </MainTable>        
    </MainContainer>
}