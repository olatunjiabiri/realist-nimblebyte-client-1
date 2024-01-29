import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useTheme from "@mui/system/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

const RowPerPage = ({ total, rowPerPage, setRowPerPage }) => {
  const theme = useTheme();
  //   const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery("(min-width:768px)");

  function generateMultiples(number, multiple, count) {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(number + i * multiple);
    }
    return result;
  }

  const number = 15;
  const multiple = 15;
  const count = Math.ceil(total / multiple); // Change this to the desired number of elements in the array

  const RowPerPageArray = generateMultiples(number, multiple, count);
  //   console.log(RowPerPageArray);

  const handleChange = (event) => {
    setRowPerPage(event.target.value);
  };

  return (
    <>
      {isMdScreen && (
        <div className="mx-4 d-flex flex-direction-row">
          <span>Properties per page</span>
          <FormControl
            sx={{ p: 0, marginLeft: 1, marginRight: 2, minWidth: 80 }}
          >
            <Select
              value={rowPerPage}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              SelectDisplayProps={{
                style: { padding: 6 },
              }}
            >
              <MenuItem value={9}>9</MenuItem>

              {RowPerPageArray.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
    </>
  );
};

export default RowPerPage;
