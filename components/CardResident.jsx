import { useEffect } from "react";
import useFetch from "../src/hooks/useFetch";
import "./styles/CardResident.css";

const CardResident = ({ url, onClick }) => {
  const [resident, getResident, hasError, isLoading] = useFetch(url);

  useEffect(() => {
    getResident();
  }, [url, getResident]);

  if (isLoading) return <div className="loading">Cargando residente...</div>;
  if (hasError) return <div className="error">Error...</div>;

  const statusClass = resident?.status.toLowerCase();

  return (
    <div className="card-resident" onClick={() => onClick(resident)}>
      <p className={`resident-status ${statusClass}`}>{resident?.status}</p>
      <img
        src={resident?.image}
        alt={resident?.name}
        className="resident-image"
      />
      <h2 className="resident-name">{resident?.name}</h2>
      <p className="resident-origin">Origen: {resident?.origin.name}</p>
      <p className="resident-species">Specie: {resident?.species}</p>
      <p className="resident-episodes">Episodios: {resident?.episode.length}</p>
    </div>
  );
};

export default CardResident;
