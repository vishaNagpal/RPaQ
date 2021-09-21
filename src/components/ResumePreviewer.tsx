import React from 'react';

interface IProps{
    hideResume:Function
}

const ResumePreviewer : React.FunctionComponent<IProps> = function({hideResume}){
    return <article id='resume-container'>
        <span className='button show-hide' onClick={()=>hideResume()}>Hide Resume</span>
        <iframe src="https://www.docdroid.net/AbYdcGX/4-docx" title='myFileFrame' width={800} height={800} frameBorder={1}/>
    </article>
}

export default ResumePreviewer;