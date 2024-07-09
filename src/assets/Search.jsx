import React, { useContext, useEffect, useState } from 'react'
import "../styles/search.css"
import axios from 'axios'


const Search = () => {

  return (
    <div className='home-container'>
      <div className='' style={{ position: "relative" }}>
        <input type='text' placeholder='Search' className='search-input-box' />
        <span className="material-symbols-outlined search-icon-in-search">
          search
        </span>
        <button type='submit' className='search-bt'>Search</button>
      </div>
    </div>
  )
}

export default Search