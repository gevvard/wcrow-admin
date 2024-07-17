import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import addContactUsData from '../../redux/action/contactUs';
import {getDataThunk} from '../../redux/action/getData';
import css from "./contactUs.module.scss"
import Loading from "../../components/loading";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";


const ContactUs = () => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    phone: '',
    email: '',
    address: '',
  });

  const dispatch = useDispatch();
  const {contactUsData} = useSelector((state) => state?.contactUs);
  const {data} = useSelector((state) => state.mimoDataReducer);
  const {user} = useSelector((state) => state?.signIn);
  const isAuthenticated = user?.accessToken || localStorage.getItem('token');

  const sendData = () => {
    let sendingData = {...data}
    sendingData.contactUs = {...formData};
    dispatch(addContactUsData({...data?.data, 'contactUs': sendingData.contactUs}, isAuthenticated))
      .then(
        setFormData({
          title: '',
          text: '',
          phone: '',
          email: '',
          address: '',
        })
      );
    dispatch(getDataThunk(isAuthenticated));
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getDataThunk(isAuthenticated));
    }
  }, []);

  useEffect(() => {
    if (data && Object.values(data) && Object.values(data)[0] && Object.values(data)[0][`contactUs`]) {
      setFormData(Object.values(data)[0][`contactUs`]);
    }

  }, [data]);
  useEffect(() => {
    if (data && Object.keys(data).length > 0 && data?.updatedData?.contactUs) {
      setFormData(data.updatedData.contactUs);
    }
  }, [data]);

  return (
    <>
      <Loading/>
      <div className={css.container}>
        <h1>Contact Us Changes</h1>

        <TextField
          className={css.input}
          label='title'
          type="text"
          name="title"
          onChange={handleInputChange}
          value={formData?.title || ''}/>


        <TextField
          className={css.input}
          label='text'
          type="text"
          name="text"
          onChange={handleInputChange}
          value={formData?.text}/>

        <TextField
          className={css.input}
          label='phone'
          type="text"
          name="phone"
          onChange={handleInputChange}
          value={formData?.phone}/>

        <TextField
          className={css.input}
          label='email'
          type="text"
          name="email"
          onChange={handleInputChange}
          value={formData?.email}/>

        <TextField
          className={css.input}
          label='address'
          type="text"
          name="address"
          onChange={handleInputChange}
          value={formData?.address}/>
        <Button
          className={css.button}
          variant="contained"
          size="large"
          onClick={sendData}>
          Send data
        </Button>
      </div>
    </>
  );
};

export default ContactUs;
