import React from 'react';
import './styles.scss';

const Preloader = () => (
  <div id="preloader">
    <div className="sk-folding-cube">
      <div className="sk-cube sk-cube-1" />
      <div className="sk-cube sk-cube-2" />
      <div className="sk-cube sk-cube-3" />
      <div className="sk-cube sk-cube-4" />
    </div>
  </div>
);

export default Preloader;