import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import EditCountryList from "../editCountryList/editCountryList";
import PowerBankSharingItem from "../powerBankSharingItem/powerBankSharingItem";
import AddNewItem from "../addNewItem/addNewItem";

import addContactUsData from "../../../redux/action/contactUs";
import { getDataThunk } from "../../../redux/action/getData";

import css from "./plans.module.scss";

const Planss = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.mimoDataReducer);
  const [powerBankSharingPlansData, setPowerBankSharingPlansData] = useState(
    data?.data?.powerBankSharingPlansData || {}
  );

  const { user } = useSelector((state) => state?.signIn);

  const isAuthenticated = user?.accessToken || localStorage.getItem("token");
  const initialItem = { name: "", price: 0, text: "" };

  const [countryList, setCountryList] = useState(
    Object.keys(powerBankSharingPlansData)
  );
  const [selectedCountry, selectCountry] = useState(countryList?.[0] || "");

  const [newItem, setNewItem] = useState({ ...initialItem });

  const handleAddItem = (item) => {
    if (!selectedCountry || !(newItem.name && newItem.text))
      if (powerBankSharingPlansData?.[selectedCountry]) {
        powerBankSharingPlansData?.[selectedCountry].push(newItem);
      } else {
        powerBankSharingPlansData[selectedCountry] = [newItem];
      }
    handleSendItems();
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...powerBankSharingPlansData[selectedCountry]];
    updatedItems.splice(index, 1);
    setPowerBankSharingPlansData({
      ...powerBankSharingPlansData,
      [selectedCountry]: updatedItems,
    });
    handleSendItems();
  };

  const handleSendItems = () => {
    dispatch(
      addContactUsData(
        { ...data?.data, powerBankSharingPlansData: powerBankSharingPlansData },
        isAuthenticated
      )
    ).then(setNewItem({ ...initialItem }));
    dispatch(getDataThunk());
  };

  const handleItemChange = (updatedData, index) => {
    const updatedItems = [...powerBankSharingPlansData[selectedCountry]];
    updatedItems[index] = updatedData;
    const updatedDataObj = {
      ...powerBankSharingPlansData,
      [selectedCountry]: updatedItems,
    };
    setPowerBankSharingPlansData(updatedDataObj);
  };

  useEffect(() => {
    dispatch(getDataThunk());
  }, []);

  return (
    <div className={css.container}>
      <h2>POWER BANK SHARING PLANS</h2>
      <Box>
        <h2>Country list</h2>
        <EditCountryList
          countryList={countryList}
          setCountryList={setCountryList}
          setPowerBankSharingPlansData={setPowerBankSharingPlansData}
          powerBankSharingPlansData={powerBankSharingPlansData}
        />
      </Box>
      <h2>Select Country</h2>
      <FormControl fullWidth className={css.selectContainer}>
        <InputLabel key={Math.random()} id="demo-simple-select-label">
          Select country
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCountry}
          label="Age"
          onChange={(e) => selectCountry(e.target.value)}
          className={css.select}
        >
          {countryList?.map((country) => (
            <MenuItem key={Math.random()} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <h2>Make change for this data</h2> */}
      <Box className={css.items} margin="none">
        {powerBankSharingPlansData?.[selectedCountry]?.map((item, index) => (
          <PowerBankSharingItem
            className={css.item}
            key={index}
            item={item}
            handleDeleteItem={() => handleDeleteItem(index)}
            handleItemChange={(updatedData) =>
              handleItemChange(updatedData, index)
            }
          />
        ))}
      </Box>
      {/* <h2>if you need to add new item you can add data this form</h2> come check this */}
      <h1>Add new plan</h1>
      <Box className={css.customBox} margin="none">
        <AddNewItem
          className={css.customBox}
          newItem={newItem}
          setNewItem={setNewItem}
          handleAddItem={handleAddItem}
        />
      </Box>
      <div className={css.sendBtn}>
        <Button variant="contained" size="large" onClick={handleSendItems}>
          Send data
        </Button>
      </div>
    </div>
  );
};

export default Planss;
