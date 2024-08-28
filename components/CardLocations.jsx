import React from "react";
import "./styles/CardLocations.css";

const CardLocations = ({
  location,
  onInputChange,
  inputValue,
  errorMessage,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="card">
      <div className="card-header">
       
        <h2>{location?.name} </h2>

        <div className="input-container">
          <button onClick={onDecrement} className="input-button">
            -
          </button>
          <input
            type="number"
            value={inputValue}
            onChange={onInputChange}
            placeholder="Buscar por ID"
            className="search-input"
            max={126}
            min={1}
          />
          <button onClick={onIncrement} className="input-button">
            +
          </button>
        </div>
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <div className="card-content">
        <div>
          <p>Tipo:</p>
          <p>{location?.type}</p>
        </div>
        <div>
          <p>Dimensión:</p>
          <p>{location?.dimension}</p>
        </div>
        <div>
          <p>Residentes:</p>
          <p>
            {location?.residents.length > 0
              ? location?.residents.length
              : "No hay residentes"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardLocations;
