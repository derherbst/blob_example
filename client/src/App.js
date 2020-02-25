import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Spinner from './Spinner';

const Component = () => {

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  // const newWindow = window.open();

  const showFile = (blob, newWindow) => {
    const newBlob = new Blob([blob], {
      type: 'application/pdf',
    });
    const data = window.URL.createObjectURL(newBlob);

    setUrl(data);

    // console.log(newWindow);

    // newWindow.location = data;
    // window.focus();
  };

  const handleLinkClick = () => {
    axios.get("/api/file",
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/pdf'
                },
                responseType: "blob"
            }).then((response) => {
                console.log(response.data);
                
                const blob = new Blob([response.data], { type: 'application/pdf' })
                const objectUrl = window.URL.createObjectURL(blob);
                // debugger
                window.open(objectUrl)
            }).catch((error) => { alert(error) })
    
    // const newWindow = window.open();
    // fetch('../189838.pdf')
    // fetch('/api/file', {
    //   responseType: 'arraybuffer',
    //   headers: {
    //     'Accept': 'application/pdf'
    //   }
    // })
    // .then(response => {
    //   console.log(response);
    //   // response.data is an empty object
    //   const blob = new Blob([response], {
    //     type: 'application/pdf',
    //   });
    //   const data = window.URL.createObjectURL(blob);
    //   window.open(data);
    //   // FileSaver.saveAs(blob, Math.random());
    // })
    // .then((response) => {
    //   const newBlob = new Blob([response], {
    //     type: 'application/pdf',
    //   });
    //   const data = window.URL.createObjectURL(newBlob);
  
    //   // setUrl(data);

    //   console.log(data);
      
      
    //   newWindow.location = data;
  
    //   // console.log(newWindow);
  
    //   // newWindow.location = data;
    //   // window.focus();
    // })
  }
 
  return (
    <div className="App">
      <a id='clickMe' onClick={handleLinkClick}>Click Me!</a>
      <Spinner />
    </div>
  );
}

export const App = React.memo(Component);
