import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Explorar() {
  return (
    <div>
      <Header
        title="Explorar"
        enableSearchIcon={ false }
      />
      <Footer />
    </div>
  );
}
