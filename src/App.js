import React, { useState, useEffect } from 'react';

const meteoriteAPI = 'https://data.nasa.gov/resource/gh4g-9sfh.json';

function App() {
  
  const [data, setData] = useState([]);

  useEffect(()=> {
    fetch(meteoriteAPI)
      .then(res => res.json())
      .then(jsonData => setData(jsonData))
      .catch(err => console.error('Problem with data:', err));
  }, [])


  return (
    <div>
      <h1>Meteorite Data</h1>
      <ul>
        { data && data.map(meteor => (
         <li key={meteor.name}>
          {meteor.name}
        </li> 
        )) }
      </ul>
    </div>
  );
}

export default App;
