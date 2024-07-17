import React from 'react';
import css from './button.module.scss'
const Button = ({onClick, text}) => {
  return (
    <button
      type={"button"}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;