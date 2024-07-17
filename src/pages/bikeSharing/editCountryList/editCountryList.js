import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import css from "./editCountryList.module.scss";

const EditCountryList = ({
  countryList,
  setCountryList,
  bikeSharingData,
  setBikeSharingData,
  setBikeSharingPlansData,
  bikeSharingPlansData,
}) => {
  const [newCountry, setNewCountry] = useState("");

  const handleDelete = (itemToRemove) => {
    const updatedList = countryList.filter((item) => item !== itemToRemove);
    setCountryList(updatedList);
    if (bikeSharingData) {
      const updatedPowerBankSharing = Object.fromEntries(
        Object.entries(bikeSharingData).filter(
          ([country]) => country !== itemToRemove
        )
      );
      setBikeSharingData(updatedPowerBankSharing);
    }
    if (bikeSharingPlansData) {
      const updatedPowerBankSharing = Object.fromEntries(
        Object.entries(bikeSharingPlansData).filter(
          ([country]) => country !== itemToRemove
        )
      );
      setBikeSharingPlansData(updatedPowerBankSharing);
    }
  };

  const handleAdd = () => {
    setCountryList([...countryList, newCountry]);
    setNewCountry("");
  };

  return (
    <div className={css.container}>
      <div className={css.countryItems}>
        <h2>Add new country</h2>
        <TextField
          sx={{margin: "20px 0"}}
          className={css.input}
          required
          id="outlined-required"
          label="Text"
          
          name="text"
          value={newCountry}
          onChange={(e) => setNewCountry(e.target.value)}
        />
        <Button
          className={css.button}
          variant="contained"
          size="small"
          onClick={handleAdd}
        >
          Add New Country
        </Button>
      </div>

      <div className={css.selectContainer}>
      <h2>Country list</h2>
        {countryList?.map((country) => (
          <div className={css.item} key={Math.random()}>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => handleDelete(country)}
            >
              Delete
            </Button>
            {country}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditCountryList;
