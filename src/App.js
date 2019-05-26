import React, { useEffect, useReducer, createContext } from 'react';
import './app.css';
import initialState from './reducer/initialState';
import meteorReducer from './reducer/meteorReducer';

const meteoriteAPI = 'https://data.nasa.gov/resource/gh4g-9sfh.json';

const MeteorContext = createContext('Test');

function App() {
  
  const [state, dispatch] = useReducer(meteorReducer, initialState);

  useEffect(()=> {
    fetch(meteoriteAPI)
      .then(res => res.json())
      .then(jsonData => dispatch({type:'POPULATE_DATA', payload:jsonData}))
      .catch(err => console.error('Problem with data:', err));
  }, []);

  const {dataSlice} = state;
  return (
    <MeteorContext.Provider value='test'>
      <h1>Meteorite Data</h1>
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
