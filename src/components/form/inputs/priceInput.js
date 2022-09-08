import React from "react";

const PriceInput = (props) => {
  const { label, id, onChange, ...inputProps } = props;
  return (
    <>
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
      />
    </>
  );
};

export default PriceInput;
