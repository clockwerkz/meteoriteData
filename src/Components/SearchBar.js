import React, { useContext } from 'react';
import MeteorContext from '../Context/MeteorContext';


const SearchBar = () => {
    const {searchString, dispatch } = useContext(MeteorContext);
    return ( 
       <div>
            <input type='text' value={searchString} onChange={(e)=>dispatch({type:'UPDATE_SEARCH_STRING', payload:e.target.value})} />
        </div>
    )
}

export default SearchBar;