import React from "react";
import { FiSearch } from "react-icons/fi";
import styled from "styled-components";

const SearchBoxStyles = styled.div`
  width: 30%;
  position: relative;

  input {
    border-radius: 2rem;
    border: none;
    width: 100%;
    padding: 0.75rem 2rem 0.75rem 4rem;
    font-size: 1.4rem;
  }
`;

function SearchBox() {
  return (
    <SearchBoxStyles>
      <FiSearch
        size={20}
        style={{ position: "absolute", top: "0.9rem", left: "1.25rem" }}
      />
      <input type="text" placeholder="Search" />
    </SearchBoxStyles>
  );
}

export default SearchBox;
