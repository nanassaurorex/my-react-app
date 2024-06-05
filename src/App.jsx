import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [currentDataId, setCurrentDataId] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDataById(currentDataId);
  }, [currentDataId]);

  function fetchDataById(id) {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data by ID:', error);
        setData(null);
      });
  }

  function fetchDataByName(name) {
    fetch(`https://rickandmortyapi.com/api/character/?name=${name}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setCurrentDataId(data.results[0].id); // Set ID of the first match
        } else {
          setData(null);
        }
      })
      .catch((error) => {
        console.error('Error fetching data by name:', error);
        setData(null);
      });
  }

  function handlePreviousButtonClick() {
    if (currentDataId > 1) {
      setCurrentDataId((prevId) => prevId - 1);
    }
  }

  function handleNextButtonClick() {
    setCurrentDataId((prevId) => prevId + 1);
  }

  function handleSearchButtonClick() {
    if (!isNaN(searchTerm) && searchTerm.trim() !== '') {
      // If searchTerm is a number, search by ID
      setCurrentDataId(parseInt(searchTerm));
    } else if (searchTerm.trim() !== '') {
      // Otherwise, search by name
      fetchDataByName(searchTerm.trim());
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSearchButtonClick();
    }
  }

  return (
    <div className="container glass">
      <div className="row">
        {data ? (
          <>
            <div className="col-md-6 mb-3">
              {data.image && (
                <img
                  className="personagem_img"
                  src={data.image}
                  alt={data.name}
                />
              )}
            </div>
            <div className="col-md-6 mb-3">
              <h2>{data.name}</h2>
              <p>Id: {data.id}</p>
              <p>Status: {data.status}</p>
              <p>Espécie: {data.species}</p>
              <p>Gênero: {data.gender}</p>
              <p>Origem: {data.origin && data.origin.name}</p>
              <p>Localidade: {data.location && data.location.name}</p>
            </div>
          </>
        ) : (
          <p>Personagem não encontrado</p>
        )}
      </div>
      {data && data.episode && (
        <div className="episodes-list">
          <h3>Episódios:</h3>
          <ul>
            {data.episode.map((episodeUrl, index) => (
              <li key={index}>Episódio: {episodeUrl}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="form">
        <input
          type="text"
          id="data-id-input"
          placeholder="Nome ou id"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyDown={handleKeyDown}
          className="input_search"
        />
      </div>
      <div className="buttons">
        <button
          onClick={handlePreviousButtonClick}
          className="btn btn-secondary"
        >
          Anterior
        </button>
        <button onClick={handleNextButtonClick} className="btn btn-secondary">
          Próximo
        </button>
      </div>
    </div>
  );
}

export default App;