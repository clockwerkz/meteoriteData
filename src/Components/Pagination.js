import React, { useContext } from 'react';
import MeteorContext from '../Context/MeteorContext';


const Pagination = ()=> {
    const values = [10, 20, 50, 100];
    const {page ,setPage} = useContext(MeteorContext); 
    return (
      <div class="pagination">
        {values.map(amt=> (
            <div key={amt} className="page-return--wrapper">
                <input 
                    type="radio" 
                    id="{amt}" 
                    name="page-return" 
                    value={amt}
                    checked={amt===page}
                    onChange={e=>setPage(parseInt(e.target.value))}
                />
                <label htmlFor="{amt}">{amt}</label>
            </div>
        ))}
        
      </div>  
    )
}


export default Pagination