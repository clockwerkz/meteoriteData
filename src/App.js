import React, { useEffect, useReducer} from 'react';
import initialState from './reducer/initialState';
import MeteorContext from './Context/MeteorContext';
import meteorReducer from './reducer/meteorReducer';

import SearchBar from './Components/SearchBar';

import './app.css';


const meteoriteAPI = 'https://data.nasa.gov/resource/gh4g-9sfh.json';


function App() {
  
  const [state, dispatch] = useReducer(meteorReducer, initialState);

  useEffect(()=> {
    fetch(meteoriteAPI)
      .then(res => res.json())
      .then(jsonData => dispatch({type:'POPULATE_DATA', payload:jsonData}))
      .catch(err => console.error('Problem with data:', err));
  }, []);

  const {dataSlice, searchString, defaultData } = state;
  return (
    <MeteorContext.Provider value={{ searchString, dispatch }}>
      <h1>Meteorite Data</h1>
      <SearchBar />
      <p>{defaultData.length}</p>
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
          { dataSlice && dataSlice.map(meteor => (
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
        <button onClick={()=>dispatch({type:'PREV_PAGE'})}>Previous Page</button>
        <button onClick={()=>dispatch({type:'NEXT_PAGE'})}>Next Page</button>
      </div>
    </MeteorContext.Provider>
  );
}

export default App;
