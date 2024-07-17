import React from 'react';
import css from './section.module.scss'
// import Header from "./header/header";
import Pages from "../pages";
import Footer from "./footer/footer";
import { Divider } from '@mui/material';
import ResponsiveAppBar from './header/header_v2';

const Section = () => {
  return (
    <div className={css.container}>
      {/* <Header/> */}
      <ResponsiveAppBar/>
      <Divider />
      <Pages/>
      <Footer/>
    </div>
  );
};

export default Section;