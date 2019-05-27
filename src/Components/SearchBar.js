import React, { useState, useContext } from 'react';
import MeteorContext from '../Context/MeteorContext';



const SearchBar = () => {
    const [searchString, setSearchString] = useState('');
    const { updateSearchQuery } = useContext(MeteorContext); 
    return ( 
       <div>
            <input type='text' value={searchString} onChange={(e)=> setSearchString(e.target.value)} />
            <button onClick={()=> updateSearchQuery(searchString)}>Search</button>
        </div>
    )
}

export default SearchBar;