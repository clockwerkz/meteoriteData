import React, { useState, useContext } from 'react';
import MeteorContext from '../Context/MeteorContext';



const SearchBar = () => {
    const { searchString, updateSearch, setSearchFilter } = useContext(MeteorContext); 
    const [search, setSearch] = useState(searchString);
    return ( 
       <div>
            <input type='text' value={search} onChange={(e)=> setSearch(e.target.value)} />
            <button onClick={()=> updateSearch(search)}>Search</button>
            <label htmlFor='SearchType'>Search Options:</label>
            <select name='SearchType' onChange={(e)=> setSearchFilter(e.target.value)}>
                <option value="startsWith">Starts With</option>
                <option value="contains">Contains</option>
            </select>
        </div>
    )
}

export default SearchBar;