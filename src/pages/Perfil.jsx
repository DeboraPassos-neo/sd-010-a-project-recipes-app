import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

class Perfil extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header title="Perfil" />
        <span> email usuário from store</span>
        <button type="submit">FEITAS</button>
        <button type="submit">FAVORITAS</button>
        <button type="submit">SAIR</button>
        <Footer history={ history } />
      </div>
    );
  }
}

Perfil.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Perfil;
