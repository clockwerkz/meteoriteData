import React, { useEffect, useState } from 'react';
import MeteorContext from './Context/MeteorContext';
import  {fetchInitialData, queryDataStartsWith, queryDataContains } from './helpers/meteorData';

import SearchBar from './Components/SearchBar';
import Pagination from './Components/Pagination';
import DataTable from './Components/DataTable';
import SearchType from './Components/SearchType';
import './app.css';


function App() {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(20);
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
      <div className='container'>
        <h1><span>Meteorite</span> Data</h1>
        <SearchBar />
        <div className="search-options">
          <SearchType />
          <Pagination />
        </div>
        {data.length!==0 ? (<DataTable />):(<p>No Meteorite Results Found</p>)}
        <div className="btn-page--wrapper">
          <button className="btn btn--page" onClick={prevPage}>Previous Page</button>
          <button className="btn btn--page" onClick={nextPage}>Next Page</button>
        </div>
      </div>
    </MeteorContext.Provider>
  );
}

export default App;
