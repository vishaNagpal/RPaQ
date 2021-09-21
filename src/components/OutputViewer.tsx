import React, { useEffect, useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { colorsList } from '../helper/Constants';
import { IPieData, IResponseObject } from '../helper/interfaces';
import ChartComponent from './ChartComponent';
import QuestionViewer from './QuestionViewer';
import ResumePreviewer from './ResumePreviewer';


interface IProps{
    responseObject:IResponseObject
    keywords:string[]
    isRequestFromUpload : boolean|null
    filterQuestions:Function
}

const OutputViewer: React.FunctionComponent<IProps> = function ({keywords,responseObject,isRequestFromUpload,filterQuestions}:IProps) {
    const [pieDataList, updatePieData] = useState<IPieData[] | undefined>(undefined);
    const [selectedCatList, updateCatList] = useState<string[]|null>(null);
    const [isResumeVisible,showResume] = useState<boolean|null>(isRequestFromUpload);

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

    const handleKeywordClick = (ev:any,keyword:string)=>{
        ev.currentTarget.classList.toggle('selected');
        const newList = selectedCatList || [];
        if(selectedCatList?.includes(keyword)){
            updateCatList(newList.splice(selectedCatList.indexOf(keyword)));
        }else{
            updateCatList([...newList,keyword]);
        }
    }

    return (<>
        {
            <>
                <Tabs>
                    <TabList>
                        <Tab>Keywords & Categories</Tab>
                        <Tab>Questions List</Tab>
                    </TabList>
                    <TabPanel className={isResumeVisible ? 'uploader-panel' : 'typed-panel'}>
                        {isResumeVisible && <ResumePreviewer hideResume={()=>{showResume(false)}}/>}
                        {isRequestFromUpload && !isResumeVisible && <span className='button show-hide' onClick={()=>showResume(true)}>Show Resume</span>}
                        <section>
                        <article className='wid-50 keywords-container'>
                            <h2>Keywords</h2>
                            {keywords && <p id='keywords'>{keywords.map(key => 
                            <span key={key} data-text={key} className={selectedCatList && selectedCatList.includes(key.toLowerCase()) ? 'selected' : ''} 
                                onClick={(ev)=>handleKeywordClick(ev,key)}>{key}</span>
                            )}</p>}
                        </article>
                        {pieDataList && <ChartComponent pieDataList={pieDataList}
                            similarityObject = {responseObject.similarityObject}
                            onCategorySelection = {(words:string[])=>updateCatList(words)}
                        />}
                        </section>
                    </TabPanel>
                    <TabPanel>
                        {responseObject.questionsList && responseObject.questionsList.length ?
                            <section className='questionsWrapper'>
                                <article className='cta-wrapper' style={{ textAlign: 'left', margin: '20px 11% 12px' }}>
                                    <label style={{ marginRight: '20px', fontWeight: 500 }}>Select the round type</label>
                                    <input type='radio' checked name='round_type' className='radio' id='coding' />
                                    <label style={{ marginRight: '20px' }} htmlFor='coding'>Coding Round</label>
                                    <input type='radio' name='round_type' className='radio' id='Managerial' />
                                    <label htmlFor='Managerial'>Managerial Round</label>
                                </article>
                                <button className='button btn-filter' title='Click to filter as per selected Keywords' onClick={()=>filterQuestions(selectedCatList)}>Filter</button>
                                <article className='flex-box ques-table-wrapper' style={{ backgroundColor: 'transparent' }}>
                                    <QuestionViewer questionsData={responseObject.questionsList} />
                                </article>
                            </section> : null
                        }
                    </TabPanel>
                </Tabs>
            </>
        }
    
    </>)
}


export default OutputViewer;
