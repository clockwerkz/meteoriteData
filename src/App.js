import React, { useEffect, useState } from 'react';
import MeteorContext from './Context/MeteorContext';
import soda from 'soda-js';

import SearchBar from './Components/SearchBar';

import './app.css';


const consumer = new soda.Consumer('data.nasa.gov');
// consumer.query()
//   .withDataset('gh4g-9sfh')
//   .where("name like 'Z%' OR name like '%z%'")
//   .order('name ASC')
//   .limit(10)
//   .offset(0)
//   .getRows()
//   .on('success', (rows)=> console.log(rows))
//   .on('error', (error)=> console.error(error));




// const meteoriteAPI = 'https://data.nasa.gov/resource/gh4g-9sfh.json';

function App() {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(100);

  useEffect(()=> {
    consumer.query()
      .withDataset('gh4g-9sfh')
      .order('name ASC')
      .limit(page)
      .offset(0)
      .getRows()
      .on('success', (data)=> setData(data))
      .on('error', (error)=> console.error(error));
  }, [page])

  const updateSearchQuery = (searchString) => {
    if (searchString) {
      searchString = searchString[0].toUpperCase() + searchString.slice(1);
      consumer.query()
        .withDataset('gh4g-9sfh')
        .order('name ASC')
        .where("name like '"+searchString+"%'")
        .limit(page)
        .offset(0)
        .getRows()
        .on('success', (data)=> setData(data))
        .on('error', (error)=> console.error(error));
    }
  }

  // const [state, dispatch] = useReducer(meteorReducer, initialState);

  // useEffect(()=> {
  //   fetch(meteoriteAPI)
  //     .then(res => res.json())
  //     .then(jsonData => dispatch({type:'POPULATE_DATA', payload:jsonData}))
  //     .catch(err => console.error('Problem with data:', err));
  // }, []);

  // const {dataSlice, searchString, defaultData } = state;
  return (
    <MeteorContext.Provider value={{ updateSearchQuery }}>
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
        <button>Next Page</button>
      </div>
    </MeteorContext.Provider>
  );
}

export default App;
