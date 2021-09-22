import React from 'react';

interface IProps{
    resumeName:string
    hideResume:Function
}

const resumePath : Record<string,string> = {
    'ashishgupta.docx':'https://www.docdroid.net/AdFe4hQ/ashishgupta-docx',
    '4.docx':'https://www.docdroid.net/AbYdcGX/4-docx',
    '2.pdf':'https://www.docdroid.net/z38DvTR/2-pdf',
    'Nilesh_Resume.pdf':'https://www.docdroid.net/Fdzwafz/nilesh-resume-pdf'
}

const ResumePreviewer : React.FunctionComponent<IProps> = function({hideResume,resumeName}){


    return <article id='resume-container'>
        <span className='button show-hide' onClick={()=>hideResume()}>Hide Resume</span>
        <iframe src={resumePath[resumeName]} title='myFileFrame' width={800} height={800} frameBorder={1}/>
    </article>
}

export default ResumePreviewer;