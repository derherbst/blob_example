import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Spinner from './Spinner';

const Component = () => {
  const [loading, setLoading] = useState(false);
  
  const handleLinkClick = () => {
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
      }, 2000);
      
    })
    .catch((error) => { alert(error) })
  }
 
  return (
    <div className="App">
      <a id='clickMe' onClick={handleLinkClick}>Click Me!</a>
      {
        loading && <Spinner />
      }
    </div>
  );
}

export const App = React.memo(Component);
