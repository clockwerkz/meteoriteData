import React, { useState, useEffect } from 'react';

const meteoriteAPI = 'https://data.nasa.gov/resource/gh4g-9sfh.json';

function App() {
  
  const [data, setData] = useState([]);
  const [dataSlice, setDataSlice] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [pagePosition, setPagePosition] = useState(0);

  useEffect(()=> {
    fetch(meteoriteAPI)
      .then(res => res.json())
      .then(jsonData => setData(jsonData))
      .catch(err => console.error('Problem with data:', err));
  }, []);

  useEffect(()=> {
    if (data) {
      setDataSlice(data.slice(pagePosition, pagePosition+pageSize));
    }
  }, [data, pagePosition, pageSize])


  const updatePagination =() => {
    setPagePosition(pagePosition+pageSize);
  }

  return (
    <div>
      <h1>Meteorite Data</h1>
      <ul>
        { dataSlice && dataSlice.map(meteor => (
         <li key={meteor.name}>
          {meteor.name}
        </li> 
        )) }
      </ul>
      <button onClick={updatePagination}>Next Page</button>
    </div>
  );
}

export default App;
