import { FormControl, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { BiSearch } from 'react-icons/bi'

const SearchInput = ({term, setTerm, pl}) => {
  return (
    <FormControl sx={{ minWidth: 500 }}>
    <TextField
      size="small"
      fullWidth
      value={term}
      onChange={(e) => setTerm(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <BiSearch className="text-xl" />
          </InputAdornment>
        ),
      }}
      placeholder={pl}
      variant="outlined"
    />
  </FormControl>
  )
}

export default SearchInput