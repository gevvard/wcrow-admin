import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import EditCountryList from "../editCountryList/editCountryList";
import BikeSharingItem from "../bikeSharingItem/bikeSharingItem";
import AddNewItem from "../addNewItem/addNewItem";

import addContactUsData from "../../../redux/action/contactUs";
import {getDataThunk} from "../../../redux/action/getData";

import css from './plans.module.scss'
import Loading from "../../../components/loading";

const Planss = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.mimoDataReducer);
  const { user } = useSelector((state) => state?.signIn);

  const [bikeSharingPlansData, setBikeSharingPlansData] = useState(data?.data?.bikeSharingPlansData || {});

  const isAuthenticated = user?.accessToken || localStorage.getItem("token");

  const initialItem = { name: "", price: 0, text: "" };

  const [countryList, setCountryList] = useState(Object.keys(bikeSharingPlansData));
  
  const [selectedCountry, selectCountry] = useState(countryList?.[0] || "");
  const [newItem, setNewItem] = useState({ ...initialItem });


  const handleAddItem = (item) => {
    if (!selectedCountry || !(newItem.name && newItem.text))
    if (bikeSharingPlansData?.[selectedCountry]) {
      bikeSharingPlansData?.[selectedCountry].push(newItem);
    } else {
      bikeSharingPlansData[selectedCountry] = [newItem];
    }
    handleSendItems();
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...bikeSharingPlansData[selectedCountry]];
    updatedItems.splice(index, 1);
    setBikeSharingPlansData({ ...bikeSharingPlansData, [selectedCountry]: updatedItems });
    handleSendItems();
  };

  const handleSendItems = () => {
    dispatch(
      addContactUsData({ ...data?.data, bikeSharingPlansData: bikeSharingPlansData }, isAuthenticated)
    ).then(setNewItem({ ...initialItem }));
    dispatch(getDataThunk(isAuthenticated));
  };

  const handleItemChange = (updatedData, index) => {
    const updatedItems = [...bikeSharingPlansData[selectedCountry]];
    updatedItems[index] = updatedData;

    const updatedDataObj = {
      ...bikeSharingPlansData,
      [selectedCountry]: updatedItems
    };

    setBikeSharingPlansData(updatedDataObj);
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getDataThunk(isAuthenticated));
    }
  }, []);

  return (
    <div className={css.container}>
      <Loading />
      <h2>PLANS</h2>
      <Box>
        <h2>Country list</h2>
        <EditCountryList
          countryList={countryList}
          setCountryList={setCountryList}
          setBikeSharingPlansData={setBikeSharingPlansData}
          bikeSharingPlansData={bikeSharingPlansData}
        />
      <FormControl fullWidth className={css.selectContainer} >
        <InputLabel   id="demo-simple-select-label">Select country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCountry}
          label="Age"
          onChange={(e) => selectCountry(e.target.value)}
          className={css.select}
        >
          {countryList?.map((country) => (
            <MenuItem key={country} className={css.select} value={country}>{country}</MenuItem>
          ))}
        </Select>
      </FormControl>
      </Box>
      <Box className={css.items} margin="none">
        {bikeSharingPlansData?.[selectedCountry]?.map((item, index) => (
          <BikeSharingItem
            className={css.item}
            key={index}
            item={item}
            handleDeleteItem={()=>handleDeleteItem(index)}
            handleItemChange={(updatedData) => handleItemChange(updatedData, index)}
          />
        ))}
      </Box>
      <Box className={css.customBox} margin="none">
        <AddNewItem
          newItem={newItem}
          setNewItem={setNewItem}
          handleAddItem={handleAddItem}
        />
      </Box>
      <div className={css?.sendBtn}>
        <Button variant="contained" size="large" onClick={handleSendItems} margin="none">
          Send data
        </Button>
      </div>
  </div>
  );
};

export default Planss;