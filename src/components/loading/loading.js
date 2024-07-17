import React from 'react';
import { useSelector } from 'react-redux';

import { BallTriangle } from 'react-loader-spinner';

const Loading = () => {

  const { isTrue } = useSelector(state => state.loading);

  return (
    isTrue ?
      <div
        style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '100vh',
          zIndex: '999999999',
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}
      >
        <BallTriangle
          radius={5}
          width={120}
          height={120}
          visible={true}
          color='#1198dc'
          wrapperClass={{}}
          ariaLabel='ball-triangle-loading'
          wrapperStyle={{ position: 'fixed', left: 'calc(50% - 60px)', top: 'calc(50% - 60px)' }}
        />
      </div>
      : ''
  )
};

export default Loading;
