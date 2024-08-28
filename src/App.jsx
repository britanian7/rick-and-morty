import React, { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import CardLocations from "../components/CardLocations";
import CardResident from "../components/CardResident";
import Pagination from "../components/Pagination";
import PopupInfo from "../components/PopupInfo";
import "./App.css";
import getRandomNumber from "../helpers/getRandomNumber";

function App() {
  const [locationID, setLocationId] = useState(getRandomNumber(126));
  const [inputID, setInputID] = useState(locationID);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedResident, setSelectedResident] = useState(null);
  const cardsPerPage = 20;
  const url = `https://rickandmortyapi.com/api/location/${locationID}`;
  const [location, getLocation, hasError, isLoading] = useFetch(url);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputID(value);
    if (value > 0 && value <= 126) {
      setLocationId(value);
      setErrorMessage("");
      setCurrentPage(1);
    } else {
      setErrorMessage("Por favor, ingrese un ID válido.");
    }
  };

  const increment = () => {
    if (inputID < 126) {
      setInputID((prevID) => {
        const newID = Number(prevID) + 1;
        handleInputChange({ target: { value: newID } });
        return newID;
      });
    }
  };

  const decrement = () => {
    if (inputID > 1) {
      setInputID((prevID) => {
        const newID = Number(prevID) - 1;
        handleInputChange({ target: { value: newID } });
        return newID;
      });
    }
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentResidents = location?.residents.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  const totalPages = Math.ceil(
    (location?.residents.length || 0) / cardsPerPage
  );

  const handleCardClick = (resident) => {
    setSelectedResident(resident);
  };

  const handleClosePopup = () => {
    setSelectedResident(null);
  };

  return (
    <div className="app-container">
      <header className="title-container">
        <div className="title title-top">
          <span>Rick</span>
          <span>and</span>
          <span>Morty</span>
        </div>
        <div className="title title-middle">
          <span>Rick</span>
          <span>and</span>
          <span>Morty</span>
        </div>
        <div className="title title-bottom">
          <span>Rick</span>
          <span>and</span>
          <span>Morty</span>
        </div>
      </header>
      {isLoading ? (
        <div className="loading">Estamos cargando los datos...</div>
      ) : hasError ? (
        <div className="error">
          Hubo un error al cargar los datos. Por favor, inténtelo de nuevo.
        </div>
      ) : (
        <>
          <CardLocations
            location={location}
            onInputChange={handleInputChange}
            inputValue={inputID}
            errorMessage={errorMessage}
            onIncrement={increment}
            onDecrement={decrement}
          />
          <div className="residents-container">
            {currentResidents?.map((url) => (
              <CardResident key={url} url={url} onClick={handleCardClick} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            setPage={setCurrentPage}
            totalPages={totalPages}
          />
        </>
      )}
      {selectedResident && (
        <PopupInfo resident={selectedResident} onClose={handleClosePopup} />
      )}
      <footer className="footer"></footer>
    </div>
  );
}

export default App;
