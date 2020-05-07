import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Spinner from './Spinner';

const Component = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const callsLength = 2;

  const handleLinkClick = () => {

    // for (let i = 1; i <= callsLength; i++) {
      setLoading(true);
      setError(null);

      axios.get("/api/file", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/pdf',
        },
        responseType: "blob",
      })
        .then((response) => {
          setLoading(true);
          setError(null);
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const objectUrl = window.URL.createObjectURL(blob);

          setTimeout(() => {
            setLoading(false);
            window.open(objectUrl);
          }, 2000);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
          setTimeout(() => {
            handleLinkClick();
          }, 1000);
        })

    // }
  };

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
