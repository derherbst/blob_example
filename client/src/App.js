import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Spinner from './Spinner';

const Component = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const callsLength = 4;
  
  const handleLinkClick = () => {

    setError(null);
    setLoading(true);
    axios.get("/api/file", {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/pdf',
      },
      responseType: "blob",
    })
    .then((response) => {
      setLoading(false);
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const objectUrl = window.URL.createObjectURL(blob);
      setTimeout(() => {
        window.open(objectUrl)
      }, 1000);
      
    })
    .catch((error) => {
      console.dir(error)
      setLoading(false);
      setError(error);
    })
    
  }
 
  return (
    <div className="App">
      <a id='clickMe' onClick={handleLinkClick}>Click Me!</a>
      {
        loading && <div className='spinnerBox'><Spinner /></div>
      }
      {
        error && (
          <>
            <div className='errorStatus'>{error.response.status}</div>
            <div className='errorStatusText'>{error.response.statusText}</div>
          </>
        )
      }
    </div>
  );
}

export const App = React.memo(Component);
