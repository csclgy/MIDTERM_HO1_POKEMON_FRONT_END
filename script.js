document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.getElementById("generation-filter");
    const form = document.getElementById("filter-form");
    const pokemonContainer = document.getElementById("pokemon-list");

    // Prevent the form from reloading the page
    form.addEventListener("submit", function (event) {
        event.preventDefault();
    });

    // Fetch data from your Web API
    async function fetchPokemonData() {
        try {
            const response = await fetch("http://localhost:5112/api/Pokedex"); // Update with your actual API endpoint
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
            return [];
        }
    }

    // Function to display Pokémon based on generation
    async function displayPokemon(gen) {
        const pokemonData = await fetchPokemonData();
        pokemonContainer.innerHTML = ""; // Clear previous results

        // Filter Pokémon by selected generation
        const filteredPokemon = pokemonData.filter(pokemon => pokemon.generation == gen);

        // Display Pokémon
        filteredPokemon.forEach(pokemon => {
            const div = document.createElement("div");
            div.className = "pokemon-card";
            div.innerHTML = `
                <div class="col-sm-3" style="border: 10px solid brown; border-radius: 20px; background-color: lightyellow; margin:1%;">
                <img src="${pokemon.pokemon_Image}" alt="${pokemon.pokemon_Name}" width="100%">
                <p></p><h2 style="color: maroon">${pokemon.pokemon_Name}</h2><p></p><hr><p><b>Element Type:</b> ${pokemon.element_Type}</p>
                <p><b>Height:</b>  ${pokemon.pokemon_Height} | <b>Weight:</b> ${pokemon.pokemon_Weight}</p>
                <p><b>Generation:</b> ${pokemon.generation}</p>
                </div>
            `;
            pokemonContainer.appendChild(div);
        });
    }

    // Listen for dropdown change event
    dropdown.addEventListener("change", function () {
        const selectedGen = parseInt(dropdown.value); // Get value from dropdown
        displayPokemon(selectedGen);
    });
});

// FOR FILTERING GENERATION
document.addEventListener("DOMContentLoaded", function () {
    const genDropdown = document.getElementById("generation-filter");
    const typeDropdown = document.getElementById("element-filter");
    const pokemonContainer = document.getElementById("pokemon-list");

    // Fetch data from your Web API
    async function fetchPokemonData() {
        try {
            const response = await fetch("http://localhost:5112/api/Pokedex"); // Update this URL
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
            return [];
        }
    }

    // Function to display Pokémon based on filters
    async function displayPokemon() {
        const pokemonData = await fetchPokemonData();
        pokemonContainer.innerHTML = ""; // Clear previous results

        const selectedGen = genDropdown.value;
        const selectedType = typeDropdown.value;

        // Filter Pokémon by Generation and Type
        const filteredPokemon = pokemonData.filter(pokemon => {
            const matchesGen = selectedGen === "all" || pokemon.generation == selectedGen;
            const matchesType = selectedType === "all" || pokemon.element_Type === selectedType;
            return matchesGen && matchesType;
        });

        // Display Pokémon
        filteredPokemon.forEach(pokemon => {
            const div = document.createElement("div");
            div.className = "pokemon-card";
            div.innerHTML = `
                <div class="col-sm-3" style="border: 10px solid brown; border-radius: 20px; background-color: lightyellow; margin:1%;">
                <img src="${pokemon.pokemon_Image}" alt="${pokemon.pokemon_Name}" width="100%">
                <p></p><h2 style="color: maroon">${pokemon.pokemon_Name}</h2><p></p><hr><p><b>Element Type:</b> ${pokemon.element_Type}</p>
                <p><b>Height:</b>  ${pokemon.pokemon_Height} | <b>Weight:</b> ${pokemon.pokemon_Weight}</p>
                <p><b>Generation:</b> ${pokemon.generation}</p>
                </div>
            `;
            pokemonContainer.appendChild(div);
        });
    }

    // Listen for dropdown change events
    genDropdown.addEventListener("change", displayPokemon);
    typeDropdown.addEventListener("change", displayPokemon);
});

// FOR SEARCH BAR
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-bar");
    const genDropdown = document.getElementById("generation-filter");
    const typeDropdown = document.getElementById("element-filter");
    const pokemonContainer = document.getElementById("pokemon-list");

    // Fetch data from your Web API
    async function fetchPokemonData() {
        try {
            const response = await fetch("http://localhost:5112/api/Pokedex"); // Update with your actual API endpoint
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
            return [];
        }
    }

    // Function to display Pokémon based on filters
    async function displayPokemon() {
        const pokemonData = await fetchPokemonData();
        pokemonContainer.innerHTML = ""; // Clear previous results

        const selectedGen = genDropdown.value;
        const selectedType = typeDropdown.value;
        const searchQuery = searchInput.value.toLowerCase();

        // Filter Pokémon by Generation, Type, and Search Query
        const filteredPokemon = pokemonData.filter(pokemon => {
            const matchesGen = selectedGen === "all" || pokemon.generation == selectedGen;
            const matchesType = selectedType === "all" || pokemon.element_Type === selectedType;
            const matchesSearch = pokemon.pokemon_Name.toLowerCase().includes(searchQuery);
            return matchesGen && matchesType && matchesSearch;
        });

        // Display Pokémon
        filteredPokemon.forEach(pokemon => {
            const div = document.createElement("div");
            div.className = "pokemon-card";
            div.innerHTML = `
                <div class="col-sm-3" style="border: 10px solid brown; border-radius: 20px; background-color: lightyellow; margin:1%;">
                <img src="${pokemon.pokemon_Image}" alt="${pokemon.pokemon_Name}" width="100%">
                <p></p><h2 style="color: maroon">${pokemon.pokemon_Name}</h2><p></p><hr><p><b>Element Type:</b> ${pokemon.element_Type}</p>
                <p><b>Height:</b>  ${pokemon.pokemon_Height} | <b>Weight:</b> ${pokemon.pokemon_Weight}</p>
                <p><b>Generation:</b> ${pokemon.generation}</p>
                </div>
            `;
            pokemonContainer.appendChild(div);
        });
    }

    // Listen for events (dropdowns and search bar)
    genDropdown.addEventListener("change", displayPokemon);
    typeDropdown.addEventListener("change", displayPokemon);
    searchInput.addEventListener("input", displayPokemon); // Update results as user types
});
