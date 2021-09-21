import React, { useEffect } from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
interface IProps {
    questionsData: {
        qId: string
        ques: string
        level_of_difficulty: string
        gist_link: string
    }[]
}

const QuestionViewer: React.FunctionComponent<IProps> = function ({ questionsData }) {
    const [isShowLoader, showLoader] = React.useState<boolean>(false);   
    
    useEffect(()=>{
        showLoader(true);
        const timerId = setTimeout(()=>{showLoader(false);clearTimeout(timerId)},1000);
    },[])

    return isShowLoader ?
    <section className='loaderWrapper'>
        <Loader
            type="Circles"
            color="#e1e1e1"
            height={300}
            width={300}
        />
    </section> : <StyledTable>
        <thead><tr>
            <th>Qid</th>
            <th>Question</th>
            <th>Difficulty Level</th>
            <th>Link</th>
        </tr>
        </thead>
        <tbody>
            {
                questionsData && questionsData.map((ques: any) => {
                    return <tr key={`ques-${ques.qId}`}>
                        <td>{ques.qId}</td>
                        <td>
                            <pre><p className='detailed'>{ques.ques}</p></pre>
                        </td>
                        <td>{ques.level_of_difficulty}</td>
                        <td>{ques.gist_link}</td>
                    </tr>
                })
            }
        </tbody>
    </StyledTable>;
}


const StyledTable = styled.table`
  width: 100%;
  text-overflow: ellipsis;
  border-collapse: collapse;
  margin:0 10%;

  tr:nth-child(even) {
    background-color: #f4f4f4;
  }

  tr {
    border: 1px solid #dadada;
    height: 36px;
    padding: 0px 16px;
  }

  th {
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: white;
  }

  td,
  th {
    padding: 5px 16px;
    text-align: left;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                        supported by Chrome and Opera */
  }
`;

export default QuestionViewer;