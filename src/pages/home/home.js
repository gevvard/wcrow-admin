import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import addContactUsData from '../../redux/action/contactUs';
import {getDataThunk} from '../../redux/action/getData';
import Loading from "../../components/loading";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import css from './home.module.scss'
import Container from "@mui/material/Container";


const Home = () => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const {data} = useSelector((state) => state.mimoDataReducer);
  const {user} = useSelector((state) => state?.signIn);
  const isAuthenticated = user?.accessToken || localStorage.getItem('token');

  const sendData = () => {
    let sendingData = {...data}
    sendingData.text =text;
    dispatch(addContactUsData({...data?.data, 'text': sendingData.text}, isAuthenticated))
      .then(
        setText('')
      ).then(
      dispatch(getDataThunk())
    )
    ;
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setText({
      ...text,
      [name]: value,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getDataThunk(isAuthenticated));
    }
  }, []);

  useEffect(() => {
    if (data && data?.data?.text) {
      setText(data?.data?.text);
    }
  }, [data]);

  return (
    <>
      <Loading/>
      <Container sx={{
        display:'flex',
        flexDirection:'column',
        gap:10

      }} >
        <h1>Header text</h1>

        <TextField
          label='text'
          type="text"
          name="text"
          onChange={handleInputChange}
          value={text?.text || ''}
          sx={{width:250}}
        />

        <Button
          sx={{width:250}}
          variant="contained"
          size="large"
          onClick={sendData}>
          Send data
        </Button>
      </Container>
    </>
  );
};

export default Home;
