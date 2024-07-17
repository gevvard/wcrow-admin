import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import Button from "@mui/material/Button";
import addContactUsData from "../../../redux/action/contactUs";
import { getDataThunk } from "../../../redux/action/getData";
import MenuItem from "@mui/material/MenuItem";
import css from "./tariffs.module.scss";
import PowerBankSharingItem from "../powerBankSharingItem/powerBankSharingItem";
import AddNewItem from "../addNewItem/addNewItem";
import EditCountryList from "../editCountryList/editCountryList";

const Tariffs = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.mimoDataReducer);
  const [powerBankSharing, setPowerBankSharing] = useState(
    data?.data?.powerBankSharingTariffs || {}
  );

  const { user } = useSelector((state) => state?.signIn);

  const isAuthenticated = user?.accessToken || localStorage.getItem("token");

  const initialItem = { name: "", price: 0, text: "" };

  const [countryList, setCountryList] = useState(Object.keys(powerBankSharing));
  
  const [selectedCountry, selectCountry] = useState(countryList?.[0] || "");

  const [newItem, setNewItem] = useState({ ...initialItem });

  const handleAddItem = (item) => {
    if (!selectedCountry || !(newItem.name && newItem.text))
      if (powerBankSharing?.[selectedCountry]) {
        powerBankSharing?.[selectedCountry].push(newItem);
      } else {
        powerBankSharing[selectedCountry] = [newItem];
      }
    handleSendItems();
  };
  const handleDeleteItem = (index) => {
    const updatedItems = [...powerBankSharing[selectedCountry]];
    updatedItems.splice(index, 1);
    setPowerBankSharing({
      ...powerBankSharing,
      [selectedCountry]: updatedItems,
    });
    handleSendItems();
  };

  const handleSendItems = () => {
    dispatch(
      addContactUsData(
        { ...data?.data, powerBankSharingTariffs: powerBankSharing },
        isAuthenticated
      )
    ).then(setNewItem({ ...initialItem }));
    dispatch(getDataThunk(isAuthenticated));
  };

  const handleItemChange = (updatedData, index) => {
    const updatedItems = [...powerBankSharing[selectedCountry]];
    updatedItems[index] = updatedData;

    const updatedDataObj = {
      ...powerBankSharing,
      [selectedCountry]: updatedItems,
    };

    setPowerBankSharing(updatedDataObj);
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getDataThunk(isAuthenticated));
    }
  }, []);

  return (
    <div className={css.container}>
      <h2> PowerBankSharing Tariffs</h2>
      <Box>
        <EditCountryList
          countryList={countryList}
          setCountryList={setCountryList}
          powerBankSharing={powerBankSharing}
          setPowerBankSharing={setPowerBankSharing}
        />
        <h2>Select Country</h2>
        <FormControl className={css.selectContainer} fullWidth>
          <InputLabel id="demo-simple-select-label">Select country</InputLabel>
          <Select
            className={css.select}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCountry}
            label="Age"
            onChange={(e) => selectCountry(e.target.value)}
          >
            {countryList?.map((country) => (
              <MenuItem key={Math.random()} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/* <h2>Make change for this power bank sharing data</h2> //come check this */}
      <h2>Add new tariff</h2>
      <Box
        className={css.items}
        sx={{ borderBottom: 1, borderColor: "divider" }}
        margin="none"
      >
        {powerBankSharing?.[selectedCountry]?.map((item, index) => (
          <PowerBankSharingItem
            className={css.item}
            key={index}
            item={item}
            handleItemChange={(updatedData) =>
              handleItemChange(updatedData, index)
            }
            handleDeleteItem={(e) => handleDeleteItem(index)}
          />
        ))}
      </Box>
      {/* <h2>
        if you need to add new item you can add power bank sharing data this
        form{" "}
      </h2> */}
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
        <Button variant="contained" size="large" onClick={handleSendItems}>
          Send data
        </Button>
      </div>
    </div>
  );
};
export default Tariffs;
