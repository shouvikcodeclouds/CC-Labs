import React from 'react';


const Switch = ({ label, checked, onChange }) => {
  return (
    <div className="checkbox-container">
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider round"></span>
        {label}
      </label>
    </div>
  );
};

export default Switch;