import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import EditCountryList from "../editCountryList/editCountryList";
import AddNewItem from "../addNewItem/addNewItem";
import ScooterSharingItem from "../scooterSharingItem/scooterSharingItem";

import addContactUsData from "../../../redux/action/contactUs";
import { getDataThunk } from "../../../redux/action/getData";

import css from "./tariffs.module.scss";

const Tariffs = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.mimoDataReducer);
  const [scooterSharing, setScooterSharing] = useState(
    data?.data?.scooterSharingTariffs || {}
  );
  const { user } = useSelector((state) => state?.signIn);

  const isAuthenticated = user?.accessToken || localStorage.getItem("token");

  const initialItem = { name: "", price: 0, text: "" };
  
  const [countryList, setCountryList] = useState(Object.keys(scooterSharing));
  
  const [selectedCountry, selectCountry] = useState(countryList?.[0] || "");
  const [newItem, setNewItem] = useState({ ...initialItem });

  const handleAddItem = (item) => {
    if (!selectedCountry || !(newItem.name && newItem.text))
      if (scooterSharing?.[selectedCountry]) {
        scooterSharing?.[selectedCountry].push(newItem);
      } else {
        scooterSharing[selectedCountry] = [newItem];
      }
    handleSendItems();
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...scooterSharing[selectedCountry]];
    updatedItems.splice(index, 1);
    setScooterSharing({ ...scooterSharing, [selectedCountry]: updatedItems });
    handleSendItems();
  };

  const handleSendItems = () => {
    dispatch(
      addContactUsData(
        { ...data?.data, scooterSharingTariffs: scooterSharing },
        isAuthenticated
      )
    ).then(setNewItem({ ...initialItem }));
    dispatch(getDataThunk());
  };

  const handleItemChange = (updatedData, index) => {
    const updatedItems = [...scooterSharing[selectedCountry]];
    updatedItems[index] = updatedData;

    const updatedDataObj = {
      ...scooterSharing,
      [selectedCountry]: updatedItems,
    };

    setScooterSharing(updatedDataObj);
  };

  useEffect(() => {
    dispatch(getDataThunk());
  }, []);

  return (
    <div className={css.container}>
      <h2>Scooter Sharing Tariffs</h2>
      <Box>
        <EditCountryList
          countryList={countryList}
          setCountryList={setCountryList}
          setScooterSharing={setScooterSharing}
          scooterSharing={scooterSharing}
        />
        <h2>Select Country</h2>
        <FormControl className={css.selectContainer} fullWidth>
          <InputLabel key={Math.random()} id="demo-simple-select-label">
            Select country
          </InputLabel>
          <Select
            className={css.select}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCountry}
            label="Age"
            onChange={(e) => selectCountry(e.target.value)}
          >
            {countryList?.map((country) => (
              <MenuItem
                className={css.select}
                key={Math.random()}
                value={country}
              >
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box className={css.items} margin="none">
        {scooterSharing?.[selectedCountry]?.map((item, index) => (
          <ScooterSharingItem
            className={css.item}
            key={index}
            item={item}
            handleDeleteItem={(e) => handleDeleteItem(index)}
            handleItemChange={(updatedData) =>
              handleItemChange(updatedData, index)
            }
          />
        ))}
      </Box>
      c<h2>Add new tariff</h2>
      <Box
        className={css.customBox}
        sx={{ borderBottom: 1, borderColor: "divider" }}
        margin="none"
      >
        <AddNewItem
          newItem={newItem}
          setNewItem={setNewItem}
          handleAddItem={handleAddItem}
        />
      </Box>
      <div className={css?.sendBtn}>
        <Button  variant="contained" size="large" onClick={handleSendItems}>
          Send data
        </Button>
      </div>
    </div>
  );
};
export default Tariffs;
