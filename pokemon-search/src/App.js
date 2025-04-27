import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGen, setSelectedGen] = useState('1');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    // Fetch Pokémon data when the page loads
    async function fetchPokemonData() {
      try {
        const response = await fetch('http://localhost:5112/api/Pokedex');
        const data = await response.json();
        setPokemons(data);
        setFilteredPokemons(data);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    }

    fetchPokemonData();
  }, []);

  useEffect(() => {
    // Filter whenever search, generation, or type changes
    let filtered = pokemons.filter(pokemon => {
      const matchesGen = selectedGen === 'all' || pokemon.generation == selectedGen;
      const matchesType = selectedType === 'all' || pokemon.element_Type === selectedType;
      const matchesSearch = pokemon.pokemon_Name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesGen && matchesType && matchesSearch;
    });

    setFilteredPokemons(filtered);
  }, [searchTerm, selectedGen, selectedType, pokemons]);

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-12">
              <h1 style={{ textAlign: 'center', color: 'goldenrod' }}>
                <i className="fa fa-star" aria-hidden="true"></i> Pokédex <i className="fa fa-star" aria-hidden="true"></i>
              </h1>
            </div>

            <hr />

            <div className="col-sm-12">
              <div className="row">
                {/* Search Bar */}
                <div className="col-sm-4">
                  <h3><i className="fa fa-search" aria-hidden="true"></i> Search Pokémon:</h3>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Pokémon..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Filter by Type */}
                <div className="col-sm-4">
                  <h3><i className="fa fa-filter" aria-hidden="true"></i> Filter by Type:</h3>
                  <select
                    className="form-control"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="Normal">Normal</option>
                    <option value="Bug">Bug</option>
                    <option value="Fire">Fire</option>
                    <option value="Water">Water</option>
                    <option value="Grass">Grass</option>
                    <option value="Electric">Electric</option>
                    <option value="Flying">Flying</option>
                    <option value="Psychic">Psychic</option>
                    <option value="Rock">Rock</option>
                    <option value="Ground">Ground</option>
                  </select>
                </div>

                {/* Filter by Generation */}
                <div className="col-sm-4">
                  <h3><i className="fa fa-filter" aria-hidden="true"></i> Filter by Generation:</h3>
                  <select
                    className="form-control"
                    value={selectedGen}
                    onChange={(e) => setSelectedGen(e.target.value)}
                  >
                    <option value="1">Generation 1</option>
                    <option value="2">Generation 2</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-sm-12" style={{ paddingTop: '30px' }}>
              <div className="row" style={{ justifyContent: 'center' }}>
                {filteredPokemons.length > 0 ? (
                  filteredPokemons.map((pokemon) => (
                    <div key={pokemon.id} className="col-sm-3" style={{
                      border: '10px solid brown',
                      borderRadius: '20px',
                      backgroundColor: 'lightyellow',
                      margin: '1%'
                    }}>
                      <img src={pokemon.pokemon_Image} alt={pokemon.pokemon_Name} width="100%" />
                      <h2 style={{ color: 'maroon' }}>{pokemon.pokemon_Name}</h2>
                      <hr />
                      <p><b>Element Type:</b> {pokemon.element_Type}</p>
                      <p><b>Height:</b> {pokemon.pokemon_Height} | <b>Weight:</b> {pokemon.pokemon_Weight}</p>
                      <p><b>Generation:</b> {pokemon.generation}</p>
                    </div>
                  ))
                ) : (
                  <p>No Pokémon found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;