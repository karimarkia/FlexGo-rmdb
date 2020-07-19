import React, { useState, useRef } from 'react'
import FontAwesome from 'react-fontawesome'
import {
  StyledSearchBar,
  StyledSearchBarContent,
} from '../styles/StyledSearchBar'

const SearchBar = ({ callback }) => {
  const [state, setstate] = useState('')
  const timeOut = useRef(null)

  const onSearch = (e) => {
    const { value } = e.target
    clearTimeout(timeOut.current)
    setstate(value)
    timeOut.current = setTimeout(() => {
      callback(value)
    }, 800)
  }

  return (
    <StyledSearchBar>
      <StyledSearchBarContent>
        <FontAwesome className="fa-search" size="2x" name="search" />
        <input
          type="text"
          placeholder="Search Movie"
          onChange={onSearch}
          value={state}
        />
      </StyledSearchBarContent>
    </StyledSearchBar>
  )
}

export default SearchBar
