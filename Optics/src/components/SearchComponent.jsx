import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({ placeholder }) => {
  return (
    <TextField
      type="text"
      placeholder={placeholder || "Search..."}
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon style={{ color: "#FFF" }} />
          </InputAdornment>
        ),
        style: {
          padding: "10px",
          fontSize: "16px",
          backgroundColor: "transparent",
          color: "#FFF",
          letterSpacing: "2px",
        }
      }}
      sx={{
        flexGrow: 1,
        marginRight: "20px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "5px",
          transition: "background-color 0.3s ease", // Smooth transition for background color
          "& fieldset": {
            borderColor: "#ccc !important",
          },
          "&:hover fieldset": {
            borderColor: "#ccc !important",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#00ff08 !important",
            outline: "none",
          },
          "&:hover": {
            backgroundColor: "#333 !important", // Change background color on hover
          }
        },
        "& .MuiInputBase-input": {
          color: "#FFF",
        },
        "& .MuiInputBase-input::placeholder": {
          color: "#FFF !important",
        },
        "& .MuiInputBase-input:focus::placeholder": {
          color: "transparent !important",
        }
      }}
    />
  );
};

export default SearchInput;
