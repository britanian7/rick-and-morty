import React from "react";
import "./styles/PopupInfo.css";

const PopupInfo = ({ resident, onClose }) => {
  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="popup-info">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2 className="popup-name">{resident?.name}</h2>
        <div className="popup-content">
          <div className="popup-column">
            <img
              src={resident?.image}
              alt={resident?.name}
              className="popup-image"
            />
            <p className={`popup-status ${resident?.status.toLowerCase()}`}>
              {resident?.status}
            </p>
          </div>
          <div className="popup-column">
            <p className="details-popup">
              <strong>Species:</strong> {resident?.species}
            </p>
            <p className="details-popup">
              <strong>Gender:</strong> {resident?.gender}
            </p>
            <p className="details-popup">
              <strong>Origin:</strong> {resident?.origin.name}
            </p>
            <p className="details-popup">
              <strong>Location:</strong> {resident?.location.name}
            </p>
            <p className="details-popup">
              <strong>Episodes:</strong> {resident?.episode.length}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupInfo;
