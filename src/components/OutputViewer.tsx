import React, { useEffect, useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { colorsList } from '../helper/Constants';
import { IPieData, IResponseObject } from '../helper/interfaces';
import ChartComponent from './ChartComponent';
import QuestionViewer from './QuestionViewer';


interface IProps{
    responseObject:IResponseObject
    keywords:string[]
    isRequestFromUpload : boolean|null
}

const OutputViewer: React.FunctionComponent<IProps> = function ({keywords,responseObject,isRequestFromUpload}:IProps) {
    const [pieDataList, updatePieData] = useState<IPieData[] | undefined>(undefined);

    useEffect(()=>{
        setPieData();
    },[responseObject.similarityList])

    const setPieData = (): void => {
        const {categoryList,similarityList} = responseObject;

        const pieList: IPieData[]|undefined = categoryList && categoryList.map((category, index) => {
            return {
                title: category,
                value: (similarityList as number[])[index],
                color: colorsList[index],
            }
        })
        updatePieData(pieList);
    }

    return (<>
        {
            <>
                <Tabs>
                    <TabList>
                        <Tab>Keywords & Categories</Tab>
                        <Tab>Questions List</Tab>
                    </TabList>
                    <TabPanel>
                        <article className='wid-50'>
                            <h2>Keywords</h2>
                            {keywords && <p id='keywords'>{keywords.map(key => <span key={key}>{key}</span>)}</p>}
                        </article>
                        {pieDataList && <ChartComponent pieDataList={pieDataList}
                            similarityObject={responseObject.similarityObject}
                        />}
                    </TabPanel>
                    <TabPanel>
                        {responseObject.questionsList && responseObject.questionsList.length ?
                            <section className='questionsWrapper'>
                                <article className='cta-wrapper' style={{ textAlign: 'left', margin: '10px 11% 2px' }}>
                                    <label style={{ marginRight: '20px', fontWeight: 500 }}>Select the round type</label>
                                    <input type='radio' checked name='round_type' className='radio' id='coding' />
                                    <label style={{ marginRight: '20px' }} htmlFor='coding'>Coding Round</label>
                                    <input type='radio' name='round_type' className='radio' id='Managerial' />
                                    <label htmlFor='Managerial'>Managerial Round</label>
                                </article>
                                <article className='flex-box ques-table-wrapper' style={{ backgroundColor: 'transparent' }}>
                                    <QuestionViewer questionsData={responseObject.questionsList} />
                                </article>
                            </section> : null
                        }
                    </TabPanel>
                </Tabs>
                {isRequestFromUpload && <article id='resume-container'>
                    <iframe src="https://prod-heroku.s3.amazonaws.com/person_attachments/data/263/879/787/original/Aakanksha%27s%20Resume.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4XFBRPLS7JGNCAPQ%2F20210907%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210907T061035Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=136344b2d2ce5fd25f180be7b1c432bbe29d3611c71aca5cf3bab1afbd113ec0" title='myFileFrame' width={1000} height={800} frameBorder={0} />
                </article>
                }
            </>
        }
    
    </>)
}


export default OutputViewer;
