import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from './HeaderContext';

function HeaderProvider({ children }) {
  const [searchBtn, setSearchBtn] = useState(false);
  const [hideSearchBtn, setHideSearchBtn] = useState(false);
  const [pageName, setPageName] = useState('Comida');

  const contextValue = {
    searchBtn,
    setSearchBtn,
    hideSearchBtn,
    setHideSearchBtn,
    pageName,
    setPageName,
  };

  return (
    <HeaderContext.Provider value={ contextValue }>
      {children}
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default HeaderProvider;