import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className="search"> 
        <div>
            <img src="/public/search.svg" alt="search" />
            <input 
                type="text" 
                placeholder="Search through unlimited Movies!"
                value={searchTerm}
                onChange={(e)=> setSearchTerm(e.target.value)} // Event
            />
        </div>
    </div>
  )
}

export default Search