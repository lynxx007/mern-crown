import TextField from "@mui/material/TextField";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

const SearchBar = () => {
  const [query, setQuery] = React.useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <TextField
        value={query}
        onChange={handleSearch}
        label="Search"
        variant="outlined"
        placeholder="Search for products"
        size="small"
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;
