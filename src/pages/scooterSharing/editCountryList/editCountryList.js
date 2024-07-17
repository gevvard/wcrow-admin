import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Stack } from "@mui/material";

import css from "./editCountryList.module.scss";

const EditCountryList = ({
  countryList,
  setCountryList,
  setScooterSharing,
  scooterSharing,
}) => {
  const [newCountry, setNewCountry] = useState("");

  const handleDelete = (itemToRemove) => {
    const updatedList = countryList.filter((item) => item !== itemToRemove);
    setCountryList(updatedList);
    if (scooterSharing) {
      const updatedPowerBankSharing1 = Object.fromEntries(
        Object.entries(scooterSharing).filter(
          ([country]) => country !== itemToRemove
        )
      );
      setScooterSharing(updatedPowerBankSharing1);
    }
  };

  const handleAdd = () => {
    setCountryList([...countryList, newCountry]);
    setNewCountry("");
  };

  return (
    <div className={css.container}>
      <Stack spacing={2} className={css.countryItems}>
        <TextField
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
      </Stack>
      <div className={css.selectContainer}>
        <Stack spacing={2}>
          <h2>Country list</h2>
          {countryList?.map((country) => (
            <div key={Math.random()} className={css.item}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleDelete(country)}
                className={css.button}
              >
                delete
              </Button>
              {country}
            </div>
          ))}
        </Stack>
      </div>
    </div>
  );
};

export default EditCountryList;
