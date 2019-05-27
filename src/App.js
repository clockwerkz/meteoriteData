import React, { useEffect, useState } from 'react';
import MeteorContext from './Context/MeteorContext';
import  {fetchInitialData, queryDataStartsWith, queryDataContains } from './helpers/meteorData';

import SearchBar from './Components/SearchBar';

import './app.css';


function App() {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(100);
  const [offset, setOffset] = useState(0);
  const [searchString, setSearchString] = useState('');
  const [searchFilter, setSearchFilter] = useState('startsWith');

  useEffect(()=> {
    if (searchString) {
      if (searchFilter === 'startsWith') {
        queryDataStartsWith(page, setData, searchString);    
      } else {
        queryDataContains(page, setData, searchString); 
      }
    } else {
      fetchInitialData(page, setData);
    }
  }, [searchString, searchFilter, page])

  const nextPage = ()=> {
    setPage(page+100);
  }

  return (
    <MeteorContext.Provider value={{ searchString, setSearchString, searchFilter, setSearchFilter }}>
      <h1>Meteorite Data</h1>
      <SearchBar />
      <p>{data.length}</p>
      <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Rec Class</th>
          <th>Mass(g)</th>
          <th>Fall</th>
          <th>Year</th>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
          { data && data.map(meteor => (
          <tr key={meteor.id}>
            <td>{meteor.name}</td>
            <td>{meteor.recclass}</td>
            <td>{meteor.mass}</td>
            <td>{meteor.fall}</td>
            <td>{meteor.year ? (meteor.year.slice(0,4)):("UNK")}</td>
            {
              meteor.geolocation ? (
                <td>{meteor.geolocation.latitude}</td>
              ): 
              (
                <td>UNK</td>
              )
            }
            {
              meteor.geolocation ? (
                <td>{meteor.geolocation.longitude}</td>
              ): 
              (
                <td>UNK</td>
              )
            }
          </tr> 
          )) }
        </tbody>
      </table>
      <div>
        <button>Previous Page</button>
        <button onClick={nextPage}>Next Page</button>
      </div>
    </MeteorContext.Provider>
  );
}

export default App;
