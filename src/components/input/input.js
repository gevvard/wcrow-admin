import React from 'react';
import css from './input.module.scss'

const Input = ({errors,register, ...props}) => {

  return (
    <label>

            <span>
                {
                  errors
                }
            </span>

      <div>
        <input
          {...register}
          {...props}
        />
      </div>
    </label>
  );
};

export default Input;