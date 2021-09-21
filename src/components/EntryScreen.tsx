import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
import axios from 'axios';

import { IResponseObject } from '../helper/interfaces';
import { baseApiPath } from '../helper/Constants';
import OutputViewer from './OutputViewer';
import '../css/styles.scss';


const EntryScreen: React.FunctionComponent = function (props) {
    const uploadRef = React.useRef<HTMLInputElement>(null);
    const searchRef = React.useRef<HTMLInputElement>(null);
    const questionCount = React.useRef<HTMLInputElement>(null);

    const [isShowLoader, showLoader] = React.useState<boolean>(false);    
    const [responseObject, setResponseObject] = useState<IResponseObject | null>(null);
    const [keywords, setKeywordsList] = useState<string[]>([]);
    const [isRequestFromUpload,updateUploadFlag] = useState<boolean|null>(null);

    const uploadResume = (event: any) => {
        const fileObj = uploadRef.current?.files;
        if (!fileObj?.length) {
            alert('Please upload a resume to parse');
            return;
        }
        updateUploadFlag(true);
        showLoader(true);
        const formData = new FormData();
        formData.append('file', fileObj[0]);
        axios.post(baseApiPath + '/uploadResume', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                const {categoryList,similarityList,similarityObject,questions} = response.data;
                setResponseObject({
                    similarityObject,
                    categoryList,
                    similarityList,
                    questionsList : questions
                });
                setKeywordsList(response.data.keywords || []);
                showLoader(false);
            }).catch(err => {
                showLoader(false);
                alert('Error Encountered');
            })
    }

    const fetchMatchingQues4Words = () => {
        const values = searchRef.current?.value;
        if (values && values.trim()) {
            updateUploadFlag(false);
            showLoader(true);
            setKeywordsList(values.split(","));
            fetchQuestions(values,true);
        }
    }

    const fetchQuestions = (words:string,isFetchSimilarity:boolean=false) =>{
        axios.get(baseApiPath + '/fetchQuestions?words=' + words + '&count=' + questionCount.current?.value)
        .then((response: any) => {
            setResponseObject({
                ...responseObject,
                questionsList : response.data || []
            })
            showLoader(false);
        })
        .then(()=>{
            isFetchSimilarity && fetchSimilarity(words);
        })
        .catch(err => {
            showLoader(false);
        })
    }

    const fetchSimilarity = (values:string) => {
        if (values && values.trim()) {
            axios.get(baseApiPath + '/fetchSimilarity?words=' + values)
                .then((response: any) => {
                    const {categoryList,similarityList,similarityObject} = response.data;
                    setResponseObject({
                        similarityObject,
                        categoryList,
                        similarityList
                    });
                });
        }
    }

    const filterQuestions=(wordsList:string[])=>{
        if(wordsList && wordsList.length){
            fetchQuestions(wordsList.join(","));
        }
    }

    return (
        isShowLoader ?
            <section className='loaderWrapper'>
                <Loader
                    type="Circles"
                    color="#e1e1e1"
                    height={300}
                    width={300}
                />
            </section>
            :
            responseObject ? 
            <OutputViewer 
                responseObject={responseObject} 
                keywords={keywords} 
                isRequestFromUpload={isRequestFromUpload}
                filterQuestions={filterQuestions}
                />
            :
            <section className='flex-box' id='entry-screen-wrapper'>
                <article style={{ position: 'relative', borderRight: '1px solid #e1e1e1', margin: '0 50px', padding: '0 50px' }} className='wid-50'>
                    <label>You can upload the resume of the candidate from here</label>
                    <p className='uploadButton button'
                        onClick={() => { uploadRef.current?.click() }}
                        title='Upload a resume to get some matching questions'
                    >Upload Resume</p>
                    <input ref={uploadRef} type='file' placeholder='Upload CV' id='upload' name='upload' style={{ height: '20px', width: '300px' }} onChange={uploadResume} />
                </article>
                <div className='separator separator-verticle' />
                <article className='wid-50'>

                    <form>
                        <div className='form-element'>
                            <label>Search words (comma separated)</label>
                            <input ref={searchRef} placeholder='Type comma separated keywords here' id='search'
                                name='search'
                                style={{ height: '20px', width: '300px' }}
                            />
                        </div>
                        <div className='form-element'>
                            <label>No of questions</label>
                            <input id='quesCount' type='number' ref={questionCount} min='1' max='10' placeholder='Count' defaultValue='5' name='quesCount' style={{ height: '20px', width: '40px' }} />
                        </div>
                        <button type='button' className='button'
                            onClick={fetchMatchingQues4Words}
                        // disabled={!searchRef.current?.value?.length}
                        >Search</button>
                    </form>
                </article>

            </section>)
}

export default EntryScreen;