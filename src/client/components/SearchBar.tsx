import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

type SearchBarProps = {
  query: string;
  onQueryChange: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ query, onQueryChange }) => {
  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        placeholder="Search for products"
        size="small"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </>
  );
};

export default React.memo(SearchBar);
