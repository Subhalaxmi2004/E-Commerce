import React, { useContext } from 'react';
import myContext from '../../context/data/MyContext';
const Filter = () => {
    const context = useContext(myContext)
    const { mode } = context;
  return (
    <>
    <div className="outer">
    <div className="first">
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
    <p id="search">Search here</p>
    </div>
    <div className="second">
      <p>Filters</p>
      <p>Reset Filters</p>
    </div>
    <div className="third">
      <select className="select">
      <option value="All">All</option>
      <option value="jacket">jacket</option>
      <option value="shirt">shirt</option>
      <option value="mobile">mobile</option>
      <option value="jeans">jeans</option>
      </select>
      <select className="select">
      <option value="Any Price">Any Price</option>
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="300">300</option>
        <option value="400">400</option>
      </select>
    </div>
    </div>
    </>
  )
}

export default Filter
