import React, { useState, useEffect } from 'react';
import './app.css';
const meteoriteAPI = 'https://data.nasa.gov/resource/gh4g-9sfh.json';

function App() {
  
  const [data, setData] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
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
    setDefaultData(data);
  }, [data])

  useEffect(()=> {
    if (data) {
      setDataSlice(defaultData.slice(pagePosition, pagePosition+pageSize));
    }
  }, [defaultData, pagePosition, pageSize])


  const advancePagination =() => {
    if (pagePosition < data.length){
      setPagePosition(pagePosition+pageSize);
    }
  }

  const reversePagination = () => {
    if (pagePosition > 0) {
      setPagePosition(pagePosition-pageSize);
    }
  }

  return (
    <div>
      <h1>Meteorite Data</h1>
      <table>
        { dataSlice && dataSlice.map(meteor => (
         <tr key={meteor.id}>
          <td>{meteor.name}</td>
          <td>{meteor.recclass}</td>
          <td>{meteor.mass}</td>
          <td>{meteor.fall}</td>
          <td>{Date(meteor.year)}</td>
        </tr> 
        )) }
      </table>
      <div>
        <button onClick={reversePagination}>Previous Page</button>
        <button onClick={advancePagination}>Next Page</button>
      </div>
    </div>
  );
}

export default App;
