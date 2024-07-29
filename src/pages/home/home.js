import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Loading from "../../components/loading";

import Container from "@mui/material/Container";

import OurProject from "../../components/ourProjects";


const Home = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  return (
    <>
      <Loading/>
      <Container sx={{
        display:'flex',
        flexDirection:'column',
        gap:10

      }} >
        <OurProject/>
      </Container>
    </>
  );
};

export default Home;
