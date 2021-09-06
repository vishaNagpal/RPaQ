import React from 'react';
// import UploaderComponent from './components/UploaderComponent';

import 'react-tabs/style/react-tabs.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './App.css';
import EntryScreen from './components/EntryScreen';

const App : React.FunctionComponent= function() {
  
  return (
    <div className="App">
      <header className="App-header">
        <span style={{float:'left'}} className='App-logo'>RPaQ</span>
        <span style={{float:'right'}}>Hi Interviewer</span>
        <p style={{margin: '10px 0'}}>
          You can upload a resume or type the keywords directly</p>
      </header>
      <main>
        <EntryScreen/>
        {/* <UploaderComponent/> */}
      </main>
    </div>
  );
}

export default App;

