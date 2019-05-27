import React, { useEffect, useState } from 'react';
import MeteorContext from './Context/MeteorContext';
import  {fetchInitialData, queryDataStartsWith, queryDataContains } from './helpers/meteorData';

import SearchBar from './Components/SearchBar';
import Pagination from './Components/Pagination';
import DataTable from './Components/DataTable';
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
        queryDataStartsWith(page, offset, setData, searchString);    
      } else {
        queryDataContains(page, offset, setData, searchString); 
      }
    } else {
      fetchInitialData(page, offset, setData);
    }
  }, [searchString, searchFilter, offset, page])


  const updateSearch = (newSearchString) => {
    setSearchString(newSearchString);
    setOffset(0);
  }

  const nextPage = ()=> {
    if (page<=data.length) setOffset(offset+page);
  }

  const prevPage = ()=> {
    if (offset-page >= 0) {
      setOffset(offset-page)
    } else {
      setOffset(0);
    }
  }

  return (
    <MeteorContext.Provider value={{ data, searchString, updateSearch, searchFilter, setSearchFilter, page, setPage }}>
      <h1>Meteorite Data</h1>
      <SearchBar />
      <Pagination />
      <p>{data.length}</p>
      {data.length!==0 ? (<DataTable />):(<p>No Meteorite Results Found</p>)}
      <div>
        <button onClick={prevPage}>Previous Page</button>
        <button onClick={nextPage}>Next Page</button>
      </div>
    </MeteorContext.Provider>
  );
}

export default App;
