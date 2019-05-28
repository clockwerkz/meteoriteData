import React, { useContext } from 'react';
import MeteorContext from '../Context/MeteorContext';

const SearchType = () => {

    const {updateSearchFilter } = useContext(MeteorContext);

    return (
        <div>
            <label htmlFor='SearchType'>Search Options:</label>
            <select name='SearchType' onChange={(e)=> updateSearchFilter(e.target.value)}>
                <option value="startsWith">Starts With</option>
                <option value="contains">Contains</option>
            </select>
        </div>
    )
}

export default SearchType;