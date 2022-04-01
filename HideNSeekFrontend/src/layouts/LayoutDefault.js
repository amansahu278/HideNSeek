import React from 'react';
import Header from '../components/layout/Header';

const LayoutDefault = ({ children }) => (
  <>
    <Header navPosition="right" />
    <main className="site-content">
      {children}
    </main>
  </>
);

export default LayoutDefault;  