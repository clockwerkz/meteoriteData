import React, { useState, useContext } from 'react';
import MeteorContext from '../Context/MeteorContext';



const SearchBar = () => {
    const { searchString, updateSearch, setSearchFilter } = useContext(MeteorContext); 
    const [search, setSearch] = useState(searchString);
    return ( 
       <div className='search-bar--wrapper'>
            <input type='text' className="search-bar" value={search} onChange={(e)=> setSearch(e.target.value)} />
            <button className="btn btn--search" onClick={()=> updateSearch(search)}>Search</button>
        </div>
    )
}

export default SearchBar;