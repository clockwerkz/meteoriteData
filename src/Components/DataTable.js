import React, { useContext } from 'react';
import MeteorContext from '../Context/MeteorContext';

const DataTable = () => {
    const { data } = useContext(MeteorContext);

    return (
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
                { data && data.map(meteor => (
                <tr key={meteor.id}>
                    <td>{meteor.name}</td>
                    <td>{meteor.recclass}</td>
                    <td>{meteor.mass ? (meteor.mass):("UNK")}</td>
                    <td>{meteor.fall}</td>
                    <td>{meteor.year ? (meteor.year.slice(0,4)):("UNK")}</td>
                    {
                        meteor.geolocation ? (<td>{meteor.geolocation.latitude}</td>)
                        : 
                        (<td>UNK</td>)
                    }
                    {
                        meteor.geolocation ? (<td>{meteor.geolocation.longitude}</td>)
                        : 
                        (<td>UNK</td>)
                    }
                </tr> 
                )) }
            </tbody>
        </table>   
    )
}

export default DataTable;