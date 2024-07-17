import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import EditCountryList from "../editCountryList/editCountryList";
import BikeSharingItem from "../bikeSharingItem/bikeSharingItem";
import AddNewItem from "../addNewItem/addNewItem";

import addContactUsData from "../../../redux/action/contactUs";
import { getDataThunk } from "../../../redux/action/getData";

import css from "./tariffs.module.scss";
import Loading from "../../../components/loading";

const Tariffs = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.mimoDataReducer);

  const [bikeSharingData, setBikeSharingData] = useState(
    data?.data?.bikeSharingTariffs || {}
  );

  const { user } = useSelector((state) => state?.signIn);

  const isAuthenticated = user?.accessToken || localStorage.getItem("token");
  const initialItem = { name: "", price: 0, text: "" };

  const [countryList, setCountryList] = useState(Object.keys(bikeSharingData));
  const [selectedCountry, selectCountry] = useState(countryList?.[0] ||  "");

  const [newItem, setNewItem] = useState({ ...initialItem });

  const handleAddItem = (item) => {
    if (!selectedCountry || !(newItem.name && newItem.text))

    if (bikeSharingData?.[selectedCountry]) {
      bikeSharingData?.[selectedCountry].push(newItem);
    } else {
      bikeSharingData[selectedCountry] = [newItem];
    }
    handleSendItems();
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...bikeSharingData[selectedCountry]];
    updatedItems.splice(index, 1);
    setBikeSharingData({ ...bikeSharingData, [selectedCountry]: updatedItems });
    handleSendItems();
  };

  const handleSendItems = () => {
    dispatch(
      addContactUsData(
        { ...data?.data, bikeSharingTariffs: bikeSharingData },
        isAuthenticated
      )
    ).then(setNewItem({ ...initialItem }));
    dispatch(getDataThunk());
  };

  const handleItemChange = (updatedData, index) => {
    const updatedItems = [...bikeSharingData[selectedCountry]];
    updatedItems[index] = updatedData;

    const updatedDataObj = {
      ...bikeSharingData,
      [selectedCountry]: updatedItems,
    };

    setBikeSharingData(updatedDataObj);
  };

  useEffect(() => {
    dispatch(getDataThunk());
  }, []);

  return (
    <div className={css.container}>
      <Loading />
      <h1>Bike Sharing Tariffs</h1>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }} margin="none">
        <EditCountryList
          countryList={countryList}
          setCountryList={setCountryList}
          setBikeSharingData={setBikeSharingData}
          bikeSharingData={bikeSharingData}
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
        {bikeSharingData?.[selectedCountry]?.map((item, index) => (
          <BikeSharingItem
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
      {/* <h2>if you need to add new item you can add data  this form  </h2> */}
      <h2>Add new Tariff</h2>
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
      <div>
        <Button
          variant="contained"
          size="large"
          margin="none"
          onClick={handleSendItems}
        >
          Send data
        </Button>
      </div>
    </div>
  );
};
export default Tariffs;
