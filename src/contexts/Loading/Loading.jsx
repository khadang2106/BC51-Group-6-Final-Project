import React from 'react';
import { createContext, useState } from 'react';
import './loading.scss';

const DEFAULT_STATE = {
  isLoading: false,
};

export const LoadingContext = createContext(DEFAULT_STATE);

export const LoadingProvider = (props) => {
  const [state, setState] = useState(DEFAULT_STATE);

  document.querySelector('body').style.overflow = state.isLoading
    ? 'hidden'
    : 'unset';

  return (
    <LoadingContext.Provider value={[state, setState]}>
      {state.isLoading && (
        <div className="wrapper-loading">
          {/* <Spin size="large" /> */}
          <img src=".././img/updatess.gif" alt="w-100" />
        </div>
      )}

      {props.children}
    </LoadingContext.Provider>
  );
};
